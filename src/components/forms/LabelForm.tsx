'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createProject } from '@/actions/projects'
import { BadgeDisplay } from '@/components/labels/BadgeDisplay'
import { getScoreColor, formatScore } from '@/lib/utils'
import { calculateContentTypeScore, calculateGlobalScore } from '@/lib/score'
import { CONTENT_TYPE_LABELS, ContentTypeKey, RESPONSE_LABELS, ResponseValue } from '@/types'
import { ChevronRight, ChevronLeft, Check, Download, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Question {
  id: string
  question: string
  weighting: number
  contentType: string
}

interface LabelFormProps {
  questionsByType: Record<string, Question[]>
  settings?: Record<string, string>
}

const Step1Schema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(255),
  creatorName: z.string().min(1, 'Le nom du créateur est requis').max(255),
  creationDate: z.string().min(1, 'La date est requise'),
  creatorUrl: z.string().url('URL invalide').optional().or(z.literal('')),
  projectUrl: z.string().url('URL invalide').optional().or(z.literal('')),
  description: z.string().max(2000).optional(),
  toolsUsed: z.string().max(500).optional(),
})

type Step1Data = z.infer<typeof Step1Schema>

const CONTENT_TYPES: ContentTypeKey[] = ['texte', 'image', 'video', 'audio']

export function LabelForm({ questionsByType, settings }: LabelFormProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ creationNumber: string; score: number } | null>(null)

  // Step 2 — sélection types + pondérations
  const [selectedTypes, setSelectedTypes] = useState<ContentTypeKey[]>([])
  const [typeWeights, setTypeWeights] = useState<Record<ContentTypeKey, number>>({
    texte: 25, image: 25, video: 25, audio: 25,
  })

  // Step 3 — réponses aux questions
  const [answers, setAnswers] = useState<Record<string, Record<string, ResponseValue>>>({})

  // Persistance localStorage
  const STORAGE_KEY = 'label-ige-form-draft'

  const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<Step1Data>({
    resolver: zodResolver(Step1Schema),
  })

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        if (data.step1) {
          Object.entries(data.step1).forEach(([k, v]) => setValue(k as keyof Step1Data, v as string))
        }
        if (data.selectedTypes) setSelectedTypes(data.selectedTypes)
        if (data.typeWeights) setTypeWeights(data.typeWeights)
        if (data.answers) setAnswers(data.answers)
      }
    } catch { /* ignore */ }
  }, [setValue])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        step1: getValues(),
        selectedTypes,
        typeWeights,
        answers,
      }))
    } catch { /* ignore */ }
  }, [selectedTypes, typeWeights, answers, getValues])

  // Calcul score preview
  const previewScores = selectedTypes.map((type) => {
    const typeAnswers = Object.entries(answers[type] ?? {}).map(([qId, response]) => {
      const q = questionsByType[type]?.find((q) => q.id === qId)
      return { questionId: qId, response, weighting: q?.weighting ?? 0 }
    })
    return {
      type,
      weight: typeWeights[type] ?? 0,
      score: calculateContentTypeScore(typeAnswers),
    }
  })
  const globalScore = calculateGlobalScore(previewScores)
  const { hex: scoreColor, mention } = getScoreColor(globalScore, settings)

  // Validation step 2
  const weightSum = selectedTypes.reduce((s, t) => s + (typeWeights[t] ?? 0), 0)
  const step2Valid = selectedTypes.length > 0 && weightSum === 100

  // Validation step 3
  const step3Valid = selectedTypes.every((type) => {
    const questions = questionsByType[type] ?? []
    const typeAnswers = answers[type] ?? {}
    return questions.every((q) => typeAnswers[q.id] !== undefined)
  })

  function toggleType(type: ContentTypeKey) {
    setSelectedTypes((prev) => {
      const next = prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
      // Redistribuer les pondérations équitablement
      if (next.length > 0) {
        const base = Math.floor(100 / next.length)
        const remainder = 100 - base * next.length
        const newWeights = { ...typeWeights }
        next.forEach((t, i) => {
          newWeights[t] = base + (i === 0 ? remainder : 0)
        })
        setTypeWeights(newWeights)
      }
      return next
    })
  }

  function setAnswer(type: ContentTypeKey, questionId: string, response: ResponseValue) {
    setAnswers((prev) => ({
      ...prev,
      [type]: { ...(prev[type] ?? {}), [questionId]: response },
    }))
  }

  async function onSubmit(step1: Step1Data) {
    setIsSubmitting(true)
    setError(null)

    const contentTypesData = selectedTypes.map((type) => ({
      type,
      weight: typeWeights[type] ?? 0,
    }))

    const answersData: Record<string, { questionId: string; response: 'humain' | 'partage' | 'ia'; weighting: number }[]> = {}
    for (const type of selectedTypes) {
      answersData[type] = Object.entries(answers[type] ?? {}).map(([qId, response]) => {
        const q = questionsByType[type]?.find((q) => q.id === qId)
        return { questionId: qId, response: response as 'humain' | 'partage' | 'ia', weighting: q?.weighting ?? 0 }
      })
    }

    const res = await createProject({
      step1,
      contentTypes: contentTypesData,
      answers: answersData,
    })

    setIsSubmitting(false)

    if (res.error) {
      setError(res.error)
      return
    }

    if (res.project) {
      localStorage.removeItem(STORAGE_KEY)
      setResult({ creationNumber: res.project.creationNumber, score: res.project.score })
      setStep(4)
    }
  }

  const steps = ['Informations', 'Type de création', 'Questionnaire', 'Résultat']

  return (
    <div className="max-w-3xl mx-auto">
      {/* Indicateur de progression */}
      {step < 4 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.slice(0, 3).map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors',
                  i + 1 < step ? 'bg-[#2E7D32] border-[#2E7D32] text-white' :
                  i + 1 === step ? 'bg-[#1A3A5C] border-[#1A3A5C] text-white' :
                  'bg-white border-[#DEE2E6] text-[#888]'
                )}>
                  {i + 1 < step ? <Check size={14} /> : i + 1}
                </div>
                <span className={cn(
                  'ml-2 text-sm font-medium hidden sm:inline',
                  i + 1 === step ? 'text-[#1A3A5C]' : 'text-[#888]'
                )}>{s}</span>
                {i < 2 && <div className="mx-3 flex-1 h-0.5 bg-[#DEE2E6] hidden sm:block w-12" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ÉTAPE 1 */}
      {step === 1 && (
        <form onSubmit={handleSubmit(() => setStep(2))} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">Informations générales</h2>
            <p className="text-[#555B6E]">Décrivez votre création</p>
          </div>

          <div className="bg-[#E8EEF4] border border-[#1A3A5C]/20 rounded-lg p-3 text-sm text-[#1A3A5C]">
            Le numéro de création unique sera généré automatiquement.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
                Titre / Nom du projet <span className="text-[#C62828]">*</span>
              </label>
              <input
                {...register('title')}
                className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded-lg px-3 py-2 text-sm focus:border-[#1A3A5C] focus:ring-2 focus:ring-[#1A3A5C]/20 outline-none"
                placeholder="Ex : Article sur l'IA générative"
              />
              {errors.title && <p className="text-[#C62828] text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
                Nom du créateur <span className="text-[#C62828]">*</span>
              </label>
              <input
                {...register('creatorName')}
                className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded-lg px-3 py-2 text-sm focus:border-[#1A3A5C] focus:ring-2 focus:ring-[#1A3A5C]/20 outline-none"
                placeholder="Votre nom ou celui de votre société"
              />
              {errors.creatorName && <p className="text-[#C62828] text-xs mt-1">{errors.creatorName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
                Date de création <span className="text-[#C62828]">*</span>
              </label>
              <input
                type="date"
                {...register('creationDate')}
                className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded-lg px-3 py-2 text-sm focus:border-[#1A3A5C] focus:ring-2 focus:ring-[#1A3A5C]/20 outline-none"
              />
              {errors.creationDate && <p className="text-[#C62828] text-xs mt-1">{errors.creationDate.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1">URL du créateur</label>
              <input
                {...register('creatorUrl')}
                className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded-lg px-3 py-2 text-sm focus:border-[#1A3A5C] focus:ring-2 focus:ring-[#1A3A5C]/20 outline-none"
                placeholder="https://votre-site.com"
              />
              {errors.creatorUrl && <p className="text-[#C62828] text-xs mt-1">{errors.creatorUrl.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1">URL de la création publiée</label>
              <input
                {...register('projectUrl')}
                className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded-lg px-3 py-2 text-sm focus:border-[#1A3A5C] focus:ring-2 focus:ring-[#1A3A5C]/20 outline-none"
                placeholder="https://lien-vers-votre-creation.com"
              />
              {errors.projectUrl && <p className="text-[#C62828] text-xs mt-1">{errors.projectUrl.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Description du projet</label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded-lg px-3 py-2 text-sm focus:border-[#1A3A5C] focus:ring-2 focus:ring-[#1A3A5C]/20 outline-none resize-none"
                placeholder="Contexte, objectifs, présentation de la création..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Outils IA utilisés</label>
              <input
                {...register('toolsUsed')}
                className="w-full bg-[#F8F9FA] border border-[#DEE2E6] rounded-lg px-3 py-2 text-sm focus:border-[#1A3A5C] focus:ring-2 focus:ring-[#1A3A5C]/20 outline-none"
                placeholder="Ex : ChatGPT, Midjourney, ElevenLabs..."
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-[#1A3A5C] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[#142f4e] transition-colors flex items-center gap-2"
            >
              Suivant <ChevronRight size={18} />
            </button>
          </div>
        </form>
      )}

      {/* ÉTAPE 2 */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">Type de création</h2>
            <p className="text-[#555B6E]">Sélectionnez les types de contenu concernés</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CONTENT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={cn(
                  'border-2 rounded-xl p-4 text-sm font-semibold transition-all',
                  selectedTypes.includes(type)
                    ? 'border-[#1A3A5C] bg-[#E8EEF4] text-[#1A3A5C]'
                    : 'border-[#DEE2E6] bg-white text-[#555B6E] hover:border-[#1A3A5C]/40'
                )}
              >
                {selectedTypes.includes(type) && <Check size={14} className="mx-auto mb-1" />}
                {CONTENT_TYPE_LABELS[type]}
              </button>
            ))}
          </div>

          {selectedTypes.length > 1 && (
            <div className="bg-white border border-[#DEE2E6] rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[#1A1A2E] text-sm">Pondération des types</h3>
                <span className={cn('text-sm font-medium', weightSum === 100 ? 'text-[#2E7D32]' : 'text-[#C62828]')}>
                  Total : {weightSum}%
                </span>
              </div>
              {selectedTypes.map((type) => (
                <div key={type} className="flex items-center gap-3">
                  <span className="text-sm text-[#555B6E] w-32 shrink-0">{CONTENT_TYPE_LABELS[type]}</span>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={typeWeights[type] ?? 0}
                    onChange={(e) => setTypeWeights((prev) => ({ ...prev, [type]: parseInt(e.target.value) }))}
                    className="flex-1 accent-[#1A3A5C]"
                  />
                  <span className="text-sm font-semibold text-[#1A3A5C] w-10 text-right">{typeWeights[type]}%</span>
                </div>
              ))}
              {weightSum !== 100 && (
                <p className="text-[#C62828] text-xs">La somme des pondérations doit être égale à 100%</p>
              )}
            </div>
          )}

          {selectedTypes.length === 0 && (
            <p className="text-[#555B6E] text-sm">Sélectionnez au moins un type de contenu pour continuer.</p>
          )}

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(1)} className="border border-[#DEE2E6] text-[#555B6E] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#F8F9FA] transition-colors flex items-center gap-2">
              <ChevronLeft size={18} /> Retour
            </button>
            <button
              disabled={!step2Valid}
              onClick={() => setStep(3)}
              className="bg-[#1A3A5C] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[#142f4e] transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Suivant <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 3 */}
      {step === 3 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">Questionnaire</h2>
            <p className="text-[#555B6E]">Pour chaque tâche, indiquez qui l&apos;a réalisée</p>
          </div>

          {/* Score en temps réel */}
          {selectedTypes.length > 0 && (
            <div className="flex items-center gap-4 bg-white border border-[#DEE2E6] rounded-xl p-4">
              <BadgeDisplay
                score={globalScore}
                creationNumber="preview"
                colorHex={scoreColor}
                mention={mention}
                size="sm"
              />
              <div>
                <div className="text-sm text-[#555B6E]">Score en temps réel</div>
                <div className="text-2xl font-bold" style={{ color: scoreColor }}>{formatScore(globalScore)}</div>
                <div className="text-sm font-medium text-[#555B6E]">{mention}</div>
              </div>
            </div>
          )}

          {selectedTypes.map((type) => (
            <div key={type} className="bg-white border border-[#DEE2E6] rounded-xl overflow-hidden">
              <div className="bg-[#1A3A5C] text-white px-4 py-3 font-semibold text-sm">
                {CONTENT_TYPE_LABELS[type]}
              </div>
              <div className="divide-y divide-[#DEE2E6]">
                {(questionsByType[type] ?? []).map((q) => (
                  <div key={q.id} className="p-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <p className="text-sm text-[#1A1A2E] font-medium leading-snug">{q.question}</p>
                      <span className="text-xs bg-[#E8EEF4] text-[#1A3A5C] px-2 py-0.5 rounded shrink-0 font-semibold">{q.weighting}%</span>
                    </div>
                    <div className="flex gap-2">
                      {(['humain', 'partage', 'ia'] as ResponseValue[]).map((val) => (
                        <button
                          key={val}
                          onClick={() => setAnswer(type, q.id, val)}
                          className={cn(
                            'flex-1 py-2 px-3 rounded-lg border-2 text-xs font-semibold transition-all',
                            answers[type]?.[q.id] === val
                              ? val === 'humain' ? 'border-[#2E7D32] bg-[#E8F5E9] text-[#2E7D32]'
                              : val === 'partage' ? 'border-[#1565C0] bg-[#E3F2FD] text-[#1565C0]'
                              : 'border-[#6A1B9A] bg-[#F3E5F5] text-[#6A1B9A]'
                              : 'border-[#DEE2E6] text-[#555B6E] hover:border-[#1A3A5C]/30'
                          )}
                        >
                          {RESPONSE_LABELS[val]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>
          )}

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(2)} className="border border-[#DEE2E6] text-[#555B6E] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#F8F9FA] transition-colors flex items-center gap-2">
              <ChevronLeft size={18} /> Retour
            </button>
            <button
              disabled={!step3Valid || isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="bg-[#1A3A5C] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[#142f4e] transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Génération…' : 'Générer mon badge'}
              {!isSubmitting && <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 4 — RÉSULTAT */}
      {step === 4 && result && (
        <div className="space-y-8 text-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#2E7D32] text-sm font-semibold px-3 py-1.5 rounded-full mb-4">
              <Check size={14} /> Label créé avec succès
            </div>
            <h2 className="text-3xl font-bold text-[#1A1A2E] mb-2">Votre badge est prêt !</h2>
            <p className="text-[#555B6E]">Numéro de création : <span className="font-mono font-semibold text-[#1A3A5C]">{result.creationNumber}</span></p>
          </div>

          <div className="flex justify-center">
            <BadgeDisplay
              score={result.score}
              creationNumber={result.creationNumber}
              colorHex={getScoreColor(result.score, settings).hex}
              mention={getScoreColor(result.score, settings).mention}
              size="lg"
            />
          </div>

          <div className="text-4xl font-black" style={{ color: getScoreColor(result.score, settings).hex }}>
            {formatScore(result.score)}
          </div>
          <div className="text-lg font-semibold text-[#555B6E]">{getScoreColor(result.score, settings).label}</div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`/api/badge/${result.creationNumber}`}
              download={`badge-ige-${result.creationNumber}.png`}
              className="bg-[#1A3A5C] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#142f4e] transition-colors inline-flex items-center justify-center gap-2"
            >
              <Download size={18} /> Télécharger le badge PNG
            </a>
            <a
              href={`/label/${result.creationNumber}`}
              className="border border-[#1A3A5C] text-[#1A3A5C] font-semibold px-6 py-3 rounded-lg hover:bg-[#E8EEF4] transition-colors inline-flex items-center justify-center gap-2"
            >
              <Share2 size={18} /> Voir la page publique
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setStep(1)
                setSelectedTypes([])
                setAnswers({})
                setResult(null)
              }}
              className="text-[#555B6E] font-medium hover:text-[#1A1A2E] text-sm"
            >
              Créer un autre label
            </button>
            <button
              onClick={() => router.push('/espace-createur')}
              className="text-[#1A3A5C] font-medium hover:underline text-sm"
            >
              Voir mon espace créateur
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
