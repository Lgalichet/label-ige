import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Scale, Users, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, Quote } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pourquoi le Label IGE — Transparence IA pour les créateurs',
  description:
    "Comprendre pourquoi la transparence sur l'usage de l'IA est devenue indispensable pour les créateurs : enjeux de confiance, contexte juridique (EU AI Act), éthique et différenciation.",
  openGraph: {
    title: 'Pourquoi le Label IGE — Transparence IA pour les créateurs',
    description:
      "L'IA transforme la création. Le Label IGE offre un standard pour nommer honnêtement cette réalité.",
    type: 'website',
  },
}

export default function PourquoiPage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="bg-white border-b border-[#DEE2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-[#E8EEF4] text-[#1A3A5C] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#1A3A5C]" />
            Philosophie et enjeux
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1A1A2E] mb-6 leading-tight">
            Pourquoi afficher<br />
            <span className="text-[#1A3A5C]">la part d&apos;IA</span> dans vos créations ?
          </h1>
          <p className="text-xl text-[#555B6E] max-w-2xl mx-auto leading-relaxed">
            L&apos;intelligence artificielle est devenue un outil quotidien pour des millions de créateurs.
            Mais cette réalité reste souvent tue, dissimulée ou mal comprise. Il est temps de changer ça.
          </p>
        </div>
      </section>

      {/* CONTEXTE IA */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-6">
            L&apos;IA a changé la création — pour tout le monde
          </h2>
          <div className="prose prose-lg max-w-none text-[#555B6E] space-y-5">
            <p>
              En l&apos;espace de quelques années, les outils d&apos;intelligence artificielle générative ont profondément
              transformé les pratiques de création. Des rédacteurs utilisent ChatGPT pour structurer leurs
              articles, des graphistes emploient Midjourney pour explorer des directions visuelles,
              des vidéastes s&apos;appuient sur Runway pour monter plus vite, des développeurs s&apos;aident de
              GitHub Copilot pour écrire du code.
            </p>
            <p>
              Ce n&apos;est pas une tendance marginale. Selon plusieurs études, plus de 60 % des créateurs
              de contenu professionnels utilisent au moins un outil d&apos;IA dans leur workflow en 2024.
              Ce chiffre ne fera qu&apos;augmenter.
            </p>
            <p>
              Pourtant, cette réalité reste souvent invisible pour les audiences. Les contenus produits
              avec l&apos;aide de l&apos;IA circulent sans indication, sans contexte, sans transparence.
              Ce silence n&apos;est pas anodin — il crée une zone grise qui fragilise la confiance,
              brouille les standards du secteur et expose les créateurs à des risques croissants.
            </p>
          </div>

          {/* Citation */}
          <div className="mt-10 bg-white border-l-4 border-[#1A3A5C] rounded-r-xl p-6">
            <Quote size={24} className="text-[#1A3A5C] mb-3" />
            <p className="text-[#1A1A2E] text-lg font-medium italic leading-relaxed">
              "La question n&apos;est pas de savoir si vous utilisez l&apos;IA. La question est de savoir
              si vous êtes honnête à ce sujet avec ceux qui consomment votre travail."
            </p>
            <p className="text-[#555B6E] text-sm mt-3">— Philosophie fondatrice du Label IGE</p>
          </div>
        </div>
      </section>

      {/* ENJEUX CONFIANCE */}
      <section className="py-20 bg-white border-t border-[#DEE2E6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-4">
            La confiance ne s&apos;impose pas — elle se mérite
          </h2>
          <p className="text-[#555B6E] text-lg mb-12 max-w-3xl">
            Dans un contexte de saturation des contenus et de méfiance croissante envers les médias
            numériques, la transparence est devenue un avantage compétitif réel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Users,
                title: 'Ce que vos audiences attendent',
                content:
                  "Les consommateurs de contenu sont de plus en plus attentifs à l'authenticité. Plusieurs enquêtes montrent qu'une majorité de lecteurs, spectateurs et auditeurs souhaitent savoir si un contenu a été produit avec l'aide de l'IA. Non pas pour rejeter ce contenu, mais pour l'évaluer avec les bons critères.",
              },
              {
                icon: TrendingUp,
                title: 'La transparence comme différenciateur',
                content:
                  "Les créateurs qui affichent ouvertement leur usage de l'IA — en montrant comment ils l'intègrent dans leur processus — sont perçus comme plus crédibles, plus professionnels et plus modernes. La transparence n'est pas une faiblesse : c'est un signal de maturité et d'intégrité.",
              },
              {
                icon: AlertTriangle,
                title: 'Les risques du silence',
                content:
                  "Taire l'usage de l'IA expose à un risque croissant : si votre audience découvre après coup que vous utilisiez des outils IA sans le signaler, l'effet sur la confiance peut être dévastateur. La transparence proactive est infiniment préférable à une révélation subie.",
              },
              {
                icon: Shield,
                title: 'Construire une relation durable',
                content:
                  "La confiance se construit sur des actes concrets et répétés. Afficher un Label IGE sur chaque création est un geste régulier de transparence qui, au fil du temps, constitue une forme de capital de confiance précieux auprès de votre communauté.",
              },
            ].map((card) => (
              <div key={card.title} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#E8EEF4] flex items-center justify-center mt-1">
                  <card.icon size={22} className="text-[#1A3A5C]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1A2E] mb-2 text-lg">{card.title}</h3>
                  <p className="text-[#555B6E] leading-relaxed">{card.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENJEUX JURIDIQUES */}
      <section className="py-20 bg-[#F8F9FA] border-t border-[#DEE2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#1A3A5C] flex items-center justify-center mt-1">
              <Scale size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1A1A2E] mb-2">
                Un contexte réglementaire en mutation
              </h2>
              <p className="text-[#555B6E] text-lg">
                Les législateurs mondiaux prennent acte de la réalité de l&apos;IA générative.
                Les créateurs ont tout intérêt à anticiper.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#DEE2E6] p-6">
              <h3 className="font-bold text-[#1A1A2E] mb-3 text-lg">EU AI Act (Union Européenne)</h3>
              <p className="text-[#555B6E] leading-relaxed mb-3">
                L&apos;AI Act européen, entré progressivement en application depuis 2024, impose déjà des
                obligations de marquage pour certains contenus générés par IA — notamment les deepfakes
                et les contenus à finalité persuasive. Ces obligations sont amenées à s&apos;étendre.
                Les plateformes de distribution seront également concernées, ce qui aura un impact
                direct sur les créateurs.
              </p>
              <p className="text-[#555B6E] leading-relaxed">
                En adoptant dès maintenant une pratique de déclaration volontaire, vous vous positionnez
                en avance sur une obligation qui sera probablement généralisée d&apos;ici 2026-2027.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#DEE2E6] p-6">
              <h3 className="font-bold text-[#1A1A2E] mb-3 text-lg">Propriété intellectuelle et droits d&apos;auteur</h3>
              <p className="text-[#555B6E] leading-relaxed mb-3">
                La question de la propriété intellectuelle des œuvres générées par IA reste un sujet
                juridiquement non stabilisé dans la plupart des pays. En France, la jurisprudence
                commence à émerger, et la transparence sur la part d&apos;IA dans une création peut être
                déterminante pour établir ou défendre des droits d&apos;auteur.
              </p>
              <p className="text-[#555B6E] leading-relaxed">
                Un label daté et horodaté constitue une trace documentaire qui peut valoir comme
                présomption de bonne foi dans d&apos;éventuels litiges.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#DEE2E6] p-6">
              <h3 className="font-bold text-[#1A1A2E] mb-3 text-lg">Normes sectorielles et marchés publics</h3>
              <p className="text-[#555B6E] leading-relaxed">
                Plusieurs secteurs — presse, communication institutionnelle, éducation, santé —
                commencent à adopter des chartes internes sur l&apos;usage de l&apos;IA. Des marchés publics
                et des appels d&apos;offres privés incluent désormais des clauses sur la transparence IA.
                Disposer d&apos;un standard reconnu et documenté est un avantage dans ces contextes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHIE "PAS DE JUGEMENT" */}
      <section className="py-20 bg-white border-t border-[#DEE2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-6">
            La philosophie IGE : pas de jugement
          </h2>
          <div className="space-y-5 text-[#555B6E] leading-relaxed text-lg">
            <p>
              Le Label IGE repose sur un principe fondamental : <strong className="text-[#1A1A2E]">il n&apos;y a pas de bon ou de mauvais score.</strong>{' '}
              Un label à 95 % n&apos;est pas supérieur à un label à 15 %. Les deux sont honnêtes.
              C&apos;est l&apos;honnêteté qui est valorisée, pas la valeur numérique.
            </p>
            <p>
              Nous refusons la logique culpabilisante qui voudrait que l&apos;usage de l&apos;IA soit une
              tricherie, une dévalorisation du travail ou une honte à cacher. L&apos;IA est un outil.
              Comme la retouche photo l&apos;était hier, comme le traitement de texte avant cela,
              comme la photographie face à la peinture à une époque.
            </p>
            <p>
              Ce qui compte, c&apos;est la clarté. Ce que vous dites à votre audience, c&apos;est :
              "Voici ce que j&apos;ai fait. Voici comment j&apos;ai travaillé. Je vous fais confiance
              pour en juger par vous-même."
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: 'I — Imaginé',
                colorHex: '#2E7D32',
                bg: 'bg-[#E8F5E9]',
                text: 'text-[#2E7D32]',
                desc: "Le concept, l'idée, la direction artistique viennent de vous.",
              },
              {
                label: 'G — Généré',
                colorHex: '#1565C0',
                bg: 'bg-[#E3F2FD]',
                text: 'text-[#1565C0]',
                desc: "L'IA produit une version, un brouillon, une proposition que vous pilotez.",
              },
              {
                label: 'E — Embelli',
                colorHex: '#6A1B9A',
                bg: 'bg-[#F3E5F5]',
                text: 'text-[#6A1B9A]',
                desc: "Vous retravaillez, sélectionnez, affinez, validez le résultat final.",
              },
            ].map((item) => (
              <div key={item.label} className={`${item.bg} rounded-xl p-5 text-center`}>
                <div className={`text-xl font-black ${item.text} mb-2`}>{item.label}</div>
                <p className="text-[#555B6E] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAS D'USAGE CRÉATEURS */}
      <section className="py-20 bg-[#F8F9FA] border-t border-[#DEE2E6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-4 text-center">
            Pour quel type de créateurs ?
          </h2>
          <p className="text-center text-[#555B6E] text-lg mb-14 max-w-2xl mx-auto">
            Le Label IGE s&apos;adresse à tous ceux qui créent et qui veulent jouer franc jeu.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                type: 'Rédacteurs & auteurs',
                desc: "Articles, newsletters, livres blancs, posts LinkedIn — déclarez comment vous utilisez ChatGPT, Claude ou Gemini dans votre processus d'écriture.",
                examples: ['Article de blog', 'Newsletter', 'Livre blanc', 'Fiche produit'],
              },
              {
                type: 'Graphistes & illustrateurs',
                desc: "Images Midjourney retravaillées sous Photoshop, illustrations augmentées IA, moodboards — montrez la part de direction artistique humaine.",
                examples: ['Illustration retouchée', 'Brand identity', 'Couverture de livre', 'Affiche'],
              },
              {
                type: 'Vidéastes & réalisateurs',
                desc: "Scripts IA, montage assisté, voix off générées, sous-titrage automatique — le label vous permet de documenter chaque étape de production.",
                examples: ['Vidéo YouTube', 'Publicité', 'Court-métrage', 'Reportage'],
              },
              {
                type: 'Musiciens & compositeurs',
                desc: "Compositions assistées, stems générés, mastering IA — un outil de transparence pour les nouvelles pratiques de la création musicale.",
                examples: ['Musique de fond', 'Soundtrack', 'Jingle', 'Album'],
              },
              {
                type: 'Développeurs & tech',
                desc: "Code généré ou co-écrit avec Copilot, Cursor ou Claude — documenter la part d'IA dans des livrables techniques devient une bonne pratique professionnelle.",
                examples: ['Application', 'Script', 'Documentation', 'Tests'],
              },
              {
                type: 'Agences & marques',
                desc: "Campagnes de communication, contenus marketing, rapports annuels — le label est un engagement de transparence que vous pouvez afficher à vos clients.",
                examples: ['Campagne digitale', 'Rapport annuel', 'Site web', 'Contenu social'],
              },
            ].map((item) => (
              <div
                key={item.type}
                className="bg-white rounded-xl border border-[#DEE2E6] p-6 flex flex-col gap-3"
              >
                <h3 className="font-bold text-[#1A1A2E] text-lg">{item.type}</h3>
                <p className="text-[#555B6E] text-sm leading-relaxed flex-1">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {item.examples.map((ex) => (
                    <span
                      key={ex}
                      className="text-xs bg-[#E8EEF4] text-[#1A3A5C] px-2 py-0.5 rounded-full font-medium"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BÉNÉFICES CONCRETS */}
      <section className="py-20 bg-white border-t border-[#DEE2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-12 text-center">
            Ce que ça vous apporte concrètement
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Un badge vérifiable unique pour chaque création',
              'Une déclaration horodatée et archivée',
              'Un signal de confiance pour votre audience',
              'Une anticipation des obligations réglementaires',
              'Un outil de différenciation professionnelle',
              'Une trace documentaire utile en cas de litige',
              'L\'appartenance à une communauté de créateurs éthiques',
              'Une pratique exportable à toute votre production',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-[#F8F9FA] rounded-xl p-4">
                <CheckCircle size={18} className="text-[#2E7D32] shrink-0 mt-0.5" />
                <span className="text-[#555B6E] text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1A3A5C] to-[#0d2340] text-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-4">Commencez par un label.</h2>
          <p className="text-white/80 text-lg mb-8">
            Gratuit, sans abonnement, en 5 minutes.
            La transparence n&apos;a jamais été aussi simple.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/inscription"
              className="bg-white text-[#1A3A5C] font-bold px-8 py-4 rounded-lg hover:bg-[#f0f4f8] transition-colors inline-flex items-center justify-center gap-2 text-lg"
            >
              Créer mon premier label <ArrowRight size={20} />
            </Link>
            <Link
              href="/comment-ca-marche"
              className="border border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              Voir comment ça marche
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
