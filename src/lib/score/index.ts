import { ResponseValue } from '@prisma/client'

const RESPONSE_VALUES: Record<ResponseValue, number> = {
  humain: 100,
  partage: 50,
  ia: 0,
}

export interface QuestionResponse {
  questionId: string
  response: ResponseValue
  weighting: number
}

/**
 * Calcule le score pour un type de contenu
 * Score = Σ(valeur_réponse × pondération) / Σ(pondérations)
 */
export function calculateContentTypeScore(responses: QuestionResponse[]): number {
  if (responses.length === 0) return 0

  const totalWeighting = responses.reduce((sum, r) => sum + r.weighting, 0)
  if (totalWeighting === 0) return 0

  const weightedSum = responses.reduce(
    (sum, r) => sum + RESPONSE_VALUES[r.response] * r.weighting,
    0
  )

  return weightedSum / totalWeighting
}

export interface ContentTypeScore {
  type: string
  weight: number // pondération du type dans le projet (%)
  score: number
}

/**
 * Calcule le score global d'un projet multi-type
 * Score_global = Σ(score_type × weight_type) / Σ(weight_types)
 */
export function calculateGlobalScore(contentTypeScores: ContentTypeScore[]): number {
  if (contentTypeScores.length === 0) return 0

  const totalWeight = contentTypeScores.reduce((sum, ct) => sum + ct.weight, 0)
  if (totalWeight === 0) return 0

  const weightedSum = contentTypeScores.reduce(
    (sum, ct) => sum + ct.score * ct.weight,
    0
  )

  return weightedSum / totalWeight
}
