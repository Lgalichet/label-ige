'use client'

import { useState } from 'react'
import Link from 'next/link'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, ArrowRight } from 'lucide-react'

const faqs: { theme: string; questions: { q: string; a: string }[] }[] = [
  {
    theme: 'Le concept',
    questions: [
      {
        q: "Qu'est-ce que le Label IGE ?",
        a: "Le Label IGE est un standard de transparence volontaire pour les créateurs de contenu. Il permet de certifier et d'afficher publiquement la part d'intervention humaine dans une création — texte, image, vidéo, audio, code — par opposition à la part produite ou assistée par une intelligence artificielle. Chaque label génère un badge unique, vérifiable en ligne, portant un score de 0 à 100.",
      },
      {
        q: "Que signifient les lettres IGE ?",
        a: "IGE signifie Imaginé • Généré • Embelli. Ces trois mots résument le spectre de la création assistée par IA. Imaginé : le concept, la direction et l'intention viennent de l'humain. Généré : l'IA produit une version, un brouillon ou une proposition. Embelli : l'humain retravaille, sélectionne, affine et valide le résultat final. Cette philosophie reconnaît que la plupart des créations modernes combinent les trois dimensions dans des proportions variables.",
      },
      {
        q: "Qui a créé le Label IGE et pourquoi ?",
        a: "Le Label IGE a été créé par TAMENTO SARL, une structure basée à Lyon, fondée par Laurent Galichet. Constatant que l'usage de l'IA dans la création devenait massif et que l'absence de standard de transparence créait un vide de confiance préjudiciable aux créateurs comme aux audiences, nous avons décidé de construire un outil simple, neutre et accessible. Le Label IGE n'est pas un label de qualité — c'est un label d'honnêteté.",
      },
      {
        q: "Le Label IGE est-il officiel ou reconnu par une autorité ?",
        a: "Le Label IGE est un standard privé et volontaire, non affilié à un organisme public ou gouvernemental. Il n'a pas de valeur légale contraignante au sens d'une certification réglementée. En revanche, il constitue une déclaration volontaire horodatée pouvant valoir comme trace documentaire de bonne foi. Nous travaillons à son adoption progressive par des organisations sectorielles.",
      },
    ],
  },
  {
    theme: 'Utilisation',
    questions: [
      {
        q: 'Est-ce que le Label IGE est gratuit ?',
        a: "Oui, entièrement gratuit. La création d'un compte, la génération d'un label, le téléchargement du badge et la page de vérification publique sont tous gratuits, sans abonnement ni limite de volume. Le Label IGE est pensé pour être accessible au plus grand nombre de créateurs, indépendamment de leur statut ou de leurs revenus.",
      },
      {
        q: 'Qui peut créer un Label IGE ?',
        a: "Tout créateur de contenu, qu'il soit particulier, freelance ou professionnel : rédacteur, auteur, graphiste, illustrateur, vidéaste, photographe, musicien, développeur, community manager, agence de communication ou marque. Il n'y a aucune condition de diplôme, de statut juridique ou de niveau de production. Le seul prérequis est d'être l'auteur ou le co-auteur de la création concernée.",
      },
      {
        q: 'Quels types de créations peuvent être labellisés ?',
        a: "Le Label IGE couvre tous les types de contenus numériques : textes (articles, newsletters, livres blancs, scripts, codes), images (illustrations, photographies retouchées, visuels générés), vidéos (clips, publicités, films courts, reportages), audio (musiques, podcasts, voix off) et créations hybrides. Le questionnaire s'adapte automatiquement au type de contenu sélectionné.",
      },
      {
        q: "Faut-il labelliser toutes mes créations ou seulement celles avec de l'IA ?",
        a: "Vous pouvez labelliser toutes vos créations, y compris celles sans aucune IA — le score sera alors de 100/100. Mais dans la pratique, le Label IGE prend tout son sens pour les créations où l'IA a joué un rôle, même mineur. L'objectif est de créer une habitude de transparence, pas d'alourdir votre workflow.",
      },
      {
        q: "Puis-je modifier un label après sa création ?",
        a: "Un label publié ne peut pas être modifié directement afin de préserver l'intégrité des certifications. Si votre création évolue significativement ou si vous avez commis une erreur, vous pouvez archiver le label existant et en créer un nouveau. L'historique de vos labels archivés reste consultable dans votre espace créateur.",
      },
    ],
  },
  {
    theme: 'Score et calcul',
    questions: [
      {
        q: "Comment le score IGE est-il calculé ?",
        a: "Le score IGE représente la part d'intervention humaine dans la création, exprimée en pourcentage de 0 à 100. Il est calculé à partir de vos réponses à un questionnaire structuré en plusieurs dimensions : conception et idéation, production initiale, retouche et affinage, sélection et direction, et publication/diffusion. Chaque dimension est pondérée selon le type de contenu. Le calcul est automatique et transparent — vous pouvez voir le détail de la décomposition dans votre label.",
      },
      {
        q: "Un score élevé est-il meilleur qu'un score bas ?",
        a: "Non, et c'est fondamental. Le Label IGE ne valorise aucun niveau en particulier. Un score de 20/100 (principalement IA) est tout aussi honnête et respectable qu'un score de 95/100 (principalement humain). Ce qui est valorisé, c'est la transparence — le fait de déclarer. Un créateur qui affiche ouvertement un score de 15 est infiniment plus crédible qu'un créateur qui cache son usage de l'IA.",
      },
      {
        q: "Les scores sont-ils vérifiables ou contrôlables par Label IGE ?",
        a: "Non. Le Label IGE est un système de déclaration volontaire. Nous ne pouvons pas vérifier techniquement la véracité des déclarations, de la même façon qu'une liste d'ingrédients sur un produit alimentaire repose sur la bonne foi du fabricant. Le score reflète ce que vous déclarez. La responsabilité de l'exactitude des déclarations appartient au créateur. En cas de déclaration manifestement frauduleuse signalée par des tiers, nous nous réservons le droit de suspendre le compte.",
      },
    ],
  },
  {
    theme: 'Vérification et confiance',
    questions: [
      {
        q: "Comment une audience peut-elle vérifier un Label IGE ?",
        a: "Chaque label possède un numéro de certification unique (format IGE-XXXXXX). Ce numéro est affiché sur le badge téléchargeable. Toute personne peut saisir ce numéro sur la page de recherche du site label-ige.com pour accéder à la fiche publique du label, qui détaille le score, le type de contenu, les outils déclarés, et la date de certification. Le badge téléchargeable intègre également un QR code pointant directement vers cette fiche.",
      },
      {
        q: "Que se passe-t-il si un créateur déclare un faux score ?",
        a: "Le Label IGE est fondé sur la bonne foi et la responsabilité personnelle des créateurs. Nous ne disposons pas de moyens techniques pour auditer chaque déclaration. En cas de suspicion de fraude avérée — par exemple, un créateur affirmant publiquement avoir trompé le système — tout utilisateur peut nous signaler le label via notre formulaire de contact. Nous examinerons le signalement et pourrons suspendre le compte en cas de fraude manifeste. La valeur du label repose sur la communauté des créateurs qui l'utilisent honnêtement.",
      },
      {
        q: "Le Label IGE peut-il être utilisé à des fins publicitaires ou marketing ?",
        a: "Oui, c'est même l'un des usages principaux. Vous pouvez afficher votre badge sur votre site, votre portfolio, vos réseaux sociaux, vos présentations commerciales et vos livrables clients. Le badge est fourni au format PNG haute définition et SVG vectoriel. Un code d'intégration HTML est également disponible pour un affichage dynamique sur votre site avec lien de vérification intégré.",
      },
    ],
  },
  {
    theme: 'Données et vie privée',
    questions: [
      {
        q: "Quelles données personnelles sont collectées lors de la création d'un compte ?",
        a: "Pour créer un compte, nous collectons uniquement votre adresse e-mail et un nom d'utilisateur (pseudo). Ces données sont strictement nécessaires au fonctionnement du service. Nous ne collectons pas de numéro de téléphone, d'adresse postale, de date de naissance ou de données de paiement (le service est gratuit). Notre politique de confidentialité complète est disponible sur la page /confidentialite.",
      },
      {
        q: "Mes labels sont-ils publics ou privés ?",
        a: "Par défaut, les labels que vous créez sont publics — c'est le principe même du label de transparence. La fiche d'un label public est accessible à toute personne disposant du numéro de certification. Vous pouvez cependant choisir de rendre un label privé, visible uniquement depuis votre espace créateur. Dans ce cas, la page de vérification publique n'est pas accessible.",
      },
      {
        q: "Puis-je supprimer mon compte et mes données ?",
        a: "Oui, à tout moment. Depuis votre espace créateur, vous pouvez demander la suppression de votre compte. Cette action entraîne la suppression de toutes vos données personnelles, de votre historique de labels et de vos badges dans un délai de 30 jours. Les labels publics que vous avez créés et qui ont été intégrés sur des sites tiers resteront techniquement visibles jusqu'à leur expiration, mais la fiche de vérification ne sera plus accessible. Vous pouvez également exercer vos droits RGPD (accès, rectification, portabilité) en contactant laurent.galichet@tamento.com.",
      },
    ],
  },
]

export default function FAQPage() {
  const [openTheme, setOpenTheme] = useState<string | null>(faqs[0].theme)

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="bg-white border-b border-[#DEE2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-[#E8EEF4] text-[#1A3A5C] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#1A3A5C]" />
            Questions fréquentes
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1A1A2E] mb-6">
            Foire aux questions
          </h1>
          <p className="text-xl text-[#555B6E] max-w-2xl mx-auto leading-relaxed">
            Tout ce que vous devez savoir sur le Label IGE, son fonctionnement,
            son calcul et la gestion de vos données.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filtres thèmes */}
          <div className="flex flex-wrap gap-2 mb-10">
            {faqs.map((section) => (
              <button
                key={section.theme}
                onClick={() =>
                  setOpenTheme(openTheme === section.theme ? null : section.theme)
                }
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  openTheme === section.theme
                    ? 'bg-[#1A3A5C] text-white border-[#1A3A5C]'
                    : 'bg-white text-[#555B6E] border-[#DEE2E6] hover:border-[#1A3A5C] hover:text-[#1A3A5C]'
                }`}
              >
                {section.theme}
              </button>
            ))}
          </div>

          {/* Accordéon */}
          <div className="space-y-8">
            {faqs.map((section) => (
              <div
                key={section.theme}
                className={
                  openTheme && openTheme !== section.theme ? 'opacity-40 transition-opacity' : ''
                }
              >
                <h2 className="text-lg font-bold text-[#1A3A5C] mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1A3A5C]" />
                  {section.theme}
                </h2>
                <Accordion.Root
                  type="single"
                  collapsible
                  className="space-y-3"
                >
                  {section.questions.map((item, idx) => (
                    <Accordion.Item
                      key={idx}
                      value={`${section.theme}-${idx}`}
                      className="bg-white rounded-xl border border-[#DEE2E6] overflow-hidden"
                    >
                      <Accordion.Header>
                        <Accordion.Trigger className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 group">
                          <span className="font-semibold text-[#1A1A2E] text-sm leading-snug">
                            {item.q}
                          </span>
                          <ChevronDown
                            size={18}
                            className="text-[#555B6E] shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
                          />
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                        <div className="px-6 pb-5 pt-1 border-t border-[#DEE2E6]">
                          <p className="text-[#555B6E] text-sm leading-relaxed">{item.a}</p>
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-16 bg-white border-t border-[#DEE2E6]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">
            Vous n&apos;avez pas trouvé votre réponse ?
          </h2>
          <p className="text-[#555B6E] mb-6">
            Écrivez-nous à{' '}
            <a
              href="mailto:laurent.galichet@tamento.com"
              className="text-[#1A3A5C] font-semibold hover:underline"
            >
              laurent.galichet@tamento.com
            </a>{' '}
            — nous répondons sous 48h ouvrées.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/inscription"
              className="bg-[#1A3A5C] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#142f4e] transition-colors inline-flex items-center justify-center gap-2"
            >
              Créer mon premier label <ArrowRight size={16} />
            </Link>
            <Link
              href="/comment-ca-marche"
              className="border border-[#1A3A5C] text-[#1A3A5C] font-semibold px-6 py-3 rounded-lg hover:bg-[#E8EEF4] transition-colors"
            >
              Comment ça marche ?
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
