import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";

export const metadata = {
  title: "Каталог природного камня — MySite",
  description: "Гранит, бордюр, плитка. Поставки по Казахстану. Опт/розница.",
};

export default function ProductsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Каталог</h1>
      <p className="mt-2 text-gray-700">
        В наличии и под заказ. Цены зависят от объёма и обработки — уточняйте.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>
    </>
  );
}

