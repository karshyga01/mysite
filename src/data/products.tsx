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
  hidden?: boolean; 
};



export const PRODUCTS: ProductBasic[] = [
  {
    slug: "kordai-granit-plita-600x300x20",
    name: "Гранит Кордай — плита 600×300×20",
    hidden: true,
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
    hidden: true,
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
  hidden?: boolean; 

  // ← ДЕЛАЕМ ОБЯЗАТЕЛЬНЫМИ
  stone: string;
  color: string;
  

  description?: string;
};
// ...выше идут другие товары

export const products: Product[] = [
  {
    id: "monument-kordai",
    slug: "monument-kordai",
    hidden: true,
    title: "Памятник — гранит Кордай",
    subtitle: "Полировка, строгие геометрии",
    category: "Памятники",
    baseUnit: "комплект",
    images: ["/images/monuments/kordai-1.jpg"],
    stone: "гранит",
    color: "красный",
    description:
      "Памятники из гранита Кордай. Аккуратная полировка, долговечность. Возможно нанесение портрета и текста.",
    variants: [
      { id: "60x40x5", label: "60×40×5 см", price: 65000 },
      { id: "70x40x6", label: "70×40×6 см", price: 78000 },
      { id: "80x40x6", label: "80×40×6 см", price: 89000 },
      { id: "90x50x8", label: "90×50×8 см", price: 129000 },
    ],
  },

  {
    id: "monument-alatagyl-green",
    slug: "pamyatnik-alatagyl-sero-zelenyy",
    title: "Памятник - гранит Алатагыл (серо-зеленый)",
    category: "Памятники",
    baseUnit: "комплект",
    stone: "гранит",
    color: "серо-зеленый",
    images: ["/images/monuments/alatagyl-1.jpg"],
    description:
      "Серо-зеленый гранит Алатагыл. Классические формы, аккуратная полировка и стойкость к климату.",
    variants: [
      { id: "80x45x6", label: "80×45×6 см", price: 120000 },
      { id: "90x50x6", label: "90×50×6 см", price: 135000 },
      { id: "100x50x6", label: "100×50×6 см", price: 150000 },
      { id: "120x55x6", label: "120×55×6 см", price: 180000 },
      { id: "130x60x6", label: "130×60×6 см", price: 205000 },
      { id: "140x60x6", label: "140×60×6 см", price: 240000 },
      { id: "150x60x6", label: "150×60×6 см", price: 270000 },

      { id: "80x45x8", label: "80×45×8 см", price: 150000 },
      { id: "90x45x8", label: "90×45×8 см", price: 165000 },
      { id: "100x50x8", label: "100×50×8 см", price: 180000 },
      { id: "120x55x8", label: "120×55×8 см", price: 205000 },
      { id: "130x60x8", label: "130×60×8 см", price: 240000 },
      { id: "140x60x8", label: "140×60×8 см", price: 270000 },
      { id: "150x60x8", label: "150×60×8 см", price: 300000 },
      { id: "160x60x8", label: "160×60×8 см", price: 335000 },
      { id: "170x60x8", label: "170×60×8 см", price: 370000 },
      { id: "180x60x8", label: "180×60×8 см", price: 410000 },
    ],
  },

  {
    id: "monument-kordai-red",
    slug: "monument-kordai-krasnyy",
    title: "Памятник — красный кордайский гранит",
    subtitle: "Полировка, классические формы",
    category: "Памятники",
    baseUnit: "комплект",
    images: ["/images/monuments/kordai-red-1.jpg"],
    stone: "гранит",
    color: "красный",
    description:
      "Памятники из красного кордайского гранита. Богатый цвет, высокая прочность и долговечность. Возможно изготовление по индивидуальным размерам и нанесение надписей.",
    variants: [
      { id: "80x45x6", label: "80×45×6 см", price: 100000 },
      { id: "90x50x6", label: "90×50×6 см", price: 110000 },
      { id: "100x50x6", label: "100×50×6 см", price: 125000 },
      { id: "120x55x6", label: "120×55×6 см", price: 145000 },
      { id: "130x60x6", label: "130×60×6 см", price: 160000 },

      { id: "70x40x8", label: "70×40×8 см", price: 100000 },
      { id: "80x45x8", label: "80×45×8 см", price: 125000 },
      { id: "90x50x8", label: "90×50×8 см", price: 135000 },
      { id: "100x50x8", label: "100×50×8 см", price: 165000 },
      { id: "120x55x8", label: "120×55×8 см", price: 195000 },
      { id: "130x60x8", label: "130×60×8 см", price: 210000 },
      { id: "140x60x8", label: "140×60×8 см", price: 230000 },
      { id: "150x60x8", label: "150×60×8 см", price: 250000 },
      { id: "170x60x8", label: "170×60×8 см", price: 275000 },
      { id: "180x60x8", label: "180×60×8 см", price: 310000 },
    ],
  },

  {
    id: "monument-kurty-brown",
    slug: "pamyatnik-kurty-korichnevyy",
    title: "Памятник — гранит Курты (коричневый)",
    subtitle: "Полировка, классические формы",
    category: "Памятники",
    baseUnit: "комплект",
    images: ["/images/monuments/kurty-brown-1.jpg"],
    stone: "гранит",
    color: "коричневый",
    description:
      "Памятники из коричневого гранита Курты. Элегантный глубокий оттенок, высокая плотность и долговечность. Возможно изготовление по индивидуальным размерам и нанесение надписей.",
    variants: [
      { id: "80x45x6", label: "80×45×6 см", price: 100000 },
      { id: "90x50x6", label: "90×50×6 см", price: 110000 },
      { id: "100x50x6", label: "100×50×6 см", price: 125000 },
      { id: "120x55x6", label: "120×55×6 см", price: 145000 },
      { id: "130x60x6", label: "130×60×6 см", price: 160000 },

      { id: "70x40x8", label: "70×40×8 см", price: 100000 },
      { id: "80x45x8", label: "80×45×8 см", price: 125000 },
      { id: "90x50x8", label: "90×50×8 см", price: 135000 },
      { id: "100x50x8", label: "100×50×8 см", price: 165000 },
      { id: "120x55x8", label: "120×55×8 см", price: 195000 },
      { id: "130x60x8", label: "130×60×8 см", price: 210000 },
      { id: "140x60x8", label: "140×60×8 см", price: 230000 },
      { id: "150x60x8", label: "150×60×8 см", price: 250000 },
      { id: "170x60x8", label: "170×60×8 см", price: 275000 },
      { id: "180x60x8", label: "180×60×8 см", price: 310000 },
    ],
  },
]; 
