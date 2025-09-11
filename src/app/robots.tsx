import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const host = "https://example.com"; // замени на свой домен
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
