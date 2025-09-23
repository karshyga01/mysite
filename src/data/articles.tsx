// src/data/articles.ts
export type Article = {
  slug: string;
  title: string;
  date: string;
  description: string;
  cover?: string;
  content: string; // пока хранить можно прямо в строке
};

export const articles: Article[] = [
  {
    slug: "pamyatniki-iz-granita",
    title: "Почему выбирают памятники из гранита",
    date: "2025-02-10",
    description: "Долговечность, прочность и благородный внешний вид делают гранит идеальным материалом для памятников.",
    cover: "/images/articles/granit-monuments.jpg",
    content: `
## Почему именно гранит
Гранит отличается высокой прочностью и устойчивостью к климатическим условиям.

- Не боится мороза и влаги  
- Сохраняет полировку десятилетиями  
- Богатая палитра цветов

## Заключение
Если нужен памятник на века — гранит остаётся лучшим выбором.
    `,
  },
];
