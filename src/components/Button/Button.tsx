import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import './Button.css'

type Variant = 'primary' | 'gradient' | 'secondary' | 'ghost' | 'danger' | 'discord'
type Size = 'sm' | 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  block?: boolean
  children: ReactNode
  /** Renders `<Link>` with button styles — avoids invalid `<a><button>` nesting. */
  to?: LinkProps['to']
}

export function Button({
  variant = 'primary',
  size = 'md',
  block,
  className = '',
  children,
  to,
  type = 'button',
  disabled,
  onClick,
  ...rest
}: ButtonProps) {
  const classes = [
    'etra-btn',
    `etra-btn--${variant}`,
    `etra-btn--${size}`,
    block ? 'etra-btn--block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to !== undefined && to !== '') {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault()
        return
      }
      onClick?.(e as unknown as MouseEvent<HTMLButtonElement>)
    }

    /* Strip <button>-only props so they are not forwarded to <a>. */
    /* eslint-disable @typescript-eslint/no-unused-vars -- destructuring to omit */
    const {
      form,
      formAction,
      formEncType,
      formMethod,
      formNoValidate,
      formTarget,
      name,
      value,
      ...passThrough
    } = rest as ButtonHTMLAttributes<HTMLButtonElement>
    /* eslint-enable @typescript-eslint/no-unused-vars */

    return (
      <Link
        to={to}
        className={classes}
        aria-disabled={disabled ? true : undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={handleClick}
        {...(passThrough as Omit<LinkProps, 'to' | 'className' | 'children' | 'onClick'>)}
      >
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}
