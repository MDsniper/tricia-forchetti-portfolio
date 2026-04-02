# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio site for a talent acquisition consultant, deployed on Cloudflare Workers.

## Architecture

- **`dist/index.html`** — Single-page static site with all HTML, CSS, and JS inline. Includes dark mode toggle, scroll animations (IntersectionObserver), mobile hamburger menu, and responsive layout.
- **`dist/static/`** — Static assets (headshot image).
- **`wrangler.toml`** — Cloudflare Workers config pointing at `dist/` as the asset directory.

No build step, no dependencies, no framework. Just static files served by Cloudflare.

## Deploy

```bash
npx wrangler deploy
```

## Content Changes

All content (roles, services, skills, stats, education) is directly in `dist/index.html`. Edit the HTML to update.

## Design

- Fonts: Playfair Display (headings) + Cormorant Garamond (body), loaded from Google Fonts
- Color scheme: dark navy (#1A1A2E) with gold accents (#C6A664), light mode via CSS custom properties
- Footer year is hardcoded — update annually
