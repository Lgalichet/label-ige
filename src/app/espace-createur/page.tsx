import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { getSettings } from '@/actions/admin'
import { LabelCard } from '@/components/labels/LabelCard'
import { exportUserDataCsv } from '@/actions/projects'
import { DashboardActions } from '@/components/labels/DashboardActions'
import { Plus, BarChart2, Hash } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mon espace créateur',
  robots: { index: false, follow: false },
}

export default async function CreatorDashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      projects: {
        orderBy: { createdAt: 'desc' },
        include: { contentTypes: { select: { type: true, score: true } } },
      },
    },
  })

  if (!user) redirect('/connexion')

  const settings = await getSettings()

  const avgScore = user.projects.length > 0
    ? user.projects.reduce((s, p) => s + p.score, 0) / user.projects.length
    : 0

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A2E]">Mon espace créateur</h1>
          <p className="text-[#555B6E] mt-1">Bonjour, <strong>{user.username}</strong></p>
        </div>
        <Link
          href="/creer"
          className="bg-[#1A3A5C] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#142f4e] transition-colors inline-flex items-center gap-2"
        >
          <Plus size={18} /> Créer un label
        </Link>
      </div>

      {/* Compteurs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-[#DEE2E6] rounded-xl p-4">
          <div className="flex items-center gap-2 text-[#555B6E] text-sm mb-1">
            <Hash size={14} /> Labels créés
          </div>
          <div className="text-3xl font-bold text-[#1A3A5C]">{user.projects.length}</div>
        </div>
        <div className="bg-white border border-[#DEE2E6] rounded-xl p-4">
          <div className="flex items-center gap-2 text-[#555B6E] text-sm mb-1">
            <BarChart2 size={14} /> Score moyen
          </div>
          <div className="text-3xl font-bold text-[#1A3A5C]">
            {user.projects.length > 0 ? `${Math.round(avgScore)}%` : '—'}
          </div>
        </div>
        <div className="bg-white border border-[#DEE2E6] rounded-xl p-4 col-span-2 sm:col-span-1">
          <div className="text-[#555B6E] text-sm mb-1">Export RGPD</div>
          <DashboardActions />
        </div>
      </div>

      {/* Liste des labels */}
      {user.projects.length === 0 ? (
        <div className="bg-white border border-[#DEE2E6] rounded-xl p-12 text-center">
          <div className="text-4xl mb-4">🎨</div>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-2">Aucun label créé</h2>
          <p className="text-[#555B6E] mb-6">
            Créez votre premier label pour certifier la part d&apos;humain dans vos créations.
          </p>
          <Link
            href="/creer"
            className="bg-[#1A3A5C] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#142f4e] transition-colors inline-flex items-center gap-2"
          >
            <Plus size={18} /> Créer mon premier label
          </Link>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4">Mes labels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.projects.map((project) => (
              <div key={project.id} className="relative group">
                <LabelCard project={project} settings={settings} showVisibility />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
