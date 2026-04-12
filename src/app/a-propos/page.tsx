import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos',
  description: "Découvrez l'histoire et la philosophie du Label IGE, créé par TAMENTO pour promouvoir la transparence IA dans la création de contenu.",
}

export default function AProposPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-[#1A1A2E] mb-4">À propos du Label IGE</h1>
      <p className="text-xl text-[#555B6E] mb-12">Un projet né d'une conviction : la transparence est un acte créatif.</p>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">L'histoire</h2>
          <div className="text-[#555B6E] leading-relaxed space-y-3">
            <p>En 2024, Laurent Galichet, dirigeant de TAMENTO, constate une contradiction croissante dans le monde de la création : les outils d'IA générative explosent, les créateurs les utilisent massivement, mais personne ne parle ouvertement de la part d'IA dans leur travail.</p>
            <p>Ce silence crée de la méfiance. Les audiences ne savent pas à quoi elles font face. Les créateurs ne savent pas comment communiquer honnêtement sur leurs pratiques. Et les réglementations commencent à imposer des obligations d'étiquetage sans donner les outils pour y répondre.</p>
            <p>Le Label IGE est la réponse à cette contradiction. Un standard simple, libre et vérifiable, accessible à tous les créateurs qui veulent jouer la carte de la transparence.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">La philosophie IGE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { letter: 'I', word: 'Imaginé humain', desc: "L\u2019idée vient toujours d\u2019un humain. La vision, le concept, l\u2019intention créative \u2014 c\u2019est là que tout commence." },
              { letter: 'G', word: 'Généré IA', desc: "La production peut être humaine, assistée ou entièrement générée par l\u2019IA. Ce n\u2019est pas un jugement, c\u2019est une réalité." },
              { letter: 'E', word: 'Embelli humain', desc: "Le regard final, la retouche, la validation \u2014 le touche humain qui donne vie à la création." },
            ].map((item) => (
              <div key={item.letter} className="bg-[#F8F9FA] border border-[#DEE2E6] rounded-xl p-5">
                <div className="text-3xl font-black text-[#1A3A5C] mb-2">{item.letter}</div>
                <div className="font-semibold text-[#1A1A2E] mb-2">{item.word}</div>
                <p className="text-sm text-[#555B6E] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[#555B6E] leading-relaxed">
            Le Label IGE ne hiérarchise pas. Un badge violet (principalement IA) n'est pas inférieur à un badge vert (principalement humain). Ce sont deux façons différentes de créer, deux honnêtetés différentes. Ce qui compte, c'est la transparence.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">L'équipe</h2>
          <div className="bg-white border border-[#DEE2E6] rounded-xl p-6 flex gap-5">
            <div className="w-14 h-14 rounded-full bg-[#1A3A5C] text-white font-black text-xl flex items-center justify-center shrink-0">
              LG
            </div>
            <div>
              <div className="font-bold text-[#1A1A2E] text-lg">Laurent Galichet</div>
              <div className="text-[#555B6E] text-sm mb-2">Dirigeant — TAMENTO SARL</div>
              <p className="text-sm text-[#555B6E] leading-relaxed">
                Builder produit, entrepreneur lyonnais. Convaincu que les outils d'IA et les humains qui les utilisent méritent une meilleure façon de se présenter au monde. Fondateur du Label IGE en 2026.
              </p>
              <a href="https://www.tamento.com" rel="nofollow noreferrer" target="_blank" className="text-xs text-[#1A3A5C] hover:underline mt-2 inline-block">
                www.tamento.com →
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">Contact</h2>
          <p className="text-[#555B6E] leading-relaxed">
            Pour toute question, suggestion ou partenariat, contactez-nous à{' '}
            <a href="mailto:laurent.galichet@tamento.com" className="text-[#1A3A5C] hover:underline font-medium">
              laurent.galichet@tamento.com
            </a>
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-[#DEE2E6] flex gap-4 flex-wrap text-sm">
        <Link href="/comment-ca-marche" className="text-[#1A3A5C] hover:underline">Comment ça marche →</Link>
        <Link href="/faq" className="text-[#1A3A5C] hover:underline">FAQ →</Link>
        <Link href="/mentions-legales" className="text-[#1A3A5C] hover:underline">Mentions légales →</Link>
      </div>
    </div>
  )
}
