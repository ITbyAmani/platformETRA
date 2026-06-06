import type { ReactNode } from 'react'
import './StatCard.css'

export type StatCardProps = {
  icon: ReactNode
  label: string
  value: string
  trend?: { direction: 'up' | 'down'; text: string }
}

export function StatCard({ icon, label, value, trend }: StatCardProps) {
  return (
    <article className="etra-stat-card">
      <div className="etra-stat-card__icon">{icon}</div>
      <div className="etra-stat-card__label">{label}</div>
      <div className="etra-stat-card__value">{value}</div>
      {trend ? (
        <div
          className={`etra-stat-card__trend ${trend.direction === 'up' ? 'etra-stat-card__trend--up' : 'etra-stat-card__trend--down'}`.trim()}
        >
          {trend.text}
        </div>
      ) : null}
    </article>
  )
}
