import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { getScoreColor } from '@/lib/utils'

export const runtime = 'edge'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ number: string }> }
) {
  const { number } = await params

  const project = await prisma.project.findUnique({
    where: { creationNumber: number },
  })

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '1200px',
            height: '630px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1A3A5C',
            color: 'white',
            fontSize: '48px',
            fontWeight: 'bold',
          }}
        >
          Label IGE
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }

  const settings = await prisma.setting.findMany()
  const settingsMap = settings.reduce(
    (acc, s) => ({ ...acc, [s.key]: s.value }),
    {} as Record<string, string>
  )

  const { hex, label } = getScoreColor(project.score, settingsMap)
  const score = Math.round(project.score)

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          background: '#F8F9FA',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* Bande colorée gauche */}
        <div
          style={{
            width: '200px',
            background: hex,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
          }}
        >
          <div style={{ color: 'white', fontSize: '14px', fontWeight: 700, letterSpacing: '3px', marginBottom: '20px' }}>
            LABEL IGE
          </div>
          <div style={{ color: 'white', fontSize: '72px', fontWeight: 900 }}>
            {score}%
          </div>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontWeight: 600, textAlign: 'center', marginTop: '16px' }}>
            {label.toUpperCase()}
          </div>
        </div>

        {/* Contenu principal */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          <div style={{ color: '#1A3A5C', fontSize: '14px', fontWeight: 600, letterSpacing: '2px', marginBottom: '16px', textTransform: 'uppercase' }}>
            Certificat de transparence IA
          </div>
          <div style={{ color: '#1A1A2E', fontSize: '48px', fontWeight: 700, lineHeight: 1.2, marginBottom: '20px' }}>
            {project.title}
          </div>
          <div style={{ color: '#555B6E', fontSize: '22px', marginBottom: '40px' }}>
            par {project.creatorName}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: hex, color: 'white', padding: '8px 20px', borderRadius: '6px', fontSize: '16px', fontWeight: 600 }}>
              {label}
            </div>
            <div style={{ color: '#888', fontSize: '14px' }}>
              #{project.creationNumber}
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
