// app/articles/kak-vybrat-pamyatnik/page.tsx
import Image from "next/image";

export const metadata = {
  title: "Как выбрать памятник: пошаговое руководство для семьи — Tabigi Tas",
  description:
    "Практическое руководство по выбору памятника: виды камня, формы, полировка, сроки и бюджет. Советы от производителя Tabigi Tas.",
  openGraph: {
    title: "Как выбрать памятник: пошаговое руководство для семьи — Tabigi Tas",
    description:
      "Практическое руководство по выбору памятника: виды камня, формы, полировка, сроки и бюджет.",
    type: "article",
    locale: "ru_RU",
    url: "https://example.com/articles/kak-vybrat-pamyatnik",
    images: ["/images/kak-vybrat-pamyatnik-hero.jpg"], // замените на ваш файл
  },
};

export default function ArticlePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      {/* Фото-шапка */}
      <figure className="mb-8 overflow-hidden rounded-2xl border bg-gray-50">
        <Image
          src="/images/kak-vybrat-pamyatnik-hero.jpg" // замените на ваш файл
          alt="Выбор памятника из гранита в Астане"
          width={1600}
          height={900}
          priority
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
        {/* Подпись можно убрать, если не нужна */}
        <figcaption className="px-4 py-3 text-center text-sm text-gray-500">
          Иллюстрация к статье. Материал: гранит.
        </figcaption>
      </figure>

      {/* Заголовок и мета */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Как выбрать памятник: пошаговое руководство для семьи
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Обновлено: <time dateTime="2025-09-23">23 сентября 2025</time> · Tabigi
          Tas
        </p>
      </header>

      {/* Контент (пример — замените своим текстом) */}
      <div className="prose prose-gray max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-600 hover:prose-a:text-blue-700">
        <p>
          В этой статье мы разберём, как выбрать памятник: какой камень подойдёт,
          какие есть формы и полировки, как планировать бюджет и сроки.
        </p>

        <h2 id="kamen">1. Выбор камня</h2>
        <p>
          Для долговечных памятников чаще используют гранит. Он устойчив к
          морозу, влаге и механическим воздействиям, хорошо держит полировку и
          гравировку.
        </p>

        <h2 id="forma">2. Форма и размер</h2>
        <p>
          Классические формы проще и дешевле. Индивидуальные формы требуют
          согласования и увеличивают сроки.
        </p>

        <h2 id="polirovka">3. Полировка и обработка кромок</h2>
        <p>
          Полированная лицевая поверхность улучшает читаемость гравировки, матовые
          края уменьшают заметность загрязнений.
        </p>

        <h2 id="gravirovka">4. Надписи и портрет</h2>
        <p>
          Согласуйте шрифт, размер букв и макет. Портрет лучше делать с
          контрастного фото высокого качества.
        </p>

        <h2 id="sroki-byudzhet">5. Сроки и бюджет</h2>
        <p>
          На изготовление и установку обычно уходит от 10 до 30 дней в зависимости
          от загруженности и сложности.
        </p>

        <hr />

        <p>
          Нужна консультация?{" "}
          <a href="/contacts">Свяжитесь с нами</a> — подберём камень и форму под
          ваш бюджет.
        </p>
      </div>

      {/* JSON-LD для SEO (опционально) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Как выбрать памятник: пошаговое руководство для семьи — Tabigi Tas",
            image: ["/images/kak-vybrat-pamyatnik-hero.jpg"], // замените на ваш файл
            dateModified: "2025-09-23",
            author: { "@type": "Organization", name: "Tabigi Tas" },
            publisher: { "@type": "Organization", name: "Tabigi Tas" },
          }),
        }}
      />
    </article>
  );
}
