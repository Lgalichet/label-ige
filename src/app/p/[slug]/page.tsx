import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPublishedPage, getPublishedPageSlugs } from '@/actions/pages'
import { Markdown } from '@/components/markdown'

export const revalidate = 60

export async function generateStaticParams() {
  const pages = await getPublishedPageSlugs()
  return pages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const page = await getPublishedPage(slug)
  if (!page) return { title: 'Page introuvable' }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
  return {
    title: page.metaTitle ?? `${page.title} | Label IGE`,
    description: page.metaDescription ?? page.excerpt ?? undefined,
    alternates: appUrl ? { canonical: `${appUrl}/p/${page.slug}` } : undefined,
    openGraph: {
      title: page.metaTitle ?? page.title,
      description: page.metaDescription ?? page.excerpt ?? undefined,
      type: 'article',
    },
  }
}

export default async function PublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPublishedPage(slug)
  if (!page) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-[#1A1A2E] leading-tight">{page.title}</h1>
        {page.excerpt && <p className="text-lg text-[#555B6E] mt-3">{page.excerpt}</p>}
      </header>
      <Markdown>{page.content}</Markdown>
    </article>
  )
}
