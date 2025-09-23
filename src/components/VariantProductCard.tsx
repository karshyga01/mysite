// src/components/VariantProductCard.tsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import ColorSwatch from "@/components/ColorSwatch";

type AnyVariant =
  | { size?: string; label?: string; title?: string; name?: string; price?: number }
  | string;

type ProductWithVariants = {
  id?: string;
  name?: string;
  title?: string;
  slug: string;
  cover?: string;
  stone?: string;      // "гранит"
  color?: string;      // "красный"
  category?: string;   // "Памятники"
  variants: AnyVariant[];
  priceFrom?: string;
};

export default function VariantProductCard({ product }: { product: ProductWithVariants }) {
  const [idx, setIdx] = useState(0);

  const variants = useMemo(
    () =>
      (product.variants || []).map((v) => {
        if (typeof v === "string") return { _label: v, price: undefined as number | undefined };
        const label =
          (v.size as string) ??
          (v.label as string) ??
          (v.title as string) ??
          (v.name as string) ??
          "";
        return { _label: label, price: (v as any).price as number | undefined };
      }),
    [product.variants]
  );

  const current = variants[idx];

  return (
    <article className="group rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      {/* Изображение */}
      <div className="relative aspect-[4/3]">
        <Image
          src={product.cover || "/images/placeholder.jpg"}
          alt={product.name || product.title || "Фото изделия"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
        {product.category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 border text-xs px-2 py-1">
            {capitalize(product.category)}
          </span>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Контент */}
      <div className="p-4 flex flex-col gap-2.5">
        {/* Заголовок */}
        <h3 className="font-semibold text-base leading-tight group-hover:underline">
          {product.title || product.name}
        </h3>

        {/* Мета: Камень • Категория • Цвет */}
        <p className="text-sm text-gray-600">
          {[
            product.stone && capitalize(product.stone),
            product.category && capitalize(product.category),
            product.color && capitalize(product.color),
          ]
            .filter(Boolean)
            .join(" • ")}
        </p>

        {/* Бейдж цвета (дополнительно) */}
        <div className="mt-1">
          {product.color && <ColorSwatch name={product.color} />}
        </div>

        {/* Варианты размеров */}
        {variants.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {variants.map((opt, i) => (
              <button
                key={`${opt._label}-${i}`}
                onClick={() => setIdx(i)}
                className={`text-sm font-medium rounded-lg border px-4 py-2 transition whitespace-nowrap min-w-[112px] text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 ${
                  i === idx
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-800 hover:bg-gray-50 border-gray-300"
                }`}
                aria-pressed={i === idx}
                title={opt._label}
              >
                {normalizeSizeLabel(opt._label)}
              </button>
            ))}
          </div>
        )}

        {/* Цена */}
        <div className="mt-1">
          <span className="text-sm text-gray-500">Цена:</span>{" "}
          <span className="text-lg font-bold">
            {current?.price ? formatKZT(current.price) : product.priceFrom || "—"}
          </span>
        </div>
      </div>
    </article>
  );
}

/* -------- helpers -------- */
function formatKZT(n: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "KZT",
    maximumFractionDigits: 0,
  }).format(n);
}
function normalizeSizeLabel(s?: string) {
  if (!s) return "";
  return s.replace(/x/gi, "×").trim(); // 100x50x7 → 100×50×7
}
function capitalize(s = "") {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
