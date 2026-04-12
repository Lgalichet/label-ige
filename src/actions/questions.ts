'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from '@/lib/db'

async function requireAdmin() {
  const { userId } = await auth()
  if (!userId) throw new Error('Non authentifié')

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user || user.role !== 'admin') throw new Error('Accès refusé')

  return user
}

export async function getQuestions(contentType?: string) {
  const where = contentType ? { contentType } : {}
  return prisma.question.findMany({
    where,
    orderBy: [{ contentType: 'asc' }, { sortOrder: 'asc' }],
  })
}

export async function getQuestionsByType() {
  const questions = await prisma.question.findMany({
    where: { active: true },
    orderBy: [{ contentType: 'asc' }, { sortOrder: 'asc' }],
  })

  return questions.reduce(
    (acc, q) => {
      if (!acc[q.contentType]) acc[q.contentType] = []
      acc[q.contentType].push(q)
      return acc
    },
    {} as Record<string, typeof questions>
  )
}

const QuestionSchema = z.object({
  contentType: z.enum(['texte', 'image', 'video', 'audio']),
  question: z.string().min(5).max(500),
  weighting: z.number().int().min(1).max(100),
  active: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
})

export async function createQuestion(data: z.infer<typeof QuestionSchema>) {
  await requireAdmin()

  const parsed = QuestionSchema.safeParse(data)
  if (!parsed.success) return { error: 'Données invalides' }

  // Valider que la somme des pondérations ne dépasse pas 100%
  const existing = await prisma.question.findMany({
    where: { contentType: parsed.data.contentType, active: true },
  })
  const currentSum = existing.reduce((sum, q) => sum + q.weighting, 0)
  if (currentSum + parsed.data.weighting > 100) {
    return {
      error: `La somme des pondérations dépasse 100% (actuel: ${currentSum}%). La nouvelle question ne peut pas avoir une pondération supérieure à ${100 - currentSum}%.`,
    }
  }

  const question = await prisma.question.create({ data: parsed.data })
  revalidatePath('/admin/questions')
  return { success: true, question }
}

export async function updateQuestion(id: string, data: Partial<z.infer<typeof QuestionSchema>>) {
  await requireAdmin()

  const question = await prisma.question.update({
    where: { id },
    data,
  })

  revalidatePath('/admin/questions')
  return { success: true, question }
}

export async function deleteQuestion(id: string) {
  await requireAdmin()
  await prisma.question.delete({ where: { id } })
  revalidatePath('/admin/questions')
  return { success: true }
}

export async function reorderQuestions(ids: string[]) {
  await requireAdmin()

  await Promise.all(
    ids.map((id, index) =>
      prisma.question.update({ where: { id }, data: { sortOrder: index } })
    )
  )

  revalidatePath('/admin/questions')
  return { success: true }
}
