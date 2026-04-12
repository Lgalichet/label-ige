import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

import { getQuestionsByType } from '@/actions/questions'
import { getSettings } from '@/actions/admin'
import { LabelForm } from '@/components/forms/LabelForm'

export const metadata: Metadata = {
  title: 'Créer un label',
  description: 'Créez votre label IGE et obtenez votre badge de transparence IA.',
  robots: { index: false, follow: false },
}

export default async function CreateLabelPage() {
  const [questionsByType, settings] = await Promise.all([
    getQuestionsByType(),
    getSettings(),
  ])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A2E]">Créer un label IGE</h1>
        <p className="text-[#555B6E] mt-2">
          Certifiez la part d&apos;humain dans votre création en 4 étapes.
        </p>
      </div>
      <LabelForm questionsByType={questionsByType} settings={settings} />
    </div>
  )
}
