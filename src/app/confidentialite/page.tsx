import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité du Label IGE — RGPD, données collectées, droits des utilisateurs.',
  robots: { index: false, follow: false },
}

export default function ConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-[#1A1A2E] mb-2">Politique de confidentialité</h1>
      <p className="text-[#888] text-sm mb-10">Dernière mise à jour : avril 2026</p>

      <div className="space-y-8 text-sm text-[#555B6E] leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">1. Responsable du traitement</h2>
          <p>TAMENTO SARL — Laurent GALICHET — 69 boulevard des Canuts, 69004 Lyon, France.<br />
          Contact DPO : <a href="mailto:laurent.galichet@tamento.com" className="text-[#1A3A5C] hover:underline">laurent.galichet@tamento.com</a></p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">2. Données collectées</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-[#DEE2E6] rounded-lg overflow-hidden text-xs">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-[#1A1A2E]">Donnée</th>
                  <th className="px-3 py-2 text-left font-semibold text-[#1A1A2E]">Finalité</th>
                  <th className="px-3 py-2 text-left font-semibold text-[#1A1A2E]">Base légale</th>
                  <th className="px-3 py-2 text-left font-semibold text-[#1A1A2E]">Durée</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DEE2E6]">
                {[
                  ['Email', 'Authentification, communications', 'Exécution du contrat', "Durée du compte + 3 ans"],
                  ["Nom d'utilisateur", 'Identification publique sur les labels', 'Exécution du contrat', "Durée du compte"],
                  ['Projets / Labels', 'Service de labellisation', 'Exécution du contrat', "Durée du compte"],
                  ['Réponses aux questionnaires', 'Calcul du score IGE', 'Exécution du contrat', "Durée du label"],
                  ['Données de navigation', 'Analytics (Umami, sans cookie)', 'Intérêt légitime', '13 mois'],
                ].map(([data, purpose, base, duration]) => (
                  <tr key={data}>
                    <td className="px-3 py-2 font-medium text-[#1A1A2E]">{data}</td>
                    <td className="px-3 py-2">{purpose}</td>
                    <td className="px-3 py-2">{base}</td>
                    <td className="px-3 py-2">{duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">3. Sous-traitants</h2>
          <ul className="space-y-1 list-disc list-inside">
            <li><strong>Clerk</strong> (Clerk Inc., USA) — Authentification, gestion des sessions</li>
            <li><strong>Neon</strong> (Neon Inc., USA) — Hébergement base de données PostgreSQL</li>
            <li><strong>Vercel</strong> (Vercel Inc., USA) — Hébergement de l&apos;application</li>
            <li><strong>Resend</strong> (Resend Inc., USA) — Envoi d&apos;emails transactionnels</li>
            <li><strong>Umami</strong> — Analytics sans cookies, autohébergé</li>
          </ul>
          <p className="mt-3">Ces sous-traitants ont signé des clauses contractuelles types RGPD conformes au RGPD européen.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">4. Vos droits</h2>
          <p className="mb-3">Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="space-y-1 list-disc list-inside">
            <li><strong>Droit d&apos;accès</strong> — consulter vos données personnelles</li>
            <li><strong>Droit de rectification</strong> — corriger des données inexactes</li>
            <li><strong>Droit à l&apos;effacement</strong> — supprimer votre compte et toutes vos données via les paramètres de votre espace créateur, ou sur demande</li>
            <li><strong>Droit à la portabilité</strong> — exporter vos données en CSV depuis votre tableau de bord</li>
            <li><strong>Droit d&apos;opposition</strong> — vous opposer au traitement pour des raisons légitimes</li>
            <li><strong>Droit à la limitation</strong> — limiter le traitement dans certains cas</li>
          </ul>
          <p className="mt-3">Pour exercer vos droits : <a href="mailto:laurent.galichet@tamento.com" className="text-[#1A3A5C] hover:underline">laurent.galichet@tamento.com</a></p>
          <p className="mt-2">Vous disposez également du droit de déposer une réclamation auprès de la CNIL : <a href="https://www.cnil.fr" rel="nofollow noreferrer" target="_blank" className="text-[#1A3A5C] hover:underline">www.cnil.fr</a></p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">5. Sécurité</h2>
          <p>Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données : chiffrement TLS, hachage des mots de passe (bcrypt), accès restreints aux données, monitoring des erreurs (Sentry).</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">6. Cookies</h2>
          <p>Ce site n&apos;utilise pas de cookies tiers à des fins publicitaires ou de tracking. Les seuls cookies utilisés sont des cookies de session strictement nécessaires (Clerk) et des mesures d&apos;audience anonymisées (Umami, sans cookie de tracking).</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-2">7. Modifications</h2>
          <p>Cette politique peut être mise à jour. Les utilisateurs inscrits seront notifiés par email en cas de modification substantielle.</p>
        </section>
      </div>
    </div>
  )
}
