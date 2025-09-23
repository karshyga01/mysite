// src/components/ColorSwatch.tsx
export default function ColorSwatch({ name }: { name?: string }) {
  const color = pickColor(name);
  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium bg-white">
      <span
        className="h-3 w-3 rounded-full border"
        style={{ background: color }}
        aria-hidden
      />
      {name}
    </span>
  );
}

function pickColor(name?: string) {
  const n = (name ?? "").toLowerCase();

  // простая эвристика: берем ключевые слова из названия цвета
  if (n.includes("сер") && n.includes("тем")) return "#4B5563"; // тёмно-серый
  if (n.includes("сер")) return "#9CA3AF";                       // серый
  if (n.includes("чер") || n.includes("граф")) return "#111827"; // чёрный/графит
  if (n.includes("корич")) return "#7C5A3E";                     // коричневый
  if (n.includes("крас")) return "#B91C1C";                      // красный
  if (n.includes("беж") || n.includes("пес")) return "#D6C7A1";  // беж/песок
  if (n.includes("зел")) return "#2F6B4F";                       // зелёный
  if (n.includes("син")) return "#1E3A8A";                       // синий
  return "#E5E7EB"; // по умолчанию светло-серый
}
