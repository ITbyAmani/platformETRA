import type { ReactNode } from 'react'
import './EmptyState.css'

export type EmptyStateProps = {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon = '📭', title, description, action }: EmptyStateProps) {
  return (
    <div className="etra-empty">
      <div className="etra-empty__icon">{icon}</div>
      <h3 className="etra-empty__title">{title}</h3>
      {description ? <p className="etra-empty__desc">{description}</p> : null}
      {action}
    </div>
  )
}
