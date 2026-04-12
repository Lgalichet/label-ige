import { SignUp } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Créer un compte',
  description: 'Créez votre compte Label IGE et commencez à certifier vos créations.',
}

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-[#F8F9FA]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="bg-[#1A3A5C] text-white px-3 py-1 rounded font-black tracking-wider text-sm">IGE</span>
            <span className="font-bold text-xl text-[#1A1A2E]">Label IGE</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Créer un compte</h1>
          <p className="text-[#555B6E] mt-2">Gratuit · Sans abonnement · Badge téléchargeable</p>
        </div>
        <SignUp routing="hash" />
      </div>
    </div>
  )
}
