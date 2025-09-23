import { articles } from "@/data/articles";
import Link from "next/link";

export default function ArticlesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Статьи</h1>
      <ul className="space-y-6">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link href={`/articles/${a.slug}`} className="block group">
              <h2 className="text-xl font-semibold group-hover:underline">{a.title}</h2>
              <p className="text-sm text-gray-500">{a.date}</p>
              <p className="mt-1 text-gray-700">{a.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
