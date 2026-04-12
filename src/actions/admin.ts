'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'

async function requireAdmin() {
  const { userId } = await auth()
  if (!userId) throw new Error('Non authentifié')

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user || user.role !== 'admin') throw new Error('Accès refusé')

  return user
}

export async function getAdminStats() {
  await requireAdmin()

  const [totalProjects, totalUsers, avgScoreResult, recentProjects] = await Promise.all([
    prisma.project.count(),
    prisma.user.count(),
    prisma.project.aggregate({ _avg: { score: true } }),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { username: true } } },
    }),
  ])

  return {
    totalProjects,
    totalUsers,
    avgScore: avgScoreResult._avg.score ?? 0,
    recentProjects,
  }
}

export async function getAllProjects(page = 1, perPage = 20, query?: string) {
  await requireAdmin()

  const where = query
    ? {
        OR: [
          { title: { contains: query, mode: 'insensitive' as const } },
          { creatorName: { contains: query, mode: 'insensitive' as const } },
          { creationNumber: { contains: query, mode: 'insensitive' as const } },
        ],
      }
    : {}

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { username: true, email: true } } },
    }),
    prisma.project.count({ where }),
  ])

  return { projects, total, pages: Math.ceil(total / perPage) }
}

export async function adminDeleteProject(projectId: string) {
  await requireAdmin()
  await prisma.project.delete({ where: { id: projectId } })
  revalidatePath('/admin/projets')
  return { success: true }
}

export async function getAllUsers(page = 1, perPage = 20) {
  await requireAdmin()

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { projects: true } } },
    }),
    prisma.user.count(),
  ])

  return { users, total, pages: Math.ceil(total / perPage) }
}

export async function updateUserRole(userId: string, role: 'user' | 'admin') {
  await requireAdmin()

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
  })

  revalidatePath('/admin/utilisateurs')
  return { success: true, user }
}

export async function adminDeleteUser(userId: string) {
  const admin = await requireAdmin()
  if (admin.id === userId) return { error: 'Vous ne pouvez pas supprimer votre propre compte' }

  await prisma.user.delete({ where: { id: userId } })
  revalidatePath('/admin/utilisateurs')
  return { success: true }
}

export async function getSettings() {
  const settings = await prisma.setting.findMany()
  return settings.reduce(
    (acc, s) => ({ ...acc, [s.key]: s.value }),
    {} as Record<string, string>
  )
}

export async function updateSettings(data: Record<string, string>) {
  await requireAdmin()

  await Promise.all(
    Object.entries(data).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    )
  )

  revalidatePath('/admin/parametres')
  revalidatePath('/')
  return { success: true }
}
