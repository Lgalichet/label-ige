import Link from 'next/link'
import { getAdminPages } from '@/actions/pages'
import { Plus, ExternalLink, Lock, Code2 } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { SYSTEM_PAGES, CATEGORY_LABELS, githubUrl, type SystemPage } from '@/lib/system-pages'

export const dynamic = 'force-dynamic'

export default async function AdminPagesPage() {
  const pages = await getAdminPages()

  // Regroupement des pages système par catégorie
  const grouped = SYSTEM_PAGES.reduce<Record<string, SystemPage[]>>((acc, p) => {
    (acc[p.category] ||= []).push(p)
    return acc
  }, {})

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Pages</h1>
          <p className="text-[#555B6E] text-sm mt-1">
            Gérez vos pages CMS et consultez les pages système du site.
          </p>
        </div>
        <Link
          href="/admin/pages/nouvelle"
          className="bg-[#1A3A5C] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#142f4e] inline-flex items-center gap-2"
        >
          <Plus size={16} /> Nouvelle page CMS
        </Link>
      </div>

      {/* PAGES CMS */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-[#555B6E] uppercase tracking-wider mb-3">
          Pages CMS éditables
        </h2>
        <p className="text-xs text-[#888] mb-3">
          Pages dynamiques accessibles via <code className="bg-[#F1F3F5] px-1 rounded">/p/[slug]</code>, modifiables ici.
        </p>
        <div className="bg-white border border-[#DEE2E6] rounded-xl overflow-hidden">
          <div className="divide-y divide-[#DEE2E6]">
            {pages.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#888]">
                Aucune page CMS — commencez par en créer une.
              </div>
            ) : (
              pages.map((p) => (
                <div key={p.id} className="px-5 py-3 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/admin/pages/${p.id}`}
                      className="text-sm font-medium text-[#1A1A2E] hover:underline"
                    >
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
      </section>

      {/* PAGES SYSTÈME */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold text-[#555B6E] uppercase tracking-wider">
            Pages système
          </h2>
          <Lock size={12} className="text-[#888]" />
        </div>
        <p className="text-xs text-[#888] mb-3">
          Pages codées en dur dans le projet (routes statiques Next.js). Pour les modifier,
          éditez le fichier source correspondant dans le dépôt GitHub.
        </p>

        <div className="space-y-6">
          {(Object.keys(grouped) as SystemPage['category'][]).map((cat) => (
            <div key={cat}>
              <div className="text-xs font-semibold text-[#1A3A5C] uppercase tracking-wider mb-2">
                {CATEGORY_LABELS[cat]}
              </div>
              <div className="bg-white border border-[#DEE2E6] rounded-xl overflow-hidden">
                <div className="divide-y divide-[#DEE2E6]">
                  {grouped[cat].map((p) => (
                    <div key={p.href} className="px-5 py-3 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#1A1A2E]">{p.title}</div>
                        <div className="text-xs text-[#888] truncate">
                          {p.href} · <code className="bg-[#F1F3F5] px-1 rounded">{p.file}</code>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded border border-[#DEE2E6] text-[#888] font-medium">
                        Système
                      </span>
                      <a
                        href={githubUrl(p.file)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#555B6E] hover:text-[#1A3A5C]"
                        title="Éditer sur GitHub"
                      >
                        <Code2 size={14} />
                      </a>
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#1A3A5C] hover:text-[#0d2340]"
                        title="Voir la page"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
