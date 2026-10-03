// @ts-check
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const TEMPLATE = new URL("../config/headers.template", import.meta.url);
const EXECUTABLE_TYPES = new Set(["", "module", "text/javascript", "application/javascript"]);
// Cloudflare limits: 2,000 characters per line in _headers.
const MAX_LINE = 2000;

/** @param {string} dir @returns {Promise<string[]>} */
async function htmlFiles(dir) {
	const out = [];
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
		else if (entry.name.endsWith(".html")) out.push(full);
	}
	return out;
}

/** Writes dist/_headers with a CSP that allows exactly the inline scripts the build produced. */
export default function securityHeaders() {
	return {
		name: "security-headers",
		hooks: {
			/** @param {{ dir: URL, logger: import('astro').AstroIntegrationLogger }} ctx */
			"astro:build:done": async ({ dir, logger }) => {
				const outDir = fileURLToPath(dir);
				const hashes = new Set();
				const files = await htmlFiles(outDir);
				if (files.length === 0) throw new Error("security-headers: no HTML files found in " + outDir);

				for (const file of files) {
					const html = await readFile(file, "utf8");
					for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
						const attrs = m[1];
						if (/\bsrc\s*=/i.test(attrs)) continue; // external scripts are covered by 'self'
						const type = (attrs.match(/\btype\s*=\s*["']?([^"'\s>]+)/i)?.[1] ?? "").toLowerCase();
						if (!EXECUTABLE_TYPES.has(type)) continue; // data blocks never execute
						hashes.add(`'sha256-${createHash("sha256").update(m[2], "utf8").digest("base64")}'`);
					}
				}

				const template = await readFile(TEMPLATE, "utf8");
				const output = template
					.split("\n")
					.filter((l) => !l.startsWith("#"))
					.join("\n")
					.replaceAll("{{SCRIPT_SRC_HASHES}}", [...hashes].join(" "));
				const tooLong = output.split("\n").find((l) => l.length > MAX_LINE);
				if (tooLong) throw new Error("security-headers: a _headers line exceeds Cloudflare's 2,000 character limit");
				if (output.includes("{{")) throw new Error("security-headers: unreplaced placeholder in template");

				await writeFile(path.join(outDir, "_headers"), output);
				logger.info(`wrote _headers with ${hashes.size} inline-script hash(es)`);
			},
		},
	};
}
