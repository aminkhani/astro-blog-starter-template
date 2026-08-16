# Amin Khani — Personal Blog

My personal website and blog, built with [Astro](https://astro.build) and deployed on Cloudflare Workers. I write about Django backend development, security engineering, system hardening, and DevSecOps.

Live structure:

- `/` — home page with a short bio
- `/about` — full background, experience, and skills
- `/blog` — posts on Django, hardening, and vulnerability management

## Getting Started

```bash
npm install
npm run dev       # local dev server at localhost:4321
```

## Commands

| Command                           | Action                                       |
| :--------------------------------- | :-------------------------------------------- |
| `npm install`                      | Installs dependencies                         |
| `npm run dev`                      | Starts local dev server at `localhost:4321`   |
| `npm run build`                    | Builds the production site to `./dist/`       |
| `npm run preview`                  | Preview the build locally before deploying    |
| `npm run build && npm run deploy`  | Deploy to Cloudflare Workers                  |

## Writing a new post

Add a new Markdown file to `src/content/blog/`:

```md
---
title: "Post title"
description: "One-line summary"
pubDate: "Aug 16 2026"
heroImage: "/blog-placeholder-1.jpg"
---

Post content in Markdown...
```

## Deploying

This project is set up for Cloudflare Workers via the `@astrojs/cloudflare` adapter:

```bash
npm run build
npm run deploy
```

Update `site` in `astro.config.mjs` and `name` in `wrangler.json` to match your actual domain / Worker name before deploying.

Built on the [Cloudflare Astro blog starter template](https://github.com/aminkhani/astro-blog-starter-template).
