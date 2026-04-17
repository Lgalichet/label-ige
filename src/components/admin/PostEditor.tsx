'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createPost, updatePost, deletePost } from '@/actions/posts'
import { Markdown } from '@/components/markdown'
import { Eye, Save, Trash2 } from 'lucide-react'

type PostData = {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  metaTitle: string
  metaDescription: string
  published: boolean
  categoryIds: string[]
}

type Category = { id: string; name: string }

export function PostEditor({
  initial,
  categories,
  isNew = false,
}: {
  initial: PostData
  categories: Category[]
  isNew?: boolean
}) {
  const router = useRouter()
  const [state, setState] = useState<PostData>(initial)
  const [preview, setPreview] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function set<K extends keyof PostData>(key: K, value: PostData[K]) {
    setState((s) => ({ ...s, [key]: value }))
  }

  function toggleCategory(id: string) {
    setState((s) => ({
      ...s,
      categoryIds: s.categoryIds.includes(id)
        ? s.categoryIds.filter((c) => c !== id)
        : [...s.categoryIds, id],
    }))
  }

  function onSave() {
    setError(null)
    startTransition(async () => {
      const payload = {
        title: state.title,
        slug: state.slug || undefined,
        excerpt: state.excerpt || undefined,
        content: state.content,
        coverImage: state.coverImage || undefined,
        metaTitle: state.metaTitle || undefined,
        metaDescription: state.metaDescription || undefined,
        published: state.published,
        categoryIds: state.categoryIds,
      }
      const res = isNew
        ? await createPost(payload)
        : await updatePost(state.id!, payload)
      if ('error' in res && res.error) {
        setError(res.error)
        return
      }
      if (isNew && 'post' in res && res.post) {
        router.push(`/admin/articles/${res.post.id}`)
      } else {
        router.refresh()
      }
    })
  }

  function onDelete() {
    if (!state.id) return
    if (!confirm('Supprimer définitivement cet article ?')) return
    startTransition(async () => {
      await deletePost(state.id!)
      router.push('/admin/articles')
    })
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-[#FFEBEE] border border-[#C62828] text-[#C62828] px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <input
            value={state.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="Titre de l'article"
            className="w-full text-2xl font-bold border border-[#DEE2E6] rounded-lg px-4 py-3 focus:outline-none focus:border-[#1A3A5C]"
          />

          <textarea
            value={state.excerpt}
            onChange={(e) => set('excerpt', e.target.value)}
            placeholder="Extrait (affiché dans le listing blog)"
            rows={2}
            className="w-full text-sm border border-[#DEE2E6] rounded-lg px-4 py-2 focus:outline-none focus:border-[#1A3A5C]"
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-[#555B6E] uppercase tracking-wide">Contenu (Markdown)</label>
              <button
                type="button"
                onClick={() => setPreview((p) => !p)}
                className="inline-flex items-center gap-1 text-xs text-[#1A3A5C] hover:underline"
              >
                <Eye size={12} /> {preview ? 'Éditer' : 'Aperçu'}
              </button>
            </div>
            {preview ? (
              <div className="bg-white border border-[#DEE2E6] rounded-lg p-6 min-h-[400px]">
                <Markdown>{state.content || '*(Aucun contenu)*'}</Markdown>
              </div>
            ) : (
              <textarea
                value={state.content}
                onChange={(e) => set('content', e.target.value)}
                placeholder="# Titre&#10;&#10;Contenu en markdown..."
                className="w-full min-h-[400px] font-mono text-sm border border-[#DEE2E6] rounded-lg px-4 py-3 focus:outline-none focus:border-[#1A3A5C]"
              />
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white border border-[#DEE2E6] rounded-xl p-4 space-y-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={state.published}
                onChange={(e) => set('published', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="font-medium text-[#1A1A2E]">Publié</span>
            </label>

            <button
              onClick={onSave}
              disabled={isPending || !state.title.trim()}
              className="w-full bg-[#1A3A5C] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#142f4e] transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save size={16} /> {isPending ? 'Enregistrement…' : 'Enregistrer'}
            </button>

            {!isNew && state.id && (
              <button
                onClick={onDelete}
                disabled={isPending}
                className="w-full border border-[#C62828] text-[#C62828] font-medium px-4 py-2 rounded-lg hover:bg-[#FFEBEE] transition-colors inline-flex items-center justify-center gap-2"
              >
                <Trash2 size={14} /> Supprimer
              </button>
            )}
          </div>

          <div className="bg-white border border-[#DEE2E6] rounded-xl p-4 space-y-3">
            <div>
              <label className="text-xs font-semibold text-[#555B6E] uppercase tracking-wide">URL (slug)</label>
              <div className="flex items-center mt-1">
                <span className="text-xs text-[#888]">/blog/</span>
                <input
                  value={state.slug}
                  onChange={(e) => set('slug', e.target.value)}
                  placeholder="auto"
                  className="flex-1 text-sm border border-[#DEE2E6] rounded px-2 py-1 ml-1 focus:outline-none focus:border-[#1A3A5C]"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#555B6E] uppercase tracking-wide">Image de couverture (URL)</label>
              <input
                value={state.coverImage}
                onChange={(e) => set('coverImage', e.target.value)}
                placeholder="https://..."
                className="w-full text-sm border border-[#DEE2E6] rounded px-2 py-1 mt-1 focus:outline-none focus:border-[#1A3A5C]"
              />
            </div>
          </div>

          <div className="bg-white border border-[#DEE2E6] rounded-xl p-4">
            <div className="text-xs font-semibold text-[#555B6E] uppercase tracking-wide mb-2">Catégories</div>
            {categories.length === 0 ? (
              <p className="text-xs text-[#888]">
                Aucune catégorie — créez-en dans <a href="/admin/categories" className="text-[#1A3A5C] underline">Catégories</a>.
              </p>
            ) : (
              <div className="space-y-1 max-h-40 overflow-auto">
                {categories.map((c) => (
                  <label key={c.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={state.categoryIds.includes(c.id)}
                      onChange={() => toggleCategory(c.id)}
                      className="w-4 h-4"
                    />
                    <span>{c.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border border-[#DEE2E6] rounded-xl p-4 space-y-3">
            <div className="text-xs font-semibold text-[#555B6E] uppercase tracking-wide">SEO</div>
            <div>
              <label className="text-xs text-[#555B6E]">Meta title</label>
              <input
                value={state.metaTitle}
                onChange={(e) => set('metaTitle', e.target.value)}
                className="w-full text-sm border border-[#DEE2E6] rounded px-2 py-1 mt-1 focus:outline-none focus:border-[#1A3A5C]"
              />
            </div>
            <div>
              <label className="text-xs text-[#555B6E]">Meta description</label>
              <textarea
                value={state.metaDescription}
                onChange={(e) => set('metaDescription', e.target.value)}
                rows={2}
                className="w-full text-sm border border-[#DEE2E6] rounded px-2 py-1 mt-1 focus:outline-none focus:border-[#1A3A5C]"
              />
              <div className="text-[10px] text-[#888] mt-1">{state.metaDescription.length}/160</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
