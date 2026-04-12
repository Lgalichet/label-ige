import Link from 'next/link'
import { BadgeDisplay } from './BadgeDisplay'
import { getScoreColor, formatScore } from '@/lib/utils'
import { CONTENT_TYPE_LABELS, ContentTypeKey } from '@/types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Lock } from 'lucide-react'

interface LabelCardProps {
  project: {
    creationNumber: string
    title: string
    creatorName: string
    creationDate: Date | string
    score: number
    isPublic: boolean
    contentTypes: { type: string; score: number }[]
  }
  settings?: Record<string, string>
  showVisibility?: boolean
}

export function LabelCard({ project, settings, showVisibility }: LabelCardProps) {
  const { hex, mention, label } = getScoreColor(project.score, settings)
  const date = new Date(project.creationDate)

  return (
    <Link
      href={`/label/${project.creationNumber}`}
      className="bg-white border border-[#DEE2E6] rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex gap-4 items-start group"
    >
      <BadgeDisplay
        score={project.score}
        creationNumber={project.creationNumber}
        colorHex={hex}
        mention={mention}
        size="sm"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-[#1A1A2E] text-sm leading-tight group-hover:text-[#1A3A5C] transition-colors line-clamp-2">
            {project.title}
          </h3>
          {showVisibility && !project.isPublic && (
            <Lock size={14} className="text-[#888] shrink-0 mt-0.5" aria-label="Label privé" />
          )}
        </div>

        <p className="text-[#555B6E] text-xs mt-1">{project.creatorName}</p>

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: hex }}
          >
            {formatScore(project.score)}
          </span>
          <span className="text-xs text-[#888]">{label}</span>
        </div>

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {project.contentTypes.slice(0, 3).map((ct) => (
            <span
              key={ct.type}
              className="text-[10px] bg-[#E8EEF4] text-[#1A3A5C] px-2 py-0.5 rounded"
            >
              {CONTENT_TYPE_LABELS[ct.type as ContentTypeKey] ?? ct.type}
            </span>
          ))}
          <span className="text-[10px] text-[#888] ml-auto">
            {format(date, 'd MMM yyyy', { locale: fr })}
          </span>
        </div>
      </div>
    </Link>
  )
}
