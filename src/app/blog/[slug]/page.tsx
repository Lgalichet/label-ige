import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { getPublishedPost, getPublishedPosts } from '@/actions/posts'
import { Markdown } from '@/components/markdown'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPost(slug)
  if (!post) return { title: 'Article introuvable' }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
  return {
    title: post.metaTitle ?? `${post.title} | Label IGE`,
    description: post.metaDescription ?? post.excerpt ?? undefined,
    alternates: appUrl ? { canonical: `${appUrl}/blog/${post.slug}` } : undefined,
    openGraph: {
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt ?? undefined,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: post.author?.username ? [post.author.username] : undefined,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPublishedPost(slug)
  if (!post) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/blog" className="text-sm text-[#1A3A5C] hover:underline mb-4 inline-block">
        ← Retour au blog
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((c) => (
            <Link
              key={c.slug}
              href={`/blog/categorie/${c.slug}`}
              className="text-[10px] uppercase tracking-wider text-[#1A3A5C] font-semibold hover:underline"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-[#1A1A2E] leading-tight">{post.title}</h1>
        {post.excerpt && <p className="text-lg text-[#555B6E] mt-3">{post.excerpt}</p>}
        <div className="text-sm text-[#888] mt-4">
          {post.publishedAt
            ? format(new Date(post.publishedAt), 'd MMMM yyyy', { locale: fr })
            : ''}
          {post.author?.username ? ` · ${post.author.username}` : ''}
        </div>
      </header>

      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt=""
          className="w-full aspect-[16/9] object-cover rounded-xl mb-8"
        />
      )}

      <Markdown>{post.content}</Markdown>
    </article>
  )
}
