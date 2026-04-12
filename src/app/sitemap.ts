import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const staticPages: MetadataRoute.Sitemap = [
    { url: appUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${appUrl}/comment-ca-marche`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${appUrl}/pourquoi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${appUrl}/recherche`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${appUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${appUrl}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  let labelPages: MetadataRoute.Sitemap = []
  try {
    const projects = await prisma.project.findMany({
      where: { isPublic: true },
      select: { creationNumber: true, updatedAt: true },
      orderBy: { createdAt: 'desc' },
      take: 1000,
    })
    labelPages = projects.map((p) => ({
      url: `${appUrl}/label/${p.creationNumber}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch { /* ignore si DB non disponible */ }

  return [...staticPages, ...labelPages]
}
