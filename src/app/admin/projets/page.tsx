import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

import { getAllProjects } from '@/actions/admin'
import { AdminProjectsClient } from '@/components/admin/AdminProjectsClient'

export const metadata: Metadata = { title: 'Gestion des projets — Admin' }

export default async function AdminProjetsPage() {
  const { projects, total } = await getAllProjects()
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">Gestion des projets</h1>
      <p className="text-[#555B6E] mb-8">{total} label{total > 1 ? 's' : ''} au total</p>
      <AdminProjectsClient initialProjects={projects} total={total} />
    </div>
  )
}
