import type { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { getPublishedPosts } from '@/actions/posts'
import { prisma } from '@/lib/db'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog | Label IGE',
  description: 'Articles, actualités et analyses sur la transparence IA, la création humaine et les labels de certification.',
  alternates: process.env.NEXT_PUBLIC_APP_URL
    ? { canonical: `${process.env.NEXT_PUBLIC_APP_URL}/blog` }
    : undefined,
  openGraph: {
    title: 'Blog | Label IGE',
    description: 'Articles, actualités et analyses sur la transparence IA.',
    type: 'website',
  },
}

export default async function BlogIndexPage() {
  const [posts, categories] = await Promise.all([
    getPublishedPosts(),
    prisma.category.findMany({
      where: { posts: { some: { published: true } } },
      orderBy: { name: 'asc' },
    }),
  ])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-[#1A1A2E]">Blog</h1>
        <p className="text-[#555B6E] mt-2">
          Actualités, analyses et ressources sur la transparence IA et la création humaine.
        </p>
      </header>

      {categories.length > 0 && (
        <nav className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/blog"
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-[#1A3A5C] bg-[#1A3A5C] text-white"
          >
            Tous
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/blog/categorie/${c.slug}`}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-[#DEE2E6] text-[#555B6E] hover:border-[#1A3A5C] hover:text-[#1A3A5C] transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </nav>
      )}

      {posts.length === 0 ? (
        <div className="bg-white border border-[#DEE2E6] rounded-xl p-12 text-center">
          <p className="text-[#555B6E]">Aucun article publié pour l&apos;instant.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="bg-white border border-[#DEE2E6] rounded-xl overflow-hidden hover:border-[#1A3A5C] transition-colors group"
            >
              {p.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.coverImage}
                  alt=""
                  className="w-full aspect-[16/9] object-cover"
                />
              )}
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-2">
                  {p.categories.map((c) => (
                    <span key={c.slug} className="text-[10px] uppercase tracking-wider text-[#1A3A5C] font-semibold">
                      {c.name}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-bold text-[#1A1A2E] group-hover:text-[#1A3A5C] transition-colors">
                  {p.title}
                </h2>
                {p.excerpt && (
                  <p className="text-sm text-[#555B6E] mt-2 line-clamp-3">{p.excerpt}</p>
                )}
                <div className="text-xs text-[#888] mt-3">
                  {p.publishedAt
                    ? format(new Date(p.publishedAt), 'd MMMM yyyy', { locale: fr })
                    : ''}
                  {p.author?.username ? ` · ${p.author.username}` : ''}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
