// src/components/VariantProductCard.tsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import ColorSwatch from "@/components/ColorSwatch";
import type { Product, ProductVariant } from "@/data/products";

type Props = { product: Product };

export default function VariantProductCard({ product }: Props) {
  const [idx, setIdx] = useState(0);

  const variants = useMemo(
    () => (product.variants ?? []).map((v: ProductVariant) => ({ _label: v.label, price: v.price })),
    [product.variants]
  );

  const current = variants[idx];

  return (
    <article className="group rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative aspect-[4/3]">
        <Image
          src={product.images?.[0] || "/images/placeholder.jpg"}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 border text-xs px-2 py-1">
          {capitalize(product.category)}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2.5">
        <h3 className="font-semibold text-base leading-tight group-hover:underline">{product.title}</h3>

        <p className="text-sm text-gray-600">
          {[capitalize(product.stone), capitalize(product.category), capitalize(product.color)]
            .filter(Boolean)
            .join(" • ")}
        </p>

        <div className="mt-1">{product.color && <ColorSwatch name={product.color} />}</div>

        {variants.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {variants.map((opt, i) => (
              <button
                key={`${opt._label}-${i}`}
                onClick={() => setIdx(i)}
                className={`text-sm font-medium rounded-lg border px-4 py-2 transition whitespace-nowrap min-w-[112px] text-center ${
                  i === idx ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-800 hover:bg-gray-50 border-gray-300"
                }`}
                aria-pressed={i === idx}
                title={opt._label}
              >
                {opt._label.replace(/x/gi, "×").trim()}
              </button>
            ))}
          </div>
        )}

        <div className="mt-1">
          <span className="text-sm text-gray-500">Цена:</span>{" "}
          <span className="text-lg font-bold">
            {current?.price
              ? new Intl.NumberFormat("ru-RU", { style: "currency", currency: "KZT", maximumFractionDigits: 0 }).format(current.price)
              : product.baseUnit
              ? `— / ${product.baseUnit}`
              : "—"}
          </span>
        </div>
      </div>
    </article>
  );
}

function capitalize(s = "") {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
