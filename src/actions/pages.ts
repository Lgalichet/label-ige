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

const PageSchema = z.object({
  title: z.string().min(1, 'Titre requis').max(255),
  slug: z.string().max(255).optional(),
  content: z.string().default(''),
  excerpt: z.string().max(500).optional(),
  metaTitle: z.string().max(255).optional(),
  metaDescription: z.string().max(255).optional(),
  published: z.boolean().default(false),
})

export async function getAdminPages() {
  await requireAdmin()
  return prisma.page.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { author: { select: { username: true } } },
  })
}

export async function getAdminPageById(id: string) {
  await requireAdmin()
  return prisma.page.findUnique({ where: { id } })
}

export async function createPage(data: z.infer<typeof PageSchema>) {
  const admin = await requireAdmin()
  const parsed = PageSchema.safeParse(data)
  if (!parsed.success) return { error: 'Données invalides' }

  const slugBase = parsed.data.slug?.trim() || parsed.data.title
  const slug = await uniqueSlug(slugBase, async (c) =>
    !!(await prisma.page.findUnique({ where: { slug: c } }))
  )

  const page = await prisma.page.create({
    data: {
      slug,
      title: parsed.data.title,
      content: parsed.data.content,
      excerpt: parsed.data.excerpt || null,
      metaTitle: parsed.data.metaTitle || null,
      metaDescription: parsed.data.metaDescription || null,
      published: parsed.data.published,
      publishedAt: parsed.data.published ? new Date() : null,
      authorId: admin.id,
    },
  })

  revalidatePath('/admin/pages')
  revalidatePath(`/p/${slug}`)
  return { success: true, page }
}

export async function updatePage(id: string, data: z.infer<typeof PageSchema>) {
  await requireAdmin()
  const parsed = PageSchema.safeParse(data)
  if (!parsed.success) return { error: 'Données invalides' }

  const current = await prisma.page.findUnique({ where: { id } })
  if (!current) return { error: 'Page introuvable' }

  let slug = current.slug
  if (parsed.data.slug && parsed.data.slug !== current.slug) {
    const requested = slugify(parsed.data.slug)
    slug = await uniqueSlug(requested, async (c) => {
      const hit = await prisma.page.findUnique({ where: { slug: c } })
      return !!hit && hit.id !== id
    })
  }

  const page = await prisma.page.update({
    where: { id },
    data: {
      slug,
      title: parsed.data.title,
      content: parsed.data.content,
      excerpt: parsed.data.excerpt || null,
      metaTitle: parsed.data.metaTitle || null,
      metaDescription: parsed.data.metaDescription || null,
      published: parsed.data.published,
      publishedAt: parsed.data.published
        ? current.publishedAt ?? new Date()
        : null,
    },
  })

  revalidatePath('/admin/pages')
  revalidatePath(`/p/${current.slug}`)
  if (slug !== current.slug) revalidatePath(`/p/${slug}`)
  return { success: true, page }
}

export async function deletePage(id: string) {
  await requireAdmin()
  const page = await prisma.page.findUnique({ where: { id } })
  if (!page) return { error: 'Page introuvable' }

  await prisma.page.delete({ where: { id } })
  revalidatePath('/admin/pages')
  revalidatePath(`/p/${page.slug}`)
  return { success: true }
}

// ==============================
// Lecture publique (pages publiées)
// ==============================

export async function getPublishedPage(slug: string) {
  return prisma.page.findFirst({
    where: { slug, published: true },
  })
}

export async function getPublishedPageSlugs() {
  return prisma.page.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })
}
