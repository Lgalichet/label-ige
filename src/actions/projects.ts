'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { generateCreationNumber } from '@/lib/utils'
import { calculateContentTypeScore, calculateGlobalScore } from '@/lib/score'
import { ResponseValue } from '@prisma/client'

const Step1Schema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(255),
  creatorName: z.string().min(1, 'Le nom du créateur est requis').max(255),
  creationDate: z.string().min(1, 'La date est requise'),
  creatorUrl: z.string().url('URL invalide').optional().or(z.literal('')),
  projectUrl: z.string().url('URL invalide').optional().or(z.literal('')),
  description: z.string().max(2000).optional(),
  toolsUsed: z.string().max(500).optional(),
})

const ContentTypeWeightSchema = z.object({
  type: z.enum(['texte', 'image', 'video', 'audio']),
  weight: z.number().min(1).max(100),
})

const ResponseSchema = z.object({
  questionId: z.string(),
  response: z.enum(['humain', 'partage', 'ia']),
  weighting: z.number(),
})

const CreateProjectSchema = z.object({
  step1: Step1Schema,
  contentTypes: z.array(ContentTypeWeightSchema).min(1),
  answers: z.record(z.string(), z.array(ResponseSchema)),
})

async function getOrCreateUser() {
  const { userId } = await auth()
  if (!userId) throw new Error('Non authentifié')

  const clerkUser = await currentUser()
  if (!clerkUser) throw new Error('Utilisateur introuvable')

  let user = await prisma.user.findUnique({ where: { clerkId: userId } })

  if (!user) {
    const email = clerkUser.emailAddresses[0]?.emailAddress ?? ''
    const username =
      clerkUser.username ??
      clerkUser.firstName ??
      email.split('@')[0] ??
      `user_${userId.slice(-6)}`

    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email,
        username,
      },
    })
  }

  return user
}

export async function createProject(data: z.infer<typeof CreateProjectSchema>) {
  const parsed = CreateProjectSchema.safeParse(data)
  if (!parsed.success) {
    return { error: 'Données invalides', details: parsed.error.flatten() }
  }

  const user = await getOrCreateUser()

  const { step1, contentTypes, answers } = parsed.data

  // Générer un numéro unique (retry si collision)
  let creationNumber = generateCreationNumber()
  let attempts = 0
  while (attempts < 10) {
    const existing = await prisma.project.findUnique({ where: { creationNumber } })
    if (!existing) break
    creationNumber = generateCreationNumber()
    attempts++
  }

  // Calculer les scores
  const contentTypeScores = contentTypes.map((ct) => {
    const ctAnswers = answers[ct.type] ?? []
    const score = calculateContentTypeScore(
      ctAnswers.map((a) => ({
        questionId: a.questionId,
        response: a.response as ResponseValue,
        weighting: a.weighting,
      }))
    )
    return { type: ct.type, weight: ct.weight, score }
  })

  const globalScore = calculateGlobalScore(contentTypeScores)

  // Transaction DB
  const project = await prisma.project.create({
    data: {
      userId: user.id,
      creationNumber,
      title: step1.title,
      creatorName: step1.creatorName,
      creationDate: new Date(step1.creationDate),
      creatorUrl: step1.creatorUrl || null,
      projectUrl: step1.projectUrl || null,
      description: step1.description || null,
      toolsUsed: step1.toolsUsed || null,
      score: globalScore,
      isPublic: true,
      contentTypes: {
        create: contentTypeScores.map((ct) => ({
          type: ct.type,
          weight: ct.weight,
          score: ct.score,
          responses: {
            create: (answers[ct.type] ?? []).map((a) => ({
              questionId: a.questionId,
              response: a.response as ResponseValue,
              weighting: a.weighting,
            })),
          },
        })),
      },
    },
    include: {
      contentTypes: { include: { responses: true } },
    },
  })

  revalidatePath('/espace-createur')
  revalidatePath('/recherche')

  return { success: true, project }
}

export async function updateProject(
  projectId: string,
  data: Partial<z.infer<typeof CreateProjectSchema>>
) {
  const user = await getOrCreateUser()

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId: user.id },
  })

  if (!project) return { error: 'Projet introuvable ou accès refusé' }

  const updateData: Record<string, unknown> = {}

  if (data.step1) {
    const parsed = Step1Schema.safeParse(data.step1)
    if (!parsed.success) return { error: 'Données invalides' }
    Object.assign(updateData, {
      title: parsed.data.title,
      creatorName: parsed.data.creatorName,
      creationDate: new Date(parsed.data.creationDate),
      creatorUrl: parsed.data.creatorUrl || null,
      projectUrl: parsed.data.projectUrl || null,
      description: parsed.data.description || null,
      toolsUsed: parsed.data.toolsUsed || null,
    })
  }

  const updated = await prisma.project.update({
    where: { id: projectId },
    data: updateData,
  })

  revalidatePath(`/label/${project.creationNumber}`)
  revalidatePath('/espace-createur')

  return { success: true, project: updated }
}

export async function toggleProjectVisibility(projectId: string) {
  const user = await getOrCreateUser()

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId: user.id },
  })

  if (!project) return { error: 'Projet introuvable ou accès refusé' }

  const updated = await prisma.project.update({
    where: { id: projectId },
    data: { isPublic: !project.isPublic },
  })

  revalidatePath('/espace-createur')
  revalidatePath(`/label/${project.creationNumber}`)

  return { success: true, isPublic: updated.isPublic }
}

export async function deleteProject(projectId: string) {
  const user = await getOrCreateUser()

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId: user.id },
  })

  if (!project) return { error: 'Projet introuvable ou accès refusé' }

  await prisma.project.delete({ where: { id: projectId } })

  revalidatePath('/espace-createur')
  revalidatePath('/recherche')

  return { success: true }
}

export async function getUserProjects() {
  const user = await getOrCreateUser()

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      contentTypes: true,
    },
  })

  return { projects }
}

export async function getProjectByNumber(creationNumber: string) {
  const project = await prisma.project.findUnique({
    where: { creationNumber },
    include: {
      contentTypes: {
        include: {
          responses: {
            include: { question: true },
          },
        },
      },
      user: { select: { username: true, email: true } },
    },
  })

  return project
}

export async function exportUserDataCsv() {
  const user = await getOrCreateUser()

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    include: {
      contentTypes: {
        include: {
          responses: { include: { question: true } },
        },
      },
    },
  })

  const rows: string[] = [
    'numéro,titre,créateur,date_création,score,public,url_créateur,url_projet,description,outils',
  ]

  for (const p of projects) {
    rows.push(
      [
        p.creationNumber,
        `"${p.title.replace(/"/g, '""')}"`,
        `"${p.creatorName.replace(/"/g, '""')}"`,
        p.creationDate.toISOString().split('T')[0],
        p.score.toFixed(2),
        p.isPublic ? 'oui' : 'non',
        p.creatorUrl ?? '',
        p.projectUrl ?? '',
        `"${(p.description ?? '').replace(/"/g, '""')}"`,
        `"${(p.toolsUsed ?? '').replace(/"/g, '""')}"`,
      ].join(',')
    )
  }

  return { csv: rows.join('\n'), filename: `label-ige-export-${user.id}.csv` }
}
