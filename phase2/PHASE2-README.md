# Phase 2: security headers, 404 page, share image, project brief wizard and call booking

## New files (copy into your project, keeping the same paths)
| File | What it does |
|---|---|
| `_headers` | Security headers and a Content Security Policy for Netlify. Must stay in the project root. |
| `404.html` | Branded "page not found" page. Netlify serves it automatically for any missing address. |
| `start-project.html` | 4-step project brief form plus a "book a call" section. |
| `js/brief.js` | Logic for the brief form and the booking calendar. Settings are in the `CONFIG` block at the top. |
| `images/og-card.jpg` | 1200 x 630 share image for LinkedIn, WhatsApp, X and Facebook previews. |
| `tools/apply-updates.mjs` | One-time script that makes the small edits needed in your existing files (see below). |

## What the script changes in your existing files
It never touches your page content. It only:
1. Replaces the share image and Twitter card tags in `index.html`, `academy.html`, `privacy.html` and `case-study.html`.
2. Points the main "Start a Project" buttons at `start-project.html`. The old contact form on the home page stays for general questions.
3. Adds a bullet about the project brief form and one about the booking calendar to `privacy.html`.
4. Adds `start-project.html` to `sitemap.xml`.

If it can't find where to make an edit, it prints MANUAL and tells you which file. For the share image, paste this over the `og:image` and `twitter:card` lines:
```html
<meta property="og:image" content="https://ddgstudios.netlify.app/images/og-card.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://ddgstudios.netlify.app/images/og-card.jpg">
```

## Steps
1. Copy the new files in. Do not overwrite your edited pages with anything else.
2. In the project folder run: `node tools/apply-updates.mjs`. Read what it prints.
3. Run `npm run build` to refresh `css/style.css`.
4. Open `start-project.html` and `404.html` locally. For `404.html`, check it on the live site, because it only works at a missing address.
5. Delete the `tools/` folder, then commit and push. Netlify redeploys.

## Things only you can do
1. **Set up call booking.** Create a free account at cal.com (or Calendly), make a 20-minute "Discovery call" event, connect your calendar, and copy its link. In `js/brief.js`, replace `https://cal.com/YOUR-USERNAME/discovery` with it. Until you do, the page shows a WhatsApp and email fallback instead of a calendar. For Calendly, also change nothing else: `_headers` already allows it.
2. **Turn on email alerts for the new form.** After the deploy, open Netlify, then your project's **Forms**, and check that `project-brief` is listed. Then open **Notifications**, find **Form submission notifications**, and add an email notification for `project-brief`. Tell me when it's live and I'll check that Netlify found the form.
3. **Adjust the form options** (services, stages, budget ranges, timelines, next steps) in `start-project.html`. The budget ranges are in US dollars and are only suggestions.
4. **Review the privacy wording** and update the "Last updated" date in `privacy.html`.
5. **Test the security headers.** After the deploy, run your address through https://securityheaders.com. Open every page and the browser console (F12). A message starting "Refused to..." means the policy blocked something. Send me the message and I'll fix it.
6. **Check the share image.** Paste your link into https://www.opengraph.xyz. WhatsApp and LinkedIn cache old previews, so a link you've shared before may show the old card for a while.
7. **If you add things later**, update `_headers`: analytics scripts need a `script-src` entry, and a new form service needs a `connect-src` entry. Notes are at the bottom of the file.

## About the security policy
The policy limits scripts, styles, images, fonts and frames to your own site plus Google Fonts, Unsplash images and the booking services. It still allows inline scripts, because your pages use them. That is weaker than the strictest setting, but it still blocks scripts loaded from other sites. You can tighten it later by moving inline scripts into files.
