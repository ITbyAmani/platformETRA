import './Avatar.css'

type Size = 'sm' | 'md' | 'lg' | 'xl'

export type AvatarProps = {
  name: string
  src?: string
  size?: Size
  className?: string
}

export function Avatar({ name, src, size = 'md', className = '' }: AvatarProps) {
  const initial = name.trim().charAt(0) || '?'
  return (
    <span className={`etra-avatar etra-avatar--${size} ${className}`.trim()} aria-hidden={!!src}>
      {src ? <img src={src} alt="" /> : initial}
    </span>
  )
}
