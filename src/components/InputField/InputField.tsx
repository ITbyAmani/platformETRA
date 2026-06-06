import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import './InputField.css'

type FieldProps = {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
}

export function InputField({
  label,
  hint,
  error,
  className = '',
  id,
  ...inputProps
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const inputId = id ?? (typeof label === 'string' && label.trim() ? label.replace(/\s+/g, '-') : undefined)
  const showLabel = label !== undefined && label !== null && String(label).trim() !== ''
  return (
    <div className={`etra-field ${className}`.trim()}>
      {showLabel ? (
        <label className="etra-field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={`etra-input ${error ? 'etra-input--error' : ''}`.trim()}
        {...inputProps}
      />
      {error ? <span className="etra-field__error">{error}</span> : null}
      {hint && !error ? <span className="etra-field__hint">{hint}</span> : null}
    </div>
  )
}

export function TextAreaField({
  label,
  hint,
  error,
  className = '',
  id,
  ...props
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const inputId = id
  const showLabel = label !== undefined && label !== null && String(label).trim() !== ''
  return (
    <div className={`etra-field ${className}`.trim()}>
      {showLabel ? (
        <label className="etra-field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <textarea
        id={inputId}
        className={`etra-textarea ${error ? 'etra-textarea--error' : ''}`.trim()}
        {...props}
      />
      {error ? <span className="etra-field__error">{error}</span> : null}
      {hint && !error ? <span className="etra-field__hint">{hint}</span> : null}
    </div>
  )
}

export function SelectField({
  label,
  hint,
  error,
  className = '',
  id,
  children,
  ...props
}: FieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const showLabel = label !== undefined && label !== null && label !== ''
  return (
    <div className={`etra-field ${className}`.trim()}>
      {showLabel ? (
        <label className="etra-field__label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <select id={id} className={`etra-select ${error ? 'etra-input--error' : ''}`.trim()} {...props}>
        {children}
      </select>
      {error ? <span className="etra-field__error">{error}</span> : null}
      {hint && !error ? <span className="etra-field__hint">{hint}</span> : null}
    </div>
  )
}
