import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-[#DEE2E6] mb-6">404</div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-3">Page introuvable</h1>
        <p className="text-[#555B6E] mb-8">
          Cette page n&apos;existe pas ou a été déplacée. Vous pouvez retourner à l&apos;accueil ou rechercher un label.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-[#1A3A5C] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#142f4e] transition-colors inline-flex items-center justify-center gap-2"
          >
            <Home size={16} /> Retour à l&apos;accueil
          </Link>
          <Link
            href="/recherche"
            className="border border-[#1A3A5C] text-[#1A3A5C] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#E8EEF4] transition-colors inline-flex items-center justify-center gap-2"
          >
            <Search size={16} /> Rechercher un label
          </Link>
        </div>
      </div>
    </div>
  )
}
