import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getAdminPostById } from '@/actions/posts'
import { getCategories } from '@/actions/categories'
import { PostEditor } from '@/components/admin/PostEditor'

export const dynamic = 'force-dynamic'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [post, categories] = await Promise.all([getAdminPostById(id), getCategories()])
  if (!post) notFound()

  return (
    <div>
      <Link href="/admin/articles" className="inline-flex items-center gap-1 text-sm text-[#555B6E] hover:text-[#1A3A5C] mb-4">
        <ChevronLeft size={14} /> Retour aux articles
      </Link>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">Modifier l&apos;article</h1>
      <PostEditor
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? '',
          content: post.content,
          coverImage: post.coverImage ?? '',
          metaTitle: post.metaTitle ?? '',
          metaDescription: post.metaDescription ?? '',
          published: post.published,
          categoryIds: post.categories.map((c) => c.id),
        }}
      />
    </div>
  )
}
