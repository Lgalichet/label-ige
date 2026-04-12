import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

import { getSettings } from '@/actions/admin'
import { AdminSettingsClient } from '@/components/admin/AdminSettingsClient'

export const metadata: Metadata = { title: 'Paramètres — Admin' }

export default async function AdminParametresPage() {
  const settings = await getSettings()
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">Paramètres globaux</h1>
      <p className="text-[#555B6E] mb-8">Configurez les seuils de couleur et les textes du label.</p>
      <AdminSettingsClient initialSettings={settings} />
    </div>
  )
}
