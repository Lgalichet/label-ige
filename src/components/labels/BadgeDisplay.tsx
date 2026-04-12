import { cn } from '@/lib/utils'

interface BadgeDisplayProps {
  score: number
  creationNumber: string
  size?: 'sm' | 'md' | 'lg'
  colorHex: string
  mention: string
  className?: string
}

const sizes = {
  sm: { wrapper: 'w-20 h-20', score: 'text-2xl', label: 'text-[9px]', title: 'text-[8px]' },
  md: { wrapper: 'w-32 h-32', score: 'text-4xl', label: 'text-[10px]', title: 'text-[9px]' },
  lg: { wrapper: 'w-48 h-48', score: 'text-6xl', label: 'text-xs', title: 'text-[10px]' },
}

export function BadgeDisplay({
  score,
  size = 'md',
  colorHex,
  mention,
  className,
}: BadgeDisplayProps) {
  const s = sizes[size]
  const roundedScore = Math.round(score)

  return (
    <div
      className={cn(
        s.wrapper,
        'rounded-2xl flex flex-col items-center justify-center text-white relative overflow-hidden shrink-0',
        className
      )}
      style={{ backgroundColor: colorHex }}
      role="img"
      aria-label={`Badge IGE — Score ${roundedScore}% — ${mention}`}
    >
      {/* Bande titre */}
      <div className="absolute top-0 left-0 right-0 h-1/4 bg-black/15 flex items-center justify-center">
        <span
          className={cn(s.title, 'font-bold tracking-widest uppercase text-white/90')}
        >
          LABEL IGE
        </span>
      </div>

      {/* Score */}
      <span className={cn(s.score, 'font-black mt-2')}>{roundedScore}%</span>

      {/* Mention bas */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-black/15 flex items-center justify-center px-1">
        <span
          className={cn(s.label, 'font-semibold tracking-wide uppercase text-center text-white/90 leading-tight')}
        >
          {mention}
        </span>
      </div>
    </div>
  )
}
