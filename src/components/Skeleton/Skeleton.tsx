import type { HTMLAttributes } from 'react'
import './Skeleton.css'

type Variant = 'text' | 'title' | 'avatar' | 'image'

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  variant?: Variant
}

export function Skeleton({ variant = 'text', className = '', ...rest }: SkeletonProps) {
  return <div className={`etra-skeleton etra-skeleton--${variant} ${className}`.trim()} {...rest} />
}
