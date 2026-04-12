'use client'

import { useState, useCallback, useTransition } from 'react'
import { LabelCard } from './LabelCard'
import { CONTENT_TYPE_LABELS, ContentTypeKey } from '@/types'
import { Search, Filter } from 'lucide-react'

interface Project {
  id: string
  creationNumber: string
  title: string
  creatorName: string
  creationDate: Date | string
  score: number
  isPublic: boolean
  createdAt: Date | string
  contentTypes: { type: string; score: number }[]
}

interface SearchClientProps {
  initialProjects: Project[]
  settings?: Record<string, string>
}

export function SearchClient({ initialProjects, settings }: SearchClientProps) {
  const [projects, setProjects] = useState(initialProjects)
  const [total, setTotal] = useState(initialProjects.length)
  const [query, setQuery] = useState('')
  const [contentType, setContentType] = useState('all')
  const [scoreMin, setScoreMin] = useState(0)
  const [scoreMax, setScoreMax] = useState(100)
  const [page, setPage] = useState(1)
  const [isPending, startTransition] = useTransition()

  const search = useCallback(
    (params: {
      q?: string
      type?: string
      scoreMin?: number
      scoreMax?: number
      p?: number
    }) => {
      startTransition(async () => {
        const searchParams = new URLSearchParams({
          q: params.q ?? query,
          type: params.type ?? contentType,
          scoreMin: String(params.scoreMin ?? scoreMin),
          scoreMax: String(params.scoreMax ?? scoreMax),
          page: String(params.p ?? page),
          perPage: '12',
        })
        const res = await fetch(`/api/search?${searchParams}`)
        const data = await res.json()
        if (params.p && params.p > 1) {
          setProjects((prev) => [...prev, ...data.projects])
        } else {
          setProjects(data.projects)
        }
        setTotal(data.total)
      })
    },
    [query, contentType, scoreMin, scoreMax, page]
  )

  function handleSearch(q: string) {
    setQuery(q)
    setPage(1)
    search({ q, p: 1 })
  }

  function handleTypeFilter(type: string) {
    setContentType(type)
    setPage(1)
    search({ type, p: 1 })
  }

  function loadMore() {
    const nextPage = page + 1
    setPage(nextPage)
    search({ p: nextPage })
  }

  const hasMore = projects.length < total

  return (
    <div>
      {/* Barre de recherche */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Rechercher par numéro, titre, créateur..."
            className="w-full bg-white border border-[#DEE2E6] rounded-lg pl-9 pr-4 py-2.5 text-sm focus:border-[#1A3A5C] focus:ring-2 focus:ring-[#1A3A5C]/20 outline-none"
          />
        </div>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex items-center gap-1.5 text-sm text-[#555B6E]">
          <Filter size={14} />
          <span>Type :</span>
        </div>
        {(['all', ...(['texte', 'image', 'video', 'audio'] as ContentTypeKey[])]).map((type) => (
          <button
            key={type}
            onClick={() => handleTypeFilter(type)}
            className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
              contentType === type
                ? 'bg-[#1A3A5C] text-white border-[#1A3A5C]'
                : 'bg-white text-[#555B6E] border-[#DEE2E6] hover:border-[#1A3A5C]/40'
            }`}
          >
            {type === 'all' ? 'Tous' : CONTENT_TYPE_LABELS[type as ContentTypeKey]}
          </button>
        ))}
      </div>

      {/* Résultats */}
      {isPending && projects.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-[#DEE2E6] rounded-xl h-28 animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white border border-[#DEE2E6] rounded-xl p-12 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">Aucun résultat</h2>
          <p className="text-[#555B6E] text-sm">Essayez d&apos;autres termes de recherche ou modifiez les filtres.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-[#888] mb-4">{total} résultat{total > 1 ? 's' : ''}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project) => (
              <LabelCard key={project.id} project={project} settings={settings} />
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                disabled={isPending}
                className="border border-[#1A3A5C] text-[#1A3A5C] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#E8EEF4] transition-colors disabled:opacity-50"
              >
                {isPending ? 'Chargement…' : 'Charger plus'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
