'use client'

import { exportUserDataCsv } from '@/actions/projects'
import { Download } from 'lucide-react'

export function DashboardActions() {
  async function handleExport() {
    const res = await exportUserDataCsv()
    if (!res.csv) return

    const blob = new Blob([res.csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = res.filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExport}
      className="text-sm text-[#1A3A5C] font-medium hover:underline flex items-center gap-1.5"
    >
      <Download size={14} /> Exporter mes données (CSV)
    </button>
  )
}
