import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../components/NavBar"; // если используешь alias '@/...' — можно заменить

export const metadata: Metadata = {
  title: "Tabigi Tas — природный камень",
  description:
    "Гранит, плитка, бордюры и изделия из природного камня. Tabigi Tas — надёжный поставщик в Казахстане.",
};


// ВАЖНО: default export — именно React-компонент, который возвращает <html><body>...
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <NavBar />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
            <p>© {new Date().getFullYear()} Tabigi Tas. Все права защищены.</p>
            <p>
              Сделано на <a className="underline" href="https://nextjs.org">Next.js</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
