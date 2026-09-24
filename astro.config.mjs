// @ts-check
import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://aminkhani.ir",
	integrations: [
		mermaid({
			theme: "forest",
			autoTheme: true,
		}),
		mdx(),
		sitemap(),
	],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});