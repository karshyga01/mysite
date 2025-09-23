// src/app/products/page.tsx
import ProductsFilterBar from "@/components/ProductsFilterBar";
import { products } from "@/data/products";
import SimpleProductCard from "@/components/SimpleProductCard";        // старая карточка без вариантов (prop: p)
import VariantProductCard from "@/components/VariantProductCard";      // новая карточка с размерами/ценами (prop: product)

type SearchParams = {
  stone?: string;
  category?: string;
  color?: string;
  q?: string;
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { stone, category, color, q } = normalizeParams(searchParams);

  // Фасеты (уникальные значения)
  const facets = {
    stones: unique(products.map((p) => (p.stone || "").trim())).filter(Boolean),
    categories: unique(products.map((p) => (p.category || "").trim())).filter(Boolean),
    colors: unique(products.map((p) => (p.color || "").trim())).filter(Boolean),
  };

  // Фильтрация по URL-параметрам
  const filtered = products.filter((p) => {
    if (stone && norm(p.stone) !== stone) return false;
    if (category && norm(p.category) !== category) return false;
    if (color && norm(p.color) !== color) return false;

    if (q) {
      const hay = `${p.name} ${p.slug} ${p.category} ${p.stone} ${p.color}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  return (
    // === Шаг 1: обновили оболочку страницы (фон + отступы) ===
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8 md:py-10">
        {/* Заголовок стал крупнее и плотнее */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
          Каталог
        </h1>

        <div className="mb-6">
          <ProductsFilterBar
            facets={facets}
            selected={{ stone, category, color, q }}
            total={filtered.length}
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-600">По вашему запросу ничего не найдено.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((p) => (
              <li key={p.slug}>
                {"variants" in p && p.variants?.length ? (
                  <VariantProductCard product={p as any} />
                ) : (
                  <SimpleProductCard p={p as any} />
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

/* ---------- helpers ---------- */
function unique(arr: string[]) {
  return Array.from(new Set(arr.map(norm)));
}
function norm(s?: string) {
  return (s ?? "").trim().toLowerCase();
}
function normalizeParams(sp: SearchParams) {
  const stone = sp.stone ? norm(sp.stone) : undefined;
  const category = sp.category ? norm(sp.category) : undefined;
  const color = sp.color ? norm(sp.color) : undefined;
  const q = sp.q ? sp.q.toLowerCase() : undefined;
  return { stone, category, color, q };
}
