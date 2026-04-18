'use server'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from '@/lib/db'

const ProfileSchema = z.object({
  username: z
    .string()
    .min(2, 'Pseudo trop court')
    .max(30)
    .regex(/^[a-z0-9_]+$/, 'Lettres minuscules, chiffres ou _ uniquement'),
  firstName: z.string().max(60).optional().or(z.literal('')),
  lastName: z.string().max(60).optional().or(z.literal('')),
  avatarUrl: z.string().url('URL invalide').max(500).optional().or(z.literal('')),
  company: z.string().max(120).optional().or(z.literal('')),
  jobTitle: z.string().max(120).optional().or(z.literal('')),
  bio: z.string().max(800).optional().or(z.literal('')),
  website: z.string().url('URL invalide').max(255).optional().or(z.literal('')),
})

export type ProfileInput = z.infer<typeof ProfileSchema>

export async function getMyProfile() {
  const session = await auth()
  if (!session?.user?.id) return null
  return prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
      company: true,
      jobTitle: true,
      bio: true,
      website: true,
      role: true,
      createdAt: true,
    },
  })
}

export async function updateMyProfile(data: ProfileInput) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Non authentifié' }

  const parsed = ProfileSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || 'Données invalides' }
  }

  const d = parsed.data

  // Vérifier l'unicité du username s'il change
  const current = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { username: true },
  })
  if (!current) return { error: 'Utilisateur introuvable' }

  if (d.username !== current.username) {
    const taken = await prisma.user.findUnique({ where: { username: d.username } })
    if (taken) return { error: 'Ce pseudo est déjà pris' }
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      username: d.username,
      firstName: d.firstName || null,
      lastName: d.lastName || null,
      avatarUrl: d.avatarUrl || null,
      company: d.company || null,
      jobTitle: d.jobTitle || null,
      bio: d.bio || null,
      website: d.website || null,
    },
  })

  revalidatePath('/espace-createur')
  revalidatePath('/espace-createur/profil')
  return { success: true }
}
