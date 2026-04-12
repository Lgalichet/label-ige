import { ResponseValue, UserRole } from '@prisma/client'

export type { ResponseValue, UserRole }

export const CONTENT_TYPES = ['texte', 'image', 'video', 'audio'] as const
export type ContentTypeKey = typeof CONTENT_TYPES[number]

export const CONTENT_TYPE_LABELS: Record<ContentTypeKey, string> = {
  texte: 'Texte',
  image: 'Image',
  video: 'Vidéo',
  audio: 'Audio / Podcast',
}

export const RESPONSE_LABELS: Record<ResponseValue, string> = {
  humain: 'Humain',
  partage: 'Partagé',
  ia: 'IA',
}

export interface FormStep1Data {
  title: string
  creatorName: string
  creationDate: string
  creatorUrl?: string
  projectUrl?: string
  description?: string
  toolsUsed?: string
}

export interface ContentTypeSelection {
  type: ContentTypeKey
  weight: number // en %
}

export interface FormStep2Data {
  contentTypes: ContentTypeSelection[]
}

export interface QuestionAnswer {
  questionId: string
  question: string
  weighting: number
  response: ResponseValue | null
}

export interface FormStep3Data {
  answers: Record<ContentTypeKey, QuestionAnswer[]>
}

export interface LabelFormData {
  step1: FormStep1Data
  step2: FormStep2Data
  step3: FormStep3Data
}

export interface ProjectWithDetails {
  id: string
  creationNumber: string
  title: string
  creatorName: string
  creationDate: Date
  creatorUrl: string | null
  projectUrl: string | null
  description: string | null
  toolsUsed: string | null
  score: number
  isPublic: boolean
  createdAt: Date
  contentTypes: {
    id: string
    type: string
    weight: number
    score: number
    responses: {
      id: string
      response: ResponseValue
      weighting: number
      question: {
        id: string
        question: string
        contentType: string
      }
    }[]
  }[]
  user: {
    username: string
    email: string
  }
}

export interface SearchFilters {
  query?: string
  contentType?: ContentTypeKey | 'all'
  scoreMin?: number
  scoreMax?: number
  dateFrom?: string
  dateTo?: string
  page?: number
  perPage?: number
}
