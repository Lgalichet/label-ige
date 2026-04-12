import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site Label IGE — éditeur, hébergeur, propriété intellectuelle.',
  robots: { index: false, follow: false },
}

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 prose prose-sm max-w-none">
      <h1 className="text-3xl font-bold text-[#1A1A2E] mb-2">Mentions légales</h1>
      <p className="text-[#888] text-sm mb-10">Dernière mise à jour : avril 2026</p>

      <div className="space-y-10 text-[#555B6E]">
        <section>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">1. Éditeur du site</h2>
          <div className="bg-[#F8F9FA] border border-[#DEE2E6] rounded-xl p-5 space-y-1 text-sm">
            <p><strong>Raison sociale :</strong> TAMENTO SARL</p>
            <p><strong>Forme juridique :</strong> Société à responsabilité limitée (SARL)</p>
            <p><strong>Dirigeant :</strong> Laurent GALICHET</p>
            <p><strong>SIRET :</strong> 50283241300038</p>
            <p><strong>Siège social :</strong> 69 boulevard des Canuts, 69004 Lyon, France</p>
            <p><strong>Téléphone :</strong> 06 07 25 97 65</p>
            <p><strong>Email :</strong> <a href="mailto:laurent.galichet@tamento.com" className="text-[#1A3A5C] hover:underline">laurent.galichet@tamento.com</a></p>
            <p><strong>Site :</strong> <a href="https://www.tamento.com" rel="nofollow noreferrer" target="_blank" className="text-[#1A3A5C] hover:underline">www.tamento.com</a></p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">2. Hébergeur</h2>
          <div className="bg-[#F8F9FA] border border-[#DEE2E6] rounded-xl p-5 text-sm">
            <p><strong>Vercel Inc.</strong></p>
            <p>340 Pine Street Suite 701</p>
            <p>San Francisco, CA 94104, États-Unis</p>
            <p><a href="https://vercel.com" rel="nofollow noreferrer" target="_blank" className="text-[#1A3A5C] hover:underline">www.vercel.com</a></p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">3. Propriété intellectuelle</h2>
          <p className="text-sm leading-relaxed">
            L'ensemble des contenus présents sur ce site (textes, graphismes, logotypes, icônes, images, badges) est la propriété exclusive de TAMENTO SARL, sauf mention contraire. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, est strictement interdite sans autorisation préalable écrite de TAMENTO SARL.
          </p>
          <p className="text-sm leading-relaxed mt-3">
            Les badges générés par les utilisateurs pour leurs propres créations restent la propriété des utilisateurs concernés. Le Label IGE certifie une déclaration, non la propriété de la création.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">4. Cookies et traceurs</h2>
          <p className="text-sm leading-relaxed">
            Ce site utilise <strong>Umami Analytics</strong>, un outil de mesure d'audience sans cookies et respectueux de la vie privée. Aucune donnée personnelle n'est collectée via les analytics. Aucun bandeau de consentement cookies n'est nécessaire.
          </p>
          <p className="text-sm leading-relaxed mt-2">
            Clerk, notre service d'authentification, utilise des cookies de session strictement nécessaires au fonctionnement du compte utilisateur. Ces cookies ne nécessitent pas de consentement au titre de l'article 82 de la loi Informatique et Libertés.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">5. Limitation de responsabilité</h2>
          <p className="text-sm leading-relaxed">
            Le Label IGE est un outil déclaratif. Les informations renseignées par les utilisateurs lors de la création d'un label sont sous leur responsabilité exclusive. TAMENTO SARL ne vérifie pas la véracité des déclarations et ne saurait être tenu responsable d'informations inexactes ou mensongères publiées par les utilisateurs.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">6. Contact</h2>
          <p className="text-sm">
            Pour toute question relative aux présentes mentions légales :{' '}
            <a href="mailto:laurent.galichet@tamento.com" className="text-[#1A3A5C] hover:underline">
              laurent.galichet@tamento.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
