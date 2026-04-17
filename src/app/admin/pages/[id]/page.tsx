import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getAdminPageById } from '@/actions/pages'
import { PageEditor } from '@/components/admin/PageEditor'

export const dynamic = 'force-dynamic'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const page = await getAdminPageById(id)
  if (!page) notFound()

  return (
    <div>
      <Link href="/admin/pages" className="inline-flex items-center gap-1 text-sm text-[#555B6E] hover:text-[#1A3A5C] mb-4">
        <ChevronLeft size={14} /> Retour aux pages
      </Link>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">Modifier la page</h1>
      <PageEditor
        initial={{
          id: page.id,
          title: page.title,
          slug: page.slug,
          content: page.content,
          excerpt: page.excerpt ?? '',
          metaTitle: page.metaTitle ?? '',
          metaDescription: page.metaDescription ?? '',
          published: page.published,
        }}
      />
    </div>
  )
}
