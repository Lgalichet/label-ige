'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createCategory, updateCategory, deleteCategory } from '@/actions/categories'
import { Plus, Save, Trash2, X } from 'lucide-react'

type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  _count: { posts: number }
}

export function CategoriesClient({ initial }: { initial: Category[] }) {
  const router = useRouter()
  const [list, setList] = useState(initial)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<{ name: string; description: string }>({ name: '', description: '' })
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function startEdit(cat: Category | null) {
    if (cat) {
      setEditingId(cat.id)
      setDraft({ name: cat.name, description: cat.description ?? '' })
    } else {
      setEditingId('new')
      setDraft({ name: '', description: '' })
    }
    setError(null)
  }

  function cancel() {
    setEditingId(null)
    setDraft({ name: '', description: '' })
    setError(null)
  }

  function onSave() {
    if (!draft.name.trim()) {
      setError('Le nom est requis')
      return
    }
    startTransition(async () => {
      const payload = { name: draft.name.trim(), description: draft.description.trim() || undefined }
      const res =
        editingId === 'new'
          ? await createCategory(payload)
          : await updateCategory(editingId!, payload)
      if ('error' in res && res.error) {
        setError(res.error)
        return
      }
      cancel()
      router.refresh()
      if ('category' in res && res.category) {
        setList((prev) => {
          const others = prev.filter((c) => c.id !== res.category!.id)
          return [...others, { ...res.category!, _count: prev.find((c) => c.id === res.category!.id)?._count ?? { posts: 0 } }].sort((a, b) => a.name.localeCompare(b.name))
        })
      }
    })
  }

  function onDelete(id: string) {
    if (!confirm('Supprimer cette catégorie ? Les articles ne seront pas supprimés.')) return
    startTransition(async () => {
      await deleteCategory(id)
      setList((prev) => prev.filter((c) => c.id !== id))
      router.refresh()
    })
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-[#FFEBEE] border border-[#C62828] text-[#C62828] px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {editingId === 'new' ? (
        <EditorRow
          draft={draft}
          setDraft={setDraft}
          onSave={onSave}
          onCancel={cancel}
          isPending={isPending}
        />
      ) : (
        <button
          onClick={() => startEdit(null)}
          className="bg-[#1A3A5C] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#142f4e] transition-colors inline-flex items-center gap-2"
        >
          <Plus size={16} /> Nouvelle catégorie
        </button>
      )}

      <div className="bg-white border border-[#DEE2E6] rounded-xl overflow-hidden">
        <div className="divide-y divide-[#DEE2E6]">
          {list.length === 0 && editingId !== 'new' ? (
            <div className="p-8 text-center text-sm text-[#888]">Aucune catégorie.</div>
          ) : (
            list.map((c) =>
              editingId === c.id ? (
                <div key={c.id} className="px-5 py-3 bg-[#F8F9FA]">
                  <EditorRow
                    draft={draft}
                    setDraft={setDraft}
                    onSave={onSave}
                    onCancel={cancel}
                    isPending={isPending}
                  />
                </div>
              ) : (
                <div key={c.id} className="px-5 py-3 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#1A1A2E]">{c.name}</div>
                    <div className="text-xs text-[#888]">
                      /blog/categorie/{c.slug}
                      {c.description ? ` · ${c.description}` : ''}
                    </div>
                  </div>
                  <span className="text-xs text-[#555B6E]">
                    {c._count.posts} article{c._count.posts > 1 ? 's' : ''}
                  </span>
                  <button onClick={() => startEdit(c)} className="text-[#1A3A5C] text-xs font-medium hover:underline">
                    Modifier
                  </button>
                  <button onClick={() => onDelete(c.id)} className="text-[#C62828] hover:text-[#8B1A1A]">
                    <Trash2 size={14} />
                  </button>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  )
}

function EditorRow({
  draft,
  setDraft,
  onSave,
  onCancel,
  isPending,
}: {
  draft: { name: string; description: string }
  setDraft: (d: { name: string; description: string }) => void
  onSave: () => void
  onCancel: () => void
  isPending: boolean
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        value={draft.name}
        onChange={(e) => setDraft({ ...draft, name: e.target.value })}
        placeholder="Nom de la catégorie"
        className="flex-1 text-sm border border-[#DEE2E6] rounded-lg px-3 py-2 focus:outline-none focus:border-[#1A3A5C]"
      />
      <input
        value={draft.description}
        onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        placeholder="Description (optionnelle)"
        className="flex-1 text-sm border border-[#DEE2E6] rounded-lg px-3 py-2 focus:outline-none focus:border-[#1A3A5C]"
      />
      <button
        onClick={onSave}
        disabled={isPending}
        className="bg-[#1A3A5C] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#142f4e] inline-flex items-center gap-1 disabled:opacity-50"
      >
        <Save size={14} /> Enregistrer
      </button>
      <button
        onClick={onCancel}
        disabled={isPending}
        className="border border-[#DEE2E6] text-[#555B6E] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#F8F9FA] inline-flex items-center gap-1"
      >
        <X size={14} /> Annuler
      </button>
    </div>
  )
}
