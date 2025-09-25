// src/app/products/[slug]/page.tsx
import {
  PRODUCTS,
  products,
  type ProductBasic,
  type Product,
} from "@/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";

type CatalogItem =
  | { type: "basic"; item: ProductBasic }
  | { type: "variant"; item: Product };

function getItem(slug: string): CatalogItem | undefined {
  const v = products.find((p) => p.slug === slug);
  if (v) return { type: "variant", item: v };
  const b = PRODUCTS.find((p) => p.slug === slug);
  if (b) return { type: "basic", item: b };
  return undefined;
}

// SSG для обоих источников
export function generateStaticParams() {
  return [
    ...products.map((p) => ({ slug: p.slug })),
    ...PRODUCTS.map((p) => ({ slug: p.slug })),
  ];
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const ci = getItem(params.slug);
  if (!ci) return notFound();

  if (ci.type === "variant") {
    const p = ci.item; // Product
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">{p.title}</h1>
        {p.subtitle && <p className="text-gray-600 mb-4">{p.subtitle}</p>}
        {p.images?.[0] && (
          <div className="mb-6 overflow-hidden rounded-xl border">
            <Image
              src={p.images[0]}
              alt={p.title}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        )}

        <h2 className="text-xl font-semibold mb-3">Варианты и цены ({p.baseUnit ?? "шт"})</h2>
        <ul className="grid sm:grid-cols-2 gap-3 mb-8">
          {p.variants.map((v) => (
            <li key={v.id} className="flex items-center justify-between rounded-lg border p-3">
              <span>{v.label}</span>
              <span className="font-semibold">{v.price.toLocaleString("ru-RU")} ₸</span>
            </li>
          ))}
        </ul>

        {p.description && <p className="text-gray-700">{p.description}</p>}
      </main>
    );
  }

  // basic (ProductBasic)
  const p = ci.item;
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{p.name}</h1>
      <p className="text-gray-600 mb-4">
        {p.category} · {p.stone} · {p.color}
      </p>

      {p.cover && (
        <div className="mb-6 overflow-hidden rounded-xl border">
          {/* если хочешь, замени на <Image/> */}
          <img src={p.cover} alt={p.name} className="h-auto w-full object-cover" />
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 mb-6 text-sm">
        {p.priceFrom && (
          <div className="rounded-lg border p-3">
            <div className="text-gray-500">Цена</div>
            <div className="font-semibold">{p.priceFrom}</div>
          </div>
        )}
        {p.size && (
          <div className="rounded-lg border p-3">
            <div className="text-gray-500">Размер</div>
            <div className="font-semibold">{p.size}</div>
          </div>
        )}
        {p.surface && (
          <div className="rounded-lg border p-3">
            <div className="text-gray-500">Поверхность</div>
            <div className="font-semibold">{p.surface}</div>
          </div>
        )}
        {p.origin && (
          <div className="rounded-lg border p-3">
            <div className="text-gray-500">Происхождение</div>
            <div className="font-semibold">{p.origin}</div>
          </div>
        )}
      </div>

      {p.description && <p className="text-gray-700">{p.description}</p>}

      {p.gallery && p.gallery.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-8 mb-3">Галерея</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {p.gallery.map((src, i) => (
              <img key={i} src={src} alt={`${p.name} фото ${i + 1}`} className="rounded-lg border" />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
