#!/usr/bin/env node
/**
 * Карты сайта. Читает уже собранные страницы в dist/ и кладёт туда же:
 *
 *   sitemap.xml         — страницы
 *   sitemap-images.xml  — фотографии с подписями (поиск по картинкам)
 *
 * Подписи берутся из alt и из <figcaption> рядом с фотографией —
 * поэтому карта никогда не расходится с тем, что реально на странице.
 *
 * Запуск (из корня репозитория): npm run build
 * Запускать ПОСЛЕ tools/build.js — он читает готовый dist/.
 */

const fs = require('fs');
const path = require('path');

const DIST = path.resolve(__dirname, '..', 'dist');
const BASE = 'https://www.tabigitas.kz';
const SKIP_DIRS = new Set(['images']);

if (!fs.existsSync(DIST)) {
  console.error('Нет папки dist — сначала запустите npm run build');
  process.exit(1);
}

/** Приоритет и частота обхода по разделам. */
function meta(url) {
  if (url === '/') return { priority: '1.0', freq: 'weekly' };
  if (url === '/raboty/' || url.startsWith('/musulmanskie') || url === '/kulpytas/' || url.startsWith('/hristianskie'))
    return { priority: '0.9', freq: 'weekly' };
  if (url.startsWith('/granit/') || url === '/gravirovka/' || url === '/razmery-i-formy/')
    return { priority: '0.8', freq: 'monthly' };
  if (url.startsWith('/stati/')) return { priority: '0.6', freq: 'monthly' };
  if (url.startsWith('/kz/')) return { priority: '0.7', freq: 'monthly' };
  return { priority: '0.7', freq: 'monthly' };
}

function findHtml(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) findHtml(full, out);
    } else if (e.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function toUrl(file) {
  let rel = path.relative(DIST, file).split(path.sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'index.html'.length);
  return '/' + rel;
}

const today = new Date().toISOString().slice(0, 10);
const pages = [];

for (const file of findHtml(DIST)) {
  const html = fs.readFileSync(file, 'utf8');

  if (/<meta\s+name=["']robots["'][^>]*noindex/i.test(html)) continue;
  // технические файлы вроде подтверждения прав в Search Console
  if (html.length < 400 && !/<title/i.test(html)) continue;

  const url = toUrl(file);
  const images = [];
  const seen = new Set();

  // Путь бывает и относительным, и от корня — ловим оба варианта.
  const imgRe = /<img\s+[^>]*src="\/?(images\/[^"]+\.jpg)"[^>]*?alt="([^"]*)"[^>]*>/g;
  let m;
  while ((m = imgRe.exec(html)) !== null) {
    const loc = BASE + '/' + m[1];
    if (seen.has(loc)) continue;
    seen.add(loc);

    let caption = '';
    const cap = html.slice(m.index, m.index + 1200).match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/);
    if (cap) {
      caption = cap[1]
        .replace(/<b>/g, '')
        .replace(/<\/b>/g, ' — ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }
    images.push({ loc, title: m[2], caption });
  }
  pages.push({ url, images });
}

pages.sort((a, b) => (a.url === '/' ? -1 : b.url === '/' ? 1 : a.url.localeCompare(b.url)));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

let sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const p of pages) {
  const { priority, freq } = meta(p.url);
  sm += `  <url>\n    <loc>${BASE}${p.url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
}
sm += '</urlset>\n';
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sm);

let si =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
let imgCount = 0;
for (const p of pages) {
  if (!p.images.length) continue;
  si += `  <url>\n    <loc>${BASE}${p.url}</loc>\n`;
  for (const img of p.images) {
    si += `    <image:image>\n      <image:loc>${esc(img.loc)}</image:loc>\n      <image:title>${esc(img.title)}</image:title>\n`;
    if (img.caption) si += `      <image:caption>${esc(img.caption)}</image:caption>\n`;
    si += `    </image:image>\n`;
    imgCount++;
  }
  si += '  </url>\n';
}
si += '</urlset>\n';
fs.writeFileSync(path.join(DIST, 'sitemap-images.xml'), si);

console.log(`sitemap.xml — страниц: ${pages.length}`);
for (const p of pages) console.log(`    ${p.url.padEnd(42)} картинок: ${p.images.length}`);
console.log(`sitemap-images.xml — картинок: ${imgCount}`);
