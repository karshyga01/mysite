import Link from "next/link";
import type { Product } from "@/data/products";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      <img
        src={p.cover}
        alt={p.name}
        className="h-48 w-full object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-semibold">{p.name}</h3>
        <p className="text-sm text-gray-600 mt-1 capitalize">
          {p.stone} • {p.category} • {p.color}
        </p>
        <p className="mt-2 font-medium text-blue-700">{p.priceFrom}</p>
        <div className="mt-4 flex gap-2">
          <Link
            href={`/products/${p.slug}`}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
          >
            Подробнее
          </Link>
          <a
            href={`https://wa.me/77001234567?text=Здравствуйте! Интересует товар: ${encodeURIComponent(p.name)}`}
            target="_blank" rel="noopener"
            className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-100 transition"
          >
            Заказать в WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
