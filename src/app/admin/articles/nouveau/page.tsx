import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getCategories } from '@/actions/categories'
import { PostEditor } from '@/components/admin/PostEditor'

export const dynamic = 'force-dynamic'

export default async function NewPostPage() {
  const categories = await getCategories()

  return (
    <div>
      <Link href="/admin/articles" className="inline-flex items-center gap-1 text-sm text-[#555B6E] hover:text-[#1A3A5C] mb-4">
        <ChevronLeft size={14} /> Retour aux articles
      </Link>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">Nouvel article</h1>
      <PostEditor
        isNew
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        initial={{
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          coverImage: '',
          metaTitle: '',
          metaDescription: '',
          published: false,
          categoryIds: [],
        }}
      />
    </div>
  )
}
