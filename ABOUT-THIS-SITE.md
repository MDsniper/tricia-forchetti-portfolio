# Your Website — What You Need to Know

Hi Tricia! This document explains what your website is, how it works, and what's included in this folder.

---

## What Is This?

This is your personal portfolio website. It lives at your custom domain and is visible to anyone on the internet. It showcases your experience, services, skills, and contact information in a clean, professional format.

---

## What's in This Folder?

| File/Folder | What It Is |
|---|---|
| `dist/index.html` | **Your entire website.** All of the text, styling, and page behavior is in this one file. |
| `dist/static/` | Contains your headshot photo that appears on the site. |
| `wrangler.toml` | A small settings file that tells Cloudflare (your hosting provider) where your website files are. |
| `INVOICE.md` | Your invoice for this project. |
| `README.md` | A short technical summary of the project. |
| `CLAUDE.md` | Notes for any developer who works on the site in the future. |

---

## How Does the Site Work?

Your website is a **static site**, which means it's a single file that displays the same content to every visitor — there's no database, no login system, and no moving parts that can break. Think of it like a beautifully designed digital flyer that lives online.

It's hosted on **Cloudflare**, a large internet infrastructure company. They serve your site to visitors quickly from data centers around the world, and the hosting is free.

Your **domain name** (your web address) is registered through Cloudflare for two years. After two years it will need to be renewed (roughly $11/year).

---

## Site Features

- **Works on all devices** — phones, tablets, and desktop computers
- **Dark mode** — visitors can toggle between light and dark viewing, and it also detects their device preference automatically
- **Smooth animations** — content fades in as visitors scroll down the page
- **Fast loading** — no heavy frameworks or external dependencies, so the site loads quickly everywhere
- **Contact** — the "Send Me an Email" button opens the visitor's email app with your address pre-filled

---

## How to Request Changes

Since all of the content is in one file (`dist/index.html`), common updates are straightforward:

- **Update a job title or description** — the text gets changed directly in the file
- **Add a new role to your Experience section** — a new entry gets added following the same pattern
- **Change your email address** — the mailto link gets updated
- **Swap your headshot** — replace the image file in `dist/static/`

Just reach out and let me know what you'd like changed.

---

## What You're Paying For

| Item | Cost |
|---|---|
| Custom portfolio website (design + development + deployment) | $300 |
| Domain name (2 years) | $22 |
| Hosting (Cloudflare) | Free |
| **Total** | **$322** |

Standard pricing for a custom single-page website like this is $300–$500 depending on complexity. If you know anyone who needs a similar site, feel free to share my info.
