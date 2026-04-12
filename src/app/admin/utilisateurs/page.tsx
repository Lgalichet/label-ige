import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

import { getAllUsers } from '@/actions/admin'
import { AdminUsersClient } from '@/components/admin/AdminUsersClient'

export const metadata: Metadata = { title: 'Gestion des utilisateurs — Admin' }

export default async function AdminUsersPage() {
  const { users, total } = await getAllUsers()
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">Utilisateurs</h1>
      <p className="text-[#555B6E] mb-8">{total} compte{total > 1 ? 's' : ''} inscrit{total > 1 ? 's' : ''}</p>
      <AdminUsersClient initialUsers={users} />
    </div>
  )
}
