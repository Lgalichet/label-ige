import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import QRCode from 'qrcode'
import { prisma } from '@/lib/db'
import { getScoreColor } from '@/lib/utils'

export const runtime = 'nodejs'

const SIZE = 600

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ number: string }> }
) {
  const { number } = await params

  const project = await prisma.project.findUnique({
    where: { creationNumber: number },
  })

  if (!project) {
    return new Response('Label introuvable', { status: 404 })
  }

  if (!project.isPublic) {
    return new Response('Ce label est privé', { status: 403 })
  }

  const settings = await prisma.setting.findMany()
  const settingsMap = settings.reduce(
    (acc, s) => ({ ...acc, [s.key]: s.value }),
    {} as Record<string, string>
  )

  const { hex, mention } = getScoreColor(project.score, settingsMap)
  const score = Math.round(project.score)

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://label-ige.vercel.app'
  const labelUrl = `${appUrl}/label/${number}`

  // QR code en PNG data URL (couleurs sûres pour Satori)
  const qrDataUrl = await QRCode.toDataURL(labelUrl, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 220,
    color: { dark: '#1A1A2E', light: '#FFFFFF' },
  })

  const image = new ImageResponse(
    (
      <div
        style={{
          width: `${SIZE}px`,
          height: `${SIZE}px`,
          display: 'flex',
          flexDirection: 'column',
          background: hex,
          color: 'white',
          padding: '32px',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '4px',
            }}
          >
            LABEL IGE
          </div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '1px',
            }}
          >
            {`#${number}`}
          </div>
        </div>

        {/* Score + mention */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            paddingTop: '16px',
          }}
        >
          <div
            style={{
              fontSize: '128px',
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {`${score}%`}
          </div>
          <div
            style={{
              marginTop: '16px',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '2px',
              color: 'rgba(255,255,255,0.95)',
            }}
          >
            {mention.toUpperCase()}
          </div>
        </div>

        {/* QR + infos */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'white',
            borderRadius: '12px',
            padding: '16px',
            color: '#1A1A2E',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrDataUrl}
            alt="QR"
            width={120}
            height={120}
            style={{ borderRadius: '4px' }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              paddingLeft: '20px',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#555B6E', letterSpacing: '1px' }}>
              CERTIFICAT DE TRANSPARENCE IA
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px', color: '#1A1A2E' }}>
              {number}
            </div>
            <div style={{ fontSize: '12px', marginTop: '8px', color: '#555B6E' }}>
              Vérifier sur
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A3A5C' }}>
              {`${appUrl.replace(/^https?:\/\//, '')}/label/${number}`}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: SIZE,
      height: SIZE,
    }
  )

  // ImageResponse renvoie une Response image/png — on ajoute le Content-Disposition.
  const buffer = await image.arrayBuffer()

  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Content-Disposition': `attachment; filename="badge-ige-${number}.png"`,
    },
  })
}
