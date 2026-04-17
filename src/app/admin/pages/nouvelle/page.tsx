import { PageEditor } from '@/components/admin/PageEditor'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function NewPage() {
  return (
    <div>
      <Link href="/admin/pages" className="inline-flex items-center gap-1 text-sm text-[#555B6E] hover:text-[#1A3A5C] mb-4">
        <ChevronLeft size={14} /> Retour aux pages
      </Link>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">Nouvelle page</h1>
      <PageEditor
        isNew
        initial={{
          title: '',
          slug: '',
          content: '',
          excerpt: '',
          metaTitle: '',
          metaDescription: '',
          published: false,
        }}
      />
    </div>
  )
}
