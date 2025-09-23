// src/data/products.ts

// ===== Старый формат (плитка/бордюры и т.п.) =====
export type ProductBasic = {
  slug: string;
  name: string;
  priceFrom: string;       // "от 18 000 ₸/м²"
  category: "плитка" | "бордюр" | "брусчатка" | "столешница" | "прочее";
  stone: string;           // гранит, мрамор, травертин и т.д.
  color: string;           // серый, бежевый...
  size?: string;           // 600×300×20 мм
  surface?: string;        // полированный, термо, бучардированный
  density?: string;        // 2.65 г/см³ (если нужно)
  waterAbsorption?: string;// 0.2%
  frost?: string;          // F200
  origin?: string;         // Кордай, Карелия и т.п.
  description: string;
  cover: string;           // "/images/kordai-plita.jpg"
  gallery?: string[];      // ["/images/..", ...]
};

export const PRODUCTS: ProductBasic[] = [
  {
    slug: "kordai-granit-plita-600x300x20",
    name: "Гранит Кордай — плита 600×300×20",
    priceFrom: "от 18 000 ₸/м²",
    category: "плитка",
    stone: "гранит",
    color: "серо-коричневый",
    size: "600×300×20 мм",
    surface: "термообработанная",
    frost: "F200",
    origin: "Кордай",
    description:
      "Износостойкая плитка из кордайского гранита для фасадов и мощения. Устойчива к морозу и соли.",
    cover: "/images/kordai-600x300x20.jpg",
    gallery: ["/images/kordai-1.jpg", "/images/kordai-2.jpg"]
  },
  {
    slug: "kordai-bordyur-1000x300x80",
    name: "Бордюр гранитный 1000×300×80",
    priceFrom: "от 7 900 ₸/пог.м",
    category: "бордюр",
    stone: "гранит",
    color: "серый",
    size: "1000×300×80 мм",
    surface: "пиленый",
    origin: "Кордай",
    description:
      "Прямой гранитный бордюр для дорог и дворов. Геометрия выдержанная, паллетная поставка.",
    cover: "/images/bordyur-1000x300x80.jpg"
  }
];

// ===== Новый формат (с вариантами) =====
export type ProductVariant = {
  id: string;
  label: string;     // как показываем размер
  price: number;     // цена в тенге
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  baseUnit?: string; // "шт", "комплект", "м²" и т.п.
  images: string[];
  variants: ProductVariant[];
  description?: string;
};

export const products: Product[] = [
  // Памятник Кордай (пример из твоего кода)
  {
    id: "monument-kordai",
    slug: "monument-kordai",
    title: "Памятник — гранит Кордай",
    subtitle: "Полировка, строгие геометрии",
    category: "Памятники",
    baseUnit: "комплект",
    images: ["/images/monuments/kordai-1.jpg"],
    description:
      "Памятники из гранита Кордай. Аккуратная полировка, долговечность. Возможно нанесение портрета и текста.",
    variants: [
      { id: "60x40x5",  label: "60×40×5 см",  price: 65000 },
      { id: "70x40x6",  label: "70×40×6 см",  price: 78000 },
      { id: "80x40x6",  label: "80×40×6 см",  price: 89000 },
      { id: "90x50x8",  label: "90×50×8 см",  price: 129000 },
    ],
  },

  // 🔹 Новый памятник из красного кордайского гранита
  {
    id: "monument-kordai-red",
    slug: "monument-kordai-krasnyy",
    title: "Памятник — красный кордайский гранит",
    subtitle: "Полировка, классические формы",
    category: "Памятники",
    baseUnit: "комплект",
    images: ["/images/monuments/kordai-red-1.jpg"],
    description:
      "Памятники из красного кордайского гранита. Богатый цвет, высокая прочность и долговечность. Возможно изготовление по индивидуальным размерам и нанесение надписей.",
    variants: [
      { id: "80x45x6",  label: "80×45×6 см",  price: 95000 },
      { id: "90x50x6",  label: "90×50×6 см",  price: 105000 },
      { id: "100x50x6", label: "100×50×6 см", price: 115000 },
      { id: "120x55x6", label: "120×55×6 см", price: 130000 },
      { id: "130x60x6", label: "130×60×6 см", price: 145000 },

      { id: "70x40x8",  label: "70×40×8 см",  price: 120000 },
      { id: "80x45x8",  label: "80×45×8 см",  price: 130000 },
      { id: "90x50x8",  label: "90×50×8 см",  price: 145000 },
      { id: "100x50x8", label: "100×50×8 см", price: 160000 },
      { id: "120x55x8", label: "120×55×8 см", price: 180000 },
      { id: "130x60x8", label: "130×60×8 см", price: 195000 },
      { id: "140x60x8", label: "140×60×8 см", price: 215000 },
      { id: "150x60x8", label: "150×60×8 см", price: 235000 },
      { id: "170x60x8", label: "170×60×8 см", price: 260000 },
      { id: "180x60x8", label: "180×60×8 см", price: 285000 },
    ],
  },
];
