import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ClipboardList, Sliders, Download, Share2, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Comment ça marche — Label IGE',
  description:
    'Découvrez comment créer votre Label IGE en 4 étapes simples : renseignez votre création, répondez au questionnaire, obtenez votre score et partagez votre badge.',
  openGraph: {
    title: 'Comment ça marche — Label IGE',
    description: 'Créez votre label de transparence IA en 4 étapes et quelques minutes.',
    type: 'website',
  },
}

const steps = [
  {
    num: '01',
    icon: ClipboardList,
    title: 'Décrivez votre création',
    description:
      'Commencez par renseigner les informations de base de votre projet : titre, type de contenu (texte, image, vidéo, audio, code...), nom du créateur et date de réalisation. Vous pouvez également préciser les outils IA utilisés — ChatGPT, Midjourney, DALL·E, Stable Diffusion, Runway, etc.',
    details: [
      'Titre et description de la création',
      'Type de contenu : texte, image, vidéo, audio, code, autre',
      'Date de création et auteur',
      'Outils IA utilisés (liste libre)',
    ],
  },
  {
    num: '02',
    icon: Sliders,
    title: 'Répondez au questionnaire IGE',
    description:
      'Le cœur du processus : pour chaque dimension de votre création (concept, production, retouche, publication...), vous indiquez la part respective de l\'humain et de l\'IA. Nos questions sont adaptées à chaque type de contenu. Le questionnaire prend entre 2 et 5 minutes selon la complexité de votre projet.',
    details: [
      'Questions adaptées au type de contenu choisi',
      'Curseur humain / IA pour chaque dimension',
      'Possibilité d\'ajouter des précisions libres',
      'Sauvegarde automatique de votre progression',
    ],
  },
  {
    num: '03',
    icon: Download,
    title: 'Obtenez votre score et votre badge',
    description:
      'À partir de vos réponses, le Label IGE calcule un score de 0 à 100 représentant la part d\'intervention humaine dans votre création. Ce score détermine votre niveau de label et la couleur de votre badge. Téléchargez-le en PNG, SVG ou intégrez-le via un code HTML.',
    details: [
      'Score de 0 à 100 — part d\'intervention humaine',
      'Badge coloré selon le niveau obtenu',
      'Numéro de certification unique',
      'Téléchargement PNG, SVG ou code d\'intégration HTML',
    ],
  },
  {
    num: '04',
    icon: Share2,
    title: 'Partagez et rendez vérifiable',
    description:
      'Chaque label possède une page publique accessible via son numéro unique. Vous pouvez afficher le badge sur votre site, dans votre portfolio, sur les réseaux sociaux ou directement sur la création concernée. Votre audience peut scanner le QR code ou saisir le numéro pour accéder aux détails.',
    details: [
      'Page publique de vérification accessible à tous',
      'QR code intégré dans le badge',
      'Partage direct sur réseaux sociaux',
      'Intégration sur site web via widget HTML',
    ],
  },
]

const levels = [
  {
    range: '75 – 100 %',
    label: 'Principalement humain',
    colorHex: '#2E7D32',
    bgColor: 'bg-[#E8F5E9]',
    borderColor: 'border-[#2E7D32]',
    textColor: 'text-[#2E7D32]',
    desc: "L'IA n'a joué qu'un rôle d'assistance marginale. Le concept, la production et la direction artistique sont essentiellement humains.",
  },
  {
    range: '40 – 74 %',
    label: 'Création partagée',
    colorHex: '#1565C0',
    bgColor: 'bg-[#E3F2FD]',
    borderColor: 'border-[#1565C0]',
    textColor: 'text-[#1565C0]',
    desc: "L'humain et l'IA ont collaboré de façon significative. Le créateur a dirigé, sélectionné et transformé les productions IA.",
  },
  {
    range: '0 – 39 %',
    label: 'Principalement IA',
    colorHex: '#6A1B9A',
    bgColor: 'bg-[#F3E5F5]',
    borderColor: 'border-[#6A1B9A]',
    textColor: 'text-[#6A1B9A]',
    desc: "L'IA a produit l'essentiel du contenu. Le rôle humain a été principalement de guider, valider et diffuser.",
  },
]

export default function CommentCaMarchePage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="bg-white border-b border-[#DEE2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-[#E8EEF4] text-[#1A3A5C] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#1A3A5C]" />
            Guide complet
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1A1A2E] mb-6">
            Comment ça marche ?
          </h1>
          <p className="text-xl text-[#555B6E] max-w-2xl mx-auto leading-relaxed">
            Du formulaire au badge vérifiable, le processus Label IGE est conçu pour être simple,
            rapide et honnête. Voici comment ça se passe, étape par étape.
          </p>
        </div>
      </section>

      {/* ÉTAPES */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl border border-[#DEE2E6] overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Numéro + icône */}
                  <div className="lg:w-48 bg-[#1A3A5C] text-white flex flex-col items-center justify-center py-8 px-6 gap-4 shrink-0">
                    <span className="text-6xl font-black text-white/20 leading-none">{step.num}</span>
                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                      <step.icon size={28} className="text-white" />
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 p-8">
                    <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">{step.title}</h2>
                    <p className="text-[#555B6E] leading-relaxed mb-6">{step.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm text-[#555B6E]">
                          <CheckCircle size={16} className="text-[#2E7D32] mt-0.5 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Connecteur */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-2 bg-[#F8F9FA] border-t border-[#DEE2E6]">
                    <ArrowRight size={20} className="text-[#DEE2E6] rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 NIVEAUX */}
      <section className="py-20 bg-white border-t border-[#DEE2E6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#1A1A2E] mb-4">
            Les 3 niveaux de label
          </h2>
          <p className="text-center text-[#555B6E] mb-14 text-lg max-w-2xl mx-auto">
            Le Label IGE ne juge pas — il informe. Quel que soit votre score, votre badge est
            un acte de transparence valorisable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {levels.map((level) => (
              <div
                key={level.range}
                className={`rounded-2xl border-2 ${level.borderColor} ${level.bgColor} p-6`}
              >
                {/* Badge visuel simplifié */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl mb-4 mx-auto"
                  style={{ backgroundColor: level.colorHex }}
                >
                  IGE
                </div>
                <div className={`text-center font-bold text-2xl ${level.textColor} mb-1`}>
                  {level.range}
                </div>
                <div className="text-center font-semibold text-[#1A1A2E] mb-3">{level.label}</div>
                <p className="text-[#555B6E] text-sm text-center leading-relaxed">{level.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[#555B6E] mt-8 italic">
            Aucun niveau n&apos;est meilleur qu&apos;un autre. Chaque label est une déclaration honnête.
          </p>
        </div>
      </section>

      {/* FAQ RAPIDE */}
      <section className="py-16 bg-[#F8F9FA] border-t border-[#DEE2E6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-8 text-center">Avant de commencer</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Combien de temps prend la création d\'un label ?',
                a: 'Entre 2 et 5 minutes pour une création simple. Le questionnaire s\'adapte à la complexité de votre projet.',
              },
              {
                q: 'Faut-il un compte pour créer un label ?',
                a: 'Oui, un compte gratuit est nécessaire pour accéder à votre espace créateur et gérer vos labels dans le temps.',
              },
              {
                q: 'Puis-je modifier un label après sa création ?',
                a: 'Vous pouvez archiver un label et en créer un nouveau si votre projet évolue. L\'historique est conservé.',
              },
              {
                q: 'Le label est-il valable indéfiniment ?',
                a: 'Oui. Un label créé reste valable et vérifiable indéfiniment, sauf si vous choisissez de le supprimer.',
              },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-xl border border-[#DEE2E6] p-5">
                <h3 className="font-semibold text-[#1A1A2E] mb-2 text-sm">{item.q}</h3>
                <p className="text-[#555B6E] text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-sm text-[#555B6E]">
            D&apos;autres questions ?{' '}
            <Link href="/faq" className="text-[#1A3A5C] font-semibold hover:underline">
              Consultez la FAQ complète
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1A3A5C] to-[#0d2340] text-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-4">Prêt ? C&apos;est gratuit.</h2>
          <p className="text-white/80 text-lg mb-8">
            Créez votre premier label IGE en quelques minutes.
          </p>
          <Link
            href="/inscription"
            className="bg-white text-[#1A3A5C] font-bold px-8 py-4 rounded-lg hover:bg-[#f0f4f8] transition-colors inline-flex items-center gap-2 text-lg"
          >
            Créer mon label maintenant <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
