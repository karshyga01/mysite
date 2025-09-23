"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

type Facets = {
  stones: string[];
  categories: string[];
  colors: string[];
};

type Props = {
  facets: Facets;
  // Текущие выбранные значения (для controlled UI)
  selected: { stone?: string; category?: string; color?: string; q?: string };
  total: number; // сколько товаров после фильтра
};

export default function ProductsFilterBar({ facets, selected, total }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const setParam = useCallback(
    (key: string, value?: string) => {
      const next = new URLSearchParams(sp.toString());
      if (value && value.trim() !== "") next.set(key, value);
      else next.delete(key);
      // При изменении одного фильтра сбрасывать пагинацию (если появится)
      next.delete("page");
      router.push(`${pathname}?${next.toString()}`);
    },
    [router, pathname, sp]
  );

  const clearAll = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  // Для удобства показываем счётчик активных фильтров
  const activeCount = useMemo(() => {
    return ["stone", "category", "color", "q"].reduce(
      (acc, k) => acc + (sp.get(k) ? 1 : 0),
      0
    );
  }, [sp]);

  return (
    <div className="w-full rounded-2xl border p-4 md:p-5 flex flex-col gap-4 bg-white">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg md:text-xl font-semibold">Фильтры</h2>
        <button
          onClick={clearAll}
          className="text-sm underline underline-offset-4 hover:opacity-80"
        >
          Сбросить {activeCount > 0 ? `(${activeCount})` : ""}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Поиск по названию */}
        <input
          type="search"
          placeholder="Поиск по названию..."
          defaultValue={selected.q ?? ""}
          onChange={(e) => setParam("q", e.currentTarget.value || undefined)}
          className="rounded-xl border px-3 py-2"
        />

        {/* Камень */}
        <select
          value={selected.stone ?? ""}
          onChange={(e) => setParam("stone", e.target.value || undefined)}
          className="rounded-xl border px-3 py-2"
        >
          <option value="">Камень (все)</option>
          {facets.stones.map((s) => (
            <option key={s} value={s}>
              {capitalize(s)}
            </option>
          ))}
        </select>

        {/* Категория */}
        <select
          value={selected.category ?? ""}
          onChange={(e) => setParam("category", e.target.value || undefined)}
          className="rounded-xl border px-3 py-2"
        >
          <option value="">Категория (все)</option>
          {facets.categories.map((c) => (
            <option key={c} value={c}>
              {capitalize(c)}
            </option>
          ))}
        </select>

        {/* Цвет */}
        <select
          value={selected.color ?? ""}
          onChange={(e) => setParam("color", e.target.value || undefined)}
          className="rounded-xl border px-3 py-2"
        >
          <option value="">Цвет (все)</option>
          {facets.colors.map((c) => (
            <option key={c} value={c}>
              {capitalize(c)}
            </option>
          ))}
        </select>
      </div>

      <div className="text-sm text-gray-600">
        Найдено: <span className="font-medium text-gray-900">{total}</span>
      </div>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
