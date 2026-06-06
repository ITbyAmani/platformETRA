import type { HTMLAttributes, ReactNode } from 'react'
import './Badge.css'

type Tone = 'brand' | 'success' | 'warning' | 'error' | 'gray' | 'info'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone
  children: ReactNode
}

export function Badge({ tone = 'brand', children, className = '', ...rest }: BadgeProps) {
  return (
    <span className={`etra-badge etra-badge--${tone} ${className}`.trim()} {...rest}>
      {children}
    </span>
  )
}
