"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Главная" },
  { href: "/products", label: "Каталог" },
  { href: "/articles", label: "Статьи" },
  { href: "/about", label: "О нас" },
  { href: "/contacts", label: "Контакты" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-50">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Логотип */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          Tabigi Tas
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`text-sm font-medium hover:text-blue-600 transition ${
                      active ? "text-blue-600" : "text-gray-700"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* 🔹 Номер телефона */}
          <span className="text-sm font-semibold text-gray-800">
            +7 778 876 2495
          </span>

          {/* 🔹 Кнопка WhatsApp */}
          <a
            href="https://wa.me/77788762495"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 transition"
          >
            💬 Написать в WhatsApp
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center rounded-xl border px-3 py-2 text-sm"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden border-t bg-white">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 text-sm ${
                    active ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}

          {/* 🔹 Номер телефона */}
          <li className="border-t">
            <span className="block px-4 py-3 text-sm font-semibold text-gray-800">
              📞 +7 778 876 2495
            </span>
          </li>

          {/* 🔹 WhatsApp кнопка */}
          <li className="border-t">
            <a
              href="https://wa.me/77788762495"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-3 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition"
            >
              💬 Написать в WhatsApp
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
