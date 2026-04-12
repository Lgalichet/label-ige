import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { getSettings } from '@/actions/admin'
import { BadgeDisplay } from '@/components/labels/BadgeDisplay'
import { getScoreColor, formatScore } from '@/lib/utils'
import { CONTENT_TYPE_LABELS, RESPONSE_LABELS, ContentTypeKey, ResponseValue } from '@/types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ExternalLink, Share2, Download } from 'lucide-react'

interface PageProps {
  params: Promise<{ number: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { number } = await params
  const project = await prisma.project.findUnique({ where: { creationNumber: number } })
  if (!project || !project.isPublic) return { title: 'Label introuvable' }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''

  return {
    title: `${project.title} — Label IGE #${number}`,
    description: `Label IGE certifié pour "${project.title}" par ${project.creatorName}. Score : ${Math.round(project.score)}%.`,
    openGraph: {
      title: `${project.title} — Label IGE`,
      description: `Score IGE : ${Math.round(project.score)}% — par ${project.creatorName}`,
      images: [{ url: `${appUrl}/api/og/${number}`, width: 1200, height: 630 }],
    },
  }
}

export default async function LabelPublicPage({ params }: PageProps) {
  const { number } = await params

  const [project, settings] = await Promise.all([
    prisma.project.findUnique({
      where: { creationNumber: number },
      include: {
        contentTypes: {
          include: {
            responses: { include: { question: true } },
          },
        },
        user: { select: { username: true } },
      },
    }),
    getSettings(),
  ])

  if (!project) notFound()
  if (!project.isPublic) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-4">Ce label est privé</h1>
        <p className="text-[#555B6E]">Le créateur a choisi de ne pas rendre ce label public.</p>
        <Link href="/recherche" className="mt-6 inline-block text-[#1A3A5C] hover:underline font-medium">
          Rechercher d&apos;autres labels
        </Link>
      </div>
    )
  }

  const { hex, mention, label: levelLabel } = getScoreColor(project.score, settings)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
  const shareUrl = `${appUrl}/label/${number}`
  const shareText = `J'ai certifié ma création avec le Label IGE — Score : ${Math.round(project.score)}%. Retrouvez mon label ici : ${shareUrl}`

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* En-tête */}
      <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 sm:p-8 mb-6 flex flex-col sm:flex-row gap-6">
        <BadgeDisplay
          score={project.score}
          creationNumber={number}
          colorHex={hex}
          mention={mention}
          size="lg"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs text-[#888] bg-[#F8F9FA] px-2 py-0.5 rounded border border-[#DEE2E6]">
              #{project.creationNumber}
            </span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: hex }}
            >
              {levelLabel}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-1">{project.title}</h1>
          <p className="text-[#555B6E] mb-3">
            par <span className="font-semibold text-[#1A1A2E]">{project.creatorName}</span>
            {' · '}
            {format(new Date(project.creationDate), 'd MMMM yyyy', { locale: fr })}
          </p>

          <div className="text-5xl font-black mb-2" style={{ color: hex }}>
            {formatScore(project.score)}
          </div>
          <div className="text-[#555B6E] font-medium">{mention}</div>

          {project.description && (
            <p className="text-sm text-[#555B6E] mt-4 leading-relaxed">{project.description}</p>
          )}

          {project.toolsUsed && (
            <p className="text-xs text-[#888] mt-2">
              <span className="font-medium">Outils utilisés :</span> {project.toolsUsed}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            {project.creatorUrl && (
              <a
                href={project.creatorUrl}
                rel="nofollow noreferrer noopener"
                target="_blank"
                className="text-xs text-[#1A3A5C] hover:underline flex items-center gap-1"
              >
                <ExternalLink size={12} /> Site du créateur
              </a>
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                rel="nofollow noreferrer noopener"
                target="_blank"
                className="text-xs text-[#1A3A5C] hover:underline flex items-center gap-1"
              >
                <ExternalLink size={12} /> Voir la création
              </a>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mt-5">
            <a
              href={`/api/badge/${number}`}
              download={`badge-ige-${number}.png`}
              className="bg-[#1A3A5C] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#142f4e] transition-colors flex items-center gap-1.5"
            >
              <Download size={14} /> Télécharger le badge
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#DEE2E6] text-[#555B6E] text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#F8F9FA] transition-colors flex items-center gap-1.5"
            >
              <Share2 size={14} /> Partager sur X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#DEE2E6] text-[#555B6E] text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#F8F9FA] transition-colors flex items-center gap-1.5"
            >
              <Share2 size={14} /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Détail des réponses par type */}
      {project.contentTypes.map((ct) => (
        <div key={ct.id} className="bg-white border border-[#DEE2E6] rounded-xl mb-4 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#DEE2E6] bg-[#F8F9FA]">
            <h2 className="font-semibold text-[#1A1A2E] text-sm">
              {CONTENT_TYPE_LABELS[ct.type as ContentTypeKey] ?? ct.type}
            </h2>
            <span className="text-sm font-bold" style={{ color: hex }}>
              {formatScore(ct.score)}
            </span>
          </div>
          <div className="divide-y divide-[#DEE2E6]">
            {ct.responses.map((r) => (
              <div key={r.id} className="px-4 py-3 flex items-center justify-between gap-4">
                <p className="text-sm text-[#555B6E] flex-1">{r.question.question}</p>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-[#888]">{r.weighting}%</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    r.response === 'humain' ? 'bg-[#E8F5E9] text-[#2E7D32]' :
                    r.response === 'partage' ? 'bg-[#E3F2FD] text-[#1565C0]' :
                    'bg-[#F3E5F5] text-[#6A1B9A]'
                  }`}>
                    {RESPONSE_LABELS[r.response as ResponseValue]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-8">
        <Link href="/recherche" className="text-[#1A3A5C] font-medium hover:underline text-sm">
          ← Explorer d&apos;autres labels
        </Link>
      </div>
    </div>
  )
}
