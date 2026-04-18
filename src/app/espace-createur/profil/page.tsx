import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getMyProfile } from '@/actions/profile'
import { ProfileForm } from '@/components/profile/ProfileForm'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Mon profil',
  robots: { index: false, follow: false },
}

export default async function ProfilePage() {
  const profile = await getMyProfile()
  if (!profile) redirect('/connexion')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/espace-createur"
        className="text-sm text-[#1A3A5C] hover:underline mb-4 inline-flex items-center gap-1"
      >
        <ArrowLeft size={14} /> Retour à mon espace
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A2E]">Mon profil</h1>
        <p className="text-[#555B6E] mt-1">
          Mettez à jour vos informations publiques et professionnelles.
        </p>
      </header>

      <ProfileForm initial={profile} />
    </div>
  )
}
