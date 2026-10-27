// Builds every case-study page from src/case-studies.mjs.
// Writes:  case-studies/<slug>.html   js/projects.js   and the case-study entries in sitemap.xml
// Run with:  node tools/build-case-studies.mjs   (npm run build does this for you)
import fs from 'node:fs';
import { site, caseStudies } from '../src/case-studies.mjs';

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const LINK = 'hover:text-brand-500 dark:hover:text-emerald-400 transition';
const CARD = 'rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800';
const H2 = 'font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white';
const P = 'mt-4 text-slate-600 dark:text-slate-300 leading-relaxed';
const B = '../';   // pages live in /case-studies/, so shared files are one folder up
const U = 'https://images.unsplash.com/';
const chip = t => `<span class="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">${esc(t)}</span>`;
const tick = '<svg class="w-5 h-5 mt-0.5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clip-rule="evenodd"/></svg>';

const nav = [['Services', 'services'], ['Case Studies', 'work'], ['Process', 'process'], ['Team', 'team'], ['Academy', null], ['FAQ', 'faq']];
const navHref = ([, h]) => (h ? `${B}index.html#${h}` : `${B}academy.html`);
const desktopNav = nav.map(n => `<li><a class="${LINK}" href="${navHref(n)}">${n[0]}</a></li>`).join('');
const mobileNav = nav.map(n => `<a class="py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60" href="${navHref(n)}">${n[0]}</a>`).join('');

const top = `<body class="relative min-h-screen text-slate-800 dark:text-slate-100 font-sans antialiased selection:bg-brand-500 selection:text-white transition-colors duration-300">
<div class="fixed inset-0 -z-20 tech-bg overflow-hidden pointer-events-none" aria-hidden="true"><div class="absolute inset-0 grid-pattern"></div><div class="orb-1 absolute -top-20 right-[5%] w-[32rem] h-[32rem] rounded-full bg-emerald-500/15 dark:bg-emerald-500/10 blur-[110px]"></div><div class="orb-2 absolute top-[35%] -left-[10%] w-[38rem] h-[38rem] rounded-full bg-cyan-500/15 dark:bg-cyan-500/10 blur-[130px]"></div></div>
<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] bg-brand-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-xl">Skip to content</a>
<div id="progress" class="fixed top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 z-[80] w-0"></div>
<header class="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/80">
  <nav class="max-w-[1500px] mx-auto px-5 h-20 flex items-center justify-between" aria-label="Main Navigation">
    <a href="${B}index.html" class="flex items-center gap-3 font-display font-extrabold text-xl tracking-tight"><span class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-500 p-0.5 shadow-md"><span class="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center overflow-hidden"><img src="${B}images/logo.png" alt="" width="24" height="24" class="h-6 w-6 object-contain" onerror="this.remove()"></span></span><span class="text-slate-900 dark:text-white">DDG<span class="text-brand-500 dark:text-emerald-400">Studio</span></span></a>
    <ul class="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">${desktopNav}</ul>
    <div class="flex items-center gap-3">
      <button id="theme" class="h-10 w-10 grid place-items-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition" aria-label="Toggle display theme"><svg class="h-5 w-5 dark:hidden" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg><svg class="h-5 w-5 hidden dark:block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4"/></svg></button>
      <a href="${B}start-project.html" class="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-brand-500/25 transition">Start a Project</a>
      <button id="burger" class="lg:hidden h-10 w-10 grid place-items-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-nav"><svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg></button>
    </div>
  </nav>
  <div id="mobile-nav" class="hidden lg:hidden px-5 pt-2 pb-6 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl"><div class="flex flex-col gap-3 font-medium text-slate-700 dark:text-slate-200">${mobileNav}<a href="${B}start-project.html" class="mt-2 text-center bg-brand-600 text-white font-semibold py-3 rounded-xl shadow-md">Start a Project</a></div></div>
</header>
`;
const bottom = `<footer class="border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/80 backdrop-blur-xl py-12 px-5">
  <div class="max-w-[1400px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
    <div class="lg:col-span-2 space-y-3"><a href="${B}index.html" class="font-display font-extrabold text-lg text-slate-900 dark:text-white">Data &amp; Design Geeks Studio</a><p class="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">Intuitive, resilient web, mobile, data, and security products for fast-growing businesses. Abuja, Nigeria &bull; Worldwide remote.</p></div>
    <nav aria-label="Studio links"><h3 class="font-display font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider text-xs">Studio</h3><ul class="space-y-2.5 text-slate-600 dark:text-slate-400"><li><a href="${B}index.html#work" class="${LINK}">Case Studies</a></li><li><a href="${B}index.html#team" class="${LINK}">Team</a></li><li><a href="${B}academy.html" class="${LINK}">Academy</a></li><li><a href="${B}index.html#faq" class="${LINK}">FAQ</a></li></ul></nav>
    <nav aria-label="Connect"><h3 class="font-display font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider text-xs">Connect</h3><ul class="space-y-2.5 text-slate-600 dark:text-slate-400"><li><a href="${B}start-project.html" class="${LINK}">Start a project</a></li><li><a href="https://wa.me/2348135306540" target="_blank" rel="noopener" class="${LINK}">WhatsApp</a></li><li><a href="https://www.behance.net/DesignGeeksStudio" target="_blank" rel="noopener" class="${LINK}">Behance</a></li><li><a href="https://github.com/designgeek19" target="_blank" rel="noopener" class="${LINK}">GitHub</a></li></ul></nav>
  </div>
  <div class="max-w-[1400px] mx-auto mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400"><p>&copy; <span id="yr">2026</span> Data and Design Geeks Studio (DDGs). All rights reserved.</p><a href="${B}privacy.html" class="hover:underline">Privacy Policy</a></div>
</footer>
<button id="top-btn" class="fixed bottom-6 right-6 h-12 w-12 rounded-2xl bg-gradient-to-r from-brand-600 to-teal-600 text-white shadow-xl shadow-brand-500/30 hidden z-40 place-items-center hover:-translate-y-1 transition" aria-label="Scroll to top"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg></button>
<script src="${B}js/site.js" defer></script>
</body>
</html>
`;

function page(c, i) {
  const next = caseStudies[(i + 1) % caseStudies.length];
  const url = `${site}/case-studies/${c.slug}.html`;
  const title = `${c.title} | Case Study | DDGs`;
  const facts = [['Client', c.client], ['Industry', c.industry], ['Location', c.location], ['Timeline', `${c.duration}, ${c.year}`], ['Our role', c.role], ['Platform', c.platform]]
    .map(([k, v]) => `<div class="p-4 ${CARD}"><dt class="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">${k}</dt><dd class="mt-1 font-semibold text-slate-900 dark:text-white">${esc(v)}</dd></div>`).join('');
  const results = c.results.map(([n, t]) => `<div class="p-6 ${CARD} text-center"><p class="font-display font-extrabold text-3xl sm:text-4xl text-brand-600 dark:text-emerald-400">${esc(n)}</p><p class="mt-2 text-sm text-slate-600 dark:text-slate-300">${esc(t)}</p></div>`).join('');
  const phases = c.phases.map(([t, d], n) => `<li class="p-6 ${CARD}"><span class="font-display font-bold text-brand-600 dark:text-emerald-400">0${n + 1}</span><h3 class="mt-1 font-display font-bold text-lg text-slate-900 dark:text-white">${esc(t)}</h3><p class="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${esc(d)}</p></li>`).join('');
  const screens = (c.screens || []).length ? `<section aria-labelledby="gallery-h"><h2 id="gallery-h" class="${H2}">Inside the product</h2><div class="mt-6 grid sm:grid-cols-2 gap-5">${c.screens.map((s, n) => `<figure class="overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 aspect-[16/10]"><img src="${B}${esc(s)}" alt="${esc(c.title)} screen ${n + 1}" width="1000" height="625" loading="lazy" decoding="async" class="w-full h-full object-cover"></figure>`).join('')}</div></section>` : '';
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: `${c.title}: case study`, description: c.summary, author: { '@type': 'Organization', name: 'Data and Design Geeks Studio' }, publisher: { '@type': 'Organization', name: 'Data and Design Geeks Studio' }, mainEntityOfPage: url });
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(c.summary)}">
${c.verified ? '' : '<meta name="robots" content="noindex, follow">\n'}<meta name="theme-color" content="#0f172a">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Data and Design Geeks Studio">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(c.summary)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site}/images/og-card.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${site}/images/og-card.jpg">
<link rel="icon" href="${B}images/logo.png">
<script type="application/ld+json">${ld}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<script>
  try { const t = localStorage.getItem('ddg-theme'); if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark'); } catch (e) {}
</script>
<link rel="stylesheet" href="${B}css/style.css">
</head>
${top}
<main id="main" class="pt-32 pb-24 px-5"><div class="max-w-5xl mx-auto">
  <nav aria-label="Breadcrumb" class="text-sm text-slate-500 dark:text-slate-400"><a href="${B}index.html" class="${LINK}">Home</a> <span aria-hidden="true">/</span> <a href="${B}index.html#work" class="${LINK}">Case Studies</a> <span aria-hidden="true">/</span> <span>${esc(c.title)}</span></nav>
  <header class="mt-6">
    <span class="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-brand-600 dark:text-emerald-400 border border-emerald-500/20">${esc(c.category)} &bull; ${esc(c.industry)}</span>
    <h1 class="mt-4 font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-slate-900 dark:text-white">${esc(c.title)}</h1>
    <p class="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">${esc(c.summary)}</p>
  </header>
  <figure class="mt-10 overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-brand-600/30 to-cyan-500/30 aspect-[16/8] shadow-2xl"><img src="${U}${c.cover}?auto=format&fit=crop&w=1600&q=80" alt="${esc(c.title)}" width="1600" height="800" fetchpriority="high" decoding="async" class="w-full h-full object-cover" onerror="this.remove()"></figure>
  <dl class="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-4">${facts}</dl>
  <section class="mt-16" aria-labelledby="results-h"><h2 id="results-h" class="sr-only">Key results</h2><div class="grid sm:grid-cols-3 gap-5">${results}</div></section>
  <div class="mt-16 grid lg:grid-cols-12 gap-12">
    <div class="lg:col-span-8 space-y-14">
      <section aria-labelledby="challenge-h"><h2 id="challenge-h" class="${H2}">The challenge</h2>${c.challenge.map(t => `<p class="${P}">${esc(t)}</p>`).join('')}</section>
      <section aria-labelledby="approach-h"><h2 id="approach-h" class="${H2}">Our approach</h2><ol class="mt-6 grid sm:grid-cols-2 gap-4">${phases}</ol></section>
      <section aria-labelledby="solution-h"><h2 id="solution-h" class="${H2}">The solution</h2><p class="${P}">${esc(c.solution)}</p><ul class="mt-6 space-y-3 text-slate-700 dark:text-slate-200">${c.features.map(f => `<li class="flex gap-3">${tick}<span>${esc(f)}</span></li>`).join('')}</ul></section>
      ${screens}
      <section aria-labelledby="outcome-h"><h2 id="outcome-h" class="${H2}">The outcome</h2><p class="${P}">${esc(c.outcome)}</p></section>
      <figure class="p-8 rounded-3xl bg-gradient-to-br from-brand-600 to-teal-700 text-white shadow-xl"><blockquote class="font-display font-bold text-xl sm:text-2xl leading-snug">&ldquo;${esc(c.quote[0])}&rdquo;</blockquote><figcaption class="mt-5 text-sm text-white/85">${esc(c.quote[1])}</figcaption></figure>
    </div>
    <aside class="lg:col-span-4"><div class="lg:sticky lg:top-28 space-y-6">
      <div class="p-6 ${CARD}"><h2 class="font-display font-bold text-slate-900 dark:text-white">Tech &amp; tools</h2><div class="mt-4 flex flex-wrap gap-2">${c.tools.map(chip).join('')}</div></div>
      <div class="p-6 ${CARD}"><h2 class="font-display font-bold text-slate-900 dark:text-white">The team</h2><ul class="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">${c.team.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>
    </div></aside>
  </div>
  <section class="mt-20 p-8 sm:p-12 rounded-3xl bg-slate-900 dark:bg-slate-900/80 border border-white/10 text-white text-center">
    <h2 class="font-display font-extrabold text-3xl sm:text-4xl">Have a similar challenge?</h2>
    <p class="mt-3 text-slate-300 max-w-xl mx-auto">Tell us what you need to build. We reply within one working day with next steps.</p>
    <div class="mt-8 flex flex-wrap justify-center gap-3"><a href="${B}start-project.html" class="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold hover:-translate-y-0.5 transition">Start a project</a><a href="${next.slug}.html" class="px-7 py-3.5 rounded-xl border border-white/30 font-semibold hover:bg-white/10 transition">Next: ${esc(next.title)}</a></div>
  </section>
</div></main>
${bottom}`;
}

fs.mkdirSync('case-studies', { recursive: true });
caseStudies.forEach((c, i) => fs.writeFileSync(`case-studies/${c.slug}.html`, page(c, i)));

// Data used by the home page cards and popup
const out = `/* GENERATED by tools/build-case-studies.mjs from src/case-studies.mjs. Do not edit this file by hand. */
const PROJECTS = ${JSON.stringify(caseStudies.map(c => [c.title, c.category, c.cover, c.summary]), null, 2)};
const CASE_STUDIES = ${JSON.stringify(Object.fromEntries(caseStudies.map(c => [c.title, `case-studies/${c.slug}.html`])), null, 2)};
const PROJECT_FACTS = ${JSON.stringify(Object.fromEntries(caseStudies.map(c => [c.title, { challenge: c.snap[0], solution: c.snap[1], result: c.snap[2], tools: c.tools }])), null, 2)};
`;
fs.mkdirSync('js', { recursive: true });
fs.writeFileSync('js/projects.js', out);

// Sitemap: list only verified case studies, between two marker comments
if (fs.existsSync('sitemap.xml')) {
  let s = fs.readFileSync('sitemap.xml', 'utf8');
  const entries = caseStudies.filter(c => c.verified).map(c => `  <url>\n    <loc>${site}/case-studies/${c.slug}.html</loc>\n    <changefreq>yearly</changefreq>\n    <priority>0.7</priority>\n  </url>`).join('\n');
  const block = `<!-- CASE-STUDIES:START -->\n${entries ? entries + '\n' : ''}  <!-- CASE-STUDIES:END -->`;
  if (s.includes('<!-- CASE-STUDIES:START -->')) s = s.replace(/<!-- CASE-STUDIES:START -->[\s\S]*?<!-- CASE-STUDIES:END -->/, block);
  else {
    s = s.replace(/\s*<!--[^]*?case-study\.html[^]*?-->/, '');   // remove the old commented example
    s = s.replace('</urlset>', `  ${block}\n</urlset>`);
  }
  fs.writeFileSync('sitemap.xml', s);
}
console.log(`Built ${caseStudies.length} case studies (${caseStudies.filter(c => c.verified).length} verified).`);
