import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { prisma } from '@/lib/db'
import { getPublishedPosts } from '@/actions/posts'

export const revalidate = 60

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const category = await prisma.category.findUnique({ where: { slug } })
  if (!category) return { title: 'Catégorie introuvable' }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
  return {
    title: `${category.name} | Blog Label IGE`,
    description: category.description ?? `Articles de la catégorie ${category.name}.`,
    alternates: appUrl ? { canonical: `${appUrl}/blog/categorie/${category.slug}` } : undefined,
  }
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await prisma.category.findUnique({ where: { slug } })
  if (!category) notFound()

  const posts = await getPublishedPosts({ categorySlug: slug })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/blog" className="text-sm text-[#1A3A5C] hover:underline mb-4 inline-block">
        ← Retour au blog
      </Link>

      <header className="mb-10">
        <div className="text-xs uppercase tracking-wider text-[#1A3A5C] font-semibold mb-1">Catégorie</div>
        <h1 className="text-4xl font-bold text-[#1A1A2E]">{category.name}</h1>
        {category.description && (
          <p className="text-[#555B6E] mt-2">{category.description}</p>
        )}
      </header>

      {posts.length === 0 ? (
        <div className="bg-white border border-[#DEE2E6] rounded-xl p-12 text-center">
          <p className="text-[#555B6E]">Aucun article dans cette catégorie pour l&apos;instant.</p>
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
                <img src={p.coverImage} alt="" className="w-full aspect-[16/9] object-cover" />
              )}
              <div className="p-5">
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
