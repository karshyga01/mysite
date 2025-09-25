import ProductsFilterBar from "@/components/ProductsFilterBar";
import {
  PRODUCTS,
  products,
  type ProductBasic,
  type Product,
} from "@/data/products";
import SimpleProductCard from "@/components/SimpleProductCard";
import VariantProductCard from "@/components/VariantProductCard";

/** Для фильтрации из URL */
type SearchParams = { stone?: string; category?: string; color?: string; q?: string };

/** Объединяем два формата в общий тип (без any) */
type CatalogItem =
  | { type: "basic"; item: ProductBasic }   // плитка/бордюры и т.п.
  | { type: "variant"; item: Product };     // памятники с вариантами

export default function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { stone, category, color, q } = normalizeParams(searchParams);

  // Собираем единый каталог
  const catalog: CatalogItem[] = [
    ...PRODUCTS.map((b) => ({ type: "basic", item: b }) as const),
    ...products.map((m) => ({ type: "variant", item: m }) as const),
  ];

  // Фасеты (значения для фильтров)
  const facets = {
    // камень и цвет только у basic-товаров
    stones: unique(
      PRODUCTS.map((p) => (p.stone || "").trim())
    ).filter(Boolean),
    colors: unique(
      PRODUCTS.map((p) => (p.color || "").trim())
    ).filter(Boolean),
    // категории есть у обоих
    categories: unique([
      ...PRODUCTS.map((p) => (p.category || "").trim()),
      ...products.map((p) => (p.category || "").trim()),
    ]).filter(Boolean),
  };

  // Фильтрация
  const filtered = catalog.filter((ci) => {
    if (ci.type === "basic") {
      const p = ci.item;
      if (stone && norm(p.stone) !== stone) return false;
      if (color && norm(p.color) !== color) return false;
      if (category && norm(p.category) !== category) return false;

      if (q) {
        const hay = `${p.name} ${p.slug} ${p.category} ${p.stone} ${p.color}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    } else {
      const p = ci.item;
      // у памятников нет stone/color — фильтруем только по категории и поиску
      if (category && norm(p.category) !== category) return false;

      if (q) {
        const hay = `${p.title} ${p.slug} ${p.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      // если пользователь выбрал stone/color, такие позиции просто не попадают
      if (stone || color) return false;
      return true;
    }
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8 md:py-10">
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
            {filtered.map((ci) => (
              <li key={ci.type === "basic" ? ci.item.slug : ci.item.slug}>
                {ci.type === "variant" ? (
                  <VariantProductCard product={ci.item} />
                ) : (
                  <SimpleProductCard p={ci.item} />
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
