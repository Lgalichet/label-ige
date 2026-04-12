import sharp from 'sharp'

export interface BadgeOptions {
  score: number
  colorHex: string
  mention: string
  size?: number
}

/**
 * Génère un badge PNG côté serveur via Sharp
 * Format : carré 400×400px avec coins arrondis (simulés via masque SVG)
 */
export async function generateBadgePng(options: BadgeOptions): Promise<Buffer> {
  const { score, colorHex, mention, size = 400 } = options
  const roundedScore = Math.round(score)

  // Couleur de fond légèrement plus claire pour le texte blanc
  const svg = `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Fond principal avec coins arrondis -->
  <rect width="${size}" height="${size}" rx="32" ry="32" fill="${colorHex}"/>

  <!-- Bande supérieure plus foncée -->
  <rect width="${size}" height="80" rx="32" ry="32" fill="rgba(0,0,0,0.15)"/>
  <rect width="${size}" height="50" y="30" fill="rgba(0,0,0,0.15)"/>

  <!-- Logo / Titre "Label IGE" -->
  <text
    x="${size / 2}"
    y="54"
    font-family="Arial, sans-serif"
    font-size="20"
    font-weight="700"
    fill="rgba(255,255,255,0.95)"
    text-anchor="middle"
    letter-spacing="3"
  >LABEL IGE</text>

  <!-- Séparateur -->
  <line x1="40" y1="80" x2="${size - 40}" y2="80" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>

  <!-- Score principal -->
  <text
    x="${size / 2}"
    y="${size / 2 + 20}"
    font-family="Arial, sans-serif"
    font-size="96"
    font-weight="900"
    fill="white"
    text-anchor="middle"
  >${roundedScore}%</text>

  <!-- Séparateur bas -->
  <line x1="40" y1="${size - 80}" x2="${size - 40}" y2="${size - 80}" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>

  <!-- Mention bas -->
  <text
    x="${size / 2}"
    y="${size - 44}"
    font-family="Arial, sans-serif"
    font-size="16"
    font-weight="600"
    fill="rgba(255,255,255,0.9)"
    text-anchor="middle"
    letter-spacing="1"
  >${mention.toUpperCase()}</text>

  <!-- Tagline -->
  <text
    x="${size / 2}"
    y="${size - 22}"
    font-family="Arial, sans-serif"
    font-size="11"
    fill="rgba(255,255,255,0.6)"
    text-anchor="middle"
    letter-spacing="1"
  >Imaginé • Généré • Embelli</text>
</svg>`

  const buffer = await sharp(Buffer.from(svg))
    .png({ quality: 90 })
    .toBuffer()

  return buffer
}

/**
 * Génère une version miniature du badge (80×80px) pour les listes
 */
export async function generateBadgeThumbnail(options: BadgeOptions): Promise<Buffer> {
  return generateBadgePng({ ...options, size: 80 })
}
