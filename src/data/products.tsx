// src/data/products.ts

// ===== Старый формат (плитка/бордюры и т.п.) =====
export type ProductBasic = {
  slug: string;
  name: string;
  priceFrom: string;
  category: "плитка" | "бордюр" | "брусчатка" | "столешница" | "прочее";
  stone: string;                 // ← уже обязателен
  color: string;                 // ← уже обязателен
  size?: string;
  surface?: string;
  density?: string;
  waterAbsorption?: string;
  frost?: string;
  origin?: string;
  description: string;
  cover: string;
  gallery?: string[];
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
  label: string;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  baseUnit?: string;
  images: string[];
  variants: ProductVariant[];

  // ← ДЕЛАЕМ ОБЯЗАТЕЛЬНЫМИ
  stone: string;
  color: string;

  description?: string;
};


 export const products: Product[] = [
  {
    id: "monument-kordai",
    slug: "monument-kordai",
    title: "Памятник — гранит Кордай",
    subtitle: "Полировка, строгие геометрии",
    category: "Памятники",
    baseUnit: "комплект",
    images: ["/images/monuments/kordai-1.jpg"],
    stone: "гранит",                 // ← добавили
    color: "красный",       // ← добавили
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
     stone: "гранит",                 // ← добавили
    color: "красный",
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
