# Case studies: how they work and how to add them

All 12 case studies live in ONE file: `src/case-studies.mjs`.
`npm run build` turns that file into:
- 12 pages in `case-studies/`
- `js/projects.js` (the project cards and popups on the home page)
- the case-study entries in `sitemap.xml`

So you edit one file, run one command, and everything stays in step.

## Install it (one time)
1. Copy `src/`, `tools/`, `js/projects.js` and `case-studies/` from this folder into your project.
2. Run `node tools/apply-case-studies.mjs`. It connects your `index.html`, `package.json` and `src/input.css`. It prints what it changed.
3. Delete the old `case-study.html` (the new pages replace it).
4. Run `npm run build`, open `index.html`, check a project popup and a case-study page.
5. Commit and push. Netlify runs `npm run build` itself, so the pages regenerate on every deploy.
6. Delete `tools/apply-case-studies.mjs` if you like. Keep `tools/build-case-studies.mjs`.

## Replace the draft content with your real work
Open `src/case-studies.mjs`. Each project has these parts:

| Field | Where it shows |
|---|---|
| `title`, `category`, `summary`, `cover` | The card on the home page and the page header |
| `client`, `industry`, `location`, `year`, `duration`, `role`, `platform` | The six facts under the cover image |
| `results` | The three big numbers (keep them measurable and true) |
| `challenge`, `phases`, `solution`, `features`, `outcome` | The main text sections |
| `quote` | The testimonial: `[text, "Name, Job title, Company"]` |
| `tools`, `team` | The sidebar, and the tool chips in the popup |
| `snap` | The three short lines (challenge, solution, result) in the home page popup |
| `screens` | Optional. Real screenshots, for example `['images/cases/payments-1.webp']`. The "Inside the product" section appears only when you add some |
| `verified` | `false`: the page is hidden from search engines and the sitemap. Change to `true` once everything is real and approved |

Rules of thumb:
- Keep titles short so the page title stays under about 60 characters.
- Keep `summary` under about 130 characters.
- Use the client's real name only with their written permission. Otherwise keep "(name withheld)".
- Only publish numbers you can back up, and quotes the person has approved.

## Add a new case study
Copy one block in `src/case-studies.mjs`, give it a new `slug` (the web address), fill in every field, and run `npm run build`. It appears on the home page and gets its own page automatically.

## Remove one
Delete its block, run `npm run build`, and delete its old file from `case-studies/`.

## Do not edit these by hand
`case-studies/*.html` and `js/projects.js` are generated. Hand edits are overwritten the next time you build.

## Switching to your own domain
Change `site` at the top of `src/case-studies.mjs`, then run `npm run build`.
