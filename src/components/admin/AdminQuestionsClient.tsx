'use client'

import { useState } from 'react'
import { updateQuestion, deleteQuestion } from '@/actions/questions'
import { CONTENT_TYPE_LABELS, ContentTypeKey } from '@/types'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Question {
  id: string
  contentType: string
  question: string
  weighting: number
  active: boolean
  sortOrder: number
}

export function AdminQuestionsClient({ initialQuestions }: { initialQuestions: Question[] }) {
  const [questions, setQuestions] = useState(initialQuestions)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState({ question: '', weighting: 0 })

  const grouped = questions.reduce((acc, q) => {
    if (!acc[q.contentType]) acc[q.contentType] = []
    acc[q.contentType].push(q)
    return acc
  }, {} as Record<string, Question[]>)

  async function handleToggle(id: string, active: boolean) {
    await updateQuestion(id, { active: !active })
    setQuestions((prev) => prev.map((q) => q.id === id ? { ...q, active: !active } : q))
  }

  async function handleSave(id: string) {
    await updateQuestion(id, { question: editData.question, weighting: editData.weighting })
    setQuestions((prev) => prev.map((q) => q.id === id ? { ...q, ...editData } : q))
    setEditingId(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette question ?')) return
    await deleteQuestion(id)
    setQuestions((prev) => prev.filter((q) => q.id !== id))
  }

  const contentTypes: ContentTypeKey[] = ['texte', 'image', 'video', 'audio']

  return (
    <div className="space-y-8">
      {contentTypes.map((type) => {
        const typeQuestions = grouped[type] ?? []
        const totalWeight = typeQuestions.filter((q) => q.active).reduce((s, q) => s + q.weighting, 0)

        return (
          <div key={type} className="bg-white border border-[#DEE2E6] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-[#F8F9FA] border-b border-[#DEE2E6]">
              <h2 className="font-semibold text-[#1A1A2E]">{CONTENT_TYPE_LABELS[type]}</h2>
              <span className={cn('text-sm font-semibold', totalWeight === 100 ? 'text-[#2E7D32]' : 'text-[#C62828]')}>
                Total : {totalWeight}%
              </span>
            </div>
            <div className="divide-y divide-[#DEE2E6]">
              {typeQuestions.sort((a, b) => a.sortOrder - b.sortOrder).map((q) => (
                <div key={q.id} className={cn('px-5 py-3 flex items-center gap-4', !q.active && 'opacity-50')}>
                  {editingId === q.id ? (
                    <>
                      <input
                        value={editData.question}
                        onChange={(e) => setEditData((d) => ({ ...d, question: e.target.value }))}
                        className="flex-1 border border-[#DEE2E6] rounded px-2 py-1 text-sm"
                      />
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={editData.weighting}
                        onChange={(e) => setEditData((d) => ({ ...d, weighting: parseInt(e.target.value) }))}
                        className="w-16 border border-[#DEE2E6] rounded px-2 py-1 text-sm text-right"
                      />
                      <span className="text-sm text-[#888]">%</span>
                      <button onClick={() => handleSave(q.id)} className="text-[#2E7D32] hover:text-[#1B5E20]"><Check size={16} /></button>
                      <button onClick={() => setEditingId(null)} className="text-[#888] hover:text-[#555]"><X size={16} /></button>
                    </>
                  ) : (
                    <>
                      <p className="flex-1 text-sm text-[#1A1A2E]">{q.question}</p>
                      <span className="text-sm font-semibold text-[#1A3A5C] w-10 text-right">{q.weighting}%</span>
                      <button
                        onClick={() => handleToggle(q.id, q.active)}
                        className={cn('text-xs px-2 py-0.5 rounded font-medium border', q.active ? 'border-[#2E7D32] text-[#2E7D32]' : 'border-[#888] text-[#888]')}
                      >
                        {q.active ? 'Actif' : 'Inactif'}
                      </button>
                      <button
                        onClick={() => { setEditingId(q.id); setEditData({ question: q.question, weighting: q.weighting }) }}
                        className="text-[#1A3A5C] hover:text-[#0d2340]"
                      >
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(q.id)} className="text-[#C62828] hover:text-[#8B1A1A]">
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
