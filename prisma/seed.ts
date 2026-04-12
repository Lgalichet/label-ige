import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Questions par défaut — Texte (total = 100%)
  const questionsTexte = [
    { question: "Idée initiale et conception du sujet", weighting: 25, sortOrder: 1 },
    { question: "Structuration du contenu (plan, organisation)", weighting: 15, sortOrder: 2 },
    { question: "Écriture initiale du contenu", weighting: 25, sortOrder: 3 },
    { question: "Recherche d'informations complémentaires", weighting: 10, sortOrder: 4 },
    { question: "Reformulation et amélioration du texte", weighting: 15, sortOrder: 5 },
    { question: "Correction orthographique, grammaticale et syntaxique", weighting: 10, sortOrder: 6 },
  ]

  // Questions par défaut — Image (total = 100%)
  const questionsImage = [
    { question: "Conception et imagination initiale", weighting: 30, sortOrder: 1 },
    { question: "Réalisation des croquis ou maquettes préparatoires", weighting: 20, sortOrder: 2 },
    { question: "Création ou génération de l'image finale", weighting: 30, sortOrder: 3 },
    { question: "Retouches et modifications esthétiques", weighting: 10, sortOrder: 4 },
    { question: "Choix et validation finale", weighting: 10, sortOrder: 5 },
  ]

  // Questions par défaut — Vidéo (total = 100%)
  const questionsVideo = [
    { question: "Conception et scénario", weighting: 25, sortOrder: 1 },
    { question: "Réalisation du storyboard", weighting: 15, sortOrder: 2 },
    { question: "Captation et enregistrement vidéo", weighting: 20, sortOrder: 3 },
    { question: "Montage et assemblage", weighting: 15, sortOrder: 4 },
    { question: "Effets spéciaux, animations et transitions", weighting: 15, sortOrder: 5 },
    { question: "Bande sonore et audio (musique, voix off)", weighting: 10, sortOrder: 6 },
  ]

  // Questions par défaut — Audio / Podcast (total = 100%)
  const questionsAudio = [
    { question: "Conception et écriture du script ou scénario", weighting: 25, sortOrder: 1 },
    { question: "Enregistrement de la voix ou génération vocale", weighting: 25, sortOrder: 2 },
    { question: "Création musicale ou sonore", weighting: 20, sortOrder: 3 },
    { question: "Montage et post-production audio", weighting: 15, sortOrder: 4 },
    { question: "Validation et choix final", weighting: 15, sortOrder: 5 },
  ]

  for (const q of questionsTexte) {
    await prisma.question.upsert({
      where: { id: `texte-${q.sortOrder}` },
      update: {},
      create: { id: `texte-${q.sortOrder}`, contentType: 'texte', ...q },
    })
  }

  for (const q of questionsImage) {
    await prisma.question.upsert({
      where: { id: `image-${q.sortOrder}` },
      update: {},
      create: { id: `image-${q.sortOrder}`, contentType: 'image', ...q },
    })
  }

  for (const q of questionsVideo) {
    await prisma.question.upsert({
      where: { id: `video-${q.sortOrder}` },
      update: {},
      create: { id: `video-${q.sortOrder}`, contentType: 'video', ...q },
    })
  }

  for (const q of questionsAudio) {
    await prisma.question.upsert({
      where: { id: `audio-${q.sortOrder}` },
      update: {},
      create: { id: `audio-${q.sortOrder}`, contentType: 'audio', ...q },
    })
  }

  // Paramètres par défaut
  const defaultSettings = [
    { key: 'score_threshold_green', value: '75' },
    { key: 'score_threshold_blue', value: '40' },
    { key: 'color_green', value: '#2E7D32' },
    { key: 'color_blue', value: '#1565C0' },
    { key: 'color_violet', value: '#6A1B9A' },
    { key: 'label_title', value: 'Label IGE' },
    { key: 'label_tagline', value: 'Imaginé humain • Généré IA • Embelli humain' },
  ]

  for (const s of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    })
  }

  console.log('✅ Seed terminé — questions et paramètres insérés')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
