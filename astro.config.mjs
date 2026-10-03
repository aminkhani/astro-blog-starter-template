// @ts-check
import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import securityHeaders from "./integrations/security-headers.mjs";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://aminkhani.ir",
	// Don't expose the framework via the default /_astro/ asset path.
	build: { assets: "static" },
	vite: {
		build: {
			// Never inline assets as data: URIs, so the CSP needs no data: sources for fonts/images.
			assetsInlineLimit: 0,
			sourcemap: false,
		},
	},
	i18n: {
		defaultLocale: "en",
		locales: ["en", "fa"],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [
		mermaid({
			theme: "forest",
			autoTheme: true,
		}),
		mdx(),
		sitemap(),
		securityHeaders(),
	],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});