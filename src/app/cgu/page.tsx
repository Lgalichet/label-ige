import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "CGU du Label IGE — conditions d'utilisation de la plateforme de labellisation transparence IA.",
  robots: { index: false, follow: false },
}

export default function CguPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-[#1A1A2E] mb-2">Conditions Générales d&apos;Utilisation</h1>
      <p className="text-[#888] text-sm mb-10">Dernière mise à jour : avril 2026</p>

      <div className="space-y-8 text-sm text-[#555B6E] leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">1. Objet</h2>
          <p>Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et l&apos;utilisation de la plateforme Label IGE, éditée par TAMENTO SARL (ci-après &quot;Label IGE&quot; ou &quot;la Plateforme&quot;). En créant un compte ou en utilisant la Plateforme, vous acceptez sans réserve les présentes CGU.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">2. Description du service</h2>
          <p>Label IGE est une plateforme gratuite permettant à tout créateur de contenu de qualifier et certifier, selon un référentiel structuré, la part d&apos;intervention humaine et la part d&apos;IA dans ses créations. Le service comprend : la création de labels, le calcul automatique d&apos;un score IGE, la génération d&apos;un badge PNG téléchargeable, une page publique de consultation par numéro unique, et un espace créateur personnel.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">3. Inscription et compte</h2>
          <p>La création d&apos;un label nécessite la création d&apos;un compte. L&apos;utilisateur s&apos;engage à fournir des informations exactes lors de l&apos;inscription et à maintenir ses informations à jour. Tout compte est personnel et non transférable. L&apos;utilisateur est responsable de la confidentialité de ses identifiants.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">4. Responsabilité des déclarations</h2>
          <p>Le Label IGE est un outil déclaratif. Les informations renseignées lors de la création d&apos;un label sont placées sous l&apos;entière responsabilité de l&apos;utilisateur. TAMENTO SARL ne vérifie pas la véracité des déclarations. L&apos;utilisateur s&apos;engage à répondre honnêtement aux questionnaires et à ne pas utiliser la Plateforme pour induire en erreur son audience. Toute utilisation frauduleuse engage la responsabilité exclusive de l&apos;utilisateur.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">5. Contenu utilisateur et labels publics</h2>
          <p>En rendant un label public, l&apos;utilisateur autorise Label IGE à afficher les informations associées (titre, créateur, score, réponses) sur la Plateforme. L&apos;utilisateur conserve la propriété intellectuelle de ses créations. Il peut à tout moment rendre un label privé ou le supprimer via son espace créateur.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">6. Utilisation du badge</h2>
          <p>Le badge PNG téléchargeable peut être utilisé librement par l&apos;utilisateur pour accompagner sa création (site web, réseaux sociaux, documents). Il est interdit de modifier le badge ou de l&apos;utiliser d&apos;une manière trompeuse ou contraire à la réalité de la déclaration associée.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">7. Gratuité et évolution du service</h2>
          <p>Label IGE est gratuit. TAMENTO SARL se réserve le droit de faire évoluer les fonctionnalités, d&apos;introduire des offres premium futures ou de modifier les CGU, avec notification préalable aux utilisateurs inscrits.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">8. Suspension et suppression de compte</h2>
          <p>TAMENTO SARL se réserve le droit de suspendre ou supprimer tout compte en cas de violation des présentes CGU, d&apos;utilisation frauduleuse, ou de comportement nuisant à la Plateforme ou à ses utilisateurs. L&apos;utilisateur peut supprimer son compte et toutes ses données à tout moment depuis les paramètres de son espace créateur.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">9. Limitation de responsabilité</h2>
          <p>La Plateforme est fournie &quot;en l&apos;état&quot;. TAMENTO SARL ne garantit pas l&apos;absence d&apos;interruptions ou d&apos;erreurs. La responsabilité de TAMENTO SARL est limitée aux dommages directs et prévisibles, à l&apos;exclusion de tout dommage indirect ou consécutif.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">10. Droit applicable</h2>
          <p>Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou exécution sera soumis aux tribunaux compétents de Lyon.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">11. Contact</h2>
          <p>Pour toute question relative aux CGU : <a href="mailto:laurent.galichet@tamento.com" className="text-[#1A3A5C] hover:underline">laurent.galichet@tamento.com</a></p>
        </section>
      </div>
    </div>
  )
}
