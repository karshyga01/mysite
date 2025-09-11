import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tabigi-tas.vercel.app"; // 👉 замени на свой домен

  // Статические страницы
  const staticPages = [
    "",
    "/products",
    "/about",
    "/contacts",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  // Динамические страницы товаров
  const productPages = PRODUCTS.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...productPages];
}
