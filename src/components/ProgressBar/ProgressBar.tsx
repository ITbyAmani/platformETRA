import { useEffect, useState } from 'react'
import './ProgressBar.css'

export type ProgressBarProps = {
  value: number
  label?: string
  className?: string
}

export function ProgressBar({ value, label, className = '' }: ProgressBarProps) {
  const [w, setW] = useState(0)
  useEffect(() => {
    const t = requestAnimationFrame(() => setW(Math.min(100, Math.max(0, value))))
    return () => cancelAnimationFrame(t)
  }, [value])

  return (
    <div className={`etra-progress ${className}`.trim()}>
      <div className="etra-progress__row">
        <div className="etra-progress__track">
          <div className="etra-progress__fill" style={{ width: `${w}%` }} />
        </div>
        {label ? <span className="etra-progress__label">{label}</span> : null}
      </div>
    </div>
  )
}
