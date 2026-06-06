import type { HTMLAttributes, ReactNode } from 'react'
import './Card.css'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  interactive?: boolean
  flushTop?: boolean
}

export function Card({ children, interactive, flushTop, className = '', ...rest }: CardProps) {
  const cls = [
    'etra-card',
    interactive ? 'etra-card--interactive' : '',
    flushTop ? 'etra-card--flush-top' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  )
}
