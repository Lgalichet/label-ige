import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Génère un numéro de création unique au format AAMMJJ + 3 caractères alphanumériques
 * ex: 260412ABX
 */
export function generateCreationNumber(): string {
  const now = new Date()
  const yy = String(now.getFullYear()).slice(-2)
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const random = Array.from({ length: 3 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
  return `${yy}${mm}${dd}${random}`
}

/**
 * Retourne la couleur associée au score IGE
 */
export function getScoreColor(score: number, settings?: Record<string, string>): {
  hex: string
  label: string
  mention: string
  level: 'green' | 'blue' | 'violet'
} {
  const thresholdGreen = settings?.score_threshold_green
    ? parseInt(settings.score_threshold_green)
    : 75
  const thresholdBlue = settings?.score_threshold_blue
    ? parseInt(settings.score_threshold_blue)
    : 40
  const colorGreen = settings?.color_green ?? '#2E7D32'
  const colorBlue = settings?.color_blue ?? '#1565C0'
  const colorViolet = settings?.color_violet ?? '#6A1B9A'

  if (score >= thresholdGreen) {
    return { hex: colorGreen, label: 'Principalement humain', mention: 'Principalement humain', level: 'green' }
  } else if (score >= thresholdBlue) {
    return { hex: colorBlue, label: 'Création partagée', mention: 'Création partagée', level: 'blue' }
  } else {
    return { hex: colorViolet, label: 'Principalement IA', mention: 'Principalement IA', level: 'violet' }
  }
}

export function formatScore(score: number): string {
  return `${Math.round(score)}%`
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + '…' : str
}
