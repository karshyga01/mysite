

export const metadata = {
  title: "О нас — Tabigi Tas",
  description: "Узнайте больше о компании Tabigi Tas и наших преимуществах.",
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">О нас</h1>
      <p className="text-gray-700 mb-4">
        <strong>Tabigi Tas — природный камень для вашего дома и бизнеса.</strong>
      </p>
      <p className="text-gray-700 mb-4">
        Наша компания специализируется на добыче, обработке и продаже природного камня.
        Мы предлагаем гранит, бордюры, брусчатку и плиты высокого качества по доступным ценам.
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>✅ Работаем по всему Казахстану.</li>
        <li>✅ Прямые поставки с месторождения — без посредников.</li>
        <li>✅ Доставка и индивидуальный расчёт для каждого клиента.</li>
      </ul>
      <p className="text-gray-700">
        Мы ценим доверие наших клиентов и гарантируем качество каждого изделия.
      </p>
    </div>
  );
}

