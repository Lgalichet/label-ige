import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

import { getAdminStats } from '@/actions/admin'
import { getScoreColor, formatScore } from '@/lib/utils'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Link from 'next/link'
import { BarChart2, Users, Hash, TrendingUp } from 'lucide-react'

export const metadata: Metadata = { title: 'Dashboard Admin' }

export default async function AdminDashboardPage() {
  const stats = await getAdminStats()

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Hash, label: 'Labels créés', value: stats.totalProjects },
          { icon: Users, label: 'Utilisateurs', value: stats.totalUsers },
          { icon: BarChart2, label: 'Score moyen', value: `${Math.round(stats.avgScore)}%` },
          { icon: TrendingUp, label: 'Labels publics', value: stats.totalProjects },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#DEE2E6] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[#555B6E] text-sm mb-2">
              <s.icon size={14} /> {s.label}
            </div>
            <div className="text-2xl font-bold text-[#1A3A5C]">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#DEE2E6] rounded-xl">
        <div className="px-5 py-4 border-b border-[#DEE2E6] font-semibold text-[#1A1A2E]">
          Labels récents
        </div>
        <div className="divide-y divide-[#DEE2E6]">
          {stats.recentProjects.length === 0 ? (
            <div className="px-5 py-8 text-center text-[#888] text-sm">Aucun label pour l&apos;instant.</div>
          ) : stats.recentProjects.map((p) => {
            const { hex } = getScoreColor(p.score)
            return (
              <div key={p.id} className="px-5 py-3 flex items-center gap-4">
                <div
                  className="w-8 h-8 rounded-lg text-white text-xs font-bold flex items-center justify-center shrink-0"
                  style={{ backgroundColor: hex }}
                >
                  {Math.round(p.score)}%
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/label/${p.creationNumber}`} className="font-medium text-sm text-[#1A1A2E] hover:text-[#1A3A5C] truncate block">
                    {p.title}
                  </Link>
                  <div className="text-xs text-[#888]">{p.user.username} · {format(new Date(p.createdAt), 'd MMM yyyy', { locale: fr })}</div>
                </div>
                <span className="font-mono text-xs text-[#888]">#{p.creationNumber}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
