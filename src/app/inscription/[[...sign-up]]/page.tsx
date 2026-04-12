import type { Metadata } from 'next'
import { clerkSignInUrl, clerkSignUpUrl } from '@/lib/clerk-urls'

export const metadata: Metadata = {
  title: 'Créer un compte',
  description: 'Créez votre compte Label IGE et commencez à certifier vos créations.',
}

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-[#F8F9FA]">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="bg-[#1A3A5C] text-white px-3 py-1 rounded font-black tracking-wider text-sm">IGE</span>
          <span className="font-bold text-xl text-[#1A1A2E]">Label IGE</span>
        </div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">Créer un compte</h1>
        <p className="text-[#555B6E] mb-8">Gratuit · Sans abonnement · Badge téléchargeable</p>
        <a
          href={clerkSignUpUrl}
          className="block bg-[#1A3A5C] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#142f4e] transition-colors text-lg w-full text-center"
        >
          Créer mon compte gratuitement
        </a>
        <p className="text-sm text-[#555B6E] mt-6">
          Déjà un compte ?{' '}
          <a href={clerkSignInUrl} className="text-[#1A3A5C] font-semibold hover:underline">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  )
}
