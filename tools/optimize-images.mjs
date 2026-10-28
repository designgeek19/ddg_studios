// Makes web-ready versions of your project cover images.
// For every  images/projects/<name>-cover.png|jpg  it writes:
//   <name>-cover.webp       full size for the case-study page (max 1600px wide)
//   <name>-cover-card.webp  800 x 500 for the home-page cards and popups
//   <name>-cover-og.jpg     1200 x 630 for social sharing (WhatsApp, LinkedIn, X)
//   sizes.json              image sizes, so the pages don't jump while loading
// Your original file is never changed. Run it with:  npm run images   (add --force to redo everything)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = 'images/projects';
const force = process.argv.includes('--force');
const kb = f => `${Math.round(fs.statSync(f).size / 1024)} KB`;

// Fit the whole picture inside the frame, on a soft blurred copy of itself, so nothing important is cropped.
async function framed(input, w, h) {
  const bg = await sharp(input).resize(w, h, { fit: 'cover' }).blur(40).modulate({ brightness: 0.92 }).toBuffer();
  const fg = await sharp(input).resize(w, h, { fit: 'inside' }).toBuffer();
  return sharp(bg).composite([{ input: fg, gravity: 'centre' }]);
}

if (!fs.existsSync(dir)) { console.error(`Folder not found: ${dir}`); process.exit(1); }
const sizesFile = path.join(dir, 'sizes.json');
const sizes = fs.existsSync(sizesFile) ? JSON.parse(fs.readFileSync(sizesFile, 'utf8')) : {};
const sources = fs.readdirSync(dir).filter(f => /-cover\.(png|jpe?g)$/i.test(f)).sort();
if (!sources.length) console.log('No *-cover.png or *-cover.jpg files found in images/projects/');

for (const f of sources) {
  const base = f.replace(/\.(png|jpe?g)$/i, '');
  const input = path.join(dir, f);
  const page = path.join(dir, `${base}.webp`), card = path.join(dir, `${base}-card.webp`), og = path.join(dir, `${base}-og.jpg`);
  const fresh = p => fs.existsSync(p) && fs.statSync(p).mtimeMs >= fs.statSync(input).mtimeMs;
  if (!force && fresh(page) && fresh(card) && fresh(og) && sizes[`${base}.webp`]) { console.log(`ok       ${f} (up to date)`); continue; }

  const flat = () => sharp(input).rotate().flatten({ background: '#ffffff' });
  const info = await flat().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(page);
  sizes[`${base}.webp`] = { width: info.width, height: info.height };
  await (await framed(await flat().toBuffer(), 800, 500)).webp({ quality: 78 }).toFile(card);
  await (await framed(await flat().toBuffer(), 1200, 630)).jpeg({ quality: 84, mozjpeg: true }).toFile(og);
  console.log(`DONE     ${f} (${kb(input)}) -> page ${kb(page)}, card ${kb(card)}, share ${kb(og)}`);
}
fs.writeFileSync(sizesFile, JSON.stringify(sizes, null, 2) + '\n');
