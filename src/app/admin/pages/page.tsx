import Link from 'next/link'
import { getAdminPages } from '@/actions/pages'
import { Plus, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export const dynamic = 'force-dynamic'

export default async function AdminPagesPage() {
  const pages = await getAdminPages()

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Pages</h1>
          <p className="text-[#555B6E] text-sm mt-1">
            Pages CMS accessibles via <code className="bg-[#F1F3F5] px-1 rounded">/p/[slug]</code>.
          </p>
        </div>
        <Link
          href="/admin/pages/nouvelle"
          className="bg-[#1A3A5C] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#142f4e] inline-flex items-center gap-2"
        >
          <Plus size={16} /> Nouvelle page
        </Link>
      </div>

      <div className="bg-white border border-[#DEE2E6] rounded-xl overflow-hidden">
        <div className="divide-y divide-[#DEE2E6]">
          {pages.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#888]">Aucune page — commencez par en créer une.</div>
          ) : (
            pages.map((p) => (
              <div key={p.id} className="px-5 py-3 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <Link href={`/admin/pages/${p.id}`} className="text-sm font-medium text-[#1A1A2E] hover:underline">
                    {p.title}
                  </Link>
                  <div className="text-xs text-[#888]">
                    /p/{p.slug} · modifié le {format(new Date(p.updatedAt), 'd MMM yyyy', { locale: fr })}
                    {p.author?.username ? ` · par ${p.author.username}` : ''}
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded border font-medium ${
                    p.published
                      ? 'border-[#2E7D32] text-[#2E7D32]'
                      : 'border-[#DEE2E6] text-[#888]'
                  }`}
                >
                  {p.published ? 'Publiée' : 'Brouillon'}
                </span>
                {p.published && (
                  <a
                    href={`/p/${p.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1A3A5C] hover:text-[#0d2340]"
                    title="Voir en ligne"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
