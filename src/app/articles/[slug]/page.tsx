import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// SEO из данных статьи (опционально)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt ?? "",
    openGraph: {
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt ?? "",
      images: article.hero ? [article.hero.src] : undefined,
      type: "article",
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* hero-картинка (если есть в данных) */}
      {article.hero?.src && (
        <figure className="mb-8 overflow-hidden rounded-2xl border bg-gray-50">
          {/* можно заменить на next/image при желании */}
          <img
            src={article.hero.src}
            alt={article.hero.alt ?? "Выбор памятника из гранита в Астане"}
            loading="eager"
            className="h-auto w-full object-cover"
          />
          {article.hero.caption && (
            <figcaption className="px-4 py-3 text-center text-sm text-gray-500">
              {article.hero.caption}
            </figcaption>
          )}
        </figure>
      )}

      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      {article.date && <p className="text-sm text-gray-500 mb-6">{article.date}</p>}

      {/* ВАЖНО: классы на обёртке, а не на <ReactMarkdown /> */}
      <div className="prose prose-gray max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: (props) => <a {...props} className="text-blue-600 hover:text-blue-700" />,
            img: (props) => <img {...props} loading="lazy" className="mx-auto" />,
            h2: (props) => <h2 {...props} className="scroll-mt-24" />,
            h3: (props) => <h3 {...props} className="scroll-mt-24" />,
          }}
        >
          {article.content}
        </ReactMarkdown>
      </div>
    </main>
  );
}
