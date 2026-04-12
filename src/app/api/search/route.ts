import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') ?? ''
  const contentType = searchParams.get('type') ?? ''
  const scoreMin = parseFloat(searchParams.get('scoreMin') ?? '0')
  const scoreMax = parseFloat(searchParams.get('scoreMax') ?? '100')
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const perPage = Math.min(20, parseInt(searchParams.get('perPage') ?? '12'))

  const where: Record<string, unknown> = {
    isPublic: true,
    score: { gte: scoreMin, lte: scoreMax },
  }

  if (query) {
    where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { creatorName: { contains: query, mode: 'insensitive' } },
      { creationNumber: { contains: query, mode: 'insensitive' } },
    ]
  }

  if (contentType && contentType !== 'all') {
    where.contentTypes = { some: { type: contentType } }
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        creationNumber: true,
        title: true,
        creatorName: true,
        creationDate: true,
        score: true,
        isPublic: true,
        createdAt: true,
        contentTypes: { select: { type: true, score: true } },
        user: { select: { username: true } },
      },
    }),
    prisma.project.count({ where }),
  ])

  return NextResponse.json({
    projects,
    total,
    page,
    pages: Math.ceil(total / perPage),
  })
}
