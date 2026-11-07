// One-time helper: renames the brand across the whole project.
//   Full name:     Data & Design Geeks Tech Studio
//   Short name:    DDGTech Studio
//   Abbreviation:  DDGs (unchanged)
//   Academy:       DDGTech Academy
//   Social:        Instagram @ddgtech_studio, TikTok @ddgtech_studio, Facebook "Data & Design Geeks"
// Run from the project root:   node tools/apply-rebrand.mjs
// Safe to run twice (and safe if you ran an earlier version). It prints what changed in each file.
// Then run  npm run build,  check the site, commit and push.
import fs from 'node:fs';

const FULL_HTML = 'Data &amp; Design Geeks Tech Studio';   // for HTML text and attributes
const FULL = 'Data & Design Geeks Tech Studio';           // for JSON, JavaScript strings and Markdown
const SHORT = 'DDGTech Studio';
const ACADEMY = 'DDGTech Academy';
const INSTAGRAM = 'https://www.instagram.com/ddgtech_studio/';
const TIKTOK = 'https://www.tiktok.com/@ddgtech_studio';
const OLD_NAME = /Data (?:and|&amp;|&) Design Geeks Studios?/g;
const OLD_ACADEMY = /\bDDGs? Academy\b/g;

const report = [];
function edit(file, fn) {
  if (!fs.existsSync(file)) return;
  const before = fs.readFileSync(file, 'utf8');
  const after = fn(before);
  if (after !== before) { fs.writeFileSync(file, after); report.push(`UPDATED  ${file}`); }
}

const markup = file => edit(file, s => {
  // 1. JSON-LD blocks: plain ampersand (not &amp;), short name, and the Instagram and TikTok profiles
  s = s.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (m, a, body, c) => {
    body = body.replace(OLD_NAME, FULL);
    body = body.replace('"alternateName": "DDGs",', `"alternateName": ["${SHORT}", "DDGs"],`);
    body = body.replace(/instagram\.com\/DDGTech_Studio/g, 'instagram.com/ddgtech_studio');   // earlier version used capitals
    if (body.includes('"sameAs": [')) {
      if (!body.includes('instagram.com/ddgtech_studio')) {
        body = body.replace(/("https:\/\/www\.facebook\.com\/people\/Data-Design-Geeks\/100063655043554\/")(\s*\])/, `$1,\n    "${INSTAGRAM}"$2`);
      }
      if (!body.includes('tiktok.com/@ddgtech_studio') && body.includes(`"${INSTAGRAM}"`)) {
        body = body.replace(`"${INSTAGRAM}"`, `"${INSTAGRAM}",\n    "${TIKTOK}"`);
      }
    }
    return a + body + c;
  });
  //    ...and the JavaScript objects in the case-study page generator that become JSON-LD
  s = s.replace(/name: 'Data (?:and|&) Design Geeks Studios?'/g, `name: '${FULL}'`);
  // 2. Header and footer wordmark: DDG + Studio  ->  DDGTech + Studio (&nbsp; keeps the space in flex layouts)
  s = s.replace(/DDG(?:Tech(?:&nbsp;| )?)?(<span class="text-brand-500 dark:text-emerald-400">Studio<\/span>)/g, 'DDGTech&nbsp;$1');
  // 3. Full name, short name and Academy name in page text
  s = s.replace(OLD_NAME, FULL_HTML);
  s = s.replace(/\bDDG Studio\b(?!s)/g, SHORT);
  s = s.replace(OLD_ACADEMY, ACADEMY);
  // 4. Instagram links written with capitals by an earlier version of this script
  s = s.replace(/instagram\.com\/DDGTech_Studio/g, 'instagram.com/ddgtech_studio');
  // 5. Footer links: Instagram before Behance, then TikTok right after Instagram
  if (/<li><a href="https:\/\/www\.behance/.test(s) && !s.includes('>Instagram</a>')) {
    s = s.replace(/<li><a href="https:\/\/www\.behance\.net\/DesignGeeksStudio"([^>]*)>Behance<\/a><\/li>/, (m, attrs) => `<li><a href="${INSTAGRAM}"${attrs}>Instagram</a></li>${m}`);
  }
  if (s.includes('>Instagram</a>') && !s.includes('>TikTok</a>')) {
    s = s.replace(/(<li><a href="https:\/\/www\.instagram\.com\/[^"]*")([^>]*)>Instagram<\/a><\/li>/, (m, a, attrs) => `${m}<li><a href="${TIKTOK}"${attrs}>TikTok</a></li>`);
  }
  return s;
});

// Plain-text files (scripts, Markdown, JSON): ampersands stay as "&"
const plain = file => edit(file, s => s
  .replace(OLD_NAME, FULL)
  .replace(OLD_ACADEMY, ACADEMY)
  .replace(/\[DDG Project Brief\]/g, `[${SHORT.split(' ')[0]} Project Brief]`));   // email subject line of the project brief form

const root = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const cases = fs.existsSync('case-studies') ? fs.readdirSync('case-studies').filter(f => f.endsWith('.html')).map(f => `case-studies/${f}`) : [];
[...root, ...cases, 'tools/build-case-studies.mjs'].forEach(markup);

edit('privacy.html', s => s
  .replace('(&ldquo;DDGs&rdquo;,', `(&ldquo;${SHORT}&rdquo;, &ldquo;DDGs&rdquo;,`)
  .replace(/Last updated: [A-Za-z]+ \d{1,2}, \d{4}/, `Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`));   // today's date
['README.md', 'CASE-STUDIES.md', 'FORM-SETUP.md', 'package.json', 'js/academy.js', 'js/brief.js', 'js/forms.js'].forEach(plain);
edit('README.md', s => s.replace(/^# DDG-STUDIOS/m, `# ${SHORT}`));

const left = [];
for (const f of [...root, ...cases, 'tools/build-case-studies.mjs', 'README.md', 'package.json', 'js/academy.js', 'js/brief.js', 'js/forms.js']) {
  if (!fs.existsSync(f)) continue;
  const s = fs.readFileSync(f, 'utf8');
  if (new RegExp(OLD_NAME.source).test(s) || new RegExp(OLD_ACADEMY.source).test(s) || /DDG<span/.test(s) || /DDGTech <span/.test(s)) left.push(f);
}
console.log('\n' + (report.join('\n') || 'Nothing to change (already done).'));
console.log(left.length ? `\nCHECK BY HAND: old name still found in: ${left.join(', ')}` : '\nNo old brand or Academy name left in pages, scripts, README or package.json.');
console.log('\nNext: run  npm run build,  open the site, then commit and push.');
