"use client";

import { useState } from "react";

type Variant = {
  id: number;
  label: string;   // размер (например "100x50x8")
  price: string;   // цена (например "205 000 ₸")
};

type Product = {
  name: string;
  image: string;
  variants: Variant[];
};

export default function VariantProductCard({ product }: { product: Product }) {
  const [active, setActive] = useState(0);

  const current = product.variants[active];

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden max-w-sm">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
        loading="lazy"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>

        {/* Размеры */}
        <div className="mt-3">
          <p className="text-sm text-gray-600 mb-2">Размер</p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {product.variants.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={[
                    "flex items-center justify-center",
                    "rounded-md px-2 py-2 text-sm font-medium border transition min-h-[40px]",
                    selected
                      ? "border-neutral-900 ring-1 ring-neutral-900 bg-white"
                      : "border-neutral-200 hover:border-neutral-400 bg-white",
                  ].join(" ")}
                  aria-pressed={selected}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Цена */}
        <p className="mt-4 text-xl font-semibold text-blue-700">
          {current.price}
        </p>

        {/* Кнопка Заказать */}
        <div className="mt-4">
          <a
            href={`https://wa.me/77001234567?text=Здравствуйте! Интересует товар: ${encodeURIComponent(
              product.name
            )}, размер: ${encodeURIComponent(current.label)}, цена: ${
              current.price
            }`}
            target="_blank"
            rel="noopener"
            className="block w-full text-center px-4 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700 transition"
          >
            Заказать в WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
