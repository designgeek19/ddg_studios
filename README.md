# DDG-STUDIOS
Website for Data and Design Geeks Studio (DDGs).

## Project structure
```
index.html            the page
css/style.css         compiled Tailwind CSS (generated, loaded by index.html)
src/input.css         Tailwind directives + custom CSS (edit this, not style.css)
tailwind.config.js    colours, fonts, dark mode, which files to scan
images/               logo, team photos (images/team/), etc.
```

## Working on the site
Requires Node.js 18+ (https://nodejs.org).

```bash
npm install        # once, installs Tailwind
npm run dev        # rebuilds css/style.css every time you save
npm run build      # minified CSS for production
```

Run `npm run build` before every deploy, and upload `index.html`, `css/` and `images/`.
Tailwind only generates classes it finds in `index.html`. If you add pages or script files, add them to `content` in `tailwind.config.js`.
