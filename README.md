# DDG-STUDIOS
Website for Data and Design Geeks Studio (DDGs).

## Project structure
```
index.html            the page
css/style.css         compiled Tailwind CSS (generated, loaded by index.html)
src/input.css         Tailwind directives + custom CSS (edit this, not style.css)
tailwind.config.js    colours, fonts, dark mode, which files to scan
images/               logo, team photos (images/team/), etc.
js/forms.js           contact + waitlist forms (see FORM-SETUP.md)
js/site.js            theme, menu and scroll behaviour for secondary pages
privacy.html          privacy policy
case-study.html       reusable case-study template (placeholder content)
sitemap.xml, robots.txt   search engine files
```

## Adding a case study
1. Copy `case-study.html` to a new file, for example `case-study-health-app.html`.
2. Replace everything marked `EDIT:` in the comments: title, summary, facts, results, text, images, quote, tools, team.
3. Update the `<title>`, description, `canonical` and `og:url` tags, and the JSON-LD block.
4. Delete the "Template preview" banner and the `noindex` meta tag.
5. Add the page to `sitemap.xml`.
6. In `index.html`, add the project to `CASE_STUDIES` so its popup shows a "Read the full case study" button.
7. Run `npm run build` (new Tailwind classes are picked up from all `.html` files).

## Working on the site
Requires Node.js 18+ (https://nodejs.org).

```bash
npm install        # once, installs Tailwind
npm run dev        # rebuilds css/style.css every time you save
npm run build      # minified CSS for production
```

Run `npm run build` before every deploy, and upload `index.html`, `css/` and `images/`.
Tailwind only generates classes it finds in `index.html`. If you add pages or script files, add them to `content` in `tailwind.config.js`.
