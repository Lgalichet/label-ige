import Link from 'next/link'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function Footer() {
  const year = new Date().getFullYear()

  let isAdmin = false
  try {
    const session = await auth()
    if (session?.user?.id) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true },
      })
      isAdmin = user?.role === 'admin'
    }
  } catch {
    // session indisponible au build statique : on n'affiche juste pas le lien admin
  }

  return (
    <footer className="bg-[#1A1A2E] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + tagline */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-white text-[#1A3A5C] px-2 py-0.5 rounded text-sm font-black tracking-wider">
                IGE
              </span>
              <span className="font-bold text-lg">Label IGE</span>
            </div>
            <p className="text-[#aab0bb] text-sm leading-relaxed max-w-xs">
              Imaginé humain • Généré IA • Embelli humain.
              <br />
              Le premier standard de transparence IA pour les créateurs de contenu.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-white/90 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/comment-ca-marche', label: 'Comment ça marche' },
                { href: '/pourquoi', label: 'Pourquoi le Label IGE' },
                { href: '/recherche', label: 'Rechercher un label' },
                { href: '/blog', label: 'Blog' },
                { href: '/faq', label: 'FAQ' },
                { href: '/a-propos', label: 'À propos' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#aab0bb] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-white/90 uppercase tracking-wider">
              Légal
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/mentions-legales', label: 'Mentions légales' },
                { href: '/cgu', label: 'CGU' },
                { href: '/confidentialite', label: 'Politique de confidentialité' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#aab0bb] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#aab0bb] text-xs">
          <div>© {year} Label IGE — TAMENTO SARL — Tous droits réservés</div>
          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className="text-[#aab0bb] hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Administration
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
}
