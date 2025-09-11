export default function Services() {
  const items = [
    { name: "Сайт-визитка", price: "от 100 000 ₸", desc: "Лаконичный сайт: главная, услуги, контакты." },
    { name: "Блог/портфолио", price: "от 150 000 ₸", desc: "Страницы проектов и статьи с SEO." },
    { name: "SEO-настройка", price: "от 40 000 ₸", desc: "Title/description, sitemap, скорость, аналитика." },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold">Услуги</h1>
      <p className="mt-2 text-gray-700">Подберём решение под вашу задачу и бюджет.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((i) => (
          <div key={i.name} className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold">{i.name}</h3>
            <p className="text-gray-700">{i.desc}</p>
            <p className="mt-2 font-medium text-blue-700">{i.price}</p>
          </div>
        ))}
      </div>
    </>
  );
}
