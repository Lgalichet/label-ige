'use server'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { slugify, uniqueSlug } from '@/lib/slug'

async function requireAdmin() {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Non authentifié')
  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user || user.role !== 'admin') throw new Error('Accès refusé')
  return user
}

const CategorySchema = z.object({
  name: z.string().min(1, 'Nom requis').max(100),
  description: z.string().max(500).optional(),
})

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { posts: true } } },
  })
}

export async function createCategory(data: z.infer<typeof CategorySchema>) {
  await requireAdmin()
  const parsed = CategorySchema.safeParse(data)
  if (!parsed.success) return { error: 'Données invalides' }

  const slug = await uniqueSlug(parsed.data.name, async (c) =>
    !!(await prisma.category.findUnique({ where: { slug: c } }))
  )

  const category = await prisma.category.create({
    data: {
      slug,
      name: parsed.data.name,
      description: parsed.data.description || null,
    },
  })

  revalidatePath('/admin/categories')
  revalidatePath('/blog')
  return { success: true, category }
}

export async function updateCategory(id: string, data: z.infer<typeof CategorySchema>) {
  await requireAdmin()
  const parsed = CategorySchema.safeParse(data)
  if (!parsed.success) return { error: 'Données invalides' }

  const current = await prisma.category.findUnique({ where: { id } })
  if (!current) return { error: 'Catégorie introuvable' }

  const newSlug = slugify(parsed.data.name)
  const slug = newSlug === current.slug
    ? current.slug
    : await uniqueSlug(parsed.data.name, async (c) => {
        const hit = await prisma.category.findUnique({ where: { slug: c } })
        return !!hit && hit.id !== id
      })

  const category = await prisma.category.update({
    where: { id },
    data: {
      name: parsed.data.name,
      slug,
      description: parsed.data.description || null,
    },
  })

  revalidatePath('/admin/categories')
  revalidatePath('/blog')
  return { success: true, category }
}

export async function deleteCategory(id: string) {
  await requireAdmin()
  await prisma.category.delete({ where: { id } })
  revalidatePath('/admin/categories')
  revalidatePath('/blog')
  return { success: true }
}
