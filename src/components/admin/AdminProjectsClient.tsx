'use client'

import { useState, useTransition } from 'react'
import { adminDeleteProject } from '@/actions/admin'
import { getScoreColor } from '@/lib/utils'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Link from 'next/link'
import { Trash2, ExternalLink, Search } from 'lucide-react'

interface Project {
  id: string
  creationNumber: string
  title: string
  creatorName: string
  score: number
  isPublic: boolean
  createdAt: Date | string
  user: { username: string; email: string }
}

export function AdminProjectsClient({ initialProjects, total }: { initialProjects: Project[]; total: number }) {
  const [projects, setProjects] = useState(initialProjects)
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSearch(q: string) {
    setQuery(q)
    startTransition(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&perPage=50`)
      // Note: for admin we query all, simplified here
    })
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer définitivement ce label ?')) return
    await adminDeleteProject(id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const filtered = query
    ? projects.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.creationNumber.toLowerCase().includes(query.toLowerCase()) ||
        p.creatorName.toLowerCase().includes(query.toLowerCase())
      )
    : projects

  return (
    <div>
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filtrer par titre, numéro, créateur..."
          className="w-full bg-white border border-[#DEE2E6] rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#1A3A5C]"
        />
      </div>

      <div className="bg-white border border-[#DEE2E6] rounded-xl overflow-hidden">
        <div className="divide-y divide-[#DEE2E6]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-[#888] text-sm">Aucun résultat.</div>
          ) : filtered.map((p) => {
            const { hex } = getScoreColor(p.score)
            return (
              <div key={p.id} className="px-5 py-3 flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg text-white text-xs font-bold flex items-center justify-center shrink-0" style={{ backgroundColor: hex }}>
                  {Math.round(p.score)}%
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#1A1A2E] truncate">{p.title}</div>
                  <div className="text-xs text-[#888]">
                    {p.creatorName} · {p.user.username} · {format(new Date(p.createdAt), 'd MMM yyyy', { locale: fr })}
                  </div>
                </div>
                <span className="font-mono text-xs text-[#888] hidden sm:inline">#{p.creationNumber}</span>
                <span className={`text-xs px-2 py-0.5 rounded border font-medium ${p.isPublic ? 'border-[#2E7D32] text-[#2E7D32]' : 'border-[#888] text-[#888]'}`}>
                  {p.isPublic ? 'Public' : 'Privé'}
                </span>
                <Link href={`/label/${p.creationNumber}`} target="_blank" className="text-[#1A3A5C] hover:text-[#0d2340]">
                  <ExternalLink size={14} />
                </Link>
                <button onClick={() => handleDelete(p.id)} className="text-[#C62828] hover:text-[#8B1A1A]">
                  <Trash2 size={14} />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
