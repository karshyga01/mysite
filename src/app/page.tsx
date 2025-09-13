import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
      {/* Левая часть — текст */}
      <div>
     <h1 className="text-4xl font-bold leading-tight">
  Природный камень <br /> для фасадов, дорожек, интерьеров и памятников
</h1>

<p className="mt-4 text-xl italic text-gray-600">
  Природная красота, проверенная временем
</p>

        <p className="mt-4 text-gray-700">
          Гранит Кордай, бордюры, плитка, брусчатка. Производство и поставка по
          Казахстану. Опт и проекты.
        </p>

        <div className="mt-6 flex gap-4">
          <a
            href="/catalog"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Перейти в каталог
          </a>
          <a
            href="/contacts"
            className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
          >
            Рассчитать стоимость
          </a>
        </div>

        <ul className="mt-6 space-y-2 text-gray-700">
          <li>✅ Собственное производство/партнёры</li>
          <li>✅ Скорость: резка и отгрузка в срок</li>
          <li>✅ Доставка по РК, паллетирование</li>
          <li>✅ Документы и образцы</li>
        </ul>
      </div>

      {/* Правая часть — картинка */}
      <div className="relative w-full h-80 md:h-full">
        <Image
          src="/images/granite.jpg" // сохраняем картинку сюда: public/images/granite.jpg
          alt="Гранитные плиты"
          fill
          className="object-cover rounded-xl"
        />
      </div>
    </main>
  );
}
