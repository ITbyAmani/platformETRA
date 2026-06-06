import { Badge } from '../Badge/Badge'
import { Button } from '../Button/Button'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { Avatar } from '../Avatar/Avatar'
import './CourseCard.css'

export type CourseCardProps = {
  domain: string
  title: string
  instructor: string
  price: string
  rating: string
  reviewCount: string
  cta: string
  /** When set, the CTA is a client-side link (avoids nesting interactive elements). */
  ctaTo?: string
  /** زر تفاصيل (مثلاً فتح نافذة منبثقة) بجانب الإجراء الأساسي. */
  onDetailsClick?: () => void
  /** إضافة للسلة أو شراء. */
  onAddToCart?: () => void
  /** نص الزر الأساسي — الافتراضي «أضف للسلة». */
  primaryActionLabel?: string
  /** مدة العرض (معسكر، ورشة، إلخ). */
  durationLabel?: string
  thumbnail?: string
  progress?: number
  statusBadge?: string
}

export function CourseCard({
  domain,
  title,
  instructor,
  price,
  rating,
  reviewCount,
  cta,
  ctaTo,
  onDetailsClick,
  onAddToCart,
  primaryActionLabel = 'أضف للسلة',
  durationLabel,
  thumbnail,
  progress,
  statusBadge,
}: CourseCardProps) {
  return (
    <article className="etra-course-card">
      <div className="etra-course-card__media">
        {thumbnail ? (
          <img className="etra-course-card__thumb" src={thumbnail} alt="" />
        ) : null}
        <div className="etra-course-card__tag">
          <Badge tone="brand">{domain}</Badge>
        </div>
      </div>
      <div className="etra-course-card__body">
        {statusBadge ? <Badge tone="info">{statusBadge}</Badge> : null}
        <h3 className="etra-course-card__title">{title}</h3>
        {durationLabel ? <p className="etra-course-card__duration">{durationLabel}</p> : null}
        <div className="etra-course-card__meta">
          <Avatar name={instructor} size="sm" />
          <span>{instructor}</span>
        </div>
        <div className="etra-course-card__rating">
          <span className="etra-course-card__stars">★★★★★</span> {rating} ({reviewCount})
        </div>
        {progress !== undefined ? <ProgressBar value={progress} label={`${progress}٪`} /> : null}
        <div className="etra-course-card__footer">
          <span className="etra-course-card__price">{price}</span>
          <div className="etra-course-card__foot-actions">
            {onDetailsClick ? (
              <Button type="button" variant="secondary" size="sm" onClick={onDetailsClick}>
                {cta}
              </Button>
            ) : ctaTo ? (
              <Button variant="secondary" size="sm" to={ctaTo}>
                {cta}
              </Button>
            ) : null}
            {onAddToCart ? (
              <Button type="button" variant="primary" size="sm" onClick={onAddToCart}>
                {primaryActionLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
