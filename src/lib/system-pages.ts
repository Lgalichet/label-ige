/**
 * Pages "système" : routes statiques codées en dur dans /src/app
 * (≠ pages CMS dynamiques sous /p/[slug]).
 *
 * Elles sont référencées ici pour être visibles dans l'admin.
 * Pour les modifier, il faut éditer leur fichier source (lien GitHub).
 */

export type SystemPage = {
  slug: string
  href: string
  title: string
  file: string
  category: 'principale' | 'légale' | 'auth' | 'parcours'
}

const REPO = 'https://github.com/Lgalichet/label-ige/blob/main'

export const SYSTEM_PAGES: SystemPage[] = [
  // Pages principales
  { slug: '', href: '/', title: 'Accueil', file: 'src/app/page.tsx', category: 'principale' },
  { slug: 'comment-ca-marche', href: '/comment-ca-marche', title: 'Comment ça marche', file: 'src/app/comment-ca-marche/page.tsx', category: 'principale' },
  { slug: 'pourquoi', href: '/pourquoi', title: 'Pourquoi le Label IGE', file: 'src/app/pourquoi/page.tsx', category: 'principale' },
  { slug: 'a-propos', href: '/a-propos', title: 'À propos', file: 'src/app/a-propos/page.tsx', category: 'principale' },
  { slug: 'faq', href: '/faq', title: 'FAQ', file: 'src/app/faq/page.tsx', category: 'principale' },
  { slug: 'recherche', href: '/recherche', title: 'Rechercher un label', file: 'src/app/recherche/page.tsx', category: 'principale' },

  // Pages légales
  { slug: 'mentions-legales', href: '/mentions-legales', title: 'Mentions légales', file: 'src/app/mentions-legales/page.tsx', category: 'légale' },
  { slug: 'cgu', href: '/cgu', title: 'CGU', file: 'src/app/cgu/page.tsx', category: 'légale' },
  { slug: 'confidentialite', href: '/confidentialite', title: 'Politique de confidentialité', file: 'src/app/confidentialite/page.tsx', category: 'légale' },

  // Auth
  { slug: 'connexion', href: '/connexion', title: 'Connexion', file: 'src/app/connexion/page.tsx', category: 'auth' },
  { slug: 'inscription', href: '/inscription', title: 'Inscription', file: 'src/app/inscription/page.tsx', category: 'auth' },

  // Parcours utilisateur
  { slug: 'creer', href: '/creer', title: 'Créer un label', file: 'src/app/creer/page.tsx', category: 'parcours' },
  { slug: 'espace-createur', href: '/espace-createur', title: 'Espace créateur', file: 'src/app/espace-createur/page.tsx', category: 'parcours' },
  { slug: 'blog', href: '/blog', title: 'Blog (listing)', file: 'src/app/blog/page.tsx', category: 'parcours' },
]

export function githubUrl(file: string): string {
  return `${REPO}/${file}`
}

export const CATEGORY_LABELS: Record<SystemPage['category'], string> = {
  principale: 'Pages principales',
  légale: 'Pages légales',
  auth: 'Authentification',
  parcours: 'Parcours utilisateur',
}
