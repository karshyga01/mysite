/* ===========================================================================
   Tabigi Tas — памятники. Логика сайта.

   1) меню          2) откуда пришёл посетитель   3) аналитика
   4) подборщик     5) форма заявки               6) мелочи интерфейса

   Файл один на весь сайт, подключается с defer.
   =========================================================================== */

var PHONE_WA = '77788762495';

/* --- 1. меню ------------------------------------------------------------ */
function toggleMenu() {
  var menu = document.getElementById('mobileMenu');
  var btn = document.getElementById('burgerBtn');
  if (!menu || !btn) return;
  var open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  var s = btn.querySelectorAll('span');
  if (open) {
    s[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    s[1].style.opacity = '0';
    s[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    for (var i = 0; i < s.length; i++) { s[i].style.transform = ''; s[i].style.opacity = ''; }
  }
}
function closeMenu() {
  var menu = document.getElementById('mobileMenu');
  var btn = document.getElementById('burgerBtn');
  if (!menu || !btn) return;
  menu.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  var s = btn.querySelectorAll('span');
  for (var i = 0; i < s.length; i++) { s[i].style.transform = ''; s[i].style.opacity = ''; }
}

/* --- 2. откуда пришёл посетитель ---------------------------------------
   Источник дописывается в текст заявки WhatsApp — чтобы было видно,
   какая реклама и какая площадка реально приводят заказы.
   ----------------------------------------------------------------------- */
var SRC_KEY = 'tt_src';
var SRC_TTL = 30 * 24 * 60 * 60 * 1000; // помним первый источник 30 дней

function detectSource() {
  var qs;
  try { qs = new URLSearchParams(location.search); } catch (e) { return { s: 'direct', strong: false }; }

  var utm = qs.get('utm_source');
  if (utm) {
    var camp = qs.get('utm_campaign');
    return { s: camp ? utm + '/' + camp : utm, strong: true };
  }
  if (qs.get('gclid'))  return { s: 'google-ads',    strong: true };
  if (qs.get('yclid'))  return { s: 'yandex-direct', strong: true };
  if (qs.get('fbclid')) return { s: 'facebook-ads',  strong: true };

  var ref = document.referrer || '';
  if (!ref) return { s: 'direct', strong: false };
  try {
    var host = new URL(ref).hostname.replace(/^www\./, '');
    if (host === location.hostname.replace(/^www\./, '')) return null; // переход внутри сайта
    if (/google\./.test(host))              return { s: 'google-organic', strong: false };
    if (/yandex\./.test(host))              return { s: 'yandex-organic', strong: false };
    if (/bing\./.test(host))                return { s: 'bing',           strong: false };
    if (/instagram\./.test(host))           return { s: 'instagram',      strong: false };
    if (/facebook\.|fb\./.test(host))       return { s: 'facebook',       strong: false };
    if (/2gis\./.test(host))                return { s: '2gis',           strong: false };
    if (/t\.me|telegram\./.test(host))      return { s: 'telegram',       strong: false };
    if (/tiktok\./.test(host))              return { s: 'tiktok',         strong: false };
    if (/whatsapp\./.test(host))            return { s: 'whatsapp',       strong: false };
    return { s: host, strong: false };
  } catch (e) { return { s: 'direct', strong: false }; }
}

function getSource() {
  var now = Date.now();
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(SRC_KEY) || 'null'); } catch (e) {}
  var d = detectSource();

  if (d) {
    var expired = !saved || !saved.t || (now - saved.t) > SRC_TTL;
    // Рекламной метке верим всегда; безликий direct заменяем, как только узнали источник.
    if (d.strong || expired || (saved && saved.s === 'direct' && d.s !== 'direct')) {
      saved = { s: d.s, t: now };
      try { localStorage.setItem(SRC_KEY, JSON.stringify(saved)); } catch (e) {}
    }
  }
  return (saved && saved.s) ? saved.s : 'direct';
}

function sourceTag() {
  var d = new Date();
  var dd = ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2);
  return '— [ist: ' + getSource() + ' · ' + dd + ']';
}

/* --- 3. аналитика: Яндекс.Метрика, счётчик 111027451 --------------------
   Отчёты: metrika.yandex.ru → Сводка. Очистить METRIKA_ID —
   счётчик просто не загрузится, сайт продолжит работать.
   ----------------------------------------------------------------------- */
var METRIKA_ID = '111027451';

(function initMetrika() {
  if (!METRIKA_ID) return;
  (function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
    m[i].l = 1 * new Date();
    k = e.createElement(t); a = e.getElementsByTagName(t)[0];
    k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
  ym(METRIKA_ID, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
})();

function track(goal, params) {
  try { if (METRIKA_ID && window.ym) ym(METRIKA_ID, 'reachGoal', goal, params || {}); } catch (e) {}
  try { if (window.gtag) gtag('event', goal, params || {}); } catch (e) {}
}

/* Какая именно кнопка WhatsApp сработала — видно в отчётах по параметрам цели. */
function waPlace(el) {
  if (el.closest('.mobile-menu'))  return 'mobile-menu';
  if (el.closest('.mobile-bar'))   return 'mobile-bar';
  if (el.closest('.site-header'))  return 'header';
  if (el.classList.contains('wa-float')) return 'float';
  if (el.closest('.quiz'))         return 'quiz';
  if (el.closest('.cta-band'))     return 'cta';
  if (el.closest('.hero'))         return 'hero';
  if (el.closest('.site-footer'))  return 'footer';
  return 'other';
}

function waLink(text) {
  return 'https://wa.me/' + PHONE_WA + '?text=' + encodeURIComponent(text);
}

/* --- 4. подборщик ------------------------------------------------------- */
var QUIZ = {
  step: 0,
  answers: {},
  questions: [
    {
      key: 'Оформление',
      q: 'Какой памятник нужен?',
      opts: [
        { v: 'Мусульманский (құлпытас)', d: 'Полумесяц, рельеф мечети, арабская вязь, казахский орнамент' },
        { v: 'Христианский', d: 'Крест рельефом или в объёме, растительный узор' },
        { v: 'Без религиозных символов', d: 'Чистая стела, только надпись и даты' },
        { v: 'Пока не решили', d: 'Подскажем, что чаще выбирают' }
      ]
    },
    {
      key: 'Размер',
      q: 'Какой размер плиты?',
      opts: [
        { v: 'Небольшой (70×40 — 90×50 см)', d: 'Обычный выбор для одиночного места' },
        { v: 'Средний (100×50 — 120×55 см)', d: 'Берут чаще всего' },
        { v: 'Крупный (130×60 — 180×60 см)', d: 'Заметная стела, простор для гравировки' },
        { v: 'Не знаю, нужен совет', d: 'Подберём по размеру участка' }
      ]
    },
    {
      key: 'Камень',
      q: 'Какой камень?',
      opts: [
        { v: 'Тёмно-зелёный (Алатагын)', d: 'Редкий цвет, наш карьер' },
        { v: 'Красно-коричневый (Кордайский)', d: 'Тёплый тон, светлая резьба видна издалека' },
        { v: 'Бежево-песочный (Куртинский)', d: 'Спокойный светлый камень' },
        { v: 'Посоветуйте', d: 'Покажем образцы вживую в шоуруме' }
      ]
    }
  ]
};

function quizRender() {
  var box = document.getElementById('quiz');
  if (!box) return;
  var q = QUIZ.questions[QUIZ.step];
  var stepEl = box.querySelector('.quiz__step');
  var resEl = box.querySelector('.quiz__result');

  var bars = box.querySelectorAll('.quiz__progress i');
  for (var i = 0; i < bars.length; i++) bars[i].classList.toggle('on', i <= QUIZ.step);

  if (!q) {
    stepEl.hidden = true;
    resEl.hidden = false;
    var sum = box.querySelector('.quiz__sum');
    sum.innerHTML = '';
    var lines = ['Здравствуйте! Хочу заказать памятник.', ''];
    QUIZ.questions.forEach(function (item) {
      var val = QUIZ.answers[item.key];
      if (!val) return;
      var row = document.createElement('div');
      row.innerHTML = '<span>' + item.key + '</span><span>' + val + '</span>';
      sum.appendChild(row);
      lines.push(item.key + ': ' + val);
    });
    lines.push('', 'Подскажите, пожалуйста, стоимость и сроки.');
    var link = box.querySelector('.quiz__send');
    link.href = waLink(lines.join('\n') + '\n\n' + sourceTag());
    track('quiz_done', QUIZ.answers);
    return;
  }

  resEl.hidden = true;
  stepEl.hidden = false;
  stepEl.querySelector('.quiz__q').textContent = q.q;
  var opts = stepEl.querySelector('.quiz__opts');
  opts.innerHTML = '';
  q.opts.forEach(function (o) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'quiz__opt';
    b.innerHTML = '<b></b><span></span>';
    b.querySelector('b').textContent = o.v;
    b.querySelector('span').textContent = o.d;
    b.addEventListener('click', function () {
      if (QUIZ.step === 0) track('quiz_start');
      QUIZ.answers[q.key] = o.v;
      QUIZ.step++;
      quizRender();
    });
    opts.appendChild(b);
  });
  stepEl.querySelector('.quiz__back').hidden = QUIZ.step === 0;
}

function quizBack() {
  if (QUIZ.step > 0) { QUIZ.step--; quizRender(); }
}
function quizReset() {
  QUIZ.step = 0; QUIZ.answers = {}; quizRender();
}

/* --- 5. форма заявки ----------------------------------------------------
   Бэкенда нет: заявка уходит готовым сообщением в WhatsApp.
   Если окно заблокировано (Instagram, блокировщик) — показываем
   запасной блок со ссылкой и кнопкой «скопировать», заявка не теряется.
   ----------------------------------------------------------------------- */
function handleSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var val = function (n) {
    var el = form.elements[n];
    return el ? String(el.value || '').trim() : '';
  };

  if (val('company')) return;               // ловушка для ботов

  var name = val('name');
  var phone = val('phone');

  var bad = null;
  [['name', name], ['phone', phone]].forEach(function (p) {
    var el = form.elements[p[0]];
    if (!el) return;
    var empty = !p[1] || (p[0] === 'phone' && p[1].replace(/\D/g, '').length < 10);
    el.classList.toggle('is-invalid', empty);
    if (empty && !bad) bad = el;
  });
  if (bad) { bad.focus(); return; }

  var lines = ['Заявка с сайта Tabigi Tas', '', 'Имя: ' + name, 'Телефон: ' + phone];
  [['type', 'Что нужно'], ['size', 'Размер'], ['city', 'Город'], ['comment', 'Комментарий']].forEach(function (p) {
    var v = val(p[0]);
    if (v) lines.push(p[1] + ': ' + v);
  });
  lines.push('', sourceTag());

  var msg = lines.join('\n');
  var url = waLink(msg);

  track('form_submit', { type: val('type') || 'не указано' });

  var btn = form.querySelector('.btn');
  var fallback = document.getElementById('formFallback');
  var fbLink = document.getElementById('fallbackWaLink');
  var copyBtn = document.getElementById('copyLeadBtn');
  if (fbLink) fbLink.href = url;
  if (copyBtn) copyBtn.setAttribute('data-text', msg);

  var win = null;
  try { win = window.open(url, '_blank', 'noopener'); } catch (err) { win = null; }

  if (!win || win.closed || typeof win.closed === 'undefined') {
    if (fallback) {
      fallback.hidden = false;
      fallback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      track('wa_open_blocked');
    }
    return;
  }

  if (btn) {
    var old = btn.textContent;
    btn.textContent = '✓ Открываем WhatsApp…';
    btn.disabled = true;
    setTimeout(function () { btn.textContent = old; btn.disabled = false; }, 5000);
  }
}

/* --- 6. мелочи интерфейса ---------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  var y = document.getElementById('footerYear');
  if (y) y.textContent = new Date().getFullYear();

  // подсветка текущего раздела в шапке и меню
  var here = location.pathname;
  document.querySelectorAll('a[data-nav]').forEach(function (a) {
    var v = a.getAttribute('data-nav');
    if (v === here || (v !== '/' && here.indexOf(v) === 0)) a.classList.add('is-active');
  });

  // источник дописывается во все готовые ссылки WhatsApp + считаем клики
  document.querySelectorAll('a[href*="wa.me/"]').forEach(function (a) {
    var place = waPlace(a);
    try {
      var href = a.getAttribute('href') || '';
      // Дописываем через encodeURIComponent вручную: URLSearchParams кодирует
      // пробел как «+», и в WhatsApp текст пришёл бы слипшимся.
      if (href.indexOf('%5Bist%3A') === -1 && href.indexOf('[ist:') === -1) {
        var i = href.indexOf('text=');
        if (i === -1) {
          a.setAttribute('href', href + (href.indexOf('?') === -1 ? '?' : '&') + 'text=' + encodeURIComponent(sourceTag()));
        } else if (href.indexOf('&', i) === -1) {
          a.setAttribute('href', href + encodeURIComponent('\n\n' + sourceTag()));
        }
      }
    } catch (e) {}
    a.addEventListener('click', function () { track('wa_click', { place: place }); });
  });

  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    a.addEventListener('click', function () { track('phone_click', { place: waPlace(a) }); });
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
    a.addEventListener('click', function () { track('email_click'); });
  });

  var form = document.getElementById('leadForm');
  if (form) {
    var started = false;
    form.addEventListener('input', function () {
      if (!started) { started = true; track('form_start'); }
    });
  }

  var copyBtn = document.getElementById('copyLeadBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.getAttribute('data-text') || '';
      var done = function () {
        copyBtn.textContent = '✓ Скопировано';
        setTimeout(function () { copyBtn.textContent = 'Скопировать текст заявки'; }, 2500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  }

  // подборщик
  if (document.getElementById('quiz')) {
    var back = document.querySelector('.quiz__back');
    if (back) back.addEventListener('click', quizBack);
    var again = document.querySelector('.quiz__again');
    if (again) again.addEventListener('click', quizReset);
    quizRender();
  }

  // мягкое появление блоков при прокрутке
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  // закрываем мобильное меню при клике вне его
  document.addEventListener('click', function (e) {
    var menu = document.getElementById('mobileMenu');
    if (!menu || !menu.classList.contains('open')) return;
    if (menu.contains(e.target) || e.target.closest('#burgerBtn')) return;
    closeMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
});
