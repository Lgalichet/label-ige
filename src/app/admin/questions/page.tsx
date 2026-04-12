import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

import { getQuestions } from '@/actions/questions'
import { AdminQuestionsClient } from '@/components/admin/AdminQuestionsClient'

export const metadata: Metadata = { title: 'Gestion des questions — Admin' }

export default async function AdminQuestionsPage() {
  const questions = await getQuestions()

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-8">Gestion des questions</h1>
      <AdminQuestionsClient initialQuestions={questions} />
    </div>
  )
}
