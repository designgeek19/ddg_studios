// One-time helper: makes index.html show your real cover images (instead of Unsplash photos) on the project cards and popup,
// and builds the project filter buttons from your own categories (so "Web & Mobile" and "Fintech & AI" can be filtered).
// Run from the project root:   node tools/apply-cover-paths.mjs
// Safe to run twice. It prints what it changed, and anything you must change by hand.
import fs from 'node:fs';
const log = [];
if (!fs.existsSync('index.html')) { console.log('index.html not found. Run this from the project root.'); process.exit(1); }
let s = fs.readFileSync('index.html', 'utf8'); const before = s;

const edits = [
  ['card image address', 'src="https://images.unsplash.com/${imgId}?auto=format&fit=crop&w=700&q=80"', 'src="${coverSrc(imgId, 800)}"'],
  ['card image size', 'width="700" height="438"', 'width="800" height="500"'],
  ['card image fallback', `onerror="this.src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80'"`, 'onerror="this.remove()"'],
  ['filter buttons (now built from your project categories)', "const categories = ['All', 'Design', 'Web', 'App', 'Data', 'Security'];", "const categories = ['All', ...new Set(PROJECTS.map(p => p[1]))];"],
  ['filter button attribute', 'data-cat="${cat}"', 'data-cat="${esc(cat)}"'],
  ['popup tool chips fallback', '(F.tools || STACK[cat]).map(chip)', '(F.tools || STACK[cat] || []).map(chip)'],
  ['popup image', '<img src="https://images.unsplash.com/${img}?auto=format&fit=crop&w=1000&q=80" alt="${esc(t)} preview" class="w-full aspect-[16/8] object-cover" onerror="this.style.display=\'none\'">',
    '<img src="${coverSrc(img, 1000)}" alt="${esc(t)} cover image" width="800" height="500" class="w-full aspect-[16/9] object-cover" onerror="this.style.display=\'none\'">']
];
for (const [label, from, to] of edits) {
  if (s.includes(from)) { s = s.split(from).join(to); log.push(`UPDATED  ${label}`); }
  else if (s.includes(to)) log.push(`ok       ${label} already done`);
  else log.push(`MANUAL   ${label}: not found. Replace the Unsplash address with ${to}`);
}
if (s !== before) fs.writeFileSync('index.html', s);
console.log('\n' + log.join('\n') + '\n\nNext: run  npm run build,  open index.html and check the project cards and popups.');
