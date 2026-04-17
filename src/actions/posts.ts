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

const PostSchema = z.object({
  title: z.string().min(1, 'Titre requis').max(255),
  slug: z.string().max(255).optional(),
  excerpt: z.string().max(500).optional(),
  content: z.string().default(''),
  coverImage: z.string().url('URL invalide').optional().or(z.literal('')),
  metaTitle: z.string().max(255).optional(),
  metaDescription: z.string().max(255).optional(),
  published: z.boolean().default(false),
  categoryIds: z.array(z.string()).default([]),
})

export async function getAdminPosts() {
  await requireAdmin()
  return prisma.post.findMany({
    orderBy: [{ updatedAt: 'desc' }],
    include: {
      author: { select: { username: true } },
      categories: { select: { id: true, name: true, slug: true } },
    },
  })
}

export async function getAdminPostById(id: string) {
  await requireAdmin()
  return prisma.post.findUnique({
    where: { id },
    include: { categories: { select: { id: true } } },
  })
}

export async function createPost(data: z.infer<typeof PostSchema>) {
  const admin = await requireAdmin()
  const parsed = PostSchema.safeParse(data)
  if (!parsed.success) return { error: 'Données invalides' }

  const slugBase = parsed.data.slug?.trim() || parsed.data.title
  const slug = await uniqueSlug(slugBase, async (c) =>
    !!(await prisma.post.findUnique({ where: { slug: c } }))
  )

  const post = await prisma.post.create({
    data: {
      slug,
      title: parsed.data.title,
      excerpt: parsed.data.excerpt || null,
      content: parsed.data.content,
      coverImage: parsed.data.coverImage || null,
      metaTitle: parsed.data.metaTitle || null,
      metaDescription: parsed.data.metaDescription || null,
      published: parsed.data.published,
      publishedAt: parsed.data.published ? new Date() : null,
      authorId: admin.id,
      categories: {
        connect: parsed.data.categoryIds.map((id) => ({ id })),
      },
    },
  })

  revalidatePath('/admin/articles')
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  return { success: true, post }
}

export async function updatePost(id: string, data: z.infer<typeof PostSchema>) {
  await requireAdmin()
  const parsed = PostSchema.safeParse(data)
  if (!parsed.success) return { error: 'Données invalides' }

  const current = await prisma.post.findUnique({ where: { id } })
  if (!current) return { error: 'Article introuvable' }

  let slug = current.slug
  if (parsed.data.slug && parsed.data.slug !== current.slug) {
    const requested = slugify(parsed.data.slug)
    slug = await uniqueSlug(requested, async (c) => {
      const hit = await prisma.post.findUnique({ where: { slug: c } })
      return !!hit && hit.id !== id
    })
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      slug,
      title: parsed.data.title,
      excerpt: parsed.data.excerpt || null,
      content: parsed.data.content,
      coverImage: parsed.data.coverImage || null,
      metaTitle: parsed.data.metaTitle || null,
      metaDescription: parsed.data.metaDescription || null,
      published: parsed.data.published,
      publishedAt: parsed.data.published
        ? current.publishedAt ?? new Date()
        : null,
      categories: {
        set: parsed.data.categoryIds.map((id) => ({ id })),
      },
    },
  })

  revalidatePath('/admin/articles')
  revalidatePath('/blog')
  revalidatePath(`/blog/${current.slug}`)
  if (slug !== current.slug) revalidatePath(`/blog/${slug}`)
  return { success: true, post }
}

export async function deletePost(id: string) {
  await requireAdmin()
  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) return { error: 'Article introuvable' }

  await prisma.post.delete({ where: { id } })
  revalidatePath('/admin/articles')
  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)
  return { success: true }
}

// ==============================
// Lecture publique (posts publiés)
// ==============================

export async function getPublishedPosts(opts?: { categorySlug?: string; take?: number }) {
  const where: {
    published: true
    categories?: { some: { slug: string } }
  } = { published: true }
  if (opts?.categorySlug) {
    where.categories = { some: { slug: opts.categorySlug } }
  }

  return prisma.post.findMany({
    where,
    orderBy: { publishedAt: 'desc' },
    take: opts?.take,
    include: {
      categories: { select: { slug: true, name: true } },
      author: { select: { username: true } },
    },
  })
}

export async function getPublishedPost(slug: string) {
  return prisma.post.findFirst({
    where: { slug, published: true },
    include: {
      categories: { select: { slug: true, name: true } },
      author: { select: { username: true } },
    },
  })
}
