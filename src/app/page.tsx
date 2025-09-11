import Link from "next/link";

export default function Home() {
  return (
    <section className="grid gap-6 md:grid-cols-2 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Природный камень для фасадов, дорожек и интерьеров
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Гранит Кордай, бордюры, плитка, брусчатка. Производство и поставка по Казахстану. Опт и проекты.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/products" className="rounded-xl bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 transition">
            Перейти в каталог
          </Link>
          <Link href="/contacts" className="rounded-xl border px-5 py-3 font-medium hover:bg-gray-100 transition">
            Рассчитать стоимость
          </Link>
        </div>
        <ul className="mt-8 grid gap-2 text-sm text-gray-700">
          <li>✅ Собственное производство/партнёры</li>
          <li>✅ Скорость: резка и отгрузка в срок</li>
          <li>✅ Доставка по РК, паллетирование</li>
          <li>✅ Документы и образцы</li>
        </ul>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <img src="/images/hero-stone.jpg" alt="Гранитные плиты" className="rounded-xl object-cover w-full h-64" />
      </div>
    </section>
  );
}
