export type Product = {
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

export const PRODUCTS: Product[] = [
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
