'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, HelpCircle, FileText, Users, Settings, ChevronLeft, File, Newspaper, Tag } from 'lucide-react'

const links = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/pages', label: 'Pages', icon: File },
  { href: '/admin/articles', label: 'Articles', icon: Newspaper },
  { href: '/admin/categories', label: 'Catégories', icon: Tag },
  { href: '/admin/questions', label: 'Questions', icon: HelpCircle },
  { href: '/admin/projets', label: 'Projets', icon: FileText },
  { href: '/admin/utilisateurs', label: 'Utilisateurs', icon: Users },
  { href: '/admin/parametres', label: 'Paramètres', icon: Settings },
]

export function AdminNav() {
  const pathname = usePathname()
  return (
    <aside className="w-56 shrink-0 bg-[#1A1A2E] text-white min-h-screen flex flex-col">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-white text-[#1A3A5C] px-2 py-0.5 rounded text-xs font-black tracking-wider">IGE</span>
          <span className="font-bold text-sm">Administration</span>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname.startsWith(link.href)
                ? 'bg-[#1A3A5C] text-white'
                : 'text-white/60 hover:bg-white/10 hover:text-white'
            )}
          >
            <link.icon size={16} />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
          <ChevronLeft size={16} /> Retour au site
        </Link>
      </div>
    </aside>
  )
}
