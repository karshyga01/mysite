#!/usr/bin/env node
/**
 * Локальный просмотр собранного сайта. Нужен только для проверки на своём
 * компьютере — на хостинге не используется.
 *
 * Запуск:  npm start          (соберёт и поднимет)
 *          node tools/serve.js
 *
 * Открывать сайт двойным щелчком по файлу нельзя: все адреса картинок
 * и стилей начинаются со «/», без сервера браузер их не найдёт и покажет
 * страницу без оформления.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.resolve(__dirname, '..', 'dist');
const PORT = Number(process.env.PORT) || 8901;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
};

if (!fs.existsSync(DIST)) {
  console.error('Нет папки dist — сначала соберите: npm run build');
  process.exit(1);
}

http
  .createServer((req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]);

    // Адреса на сайте оканчиваются слэшем: /granit/ → dist/granit/index.html
    let file = path.join(DIST, rel);
    if (rel.endsWith('/')) file = path.join(file, 'index.html');

    // За пределы dist не выпускаем
    if (!file.startsWith(DIST)) {
      res.writeHead(403).end('Forbidden');
      return;
    }

    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      const notFound = path.join(DIST, '404.html');
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : 'Не найдено');
      return;
    }

    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(fs.readFileSync(file));
  })
  .listen(PORT, () => {
    console.log(`Сайт: http://localhost:${PORT}/`);
    console.log('Остановить — Ctrl+C');
  });
