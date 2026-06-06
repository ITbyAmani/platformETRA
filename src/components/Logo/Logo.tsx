import { useId } from 'react'

type LogoProps = {
  variant?: 'gradient' | 'white'
  height?: number
  className?: string
}

export function Logo({ variant = 'gradient', height = 32, className = '' }: LogoProps) {
  const gid = useId().replace(/:/g, '')
  const gradId = `etraLogoGrad-${gid}`
  const fill = variant === 'white' ? '#ffffff' : `url(#${gradId})`
  const stroke = variant === 'white' ? '#fff' : `url(#${gradId})`
  return (
    <svg
      className={className}
      style={{ display: 'block' }}
      width={Math.round(height * 3.2)}
      height={height}
      viewBox="0 0 160 50"
      role="img"
      aria-label="ETRA"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5234B7" />
          <stop offset="100%" stopColor="#9E59CD" />
        </linearGradient>
      </defs>
      <text x="0" y="38" fontFamily="Cairo, sans-serif" fontWeight="800" fontSize="42" fill={fill}>
        ETRA
      </text>
      <path d="M118 6 L128 44" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
