import { products } from "@/data/products";
import SimpleProductCard from "@/components/SimpleProductCard";        // старая карточка без вариантов
import VariantProductCard from "@/components/VariantProductCard";      // новая карточка с размерами/ценами

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Каталог</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) =>
          p.variants && p.variants.length > 0 ? (
            <VariantProductCard key={p.slug} product={p} />
          ) : (
            <SimpleProductCard key={p.slug} p={p} />
          )
        )}
      </div>
    </main>
  );
}
