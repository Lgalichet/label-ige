'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Menu, X, LogOut, User } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/comment-ca-marche', label: 'Comment ça marche' },
  { href: '/recherche', label: 'Rechercher' },
  { href: '/faq', label: 'FAQ' },
]

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session } = useSession()
  const isSignedIn = !!session

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#DEE2E6] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-[#1A3A5C] text-lg">
            <span className="bg-[#1A3A5C] text-white px-2 py-0.5 rounded text-sm font-black tracking-wider">
              IGE
            </span>
            <span className="hidden sm:inline">Label IGE</span>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-[#1A3A5C]',
                  pathname === link.href ? 'text-[#1A3A5C] font-semibold' : 'text-[#555B6E]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <>
                <Link href="/espace-createur" className="text-sm font-medium text-[#555B6E] hover:text-[#1A3A5C]">
                  Mon espace
                </Link>
                <Link href="/creer" className="bg-[#1A3A5C] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#142f4e] transition-colors">
                  Créer un label
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-1.5 text-sm text-[#555B6E] hover:text-[#C62828] transition-colors"
                  title="Se déconnecter"
                >
                  {session.user?.image ? (
                    <img src={session.user.image} alt="" className="w-7 h-7 rounded-full" />
                  ) : (
                    <User size={18} />
                  )}
                </button>
              </>
            ) : (
              <>
                <Link href="/connexion" className="text-sm font-medium text-[#1A3A5C] hover:underline">
                  Se connecter
                </Link>
                <Link href="/inscription" className="bg-[#1A3A5C] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#142f4e] transition-colors">
                  Créer mon label
                </Link>
              </>
            )}
          </div>

          {/* Burger mobile */}
          <button
            className="md:hidden p-2 text-[#555B6E]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#DEE2E6] bg-white px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn('text-base font-medium', pathname === link.href ? 'text-[#1A3A5C] font-semibold' : 'text-[#555B6E]')}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-[#DEE2E6]" />
          {isSignedIn ? (
            <>
              <Link href="/espace-createur" onClick={() => setMenuOpen(false)} className="text-[#555B6E] font-medium">
                Mon espace
              </Link>
              <Link href="/creer" onClick={() => setMenuOpen(false)} className="bg-[#1A3A5C] text-white text-center font-semibold px-4 py-2 rounded-lg">
                Créer un label
              </Link>
              <button
                onClick={() => { setMenuOpen(false); signOut({ callbackUrl: '/' }) }}
                className="flex items-center gap-2 text-[#555B6E] font-medium"
              >
                <LogOut size={16} /> Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link href="/connexion" onClick={() => setMenuOpen(false)} className="text-[#1A3A5C] font-medium">
                Se connecter
              </Link>
              <Link href="/inscription" onClick={() => setMenuOpen(false)} className="bg-[#1A3A5C] text-white text-center font-semibold px-4 py-2 rounded-lg">
                Créer mon label
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
