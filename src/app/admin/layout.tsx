export const dynamic = 'force-dynamic'

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { AdminNav } from '@/components/admin/AdminNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/connexion')

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user || user.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <AdminNav />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-10">{children}</div>
      </main>
    </div>
  )
}
