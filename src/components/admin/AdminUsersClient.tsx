'use client'

import { useState } from 'react'
import { updateUserRole, adminDeleteUser } from '@/actions/admin'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Trash2, Shield } from 'lucide-react'

interface User {
  id: string
  email: string
  username: string
  role: string
  createdAt: Date | string
  _count: { projects: number }
}

export function AdminUsersClient({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState(initialUsers)

  async function handleRoleToggle(id: string, role: string) {
    const newRole = role === 'admin' ? 'user' : 'admin'
    if (!confirm(`Passer cet utilisateur en "${newRole}" ?`)) return
    await updateUserRole(id, newRole as 'user' | 'admin')
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role: newRole } : u))
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cet utilisateur et toutes ses données ? Cette action est irréversible.')) return
    await adminDeleteUser(id)
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  return (
    <div className="bg-white border border-[#DEE2E6] rounded-xl overflow-hidden">
      <div className="divide-y divide-[#DEE2E6]">
        {users.length === 0 ? (
          <div className="p-8 text-center text-[#888] text-sm">Aucun utilisateur.</div>
        ) : users.map((u) => (
          <div key={u.id} className="px-5 py-3 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[#1A1A2E]">{u.username}</div>
              <div className="text-xs text-[#888]">{u.email} · inscrit le {format(new Date(u.createdAt), 'd MMM yyyy', { locale: fr })}</div>
            </div>
            <span className="text-xs text-[#555B6E]">{u._count.projects} label{u._count.projects > 1 ? 's' : ''}</span>
            <span className={`text-xs px-2 py-0.5 rounded border font-medium flex items-center gap-1 ${u.role === 'admin' ? 'border-[#1565C0] text-[#1565C0]' : 'border-[#DEE2E6] text-[#888]'}`}>
              {u.role === 'admin' && <Shield size={10} />}
              {u.role}
            </span>
            <button onClick={() => handleRoleToggle(u.id, u.role)} className="text-[#1A3A5C] hover:text-[#0d2340] text-xs font-medium">
              {u.role === 'admin' ? 'Rétrograder' : 'Promouvoir admin'}
            </button>
            <button onClick={() => handleDelete(u.id)} className="text-[#C62828] hover:text-[#8B1A1A]">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
