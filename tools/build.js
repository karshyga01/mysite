#!/usr/bin/env node
/**
 * Сборка сайта «Tabigi Tas — памятники».
 *
 *   src/partials/*.html   — общие блоки (шапка, подвал, формы)
 *   src/pages/*.html      — содержимое страниц
 *   static/*              — попадает в корень сайта как есть:
 *                           styles.css, app.js, robots.txt, иконки
 *   images/               — фотографии, копируются в dist/images/
 *   dist/                 — результат, его и смотрим в браузере
 *
 * У каждой страницы вверху блок с данными:
 *
 *   <!--meta
 *   { "url": "/musulmanskie-pamyatniki/", "title": "...", "description": "...",
 *     "crumbs": [["Мусульманские памятники", null]], "schema": {...} }
 *   -->
 *
 * Запуск (из корня репозитория): npm run build
 * Правятся ТОЛЬКО src/, static/ и images/ — dist/ перезаписывается.
 */

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const SRC = path.join(REPO, 'src');
const DIST = path.join(REPO, 'dist');
const BASE = 'https://www.tabigitas.kz';

const read = (p) => fs.readFileSync(p, 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const nav = read(path.join(SRC, 'partials/nav.html')).trim();
const footer = read(path.join(SRC, 'partials/footer.html')).trim();

/** {{> имя}} вставляет v2/src/partials/имя.html. Блоки могут вкладываться. */
function includes(html, depth = 0) {
  if (depth > 5) throw new Error('Слишком глубокая вложенность блоков {{> ... }}');
  return html.replace(/\{\{>\s*([a-z0-9_-]+)\s*\}\}/gi, (_, name) => {
    const file = path.join(SRC, 'partials', name + '.html');
    if (!fs.existsSync(file)) throw new Error(`Нет общего блока v2/src/partials/${name}.html`);
    return includes(read(file).trim(), depth + 1);
  });
}

/** Хлебные крошки: видимые ссылки + разметка для поисковика.
 *  На казахских страницах и корень крошек, и его адрес — казахские. */
function breadcrumbs(crumbs, url, lang) {
  if (!crumbs || !crumbs.length) return { html: '', schema: null };

  const root = lang === 'kk' ? ['Басты бет', '/kz/'] : ['Главная', '/'];
  const all = [root, ...crumbs];
  const links = all.map(([name, href], i) => {
    const last = i === all.length - 1;
    return last
      ? `<span aria-current="page">${esc(name)}</span>`
      : `<a href="${href}">${esc(name)}</a>`;
  });

  const html =
    `<nav class="crumbs" aria-label="Хлебные крошки">\n    ` +
    links.join('\n    <span class="crumbs-sep">/</span>\n    ') +
    `\n  </nav>`;

  const schema = {
    '@type': 'BreadcrumbList',
    itemListElement: all.map(([name, href], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: BASE + (i === all.length - 1 ? url : href),
    })),
  };
  return { html, schema };
}

/** Организация — один раз описана здесь, все страницы ссылаются на неё по @id.
 *  Так поисковик понимает, что это одна и та же компания на всём сайте. */
const ORG = {
  '@type': ['LocalBusiness', 'Store'],
  '@id': BASE + '/#org',
  name: 'Tabigi Tas',
  alternateName: ['Табиғи тас', 'Tabigi Tas — памятники из гранита'],
  description:
    'Изготовление памятников и надгробий из казахстанского гранита: мусульманские құлпытас, ' +
    'христианские памятники, гравировка и резьба по камню. Собственный карьер и цех в Кордае, ' +
    'шоурум в Алматы, установка и доставка по Казахстану.',
  url: BASE + '/',
  telephone: '+77788762495',
  email: 'dias.akhmetbek2008@gmail.com',
  currenciesAccepted: 'KZT',
  paymentAccepted: 'Наличные, безналичный расчёт, перевод',
  image: [
    BASE + '/images/pamyatnik-musulmanskiy-mechet-minaret-krasnyy-granit.jpg',
    BASE + '/images/pamyatnik-kazahskiy-ornament-polumesyats-granit.jpg',
    BASE + '/images/pamyatniki-kulpytas-gotovye-raboty-tseh.jpg',
  ],
  logo: BASE + '/apple-touch-icon.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Промышленная, 14',
    addressLocality: 'Алматы',
    addressRegion: 'Алматы',
    addressCountry: 'KZ',
  },
  areaServed: [
    { '@type': 'Country', name: 'Казахстан' },
    { '@type': 'City', name: 'Алматы' },
  ],
  knowsLanguage: ['ru', 'kk'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
};

function page({ meta, body }) {
  const url = meta.url;
  const canonical = BASE + url;
  const ogImage = BASE + (meta.image || '/images/pamyatnik-kazahskiy-ornament-polumesyats-granit.jpg');
  const lang = meta.lang || 'ru';
  const { html: crumbHtml, schema: crumbSchema } = breadcrumbs(meta.crumbs, url, lang);

  // Вся разметка страницы — один граф. Организация лежит в нём всегда,
  // остальное ссылается на неё через @id, а не дублирует.
  const graph = [ORG];
  if (crumbSchema) graph.push(crumbSchema);
  if (meta.schema) graph.push(...(Array.isArray(meta.schema) ? meta.schema : [meta.schema]));
  const ld =
    `\n  <script type="application/ld+json">\n  ` +
    JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replace(/\n/g, '\n  ') +
    `\n  </script>\n`;

  const noindex = meta.noindex
    ? '\n  <meta name="robots" content="noindex, follow" />'
    : '\n  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />';

  // Русская и казахская версии страницы указывают друг на друга.
  const alt = meta.altLang
    ? `\n  <link rel="alternate" hreflang="${lang === 'ru' ? 'kk' : 'ru'}" href="${BASE}${meta.altLang}" />` +
      `\n  <link rel="alternate" hreflang="${lang}" href="${canonical}" />` +
      `\n  <link rel="alternate" hreflang="x-default" href="${BASE}${lang === 'ru' ? url : meta.altLang}" />`
    : '';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(meta.title)}</title>
  <meta name="description" content="${esc(meta.description)}" />${noindex}
  <link rel="canonical" href="${canonical}" />${alt}
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon-32.png" type="image/png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta name="theme-color" content="#12100e" />
  <meta name="author" content="Tabigi Tas" />
  <meta name="geo.region" content="KZ-ALA" />
  <meta name="geo.placename" content="Алматы" />

  <meta property="og:type" content="${meta.ogType || 'website'}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:site_name" content="Tabigi Tas — памятники из гранита" />
  <meta property="og:title" content="${esc(meta.ogTitle || meta.title)}" />
  <meta property="og:description" content="${esc(meta.ogDescription || meta.description)}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:alt" content="${esc(meta.imageAlt || 'Памятник из гранита работы Tabigi Tas')}" />
  <meta property="og:locale" content="${lang === 'kk' ? 'kk_KZ' : 'ru_RU'}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(meta.ogTitle || meta.title)}" />
  <meta name="twitter:description" content="${esc(meta.ogDescription || meta.description)}" />
  <meta name="twitter:image" content="${ogImage}" />
${ld}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body${meta.bodyClass ? ` class="${meta.bodyClass}"` : ''}>
<a class="skip-link" href="#main">Перейти к содержанию</a>

${nav}

<main id="main">
${crumbHtml ? '<div class="crumbs-wrap">\n  ' + crumbHtml + '\n</div>\n\n' : ''}${body.trim()}
</main>

${footer}

<script src="/app.js" defer></script>

</body>
</html>
`;
}

// --- очистка и копирование статики ---
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const a = path.join(from, e.name);
    const b = path.join(to, e.name);
    if (e.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}

// static/ ложится в корень сайта как есть — там же иконки и robots.txt.
copyDir(path.join(REPO, 'static'), DIST);
copyDir(path.join(REPO, 'images'), path.join(DIST, 'images'));

// --- сборка страниц ---
const files = fs.readdirSync(path.join(SRC, 'pages')).filter((f) => f.endsWith('.html')).sort();
let built = 0;
const urls = new Set();

for (const file of files) {
  const raw = read(path.join(SRC, 'pages', file));
  const m = raw.match(/^<!--meta\n([\s\S]*?)\n-->\n?/);
  if (!m) {
    console.error(`  ПРОПУЩЕНА ${file}: нет блока <!--meta ... -->`);
    process.exitCode = 1;
    continue;
  }

  let meta;
  try {
    meta = JSON.parse(m[1]);
  } catch (e) {
    console.error(`  ОШИБКА в ${file}: блок meta — не JSON. ${e.message}`);
    process.exitCode = 1;
    continue;
  }

  if (urls.has(meta.url)) {
    console.error(`  ОШИБКА: адрес ${meta.url} занят дважды (${file})`);
    process.exitCode = 1;
    continue;
  }
  urls.add(meta.url);

  const body = includes(raw.slice(m[0].length));
  const html = page({ meta, body });

  let out;
  if (meta.url === '/') out = path.join(DIST, 'index.html');
  else if (meta.url.endsWith('.html')) out = path.join(DIST, meta.url.slice(1));
  else out = path.join(DIST, meta.url.slice(1), 'index.html');

  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  built++;
  console.log(`  ${meta.url.padEnd(40)} ← ${file}`);
}

console.log(`\nСобрано страниц: ${built}`);
