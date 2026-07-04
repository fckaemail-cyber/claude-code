# [BRAND NAME] — Kava & Kratom Lounge Website

A premium, mobile-first, SEO-ready static website for a kava and kratom
beverage lounge. Dark botanical-lounge design, first-timer education,
compliance-safe copy, and a built-in "Ask the Kava Guide" chat assistant.

## Pages

| URL | Page |
| --- | --- |
| `/` | Home — hero, education hooks, drink categories, featured drinks, visit preview, social proof, VIP signup |
| `/menu/` | Full drink menu with beginner-friendly + 21+ badges and Menu schema |
| `/new-here/` | First-time guide (the most important page) with embedded Kava Guide chat |
| `/kava-vs-kratom/` | Side-by-side comparison table |
| `/events/` | Event cards (First-Timer Night, Open Mic, DJ nights, etc.) |
| `/visit/` | Address, hours, map, parking, contact, "what to expect" |
| `/faq/` | Accordion FAQ with FAQPage schema + responsible-use block |
| `/what-is-kava/` | SEO explainer article |
| `/what-is-kratom/` | SEO explainer article (21+ framing) |

## Run locally

Any static file server works; clean URLs resolve via folder `index.html` files:

```bash
cd kava-lounge-site
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

Upload the folder to any static host (Netlify, Vercel, Cloudflare Pages,
GitHub Pages, shared hosting). No build step required.

## Launch checklist — replace placeholders

Search the project for these tokens and replace them everywhere:

- `[BRAND NAME]` — your brand name (header, footer, titles, schema)
- `[City]`, `[STATE]`, `[ZIP]`, `[STREET ADDRESS]`, `[Insert address]`
- `[Insert hours]`, `[e.g. Mo-Su 10:00-24:00]` (schema `openingHours`)
- `[Insert phone]` and every `tel:+10000000000` link
- `[Insert email]` / `mailto:hello@yourbrand.com`
- `www.yourbrand.com` — your real domain (canonicals, OG URLs, schema, sitemap, robots)
- `instagram.com/yourbrand`, `tiktok.com/@yourbrand`, `[@handle]`
- Google Maps: replace the `.map-ph` placeholder divs with your embed iframe
  (Google Maps → Share → Embed a map) and update the `maps.google.com/?q=` links
- FAQ: `[Confirm with owner: brewed tea only, extracts, or both.]`
- Event days/times on `/events/`
- OG images: add real images at `assets/img/og-*.jpg` (1200×630)
- Drink photos: replace `data-art` placeholder art and `.img-ph` divs with real
  photography (keep the descriptive alt text pattern)

## VIP form

`assets/js/main.js` has a placeholder submit handler — wire it to your email/SMS
platform (Mailchimp, Klaviyo, etc.) where marked `TODO`.

## Ask the Kava Guide

- Floating chat bubble on every page; full embedded chat on `/new-here/`.
- Currently answers from a scripted, compliance-reviewed knowledge base in
  `assets/js/main.js` (`ANSWERS` + `answerFor()`), including required safety
  fallbacks for medical/dosing questions.
- To upgrade to a live AI: point `answerFor()` at your backend and use
  `kava-guide-system-prompt.md` as the system prompt. Keep the client-side
  medical-question regex as a first-line guardrail.

## Compliance notes

- No effect, medical, or benefit claims anywhere; copy is flavor/culture/experience only.
- "Kratom 21+ only, valid ID required" appears on every kratom drink, the menu
  footer note, the sitewide footer disclaimer, and the chat responses.
- Responsible-use disclaimer is in every page footer and at `/faq/#responsible-use`.
- Have your attorney review copy for your state/city's kava & kratom rules
  before launch.
