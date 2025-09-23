// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tabigitas.kz"), // базовый домен
  title: {
    default: "Tabigi Tas",
    template: "%s — Tabigi Tas",
  },
  description:
    "Гранит, плитка, бордюры и изделия из природного камня. Tabigi Tas — надёжный поставщик в Казахстане.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Tabigi Tas",
    url: "https://www.tabigitas.kz",
    images: [
      {
        url: "/images/og-default.jpg", // сделай 1200x630 картинку и положи в public/images
        width: 1200,
        height: 630,
        alt: "Tabigi Tas — природный камень и памятники",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tabigitas", // если есть Twitter/X аккаунт
    title: "Tabigi Tas",
    description:
      "Гранит, плитка, бордюры и изделия из природного камня. Надёжный поставщик в Казахстане.",
    images: ["/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://www.tabigitas.kz",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        {/* Эти мета-теги подхватят Telegram/WhatsApp, если вдруг Open Graph не сработает */}
        <meta name="theme-color" content="#444444" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-stone-100 via-stone-200 to-stone-300 text-gray-900 antialiased">
        <NavBar />

        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
            <p>© {new Date().getFullYear()} Tabigi Tas. Все права защищены.</p>
            <p>
              Сделано на{" "}
              <a className="underline" href="https://nextjs.org">
                Next.js
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
