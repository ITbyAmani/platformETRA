import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Badge } from '../components/Badge/Badge'
import { Button } from '../components/Button/Button'
import { Container } from '../components/Container/Container'
import { CourseCard } from '../components/CourseCard/CourseCard'
import { InputField, SelectField } from '../components/InputField/InputField'
import { Modal } from '../components/Modal/Modal'
import { formatArNumber, sampleCourses } from '../fixtures/common'
import {
  SUBSCRIPTION_COMPARISON,
  SUBSCRIPTION_TIERS,
  type BillingPeriod,
  type SubscriptionTier,
} from '../fixtures/storeSubscriptions'
import { addCourseToCart, courseToCartItem, isEtraSessionAuthed } from '../lib/cartStorage'
import { formatArCurrency } from '../lib/formatAr'
import './store-page.css'

type StoreKindFilter = 'mentoring' | 'bootcamp' | 'workshop' | 'bit'
const STORE_KIND_KEYS = new Set<StoreKindFilter>(['mentoring', 'bootcamp', 'workshop', 'bit'])

const STORE_KIND_LABELS: Record<StoreKindFilter, string> = {
  mentoring: 'إرشاد تقني',
  bootcamp: 'معسكرات تقنية',
  workshop: 'ورش تقنية',
  bit: 'إترا Bit',
}

type PriceFilter = 'all' | 'free' | 'under200' | '200to280' | 'over280'
type DurationFilter = 'all' | 'short' | 'medium' | 'long'
type SortKey = 'ratingDesc' | 'priceAsc' | 'priceDesc' | 'durationAsc' | 'durationDesc'

type StoreCourse = (typeof sampleCourses)[number]

function tierPrice(tier: SubscriptionTier, period: BillingPeriod): number {
  return period === 'yearly' ? tier.yearlySar : tier.monthlySar
}

function featureLines(f: SubscriptionTier['features']): { label: string; value: string }[] {
  return [
    { label: 'الفيديوهات المسجّلة', value: f.videoLibrary ? 'مشمول' : '—' },
    { label: 'محرر الأكواد', value: f.codeEditor ? 'مشمول' : '—' },
    { label: 'الجلسات المباشرة', value: f.liveSessions ? 'مشمول' : '—' },
    { label: 'جلسات الإرشاد', value: f.mentoringSessions > 0 ? `${formatArNumber(f.mentoringSessions)} / شهر` : '—' },
    { label: 'ديسكورد إترا', value: f.discord ? 'مشمول' : '—' },
  ]
}

export function StoreSubscriptionsPage() {
  const [period, setPeriod] = useState<BillingPeriod>('monthly')

  return (
    <div className="store-page store-page--subs">
      <header className="store-page__hero">
        <Container>
          <div className="store-page__hero-inner">
            <p className="store-page__badge">متجر إترا — الاشتراكات</p>
            <h1 className="store-page__title">باقات العضوية</h1>
            <p className="store-page__lead">
              ثلاث مستويات واضحة: أساسي، متقدم، ومتميز — قارِن المميزات واختر الدفع الشهري أو السنوي (توفير عند السنوي).
            </p>
            <p className="store-subs__cross">
              <Link to="/store/products" className="store-subs__cross-link">
                ← الدورات والخدمات الفردية
              </Link>
            </p>
          </div>
        </Container>
      </header>

      <div className="store-page__main">
        <Container>
          <div className="store-subs__toggle-row">
            <div className="store-subs__toggle-wrap" role="group" aria-label="دورة الفوترة">
            <button
              type="button"
              className={`store-subs__toggle${period === 'monthly' ? ' store-subs__toggle--active' : ''}`.trim()}
              onClick={() => setPeriod('monthly')}
            >
              شهري
            </button>
            <button
              type="button"
              className={`store-subs__toggle${period === 'yearly' ? ' store-subs__toggle--active' : ''}`.trim()}
              onClick={() => setPeriod('yearly')}
            >
              سنوي
              <span className="store-subs__toggle-hint"> وفّر حتى ٢٠٪</span>
            </button>
            </div>
          </div>

          <div className="store-subs__cards">
            {SUBSCRIPTION_TIERS.map((tier) => (
              <article
                key={tier.id}
                className={`store-subs-card${tier.id === 'advanced' ? ' store-subs-card--featured' : ''}`.trim()}
              >
                {tier.badge ? (
                  <div className="store-subs-card__badge-wrap">
                    <Badge tone="brand">{tier.badge}</Badge>
                  </div>
                ) : null}
                <h2 className="store-subs-card__name">{tier.name}</h2>
                <p className="store-subs-card__desc">{tier.description}</p>
                <p className="store-subs-card__price">
                  <span className="store-subs-card__amount">{formatArCurrency(tierPrice(tier, period))}</span>
                  <span className="store-subs-card__period">{period === 'yearly' ? '/ سنة' : '/ شهر'}</span>
                </p>
                <div className="store-subs-card__domains">
                  <p className="store-subs-card__domains-label">المجالات والمسارات</p>
                  <ul>
                    {tier.domainsIncluded.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <ul className="store-subs-card__features">
                  {featureLines(tier.features).map((row) => (
                    <li key={row.label}>
                      <span className="store-subs-card__feat-label">{row.label}</span>
                      <span className="store-subs-card__feat-val">{row.value}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="primary" block className="store-subs-card__cta" to="/register">
                  اشترك الآن
                </Button>
              </article>
            ))}
          </div>

          <section className="store-subs-compare" aria-labelledby="store-subs-compare-title">
            <h2 id="store-subs-compare-title" className="store-subs-compare__title">
              جدول مقارنة المميزات
            </h2>
            <div className="store-subs-compare__scroll">
              <table className="store-subs-compare__table">
                <thead>
                  <tr>
                    <th scope="col">الميزة</th>
                    <th scope="col">أساسي</th>
                    <th scope="col">متقدم</th>
                    <th scope="col">متميز</th>
                  </tr>
                </thead>
                <tbody>
                  {SUBSCRIPTION_COMPARISON.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{row.basic}</td>
                      <td>{row.advanced}</td>
                      <td>{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="store-subs-compare__note">
              الدفع الآمن عبر Moyasar ومدى وفيزا وApple Pay. الأسعار تشمل ضريبة القيمة المضافة حيث ينطبق.
            </p>
          </section>
        </Container>
      </div>
    </div>
  )
}

function matchesPrice(c: StoreCourse, pf: PriceFilter): boolean {
  if (pf === 'all') return true
  if (pf === 'free') return c.priceSar === 0
  if (pf === 'under200') return c.priceSar > 0 && c.priceSar < 200
  if (pf === '200to280') return c.priceSar >= 200 && c.priceSar <= 280
  if (pf === 'over280') return c.priceSar > 280
  return true
}

function matchesDuration(c: StoreCourse, df: DurationFilter): boolean {
  if (df === 'all') return true
  const h = c.durationHours
  if (df === 'short') return h <= 10
  if (df === 'medium') return h > 10 && h <= 35
  if (df === 'long') return h > 35
  return true
}

export function StoreProductsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [detail, setDetail] = useState<StoreCourse | null>(null)

  const q = (searchParams.get('q') ?? '').trim().toLowerCase()
  const kindParam = searchParams.get('kind')
  const kindFilter: StoreKindFilter | null =
    kindParam && STORE_KIND_KEYS.has(kindParam as StoreKindFilter) ? (kindParam as StoreKindFilter) : null
  const domainParam = searchParams.get('domain') ?? 'all'
  const priceFilter = (searchParams.get('price') ?? 'all') as PriceFilter
  const durationFilter = (searchParams.get('dur') ?? 'all') as DurationFilter
  const sortKey = (searchParams.get('sort') ?? 'ratingDesc') as SortKey

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(searchParams)
      if (!value || value === 'all') next.delete(key)
      else next.set(key, value)
      setSearchParams(next, { replace: true })
    },
    [searchParams, setSearchParams],
  )

  const uniqueDomains = useMemo(() => {
    const s = new Set<string>()
    sampleCourses.forEach((c) => s.add(c.domain))
    return [...s].sort((a, b) => a.localeCompare(b, 'ar'))
  }, [])

  const filtered = useMemo(() => {
    let list = [...sampleCourses]
    if (kindFilter) list = list.filter((c) => c.filterKey === kindFilter)
    if (domainParam !== 'all') list = list.filter((c) => c.domain === domainParam)
    list = list.filter((c) => matchesPrice(c, priceFilter))
    list = list.filter((c) => matchesDuration(c, durationFilter))
    if (q) {
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.domain.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.cardBadge.toLowerCase().includes(q),
      )
    }
    list.sort((a, b) => {
      switch (sortKey) {
        case 'priceAsc':
          return a.priceSar - b.priceSar
        case 'priceDesc':
          return b.priceSar - a.priceSar
        case 'durationAsc':
          return a.durationHours - b.durationHours
        case 'durationDesc':
          return b.durationHours - a.durationHours
        case 'ratingDesc':
        default:
          return b.ratingValue - a.ratingValue
      }
    })
    return list
  }, [domainParam, durationFilter, kindFilter, priceFilter, q, sortKey])

  const handleAddToCart = (courseId: string) => {
    if (!isEtraSessionAuthed()) {
      navigate(`/login?next=${encodeURIComponent('/store/products')}`)
      return
    }
    const item = courseToCartItem(courseId)
    if (item) addCourseToCart(item)
  }

  useEffect(() => {
    if (!detail) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDetail(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [detail])

  return (
    <div className="store-page store-page--products">
      <header className="store-page__hero">
        <Container>
          <div className="store-page__hero-inner">
            <p className="store-page__badge">متجر إترا — المنتجات</p>
            <h1 className="store-page__title">دورات، معسكرات، وورش</h1>
            <p className="store-page__lead">
              اشترِ دورة أو ورشة أو معسكراً كخدمة فردية — صفِّ حسب المجال والسعر والمدة، واطلع على التفاصيل قبل
              الشراء.
            </p>
            {kindFilter ? (
              <p className="store-page__filter-chip" role="status">
                يعرض الآن: {STORE_KIND_LABELS[kindFilter]}
              </p>
            ) : null}
            <p className="store-subs__cross">
              <Link to="/store/subscriptions" className="store-subs__cross-link">
                باقات الاشتراك الشهرية والسنوية ←
              </Link>
            </p>
          </div>
        </Container>
      </header>

      <div className="store-page__main">
        <Container>
          <div className="store-page__layout store-layout">
            <aside className="store-sidebar">
              <div className="store-sidebar__inner">
                <h2 className="store-sidebar__title">تصفية وفرز</h2>
                <div className="store-products__search-block">
                  <InputField
                    id="store-products-q"
                    placeholder="ابحث بالعنوان، المجال، أو المرشد..."
                    aria-label="بحث في المنتجات"
                    value={searchParams.get('q') ?? ''}
                    onChange={(e) => setParam('q', e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <p className="store-sidebar__section-label">المجال</p>
                <div className="store-products__select-wrap">
                  <SelectField
                    id="store-domain"
                    aria-label="تصفية حسب المجال"
                    value={domainParam}
                    onChange={(e) => setParam('domain', e.target.value)}
                  >
                    <option value="all">كل المجالات</option>
                    {uniqueDomains.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </SelectField>
                </div>
                <p className="store-sidebar__section-label">السعر</p>
                <div className="store-products__select-wrap">
                  <SelectField
                    id="store-price"
                    aria-label="تصفية حسب السعر"
                    value={priceFilter}
                    onChange={(e) => setParam('price', e.target.value)}
                  >
                    <option value="all">كل الأسعار</option>
                    <option value="free">مجاني</option>
                    <option value="under200">أقل من ٢٠٠ ر.س</option>
                    <option value="200to280">٢٠٠ — ٢٨٠ ر.س</option>
                    <option value="over280">أعلى من ٢٨٠ ر.س</option>
                  </SelectField>
                </div>
                <p className="store-sidebar__section-label">المدة (تقريبية)</p>
                <div className="store-products__select-wrap">
                  <SelectField
                    id="store-dur"
                    aria-label="تصفية حسب المدة"
                    value={durationFilter}
                    onChange={(e) => setParam('dur', e.target.value)}
                  >
                    <option value="all">كل المدد</option>
                    <option value="short">قصيرة (حتى ١٠ ساعات)</option>
                    <option value="medium">متوسطة (١١ — ٣٥ ساعة)</option>
                    <option value="long">طويلة (أكثر من ٣٥ ساعة)</option>
                  </SelectField>
                </div>
                <p className="store-sidebar__section-label">نوع العرض</p>
                <div className="store-products__select-wrap">
                  <SelectField
                    id="store-kind"
                    aria-label="تصفية حسب نوع المنتج"
                    value={kindParam ?? 'all'}
                    onChange={(e) => setParam('kind', e.target.value === 'all' ? '' : e.target.value)}
                  >
                    <option value="all">الكل</option>
                    <option value="mentoring">إرشاد تقني</option>
                    <option value="bootcamp">معسكر تقني</option>
                    <option value="workshop">ورشة عمل</option>
                    <option value="bit">إترا Bit</option>
                  </SelectField>
                </div>
                <div className="store-sidebar__actions">
                  <Button
                    type="button"
                    variant="ghost"
                    block
                    className="store-sidebar__btn-reset"
                    onClick={() => setSearchParams({}, { replace: true })}
                  >
                    إعادة ضبط الفلاتر
                  </Button>
                </div>
              </div>
            </aside>

            <div className="store-page__content">
              <div className="store-page__toolbar">
                <span className="store-page__count">
                  <span>{formatArNumber(filtered.length)}</span> منتج متاح
                </span>
                <div className="store-page__sort">
                  <SelectField
                    aria-label="ترتيب النتائج"
                    id="store-sort"
                    value={sortKey}
                    onChange={(e) => setParam('sort', e.target.value)}
                  >
                    <option value="ratingDesc">الأعلى تقييماً</option>
                    <option value="priceAsc">السعر: من الأقل للأعلى</option>
                    <option value="priceDesc">السعر: من الأعلى للأقل</option>
                    <option value="durationAsc">المدة: الأقصر أولاً</option>
                    <option value="durationDesc">المدة: الأطول أولاً</option>
                  </SelectField>
                </div>
              </div>
              {filtered.length === 0 ? (
                <p className="store-products__empty" role="status">
                  لا توجد منتجات مطابقة. جرّب توسيع البحث أو إعادة ضبط الفلاتر.
                </p>
              ) : (
                <div className="store-page__grid">
                  {filtered.map((c) => (
                    <CourseCard
                      key={c.id}
                      domain={c.domain}
                      title={c.title}
                      instructor={c.instructor}
                      price={c.price}
                      rating={c.rating}
                      reviewCount={c.reviews}
                      durationLabel={c.durationLabel}
                      statusBadge={c.cardBadge}
                      cta="التفاصيل"
                      onDetailsClick={() => setDetail(c)}
                      onAddToCart={() => handleAddToCart(c.id)}
                      primaryActionLabel="شراء / تسجيل"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      <Modal
        open={detail !== null}
        title={detail?.title ?? ''}
        onClose={() => setDetail(null)}
        footer={
          detail ? (
            <div className="store-products-modal__footer">
              <span className="store-products-modal__price">{detail.price}</span>
              <div className="store-products-modal__actions">
                <Button type="button" variant="secondary" onClick={() => setDetail(null)}>
                  إغلاق
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => {
                    handleAddToCart(detail.id)
                    setDetail(null)
                  }}
                >
                  شراء / تسجيل
                </Button>
              </div>
            </div>
          ) : null
        }
      >
        {detail ? (
          <div className="store-products-modal__body">
            <div className="store-products-modal__meta">
              <Badge tone="brand">{detail.domain}</Badge>
              <Badge tone="info">{detail.cardBadge}</Badge>
            </div>
            <p className="store-products-modal__lead">{detail.summary}</p>
            <dl className="store-products-modal__dl">
              <div>
                <dt>المرشد</dt>
                <dd>{detail.instructor}</dd>
              </div>
              <div>
                <dt>المدة</dt>
                <dd>{detail.durationLabel}</dd>
              </div>
              <div>
                <dt>التقييم</dt>
                <dd>
                  {detail.rating} ({detail.reviews})
                </dd>
              </div>
              <div>
                <dt>الجهة</dt>
                <dd>{detail.org}</dd>
              </div>
            </dl>
            <h3 className="store-products-modal__h3">ما الذي ستستفيد منه؟</h3>
            <ul className="store-products-modal__bullets">
              {detail.detailBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
