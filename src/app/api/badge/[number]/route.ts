import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateBadgePng } from '@/lib/badge'
import { getScoreColor } from '@/lib/utils'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ number: string }> }
) {
  const { number } = await params

  const project = await prisma.project.findUnique({
    where: { creationNumber: number },
  })

  if (!project) {
    return new NextResponse('Label introuvable', { status: 404 })
  }

  if (!project.isPublic) {
    return new NextResponse('Ce label est privé', { status: 403 })
  }

  const settings = await prisma.setting.findMany()
  const settingsMap = settings.reduce(
    (acc, s) => ({ ...acc, [s.key]: s.value }),
    {} as Record<string, string>
  )

  const { hex, mention } = getScoreColor(project.score, settingsMap)

  const png = await generateBadgePng({
    score: project.score,
    colorHex: hex,
    mention,
  })

  return new NextResponse(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Content-Disposition': `attachment; filename="badge-ige-${number}.png"`,
    },
  })
}
