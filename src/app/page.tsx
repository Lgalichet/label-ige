import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { prisma } from '@/lib/db'
import { BadgeDisplay } from '@/components/labels/BadgeDisplay'
import { CheckCircle, Shield, Scale, Users, ArrowRight, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Label IGE — Certifiez la part d\u2019humain dans vos créations',
  description:
    'Le Label IGE est le premier standard de transparence IA pour les créateurs de contenu. Générez votre badge en 5 minutes, gratuitement.',
}

async function getStats() {
  try {
    const count = await prisma.project.count({ where: { isPublic: true } })
    return { count }
  } catch {
    return { count: 0 }
  }
}

export default async function HomePage() {
  const { count } = await getStats()

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="bg-white border-b border-[#DEE2E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#E8EEF4] text-[#1A3A5C] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                Premier standard de transparence IA
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A2E] leading-tight mb-6">
                Certifiez la part
                <br />
                <span className="text-[#1A3A5C]">d&apos;humain</span> dans vos créations.
              </h1>
              <p className="text-xl text-[#555B6E] mb-8 max-w-xl mx-auto lg:mx-0">
                Le Label IGE est le premier standard de transparence IA pour les créateurs de contenu.
                Générez votre badge en 5 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/inscription"
                  className="bg-[#1A3A5C] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#142f4e] transition-colors text-center"
                >
                  Créer mon label gratuitement
                </Link>
                <Link
                  href="/recherche"
                  className="border border-[#1A3A5C] text-[#1A3A5C] font-semibold px-6 py-3 rounded-lg hover:bg-[#E8EEF4] transition-colors flex items-center justify-center gap-2"
                >
                  <Search size={18} />
                  Voir des exemples
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start text-sm text-[#555B6E]">
                {['Gratuit', 'Sans abonnement', '5 minutes chrono', 'Badge téléchargeable'].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-[#2E7D32]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 items-end shrink-0">
              <BadgeDisplay score={87} creationNumber="demo1" colorHex="#2E7D32" mention="Principalement humain" size="lg" />
              <div className="flex flex-col gap-4">
                <BadgeDisplay score={58} creationNumber="demo2" colorHex="#1565C0" mention="Création partagée" size="md" />
                <BadgeDisplay score={22} creationNumber="demo3" colorHex="#6A1B9A" mention="Principalement IA" size="md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {count > 0 && (
        <div className="bg-[#1A3A5C] text-white py-4 text-center text-sm">
          <strong>{count.toLocaleString('fr-FR')}</strong> label{count > 1 ? 's' : ''} déjà créé{count > 1 ? 's' : ''} par la communauté
        </div>
      )}

      {/* PROBLÈME */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-6">
            L&apos;IA est partout dans la création.
            <br />
            <span className="text-[#1A3A5C]">La transparence, non.</span>
          </h2>
          <p className="text-lg text-[#555B6E] leading-relaxed">
            Les créateurs utilisent l&apos;IA au quotidien — pour écrire, illustrer, composer, filmer.
            Mais personne ne sait vraiment dans quelle mesure. Ce flou crée de la méfiance,
            des questions juridiques, et fragilise la relation avec les audiences.
          </p>
        </div>
      </section>

      {/* 3 ÉTAPES */}
      <section className="py-20 bg-white border-t border-b border-[#DEE2E6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-[#1A1A2E] mb-4">Simple en 3 étapes</h2>
          <p className="text-center text-[#555B6E] mb-14 text-lg">Du formulaire au badge téléchargeable, en quelques minutes.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Décrivez votre création', text: 'Renseignez les informations de base : titre, créateur, date, outils utilisés.' },
              { num: '02', title: 'Répondez au questionnaire', text: 'Pour chaque type de contenu, indiquez qui a fait quoi : humain, IA ou collaboration.' },
              { num: '03', title: 'Obtenez votre badge IGE', text: 'Téléchargez votre badge coloré et partagez-le sur vos créations.', badge: true },
            ].map((step) => (
              <div key={step.num} className="bg-[#F8F9FA] rounded-xl p-6 border border-[#DEE2E6] flex flex-col gap-4">
                <span className="text-4xl font-black text-[#DEE2E6] leading-none">{step.num}</span>
                <h3 className="text-lg font-semibold text-[#1A1A2E]">{step.title}</h3>
                <p className="text-[#555B6E] text-sm leading-relaxed">{step.text}</p>
                {step.badge && <BadgeDisplay score={72} creationNumber="demo-step3" colorHex="#1565C0" mention="Création partagée" size="sm" />}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/inscription" className="bg-[#1A3A5C] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#142f4e] transition-colors inline-flex items-center gap-2">
              Créer mon premier label <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3 NIVEAUX */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-[#1A1A2E] mb-4">3 niveaux de label</h2>
          <p className="text-center text-[#555B6E] mb-14 text-lg">Pas de jugement — juste de la transparence.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { score: 87, colorHex: '#2E7D32', mention: 'Principalement humain', range: '75 – 100 %', desc: "L'IA n'a joué qu'un rôle marginal d'assistance." },
              { score: 55, colorHex: '#1565C0', mention: 'Création partagée', range: '40 – 74 %', desc: "L'humain et l'IA ont collaboré de façon significative." },
              { score: 18, colorHex: '#6A1B9A', mention: 'Principalement IA', range: '0 – 39 %', desc: "L'IA a produit l'essentiel du contenu." },
            ].map((level) => (
              <div key={level.range} className="bg-white rounded-xl border border-[#DEE2E6] p-6 flex flex-col items-center gap-4 text-center">
                <BadgeDisplay score={level.score} creationNumber={`level-${level.score}`} colorHex={level.colorHex} mention={level.mention} size="md" />
                <div>
                  <div className="font-bold text-lg" style={{ color: level.colorHex }}>{level.range}</div>
                  <div className="font-semibold text-[#1A1A2E] mt-1">{level.mention}</div>
                  <p className="text-[#555B6E] text-sm mt-2">{level.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="py-20 bg-white border-t border-[#DEE2E6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-[#1A1A2E] mb-4">Pourquoi afficher son label ?</h2>
          <p className="text-center text-[#555B6E] mb-14 text-lg">Des bénéfices concrets pour vous et votre audience.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Shield, title: 'Confiance', text: 'Montrez à votre audience que vous jouez la transparence. La confiance se construit sur des actes concrets.' },
              { icon: Users, title: 'Différenciation', text: 'Démarquez-vous dans un marché saturé de contenus IA. Le label devient un avantage concurrentiel.' },
              { icon: Scale, title: 'Anticipation juridique', text: "Anticipez les futures réglementations sur l'étiquetage des contenus IA (EU AI Act et suivants)." },
              { icon: CheckCircle, title: 'Communauté', text: "Rejoignez une communauté de créateurs engagés pour la transparence et l'éthique de la création." },
            ].map((card) => (
              <div key={card.title} className="bg-[#F8F9FA] rounded-xl border border-[#DEE2E6] p-6 flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-[#E8EEF4] flex items-center justify-center">
                  <card.icon size={20} className="text-[#1A3A5C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1A2E] mb-1">{card.title}</h3>
                  <p className="text-[#555B6E] text-sm leading-relaxed">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ RAPIDE */}
      <section className="py-20 bg-[#F8F9FA] border-t border-[#DEE2E6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-[#1A1A2E] mb-12">Questions fréquentes</h2>
          <div className="space-y-4">
            {[
              { q: 'Est-ce que le Label IGE est payant ?', a: "Non. La cr\u00e9ation d\u2019un label est enti\u00e8rement gratuite et sans abonnement." },
              { q: 'Qui peut créer un label ?', a: 'Tout créateur de contenu, particulier ou professionnel — rédacteur, graphiste, vidéaste, podcasteur, agence ou marque.' },
              { q: 'Le label est-il vérifiable ?', a: 'Oui. Chaque label possède un numéro unique consultable publiquement sur notre plateforme.' },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-xl border border-[#DEE2E6] p-6">
                <h3 className="font-semibold text-[#1A1A2E] mb-2">{item.q}</h3>
                <p className="text-[#555B6E] text-sm">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="text-[#1A3A5C] font-semibold hover:underline inline-flex items-center gap-1">
              Toutes les questions <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-gradient-to-br from-[#1A3A5C] to-[#0d2340] text-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Prêt à certifier votre création ?</h2>
          <p className="text-xl text-white/80 mb-8">Créez votre premier label gratuitement en 5 minutes.</p>
          <Link href="/inscription" className="bg-white text-[#1A3A5C] font-bold px-8 py-4 rounded-lg hover:bg-[#f0f4f8] transition-colors inline-block text-lg">
            Créer mon label maintenant
          </Link>
        </div>
      </section>
    </div>
  )
}
