import type { Metadata } from 'next'
import { clerkSignInUrl, clerkSignUpUrl } from '@/lib/clerk-urls'

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre espace créateur Label IGE.',
}

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-[#F8F9FA]">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="bg-[#1A3A5C] text-white px-3 py-1 rounded font-black tracking-wider text-sm">IGE</span>
          <span className="font-bold text-xl text-[#1A1A2E]">Label IGE</span>
        </div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">Connectez-vous</h1>
        <p className="text-[#555B6E] mb-8">Accédez à votre espace créateur</p>
        <a
          href={clerkSignInUrl}
          className="block bg-[#1A3A5C] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#142f4e] transition-colors text-lg w-full text-center"
        >
          Se connecter
        </a>
        <p className="text-sm text-[#555B6E] mt-6">
          Pas encore de compte ?{' '}
          <a href={clerkSignUpUrl} className="text-[#1A3A5C] font-semibold hover:underline">
            Créer un compte gratuitement
          </a>
        </p>
      </div>
    </div>
  )
}
