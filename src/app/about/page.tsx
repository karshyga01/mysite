import { FaInstagram } from "react-icons/fa";

export const metadata = {
  title: "О нас — Tabigi Tas",
  description: "Узнайте больше о компании Tabigi Tas и наших преимуществах.",
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">О нас</h1>

      <p className="text-gray-700 mb-4">
        Мы специализируемся на добыче, обработке и оптовых поставках изделий из
        натурального камня. В работе используем прямые поставки с месторождений и
        собственное производство с опытными мастерами, что позволяет нам
        контролировать каждый этап — от выбора камня до готового изделия.
      </p>

      <p className="text-gray-700 font-semibold mb-2">
        Нашим партнёрам мы гарантируем:
      </p>
      <ul className="list-disc list-inside mb-6 text-gray-700 space-y-1">
        <li>стабильное качество продукции за счёт строгого контроля;</li>
        <li>широкий ассортимент и возможность выполнять заказы разного объёма;</li>
        <li>выгодные условия сотрудничества и прозрачные цены;</li>
        <li>отлаженную логистику и поставки по всему Казахстану.</li>
      </ul>

      <p className="text-gray-700 mb-4">
        Основные направления нашей деятельности — памятники, гранитные плиты,
        бордюры и брусчатка.
      </p>

      <p className="text-gray-700">
        Мы ориентированы на долгосрочные партнёрские отношения и готовы
        обеспечить надёжное снабжение для розничных точек и организаций.
      </p>

      {/* Instagram-блок */}
      <div className="mt-10 border-t pt-6">
        <p className="text-gray-700 mb-3">
          Больше фото и видео с нашего производства вы можете посмотреть в нашем:
        </p>
        <a
          href="https://www.instagram.com/tabigi_tas/?igsh=MXE0OTIxcDQyM3BoMw%3D%3D#"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
        >
          <FaInstagram className="text-2xl" />
          Instagram
        </a>
      </div>
    </div>
  );
}
