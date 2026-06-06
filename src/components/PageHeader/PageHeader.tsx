import type { ReactNode } from 'react'
import './PageHeader.css'

export type PageHeaderProps = {
  title: string
  subtitle?: string
  meta?: ReactNode
  actions?: ReactNode
}

export function PageHeader({ title, subtitle, meta, actions }: PageHeaderProps) {
  return (
    <header className="etra-page-header">
      <div className="etra-page-header__titles">
        <h1 className="etra-h2">{title}</h1>
        {subtitle ? <p className="etra-body">{subtitle}</p> : null}
        {meta ? <div className="etra-page-header__meta">{meta}</div> : null}
      </div>
      {actions ? <div className="etra-page-header__actions">{actions}</div> : null}
    </header>
  )
}
