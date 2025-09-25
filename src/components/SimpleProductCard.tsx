import Image from "next/image";
import ColorSwatch from "@/components/ColorSwatch";
import type { ProductBasic } from "@/data/products";

type Props = { p: ProductBasic };

export default function SimpleProductCard({ p }: Props) {
  const title = composeTitle(p);

  return (
    <article className="group rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative aspect-[4/3]">
        <Image
          src={p.cover || "/images/placeholder.jpg"}
          alt={p.name || "Фото изделия"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
        {p.category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 border text-xs px-2 py-1">
            {capitalize(p.category)}
          </span>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="p-4 flex flex-col gap-2.5">
        <h3 className="font-semibold text-base leading-tight group-hover:underline">{title}</h3>

        <p className="text-sm text-gray-600">
          {[p.stone && capitalize(p.stone), p.category && capitalize(p.category), p.color && capitalize(p.color)]
            .filter(Boolean)
            .join(" • ")}
        </p>

        <div className="mt-1 flex items-center gap-2">
          {p.color && <ColorSwatch name={p.color} />}
        </div>

        {p.priceFrom && <div className="mt-1 text-lg font-bold">{p.priceFrom}</div>}
      </div>
    </article>
  );
}

/* -------- helpers -------- */
function composeTitle(p: ProductBasic) {
  const hasSizeInName =
    typeof p.name === "string" && typeof p.size === "string" && p.name.includes(cleanSize(p.size!));

  if (p.name && !hasSizeInName && p.size) return `${p.name} ${cleanSize(p.size)}`;
  if (p.name) return p.name;

  const parts = [p.category ? capitalize(p.category) : "", p.stone ? capitalize(p.stone) : "", p.size ? cleanSize(p.size) : ""].filter(Boolean);
  return parts.join(" ");
}
function cleanSize(s = "") { return s.replace(/\s*мм$/i, ""); }
function capitalize(s = "") { return s.charAt(0).toUpperCase() + s.slice(1); }
