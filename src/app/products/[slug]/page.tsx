import { PRODUCTS } from "@/data/products";
import type { Product } from "@/data/products";
import Link from "next/link";

export function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }));
}

function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Товар не найден</h1>
        <Link href="/products" className="underline mt-4 inline-block">Вернуться в каталог</Link>
      </div>
    );
  }

  return (
    <article className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3">
        <img src={p.cover} alt={p.name} className="rounded-2xl border" />
        {p.gallery?.length ? (
          <div className="grid grid-cols-3 gap-2">
            {p.gallery.map((src) => (
              <img key={src} src={src} alt={p.name} className="rounded-xl border h-24 w-full object-cover" />
            ))}
          </div>
        ) : null}
      </div>

      <div>
        <h1 className="text-3xl font-bold">{p.name}</h1>
        <p className="mt-2 text-gray-700">{p.description}</p>

        <ul className="mt-4 grid gap-1 text-sm text-gray-700">
          <li><span className="text-gray-500">Камень:</span> {p.stone}</li>
          <li><span className="text-gray-500">Категория:</span> {p.category}</li>
          {p.size && <li><span className="text-gray-500">Размер:</span> {p.size}</li>}
          {p.surface && <li><span className="text-gray-500">Обработка:</span> {p.surface}</li>}
          {p.color && <li><span className="text-gray-500">Цвет:</span> {p.color}</li>}
          {p.origin && <li><span className="text-gray-500">Месторождение:</span> {p.origin}</li>}
          {p.frost && <li><span className="text-gray-500">Морозостойкость:</span> {p.frost}</li>}
          {p.density && <li><span className="text-gray-500">Плотность:</span> {p.density}</li>}
          {p.waterAbsorption && <li><span className="text-gray-500">Водопоглощение:</span> {p.waterAbsorption}</li>}
        </ul>

        <p className="mt-4 text-xl font-semibold text-blue-700">{p.priceFrom}</p>

        <div className="mt-6 flex gap-3">
          <a
            href={`https://wa.me/77001234567?text=Здравствуйте! Интересует: ${encodeURIComponent(p.name)}`}
            target="_blank" rel="noopener"
            className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 transition"
          >
            Заказать в WhatsApp
          </a>
          <a
            href="https://t.me/your_username"
            target="_blank" rel="noopener"
            className="inline-flex items-center rounded-xl border px-5 py-3 font-medium hover:bg-gray-100 transition"
          >
            Написать в Telegram
          </a>
        </div>

        <Link href="/products" className="underline mt-6 inline-block">← Назад к каталогу</Link>
      </div>
    </article>
  );
}
