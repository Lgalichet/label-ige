import GithubSlugger from 'github-slugger'

const slugger = new GithubSlugger()

export function slugify(input: string): string {
  slugger.reset()
  return slugger.slug(input)
}

/**
 * Génère un slug unique en ajoutant -2, -3 si collision.
 * `isTaken` doit retourner true si le slug existe déjà en DB.
 */
export async function uniqueSlug(
  base: string,
  isTaken: (candidate: string) => Promise<boolean>
): Promise<string> {
  const root = slugify(base) || 'sans-titre'
  let candidate = root
  let i = 2
  while (await isTaken(candidate)) {
    candidate = `${root}-${i}`
    i += 1
    if (i > 100) throw new Error('Impossible de générer un slug unique')
  }
  return candidate
}
