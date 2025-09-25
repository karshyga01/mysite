// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-6 py-12 grid items-center gap-10 md:grid-cols-2">
      {/* Левая колонка — текст */}
      <div>
        <h1 className="text-4xl font-bold leading-tight">
          Изделия из натурального камня для памятников и строительства
        </h1>

        <p className="mt-4 text-lg text-gray-700">
          Памятники, гранитные плиты, бордюры и брусчатка. Собственное
          производство и поставки по всему Казахстану.
        </p>

        {/* CTA-кнопки */}
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/contacts"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            aria-label="Рассчитать стоимость"
          >
            Рассчитать стоимость
          </Link>

          <Link
            href="/products"
            className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            aria-label="Перейти в каталог"
          >
            Перейти в каталог
          </Link>
        </div>

        {/* Преимущества */}
        <ul className="mt-8 space-y-2 text-gray-800">
          <li className="flex items-start gap-2">
            <span className="text-xl leading-6">🏭</span>
            <span>Собственное производство</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-xl leading-6">🚚</span>
            <span>Доставка по всему Казахстану</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-xl leading-6">⏱</span>
            <span>Сроки и точность отгрузки</span>
          </li>
        </ul>
      </div>

      {/* Правая колонка — изображение */}
      <div className="relative w-full h-80 md:h-[480px]">
        <Image
          src="/images/granite.jpg" // помести файл в public/images/granite.jpg
          alt="Гранит: изделия и фактура камня"
          fill
          className="object-cover rounded-xl shadow-sm"
          priority
        />
      </div>
    </main>
  );
}
