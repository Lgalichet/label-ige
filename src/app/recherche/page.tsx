import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { getSettings } from '@/actions/admin'
import { SearchClient } from '@/components/labels/SearchClient'

export const metadata: Metadata = {
  title: 'Rechercher un label',
  description: 'Recherchez et vérifiez des labels IGE par numéro, titre ou nom de créateur.',
}

export default async function RecherchePage() {
  const [initialProjects, settings] = await Promise.all([
    prisma.project.findMany({
      where: { isPublic: true },
      take: 12,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        creationNumber: true,
        title: true,
        creatorName: true,
        creationDate: true,
        score: true,
        isPublic: true,
        createdAt: true,
        contentTypes: { select: { type: true, score: true } },
        user: { select: { username: true } },
      },
    }),
    getSettings(),
  ])

  const total = await prisma.project.count({ where: { isPublic: true } })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A2E]">Rechercher un label</h1>
        <p className="text-[#555B6E] mt-2">
          {total} label{total > 1 ? 's' : ''} public{total > 1 ? 's' : ''} disponible{total > 1 ? 's' : ''}
        </p>
      </div>
      <SearchClient initialProjects={initialProjects} settings={settings} />
    </div>
  )
}
