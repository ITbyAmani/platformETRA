import { type FormEvent, type RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Badge } from '../components/Badge/Badge'
import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import { Container } from '../components/Container/Container'
import { Logo } from '../components/Logo/Logo'
import { InputField } from '../components/InputField/InputField'
import {
  BLOG_POSTS,
  BLOG_TOPIC_FILTERS,
  type BlogPost,
  type BlogTopicFilter,
  getFeaturedPost,
  getPostBySlug,
  getRelatedPosts,
} from '../fixtures/blogPosts'
import { sampleCourses, statsLanding, trustLine } from '../fixtures/common'
import {
  dashboardPathForRole,
  isEtraSessionAuthed,
  readCart,
  removeFromCart,
  startEtraSession,
  subscribeCart,
  type EtraCartItem,
} from '../lib/cartStorage'
import './landing-shaguf.css'
import './register-page.css'
import './cart-page.css'
import './about-page.css'
import './blog-page.css'

const heroPhoneTeachers = [
  { name: 'م. أحمد', line: 'مرشد أمن سيبراني — تقييم ممتاز' },
  { name: 'م. لينا', line: 'مسار تطوير ويب — شرح واضح' },
  { name: 'م. خالد', line: 'تحليل بيانات — جلسات عملية' },
]

const landingProgramCards = [
  {
    key: 'progressive',
    title: 'تطوير تصاعدي',
    description: 'مسار واضح يبدأ من مستواك ويطوّر مهاراتك خطوة بخطوة.',
  },
  {
    key: 'assessment',
    title: 'اختبار شامل',
    description: 'تقييم مختصر يوضح مستواك ونقاط القوة وفرص التحسين.',
  },
  {
    key: 'capstone',
    title: 'مشروع تطبيقي',
    description: 'مشروع عملي تبنيه بإرشاد وتضيفه إلى معرض أعمالك.',
  },
]

const howItWorksSteps = [
  {
    key: 'register',
    number: '١',
    title: 'سجّل حسابك',
    description: 'أنشئ حسابك واختر نوع الدخول المناسب لك خلال دقائق.',
  },
  {
    key: 'track',
    number: '٢',
    title: 'اختر مسارك',
    description: 'حدّد المجال التقني الذي يناسب هدفك ومستواك الحالي.',
  },
  {
    key: 'mentor',
    number: '٣',
    title: 'تعلّم مع مرشدك',
    description: 'تابع محتوى منظم وجلسات مباشرة وملاحظات عملية من المرشد.',
  },
  {
    key: 'certificate',
    number: '٤',
    title: 'احصل على شهادتك',
    description: 'أنهِ المتطلبات واعرض مشروعك وشهادتك بثقة.',
  },
]

const etraPortalCards = [
  {
    key: 'creators',
    title: 'بوابة المبدعين',
    description: 'مساحة مخصصة للمبدعين في إترا لعرض المبادرات والفرص القادمة.',
    path: '/creators-gate',
    action: 'ادخل البوابة',
  },
  {
    key: 'consulting',
    title: 'بوابة استشارات المشاريع',
    description: 'نقطة وصول لخدمات استشارات المشاريع التقنية وربطها بفريق إترا.',
    path: '/project-consulting-gate',
    action: 'استعرض البوابة',
  },
]

/** شعارات شركاء النجاح (ملفات في public/) — ترتيب من اليمين لليسار في RTL */
const landingPartners: { src: string; alt: string; logoClass?: string }[] = [
  { src: '/partner-jada30.png', alt: 'جادة ٣٠', logoClass: 'landing-partners__logo landing-partners__logo--jada' },
  { src: '/partner-bank.png', alt: 'بنك التنمية الاجتماعية' },
  { src: '/cranl-light.png', alt: 'CranL', logoClass: 'landing-partners__logo landing-partners__logo--cranl' },
]

const stages = [
  {
    key: 'graduates',
    icon: '🎓',
    cls: 'landing-stage-card__icon--1',
    title: 'الخريجون الجدد',
    description: 'ابنِ خبرة عملية وجهّز أعمالك الأولى لسوق العمل.',
  },
  {
    key: 'career-shift',
    icon: '💼',
    cls: 'landing-stage-card__icon--2',
    title: 'التحول المهني',
    description: 'ابدأ من الأساسيات بخطة واضحة لدخول المجال التقني.',
  },
  {
    key: 'university',
    icon: '👥',
    cls: 'landing-stage-card__icon--3',
    title: 'طلاب الجامعات',
    description: 'حوّل ما تتعلمه في الجامعة إلى تطبيق ومشاريع.',
  },
  {
    key: 'tech-employees',
    icon: '⚙️',
    cls: 'landing-stage-card__icon--4',
    title: 'موظفو التقنية',
    description: 'طوّر مهاراتك وواكب الأدوات المطلوبة في العمل.',
  },
]

const testimonialCopy = [
  { text: 'تجربة رائعة، المحتوى عملي والمرشدون قريبون من احتياج السوق.', name: 'سارة م.', rating: '5.0' },
  { text: 'التنقل سهل والجلسات المباشرة غيّرت طريقة تعلّمي للبرمجة.', name: 'فيصل ع.', rating: '5.0' },
  { text: 'أخيراً منصة عربية بهذا الوضوح والاحتراف في المسارات التقنية.', name: 'نورة أ.', rating: '5.0' },
  { text: 'الدعم سريع والمسارات مرتبة — أنصح بها لكل من يريد دخول التقنية بثقة.', name: 'رازان', rating: '5.0' },
  { text: 'تنوع المحتوى والمرونة في المواعيد أنقذتني أثناء الجامعة.', name: 'Hala', rating: '5.0' },
  { text: 'شهادة المعتمدين على إترا أعطتني دفعة قوية في السيرة الذاتية.', name: 'Faisal', rating: '5.0' },
]

type ShaghufGradient = 'a' | 'b' | 'c' | 'd'

function LandingShaghufCourseCard({
  title,
  instructor,
  price,
  cardBadge,
  org,
  visualTitle,
  gradient,
  discountPct,
  to = '/store/products',
}: {
  title: string
  instructor: string
  price: string
  cardBadge: string
  org: string
  visualTitle: string
  gradient: ShaghufGradient
  discountPct?: number
  to?: string
}) {
  return (
    <article className="landing-shaghuf-card">
      <Link to={to} className="landing-shaghuf-card__link">
        <div className={`landing-shaghuf-card__visual landing-shaghuf-card__visual--${gradient}`}>
          <div className="landing-shaghuf-card__deco" aria-hidden />
          {discountPct != null ? (
            <span className="landing-shaghuf-card__ribbon">{discountPct}٪</span>
          ) : null}
          <span className="landing-shaghuf-card__badge">{cardBadge}</span>
          <span className="landing-shaghuf-card__visual-title">{visualTitle}</span>
        </div>
        <div className="landing-shaghuf-card__body">
          <h3 className="landing-shaghuf-card__title">{title}</h3>
          <p className="landing-shaghuf-card__meta">
            <span className="landing-shaghuf-card__meta-icon" aria-hidden>
              🎓
            </span>
            {org}
          </p>
          <p className="landing-shaghuf-card__meta">
            <span className="landing-shaghuf-card__meta-icon" aria-hidden>
              👤
            </span>
            {instructor}
          </p>
          <div className="landing-shaghuf-card__price">{price}</div>
        </div>
      </Link>
    </article>
  )
}

const faqItems = [
  {
    q: 'هل البرامج مناسبة للمبتدئين؟',
    a: 'نعم. تبدأ المسارات من الأساسيات ثم تنتقل تدريجياً إلى التطبيق، حتى لو كانت خلفيتك التقنية بسيطة.',
  },
  {
    q: 'كيف يعمل الإرشاد في إترا؟',
    a: 'تتعلم بخطة واضحة، وتحصل على متابعة من مرشد يساعدك في ترتيب خطواتك، مراجعة تقدمك، وتحويل المعرفة إلى تطبيق عملي.',
  },
  {
    q: 'هل الإرشاد فردي أم جماعي؟',
    a: 'يعتمد على البرنامج المختار. بعض البرامج تكون فردية، وبعضها ضمن مجموعات صغيرة مع متابعة وتوجيه.',
  },
  {
    q: 'هل أحتاج خبرة برمجية سابقة؟',
    a: 'ليس دائماً. نساعدك على اختيار المسار المناسب لمستواك الحالي، سواء كنت تبدأ من الصفر أو تريد تطوير مهارة محددة.',
  },
  {
    q: 'ما الفرق بين إترا والدورات المسجلة؟',
    a: 'إترا لا يكتفي بالمحتوى المسجل؛ تحصل على توجيه، تطبيقات عملية، ومتابعة تساعدك على بناء مهارات قابلة للاستخدام.',
  },
]

export function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const featuredCourses = sampleCourses.slice(0, 4)

  return (
    <>
      <section className="landing-hero-v2">
        <div className="landing-hero-v2__blobs" aria-hidden>
          <span className="landing-hero-v2__blob landing-hero-v2__blob--1" />
          <span className="landing-hero-v2__blob landing-hero-v2__blob--2" />
        </div>
        <Container>
          <div className="landing-hero-v2__grid">
            <div>
              <p className="landing-hero-v2__badge">إترا للتمكين التقني</p>
              <h1 className="landing-hero-v2__title">
                مرشدك الأول
                <br />
                نحو التمكين التقني
              </h1>
              <p className="landing-hero-v2__lead">
                نربط الفجوة بين التعليم النظري ومتطلبات سوق العمل من خلال التعلّم، والتطبيق، وبناء مشاريع حقيقية
              </p>
              <div className="landing-hero-v2__actions">
                <Link to="/store/products" className="landing-cta-pill">
                  ابدأ رحلتك
                </Link>
              </div>
              <div className="landing-hero-v2__trust">
                <span className="landing-hero-v2__trust-stars">★★★★★</span>
                <span>آلاف المتعلّمين يثقون بتجربة إترا</span>
              </div>
            </div>
            <div className="landing-hero-v2__visual">
              <span className="landing-float landing-float--stars" aria-hidden>
                ★★★★★
              </span>
              <span className="landing-float landing-float--1" aria-hidden>
                👍
              </span>
              <span className="landing-float landing-float--2" aria-hidden>
                ❤️
              </span>
              <span className="landing-float landing-float--3" aria-hidden>
                🤩
              </span>
              <div className="landing-phone">
                <div className="landing-phone__inner">
                  <div className="landing-phone__bar">
                    <Logo height={26} className="landing-phone__logo" />
                  </div>
                  <div className="landing-phone__list">
                    {heroPhoneTeachers.map((t) => (
                      <div key={t.name} className="landing-phone-card">
                        <div className="landing-phone-card__avatar" aria-hidden />
                        <div>
                          <div className="landing-phone-card__name">{t.name}</div>
                          <div className="landing-phone-card__meta">
                            <span>5.0</span> <span aria-hidden>★</span> · {t.line}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="landing-stats">
        <Container>
          <div className="landing-stats__grid">
            {statsLanding.map((s) => (
              <div key={s.label} className="landing-stats__cell">
                <div className="landing-stats__num">
                  {s.prefix}
                  {s.value}
                </div>
                <div className="landing-stats__label">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="landing-portals" aria-labelledby="landing-portals-heading">
        <Container>
          <div className="landing-portals__head">
            <p className="landing-portals__eyebrow">بوابات إترا</p>
            <h2 id="landing-portals-heading">خدمات إضافية تابعة لإترا</h2>
            <p>بوابات مستقلة نجهّزها لتكون امتدادًا للمنصة، وتقدر تدخلين لها من الصفحة الرئيسية مباشرة.</p>
          </div>
          <div className="landing-portals__grid">
            {etraPortalCards.map((portal) => (
              <article key={portal.key} className={`landing-portal-card landing-portal-card--${portal.key}`}>
                <div className="landing-portal-card__mark" aria-hidden>
                  {portal.key === 'creators' ? '✦' : '⌁'}
                </div>
                <div>
                  <h3>{portal.title}</h3>
                  <p>{portal.description}</p>
                </div>
                <Link to={portal.path} className="landing-portal-card__button">
                  {portal.action}
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="landing-how" aria-labelledby="landing-how-heading">
        <Container>
          <div className="landing-how__head">
            <h2 id="landing-how-heading" className="landing-how__title">كيف تعمل المنصة؟</h2>
            <p className="landing-how__lead">رحلة واضحة من التسجيل إلى الشهادة، بخطوات بسيطة ومتابعة إرشادية.</p>
          </div>
          <div className="landing-how__flow" role="list">
            {howItWorksSteps.map((step) => (
              <article key={step.key} className="landing-how-card" role="listitem">
                <span className="landing-how-card__num" aria-hidden>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="landing-blobs" aria-labelledby="landing-blobs-heading">
        <div className="landing-blobs__ambient" aria-hidden>
          <span className="landing-blobs__ambient-orb landing-blobs__ambient-orb--1" />
          <span className="landing-blobs__ambient-orb landing-blobs__ambient-orb--2" />
        </div>
        <Container>
          <h2 id="landing-blobs-heading" className="landing-blobs__title">
            تعلّم مع أفضل المرشدين
          </h2>
          <p className="landing-blobs__lead">
            من الصفر إلى الاحتراف — محتوى منظم، جلسات مباشرة، وإرشاد يقودك خطوة بخطوة نحو أهدافك التقنية.
          </p>
          <div className="landing-blobs__grid" role="list">
            {landingProgramCards.map((card, index) => (
              <article key={card.key} className="landing-blobs-card" role="listitem">
                <span className="landing-blobs-card__step" aria-hidden>
                  {index + 1}
                </span>
                <div className="landing-blobs-card__ribbon">
                  <span>{card.title}</span>
                </div>
                <p className="landing-blobs-card__label">{card.description}</p>
              </article>
            ))}
          </div>
          <div className="landing-blobs__cta">
            <Link to="/store/products" className="landing-cta-pill">
              تعلّم معنا
            </Link>
          </div>
        </Container>
      </section>

      <section className="landing-stages">
        <Container>
          <h2 className="landing-stages__title">إترا منصة الجميع</h2>
          <div className="landing-stages__grid">
            {stages.map((s) => (
              <article key={s.key} className="landing-stage-card">
                <div className={`landing-stage-card__icon ${s.cls}`}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
          <div className="landing-stages__footer">
            <Link to="/store/products" className="landing-cta-pill landing-cta-pill--block">
              ابدأ رحلتك مع إترا
            </Link>
          </div>
        </Container>
      </section>

      <section className="landing-courses">
        <Container>
          <div className="landing-courses__head">
            <h2 className="landing-courses__title">نماذج من البرامج</h2>
            <p className="landing-courses__lead">مختارات سريعة من مسارات إترا، والتفاصيل الكاملة تجدها في المتجر.</p>
          </div>
          <div className="landing-courses-grid landing-courses-grid--shaghuf">
            {featuredCourses.map((c) => (
              <LandingShaghufCourseCard
                key={c.id}
                title={c.title}
                instructor={c.instructor}
                price={c.price}
                cardBadge={c.cardBadge ?? c.domain}
                org={c.org ?? 'إترا'}
                visualTitle={c.visualTitle ?? c.domain}
                gradient={(c.gradient ?? 'a') as ShaghufGradient}
                discountPct={c.discountPct}
              />
            ))}
          </div>
          <div className="landing-courses__browse">
            <Link to="/store/products" className="landing-cta-pill">
              استعرض كل البرامج
            </Link>
          </div>
        </Container>
      </section>

      <section className="landing-testimonials">
        <Container>
          <h2 className="landing-testimonials__title">آراء طلابنا</h2>
          <p className="landing-testimonials__lead">مقتبسات حقيقية من تجارب المتعلّمين على إترا.</p>
          <div className="landing-testimonials__grid">
            {testimonialCopy.map((item) => (
              <article key={item.name} className="landing-t-card">
                <div className="landing-t-card__head">
                  <span className="etra-small" style={{ fontWeight: 700 }}>
                    {item.name}
                  </span>
                  <span className="landing-t-card__rating">{item.rating} ★★★★★</span>
                </div>
                <p className="etra-body" style={{ margin: 0, color: 'var(--text-secondary)' }}>
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="landing-partners" aria-labelledby="landing-partners-heading">
        <Container>
          <h2 id="landing-partners-heading" className="landing-partners__title">
            شركاء النجاح
          </h2>
          <p className="landing-partners__lead">
            نفخر بالتعاون مع شركائنا الداعمين لمنصة إترا.
          </p>
          <div className="landing-partners__row" role="list">
            {landingPartners.map((p) => (
              <div key={p.src} className="landing-partners__logo-wrap" role="listitem">
                <img
                  src={p.src}
                  alt={p.alt}
                  className={p.logoClass ?? 'landing-partners__logo'}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="landing-join-split">
        <Container>
          <div className="landing-join-split__grid">
            <div className="landing-join-col">
              <div className="landing-join-col__illus" aria-hidden>
                🎓
              </div>
              <h3>كن من أصدقاء إترا المميزين</h3>
              <ul>
                <li>مسارات واضحة تناسب مستواك</li>
                <li>متابعة تساعدك على الاستمرار</li>
                <li>مشاريع عملية تضيفها لأعمالك</li>
              </ul>
              <Link to="/register" className="landing-cta-pill landing-cta-pill--block">
                انضم كمتعلم
              </Link>
            </div>
            <div className="landing-join-col">
              <div className="landing-join-col__illus" aria-hidden>
                🧭
              </div>
              <h3>انضم كمرشد</h3>
              <ul>
                <li>عمل مرن وعن بُعد</li>
                <li>جدول يتوافق مع وقتك</li>
                <li>عائد مالي ممتاز</li>
              </ul>
              <Link to="/mentor-join" className="landing-cta-pill landing-cta-pill--block">
                انضم كمرشد
              </Link>
            </div>
            <div className="landing-join-col">
              <div className="landing-join-col__illus" aria-hidden>
                📣
              </div>
              <h3>كن أحد سفرائنا المبدعين</h3>
              <ul>
                <li>تحقيق عوائد مادية</li>
                <li>استقطاب المتعلمين</li>
                <li>استقطاب المرشدين</li>
              </ul>
              <Link to="/ambassador-join" className="landing-cta-pill landing-cta-pill--block">
                انضم كسفير
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="landing-faq">
        <Container>
          <h2 className="landing-faq__title">الأسئلة الشائعة</h2>
          <div className="landing-faq__list">
            {faqItems.map((item, i) => {
              const open = openFaq === i
              return (
                <div key={item.q} className="landing-faq-item">
                  <button
                    type="button"
                    className="landing-faq-item__btn"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                  >
                    {item.q}
                    <span className="landing-faq-item__toggle" aria-hidden>
                      {open ? '×' : '+'}
                    </span>
                  </button>
                  {open ? (
                    <div className="landing-faq-item__panel" id={`faq-panel-${i}`} role="region">
                      {item.a}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </Container>
      </section>

    </>
  )
}

function PortalPlaceholderPage({
  title,
  label,
  description,
  bullets,
}: {
  title: string
  label: string
  description: string
  bullets: string[]
}) {
  return (
    <section className="portal-placeholder">
      <Container>
        <div className="portal-placeholder__shell">
          <div className="portal-placeholder__content">
            <p className="portal-placeholder__eyebrow">{label}</p>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="portal-placeholder__actions">
              <Link to="/" className="landing-cta-pill">
                العودة للرئيسية
              </Link>
              <span>سيتم ربط هذه البوابة بالموقع الخارجي لاحقًا.</span>
            </div>
          </div>
          <div className="portal-placeholder__preview" aria-hidden>
            <div className="portal-placeholder__window">
              <span />
              <span />
              <span />
            </div>
            <div className="portal-placeholder__panel">
              {bullets.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function CreatorsGatePage() {
  return (
    <PortalPlaceholderPage
      label="بوابة مستقلة"
      title="بوابة المبدعين"
      description="هذه صفحة تمهيدية لبوابة المبدعين التابعة لإترا. الهدف منها يكون واضح للمستخدم أن البوابة جزء مستقل سيتم ربطه لاحقًا."
      bullets={['ملفات المبدعين', 'فرص التعاون', 'مشاريع ومبادرات']}
    />
  )
}

export function ProjectConsultingGatePage() {
  return (
    <PortalPlaceholderPage
      label="بوابة مستقلة"
      title="بوابة استشارات المشاريع"
      description="هذه صفحة تمهيدية لبوابة استشارات المشاريع التابعة لإترا. لاحقًا يمكن ربطها بنظام الاستشارات أو نموذج حجز مستقل."
      bullets={['تقييم فكرة المشروع', 'جلسات استشارية', 'خطة تطوير أولية']}
    />
  )
}

const ambassadorPerks = [
  { title: 'عوائد مالية واضحة', text: 'احصل على عمولة مقابل التحويلات الناجحة من روابطك الخاصة.' },
  { title: 'روابط وكوبونات جاهزة', text: 'شارك روابط إحالة مخصصة للمنصة أو للمسارات والاشتراكات.' },
  { title: 'متابعة الأداء', text: 'راقب النقرات، التسجيلات، والتحويلات من لوحة سفير منظمة.' },
  { title: 'محتوى تسويقي مساعد', text: 'استخدم رسائل مختصرة وأفكار نشر تساعدك في الوصول للمتعلمين.' },
]

const ambassadorJourney = [
  { title: 'عبّئ نموذج الطلب', icon: '📝' },
  { title: 'يصلك قبولك بالبريد', icon: '✉️' },
  { title: 'ابدأ مشاركة رابطك', icon: '🚀' },
]

const ambassadorTestimonials = [
  { name: 'ريما الحربي', text: 'تجربة السفير كانت سهلة وواضحة، الروابط منظمة والأرباح تظهر بدون تعقيد.' },
  { name: 'عبدالله القحطاني', text: 'أحببت أني أشارك منصة مفيدة وفي نفس الوقت أحقق عائد من توصياتي.' },
  { name: 'لمياء المطيري', text: 'لوحة المتابعة ساعدتني أعرف أي محتوى يجيب تسجيلات أكثر.' },
]

const ambassadorFaqs = [
  { q: 'ما هي مهامي كسفير؟', a: 'مشاركة روابط إترا، تعريف المتعلمين بالمسارات المناسبة، ومتابعة نتائج حملاتك من لوحة السفير.' },
  { q: 'أين أجد الروابط الخاصة بي؟', a: 'بعد قبولك وتسجيل دخولك، تظهر لك روابط الإحالة والكوبونات داخل داش بورد السفير.' },
  { q: 'هل تُخصم العمولة من المتعلم أو المرشد؟', a: 'لا. العمولة تُحتسب من نظام الإحالة ولا تغيّر سعر المتعلم أو مستحقات المرشد.' },
  { q: 'متى أستطيع طلب السحب؟', a: 'يمكنك طلب السحب عند وصول رصيدك للحد الأدنى الموضح داخل لوحة الأرباح.' },
]

const mentorPerks = [
  { title: 'عمل مرن وعن بُعد', text: 'قدّم جلساتك ومحتواك في الأوقات المناسبة لك، من أي مكان.' },
  { title: 'دروس مباشرة ومسجلة', text: 'استخدم الجلسات المباشرة والمحتوى المسجل لتقديم تجربة تعليمية متوازنة.' },
  { title: 'متابعة أرباحك', text: 'راقب مستحقاتك وتفاصيل جلساتك من لوحة مرشد منظمة.' },
  { title: 'أدوات تفاعلية', text: 'اختبارات، واجبات، وملاحظات تساعدك على توجيه المتعلمين بوضوح.' },
]

const mentorTools = [
  'دروس مسجلة',
  'دروس مباشرة',
  'اختبارات',
  'تجميعات',
  'مواد تعليمية',
  'مواد جامعية',
  'معسكرات تدريبية',
  'قدرات وتحصيلي',
]

const mentorJourney = [
  { title: 'قدّم طلب الانضمام', text: 'أرسل بياناتك وخبرتك التعليمية والتقنية.' },
  { title: 'راجع محتواك معنا', text: 'نساعدك على ترتيب طريقة الشرح وتجهيز التجربة.' },
  { title: 'ابدأ مع المتعلمين', text: 'قدّم جلساتك ومحتواك وتابع تقدم طلابك.' },
]

const mentorTestimonials = [
  { name: 'غالية آل معدي', text: 'تجربتي بالشرح في إترا كانت منظمة، والتعامل مع المتعلمين واضح وسهل.' },
  { name: 'نورة فيصل', text: 'وصلت لطلاب مهتمين فعلاً، ولوحة المتابعة اختصرت علي وقت كثير.' },
  { name: 'ديمة محمد الناصر', text: 'العمل كمرشدة مرن وممتع، وأقدر أتابع الجلسات والأرباح من مكان واحد.' },
]

const mentorFaqs = [
  { q: 'ما هي منصة إترا؟', a: 'إترا منصة تمكين تقني تجمع بين التعلم، الإرشاد، والمشاريع العملية لمساعدة المتعلمين على دخول سوق العمل.' },
  { q: 'كيف أنضم كمرشد في إترا؟', a: 'ابدأ من زر الانضمام، عبّئ بياناتك، ثم نراجع الطلب ونرسل لك الخطوات التالية.' },
  { q: 'كيف يمكنني الحصول على المحتوى التعليمي؟', a: 'بعد قبولك كمرشد، تستطيع إدارة المحتوى والجلسات من لوحة المرشد الخاصة بك.' },
  { q: 'ماهو الدخل المتوقع عند انضمامي كمرشد؟', a: 'يعتمد على عدد المتعلمين والجلسات والمحتوى المقدم، وتظهر تفاصيل الأرباح داخل لوحة المرشد.' },
  { q: 'هل يوجد راتب شهري للمرشد؟', a: 'النموذج يعتمد على العوائد المرتبطة بالجلاسات أو الاشتراكات حسب آلية المنصة.' },
]

export function AmbassadorJoinPage() {
  return (
    <div className="ambassador-public">
      <section className="ambassador-public-hero">
        <Container>
          <div className="ambassador-public-hero__content">
            <span className="ambassador-public__badge">برنامج سفراء إترا</span>
            <h1>كن صوت إترا في مجتمعك التقني</h1>
            <p>
              ساهم في إيصال التعلم التقني للمتعلمين، شارك روابطك الخاصة، وتابع أرباحك وتحويلاتك من لوحة سفير واحدة.
            </p>
            <Link to="/register?as=ambassador" className="landing-cta-pill">
              انضم كسفير الآن
            </Link>
          </div>
          <div className="ambassador-public-float ambassador-public-float--a">عوائد مالية</div>
          <div className="ambassador-public-float ambassador-public-float--b">روابط خاصة</div>
          <div className="ambassador-public-float ambassador-public-float--c">متابعة أرباحك</div>
          <div className="ambassador-public-float ambassador-public-float--d">استقطاب المتعلمين</div>
        </Container>
      </section>

      <section className="ambassador-public-section">
        <Container>
          <h2>لماذا تنضم كسفير في إترا؟</h2>
          <div className="ambassador-public-perks">
            {ambassadorPerks.map((perk) => (
              <article key={perk.title} className="ambassador-public-card">
                <h3>{perk.title}</h3>
                <p>{perk.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="ambassador-public-visual">
        <Container>
          <div className="ambassador-public-phone" aria-hidden>
            <div className="ambassador-public-phone__screen">
              <span>إحصائيات السفير</span>
              <strong>٢٤ تحويل</strong>
              <p>١٬٢٨٠ ريال أرباح الشهر</p>
            </div>
          </div>
          <div className="ambassador-public-feature ambassador-public-feature--right">
            <p>التسويق بالروابط</p>
            <p>استقطاب المتعلمين</p>
            <p>محتوى جاهز للنشر</p>
          </div>
          <div className="ambassador-public-feature ambassador-public-feature--left">
            <p>عمولة ٥٪</p>
            <p>قوالب تسويقية</p>
            <p>تقارير أداء</p>
          </div>
        </Container>
      </section>

      <section className="ambassador-public-journey">
        <Container>
          <h2>رحلة انضمامك كسفير</h2>
          <div className="ambassador-public-journey__grid">
            {ambassadorJourney.map((step) => (
              <article key={step.title}>
                <span>{step.icon}</span>
                <h3>{step.title}</h3>
              </article>
            ))}
          </div>
          <Link to="/register?as=ambassador" className="landing-cta-pill">
            انضم كسفير الآن
          </Link>
        </Container>
      </section>

      <section className="ambassador-public-section ambassador-public-section--soft">
        <Container>
          <h2>آراء سفراء إترا</h2>
          <div className="ambassador-public-testimonials">
            {ambassadorTestimonials.map((item) => (
              <article key={item.name}>
                <strong>{item.name}</strong>
                <span>★★★★★ 5</span>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="ambassador-public-section">
        <Container>
          <h2>الأسئلة الشائعة</h2>
          <div className="ambassador-public-faq">
            {ambassadorFaqs.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}

export function MentorJoinPage() {
  return (
    <div className="ambassador-public mentor-public">
      <section className="ambassador-public-hero mentor-public-hero">
        <Container>
          <div className="ambassador-public-hero__content">
            <span className="ambassador-public__badge">برنامج مرشدي إترا</span>
            <h1>علّم بخبرتك واصنع أثراً تقنياً</h1>
            <p>
              انضم كمرشد في إترا وساعد المتعلمين على بناء مهاراتهم من خلال محتوى منظم، جلسات مباشرة، ومتابعة عملية.
            </p>
            <Link to="/register?as=mentor" className="landing-cta-pill">
              انضم كمرشد الآن
            </Link>
          </div>
          <div className="ambassador-public-float ambassador-public-float--a">عمل مرن</div>
          <div className="ambassador-public-float ambassador-public-float--b">دروس مباشرة</div>
          <div className="ambassador-public-float ambassador-public-float--c">متابعة أرباحك</div>
          <div className="ambassador-public-float ambassador-public-float--d">أدوات تفاعلية</div>
        </Container>
      </section>

      <section className="ambassador-public-visual mentor-public-visual">
        <Container>
          <div className="mentor-public-screen" aria-hidden>
            <div className="mentor-public-screen__bar" />
            <div className="mentor-public-screen__body">
              <div>
                <strong>الإحصائيات</strong>
                <span>١٥٬٠٠٠ ريال</span>
              </div>
              <div>
                <strong>الإشعارات</strong>
                <span>١٢ طلب جديد</span>
              </div>
              <div>
                <strong>المحتوى</strong>
                <span>دروس واختبارات</span>
              </div>
            </div>
          </div>
          <div className="ambassador-public-feature ambassador-public-feature--right">
            <p>دروس مباشرة</p>
            <p>دروس مسجلة</p>
            <p>أسئلة واختبارات</p>
          </div>
          <div className="ambassador-public-feature ambassador-public-feature--left">
            <p>عمل مرن</p>
            <p>متابعة أرباحك</p>
            <p>أدوات تفاعلية</p>
          </div>
        </Container>
      </section>

      <section className="ambassador-public-section">
        <Container>
          <h2>تجربة تعليم ذكية لطلابك</h2>
          <p className="mentor-public-lead">نوفر لك أدوات تساعدك في الشرح، المتابعة، وقياس تقدم المتعلمين بطرق عملية.</p>
          <div className="ambassador-public-perks">
            {mentorPerks.map((perk) => (
              <article key={perk.title} className="ambassador-public-card">
                <h3>{perk.title}</h3>
                <p>{perk.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="mentor-public-tools">
        <Container>
          <h2>ماذا يمكنك تقديمه في إترا؟</h2>
          <div className="mentor-public-tools__grid">
            {mentorTools.map((tool) => (
              <article key={tool}>
                <span aria-hidden>✦</span>
                <strong>{tool}</strong>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="ambassador-public-journey mentor-public-journey">
        <Container>
          <h2>رحلتك كمرشد في إترا</h2>
          <div className="mentor-public-journey__grid">
            {mentorJourney.map((step, index) => (
              <article key={step.title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
          <Link to="/register?as=mentor" className="landing-cta-pill">
            انضم كمرشد
          </Link>
        </Container>
      </section>

      <section className="ambassador-public-section ambassador-public-section--soft">
        <Container>
          <h2>+٥٩٠ مرشد في إترا</h2>
          <div className="ambassador-public-testimonials">
            {mentorTestimonials.map((item) => (
              <article key={item.name}>
                <strong>{item.name}</strong>
                <span>★★★★★ 5</span>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <Link to="/register?as=mentor" className="landing-cta-pill mentor-public-bottom-cta">
            انضم كمرشد
          </Link>
        </Container>
      </section>

      <section className="ambassador-public-section">
        <Container>
          <h2>الأسئلة الشائعة</h2>
          <div className="ambassador-public-faq">
            {mentorFaqs.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}

export function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-page__hero" aria-labelledby="about-hero-title">
        <Container>
          <div className="about-page__hero-inner">
            <p className="about-page__badge">إترا للتمكين التقني</p>
            <h1 id="about-hero-title" className="about-page__title">
              عن إترا
            </h1>
            <p className="about-page__lead">
              إترا منصة سعودية للتعلّم التقني والإرشاد: نربط الفجوة بين التعليم النظري ومتطلبات سوق العمل من خلال
              التعلّم، والتطبيق، وبناء مشاريع حقيقية — مع مسارات واضحة، وجلسات مباشرة مع مرشدين من السوق، ومحتوى
              يجمع بين النظرية والتطبيق.
            </p>
          </div>
        </Container>
      </section>

      <section className="landing-stats" aria-label="أرقام إترا">
        <Container>
          <div className="landing-stats__grid">
            {statsLanding.map((s) => (
              <div key={s.label} className="landing-stats__cell">
                <div className="landing-stats__num">
                  {s.prefix}
                  {s.value}
                </div>
                <div className="landing-stats__label">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="about-page__section about-page__section--surface">
        <Container>
          <h2 className="about-page__h2">من نحن</h2>
          <p className="about-page__sub">
            نعمل على تمكين المتعلّم العربي بمهارات رقمية قابلة للقياس، عبر تجربة تعليمية واحدة تجمع المحتوى،
            والتقييم، والمجتمع.
          </p>
          <div className="about-page__split about-grid">
            <div>
              <p className="about-page__prose">
                تقدّم إترا إرشاداً تقنياً، ومعسكرات وورشاً عملية، وملخصات «إترا Bit»، مع لوحة متعلّم تسهّل
                متابعة التقدّم والواجبات والجلسات المباشرة. هدفنا أن يخرج المتعلّم بمخرجات يمكن عرضها في السيرة
                الذاتية ومقابلات العمل — لا مجرد شهادة نظرية.
              </p>
              <p className="about-page__prose">
                المنصة مصممة لتكون عربية الواجهة، واضحة التنظيم، وقريبة من احتياجات المتعلّمين والمرشدين في
                المملكة والمنطقة.
              </p>
              <div className="about-page__trust" role="note">
                {trustLine} — أحد مؤشرات التزامنا بربط التعلّم بالفرص.
              </div>
            </div>
            <div className="about-page__visual-card" aria-hidden>
              <span className="about-page__visual-emoji">🎓📡</span>
              <p className="about-page__visual-caption">تعلّم · إرشاد · مشاريع · مجتمع</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="about-page__section">
        <Container>
          <h2 className="about-page__h2">ماذا نقدّم؟</h2>
          <p className="about-page__sub">مسارات ومنتجات تغطي مراحل مختلفة من رحلتك التقنية.</p>
          <div className="about-page__pillars">
            <Link to="/store/products?kind=mentoring" className="about-page__pillar">
              <div className="about-page__pillar-icon" aria-hidden>
                💡
              </div>
              <h3 className="about-page__pillar-title">إرشاد تقني</h3>
              <p className="about-page__pillar-desc">جلسات مع مرشد من السوق لترتيب مسارك والإجابة عن استفساراتك العملية.</p>
            </Link>
            <Link to="/store/products?kind=bootcamp" className="about-page__pillar">
              <div className="about-page__pillar-icon" aria-hidden>
                ⛺
              </div>
              <h3 className="about-page__pillar-title">معسكرات تقنية</h3>
              <p className="about-page__pillar-desc">تجربة مكثّفة لبناء مهارة كاملة عبر وحدات متتابعة وتمارين قريبة من الواقع.</p>
            </Link>
            <Link to="/store/products?kind=workshop" className="about-page__pillar">
              <div className="about-page__pillar-icon" aria-hidden>
                🛠️
              </div>
              <h3 className="about-page__pillar-title">ورش تقنية</h3>
              <p className="about-page__pillar-desc">جلسات عملية مركّزة على موضوع محدّد يمكن إكماله في وقت أقصر.</p>
            </Link>
            <Link to="/store/products?kind=bit" className="about-page__pillar">
              <div className="about-page__pillar-icon" aria-hidden>
                💾
              </div>
              <h3 className="about-page__pillar-title">إترا Bit</h3>
              <p className="about-page__pillar-desc">ملخصات وأدوات وأخبار تقنية مرتّبة للمبتدئين بأقل وقت ممكن.</p>
            </Link>
          </div>
        </Container>
      </section>

      <section className="about-page__section about-page__section--surface">
        <Container>
          <h2 className="about-page__h2">الرسالة والرؤية والقيم</h2>
          <p className="about-page__sub">إطار عملنا الداخلي — ما نصبو إليه وكيف نتصرف يومياً.</p>
          <div className="about-page__mvc">
            <article className="about-page__mvc-card">
              <span className="about-page__mvc-label">الرسالة</span>
              <h3 className="about-page__mvc-title">تمكين عملي يُحسَس في السوق</h3>
              <p className="about-page__mvc-body">
                أن نمنح كل متعلّم عربي مساراً واضحاً يقوده من أساسيات المجال إلى تطبيق حقيقي، مع دعم مرشدين
                يفهمون متطلبات العمل اليوم.
              </p>
            </article>
            <article className="about-page__mvc-card">
              <span className="about-page__mvc-label">الرؤية</span>
              <h3 className="about-page__mvc-title">منصة مرجعية للتعلّم التقني المنظّم</h3>
              <p className="about-page__mvc-body">
                أن نكون الخيار الموثوق لمن يريد دخول التقنية أو تطوير مساره — بجودة محتوى، وتجربة استخدام
                مريحة، ومجتمع متعلّمين نشطاً.
              </p>
            </article>
            <article className="about-page__mvc-card">
              <span className="about-page__mvc-label">القيم</span>
              <h3 className="about-page__mvc-title">وضوح، احترام، ومخرجات</h3>
              <ul className="about-page__list">
                <li>الوضوح في المسارات والتوقعات قبل وبعد الاشتراك.</li>
                <li>احترام وقت المتعلّم والمرشد، وجدولة مرنة حيث ينطبق.</li>
                <li>التركيز على مخرجات قابلة للعرض: مشاريع، تقييم، وشهادات عند توفرها.</li>
                <li>الشراكة مع مؤسسات وشركاء يدعمون رحلة التعلّم والتوظيف.</li>
              </ul>
            </article>
          </div>
        </Container>
      </section>

      <section className="landing-partners" aria-labelledby="about-partners-heading">
        <Container>
          <h2 id="about-partners-heading" className="landing-partners__title">
            شركاء النجاح
          </h2>
          <p className="landing-partners__lead">نفخر بالتعاون مع شركائنا الداعمين لمنصة إترا.</p>
          <div className="landing-partners__row" role="list">
            {landingPartners.map((p) => (
              <div key={p.src} className="landing-partners__logo-wrap" role="listitem">
                <img
                  src={p.src}
                  alt={p.alt}
                  className={p.logoClass ?? 'landing-partners__logo'}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="about-page__section">
        <Container>
          <div className="about-page__cta">
            <h2 className="about-page__cta-title">جاهز تبدأ مع إترا؟</h2>
            <p className="about-page__cta-lead">أنشئ حساباً، اختر دورتك أو مسارك، ثم تابع تقدّمك من لوحة واحدة.</p>
            <div className="about-page__cta-row">
              <Link to="/register" className="landing-cta-pill">
                إنشاء حساب
              </Link>
              <Link to="/store/products" className="landing-cta-pill landing-cta-pill--ghost" style={{ borderColor: 'rgba(255,255,255,0.65)', color: '#fff' }}>
                تصفّح المتجر
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export function PricingPage() {
  const [yearly, setYearly] = useState(false)
  return (
    <Container style={{ paddingBlock: 48, textAlign: 'center' }}>
      <h2 className="etra-h2">اشتراكات إترا</h2>
      <p className="etra-body" style={{ marginTop: 8 }}>
        اختر الخطة المناسبة لمسارك
      </p>
      <div style={{ marginTop: 24, display: 'inline-flex', background: 'var(--bg-section-gray)', padding: 4, borderRadius: 999 }}>
        <button
          type="button"
          className={`etra-btn etra-btn--md ${!yearly ? 'etra-btn--primary' : 'etra-btn--ghost'}`}
          onClick={() => setYearly(false)}
        >
          شهري
        </button>
        <button
          type="button"
          className={`etra-btn etra-btn--md ${yearly ? 'etra-btn--primary' : 'etra-btn--ghost'}`}
          onClick={() => setYearly(true)}
        >
          سنوي — وفّر ٢٠٪
        </button>
      </div>
      <div
        className="pricing-grid"
        style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, textAlign: 'start' }}
      >
        {[
          { name: 'أساسي', price: '٩٩', feat: ['مسار واحد', 'محتوى فيديو', 'اختبارات'] },
          { name: 'متقدم', price: '١٩٩', feat: ['٣ مسارات', 'جلسات مباشرة', 'محرر الأكواد'], highlight: true },
          { name: 'مميز', price: '٢٩٩', feat: ['جميع المسارات', 'مرشد أولوية', 'ديسكورد'] },
        ].map((p) => (
          <Card
            key={p.name}
            style={
              p.highlight
                ? { borderWidth: 2, borderColor: 'var(--color-primary)', transform: 'scale(1.02)' }
                : undefined
            }
          >
            {p.highlight ? (
              <div style={{ textAlign: 'center', marginBottom: 12 }}>
                <Badge tone="brand">الأكثر شيوعاً</Badge>
              </div>
            ) : null}
            <h3 className="etra-h3">{p.name}</h3>
            <p className="etra-display" style={{ fontSize: 40, marginTop: 8 }}>
              {p.price}{' '}
              <span className="etra-small" style={{ color: 'var(--text-muted)' }}>
                ريال/شهر
              </span>
            </p>
            <ul className="etra-small" style={{ marginTop: 16, paddingInlineStart: 20 }}>
              {p.feat.map((f) => (
                <li key={f} style={{ marginBottom: 8 }}>
                  ✓ {f}
                </li>
              ))}
            </ul>
            <Button variant="primary" block style={{ marginTop: 20 }}>
              اشترك الآن
            </Button>
          </Card>
        ))}
      </div>
      <p className="etra-small" style={{ marginTop: 40 }}>
        الدفع الآمن عبر Moyasar + مدى + فيزا + Apple Pay
      </p>
    </Container>
  )
}

function CartEmptyIllustration() {
  return (
    <svg className="cart-page__svg" viewBox="0 0 260 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M48 52c28-18 72-22 108-8s62 44 68 82"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 8"
        opacity={0.55}
      />
      <path
        d="M188 38c-16 12-24 32-20 52"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="4 7"
        opacity={0.45}
      />
      <path d="M72 44l6 10-12 4z" fill="currentColor" opacity={0.35} />
      <path d="M198 58l-8 8 10 6z" fill="currentColor" opacity={0.28} />
      <g transform="translate(58 88)">
        <path
          d="M12 8h108l-14 76H26L12 8z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M12 8L4 0H0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M34 118h64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="48" cy="132" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <circle cx="108" cy="132" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
      </g>
    </svg>
  )
}

function formatCheckoutSar(value: number): string {
  return `${value.toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ر.س`
}

function CartCheckoutView({ items }: { items: EtraCartItem[] }) {
  const [payMethod, setPayMethod] = useState<'card' | 'tamara'>('card')
  const [couponOn, setCouponOn] = useState(true)
  const [couponCode, setCouponCode] = useState('')

  const totalInclVat = items.reduce((s, i) => s + Math.max(0, i.priceSar), 0)
  const subExVat = totalInclVat > 0 ? totalInclVat / 1.15 : 0
  const vatAmount = totalInclVat - subExVat

  return (
    <div className="checkout-page">
      <div className="checkout-page__ribbon" aria-hidden />
      <Container>
        <h1 className="checkout-page__title">إتمام الشراء</h1>
        <div className="checkout-page__grid">
          <aside>
            <div className="checkout-card">
              <h2 className="checkout-card__title">ملخص الطلب</h2>
              <div className="checkout-summary__row">
                <span>المجموع الفرعي</span>
                <span dir="ltr">{formatCheckoutSar(subExVat)}</span>
              </div>
              <div className="checkout-summary__row">
                <span>ضريبة القيمة المضافة ١٥٪</span>
                <span dir="ltr">{formatCheckoutSar(vatAmount)}</span>
              </div>
              <div className="checkout-summary__row checkout-summary__row--total">
                <span>المجموع</span>
                <span dir="ltr">{formatCheckoutSar(totalInclVat)}</span>
              </div>
              <p className="checkout-summary__muted">شامل ضريبة القيمة المضافة</p>
            </div>

            <div className="checkout-card">
              <h2 className="checkout-card__title">طريقة الدفع</h2>
              <div className="checkout-pay__options" role="radiogroup" aria-label="طريقة الدفع">
                <label
                  className={`checkout-pay__option${payMethod === 'card' ? ' checkout-pay__option--selected' : ''}`.trim()}
                >
                  <input
                    type="radio"
                    name="pay"
                    checked={payMethod === 'card'}
                    onChange={() => setPayMethod('card')}
                  />
                  <span>بطاقة بنكية / ائتمانية</span>
                  <span className="checkout-pay__logos" aria-hidden>
                    <span>VISA</span>
                    <span>·</span>
                    <span>Mada</span>
                    <span>·</span>
                    <span>MC</span>
                  </span>
                </label>
                <label
                  className={`checkout-pay__option${payMethod === 'tamara' ? ' checkout-pay__option--selected' : ''}`.trim()}
                >
                  <input
                    type="radio"
                    name="pay"
                    checked={payMethod === 'tamara'}
                    onChange={() => setPayMethod('tamara')}
                  />
                  <span>قسّم فاتورتك على ٣ دفعات — تمارا</span>
                </label>
              </div>
              <button type="button" className="checkout-pay__submit">
                إكمال الطلب
              </button>
            </div>

            <div className="checkout-card">
              <div className="checkout-coupon__head">
                <span className="checkout-coupon__label" id="coupon-toggle-label">
                  إضافة كوبون
                </span>
                <button
                  type="button"
                  role="switch"
                  className="checkout-coupon__toggle"
                  aria-labelledby="coupon-toggle-label"
                  aria-checked={couponOn}
                  onClick={() => setCouponOn((v) => !v)}
                >
                  <span className="checkout-coupon__knob" />
                </button>
              </div>
              {couponOn ? (
                <div className="checkout-coupon__row">
                  <input
                    className="checkout-coupon__input"
                    placeholder="رمز الخصم"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    aria-label="رمز الخصم"
                  />
                  <button type="button" className="checkout-coupon__activate">
                    تفعيل
                  </button>
                </div>
              ) : null}
            </div>
          </aside>

          <div>
            {items.map((item) => {
              const g = item.gradient ?? 'a'
              const label = item.visualTitle ?? item.domain
              return (
                <article key={item.id} className="checkout-line">
                  <button
                    type="button"
                    className="checkout-line__remove"
                    aria-label={`إزالة ${item.title}`}
                    onClick={() => removeFromCart(item.id)}
                  >
                    ×
                  </button>
                  <div className="checkout-line__thumb">
                    <div className={`landing-shaghuf-card__visual landing-shaghuf-card__visual--${g}`}>
                      <span className="landing-shaghuf-card__visual-title">{label}</span>
                    </div>
                  </div>
                  <div className="checkout-line__body">
                    <h3 className="checkout-line__title">{item.title}</h3>
                    <div className="checkout-line__meta">
                      <div className="checkout-line__meta-row">
                        <span aria-hidden>🎓</span>
                        <span>{item.org}</span>
                      </div>
                      <div className="checkout-line__meta-row">
                        <span aria-hidden>👤</span>
                        <span>{item.instructor}</span>
                      </div>
                    </div>
                  </div>
                  <div className="checkout-line__price" dir="ltr">
                    {item.priceSar > 0 ? formatCheckoutSar(item.priceSar) : 'مجاناً'}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </Container>
    </div>
  )
}

export function CartPage() {
  const [ready, setReady] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [items, setItems] = useState<EtraCartItem[]>([])

  useEffect(() => {
    const sync = () => {
      setAuthed(isEtraSessionAuthed())
      setItems(readCart())
      setReady(true)
    }
    sync()
    return subscribeCart(sync)
  }, [])

  if (!ready) {
    return <div className="cart-page cart-page--loading" aria-busy="true" />
  }

  if (!authed) {
    return (
      <div className="cart-page">
        <div className="cart-page__visual">
          <div className="cart-page__glow" />
          <CartEmptyIllustration />
        </div>
        <p className="cart-page__message">لم تقم بإضافة أي منتجات</p>
        <p className="cart-page__hint cart-page__hint--flush">سجّل الدخول لعرض سلتك وإتمام الدفع.</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-page__visual">
          <div className="cart-page__glow" />
          <CartEmptyIllustration />
        </div>
        <p className="cart-page__message">لم تقم بإضافة أي منتجات</p>
        <div className="cart-page__actions">
          <Link to="/store/products" className="cart-page__btn cart-page__btn--primary">
            تصفّح المتجر
          </Link>
        </div>
      </div>
    )
  }

  return <CartCheckoutView items={items} />
}

const BLOG_PAGE_SIZE = 4

function setMetaDescription(content: string) {
  let el = document.querySelector('meta[name="description"]')
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', 'description')
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function useBlogListingSeo() {
  useEffect(() => {
    const title = 'مدونة إترا | مقالات برمجية وتصميم وتقنية'
    const desc =
      'تصفّح مقالات إترا: برمجة، تصميم، وتقنية — مع بحث وتصنيف وترقيم صفحات. محتوى عربي واضح لربط التعلّم بسوق العمل.'
    const prev = document.title
    document.title = title
    setMetaDescription(desc)
    return () => {
      document.title = prev
    }
  }, [])
}

function useArticleSeo(post: BlogPost) {
  useEffect(() => {
    const prev = document.title
    document.title = post.seoTitle
    setMetaDescription(post.seoDescription)
    return () => {
      document.title = prev
    }
  }, [post.seoDescription, post.seoTitle, post.slug])
}

function BlogReadingProgress({ articleRef }: { articleRef: RefObject<HTMLElement | null> }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const elTop = scrollTop + rect.top
      const height = el.offsetHeight - window.innerHeight * 0.45
      if (height <= 0) {
        setPct(100)
        return
      }
      const raw = (scrollTop - elTop + window.innerHeight * 0.35) / height
      setPct(Math.min(100, Math.max(0, raw * 100)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [articleRef])

  return (
    <div className="blog-read-progress" aria-hidden>
      <div className="blog-read-progress__bar" style={{ width: `${pct}%` }} />
    </div>
  )
}

function BlogShareBar({ title, text }: { title: string; text: string }) {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const [copied, setCopied] = useState(false)

  const shareUrl = encodeURIComponent(url)
  const shareText = encodeURIComponent(`${title} — ${text}`.slice(0, 200))

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="blog-share" role="group" aria-label="مشاركة المقال">
      <span className="blog-share__label">شارك المقال</span>
      <div className="blog-share__actions">
        <button type="button" className="blog-share__btn" onClick={onCopy}>
          {copied ? 'تم النسخ' : 'نسخ الرابط'}
        </button>
        <a
          className="blog-share__btn"
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          𝕏
        </a>
        <a
          className="blog-share__btn"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          in
        </a>
      </div>
    </div>
  )
}

export function BlogListPage() {
  useBlogListingSeo()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTopic, setActiveTopic] = useState<BlogTopicFilter>('الكل')
  const [page, setPage] = useState(1)
  const featured = getFeaturedPost()

  const filtered = useMemo(() => {
    let list = BLOG_POSTS
    if (activeTopic !== 'الكل') {
      list = list.filter((p) => p.topic === activeTopic)
    }
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.seoDescription.toLowerCase().includes(q),
      )
    }
    return list
  }, [activeTopic, searchQuery])

  const gridSource = useMemo(() => {
    return filtered.some((p) => p.slug === featured.slug) ? filtered.filter((p) => p.slug !== featured.slug) : filtered
  }, [filtered, featured.slug])

  const totalPages = Math.max(1, Math.ceil(gridSource.length / BLOG_PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageSlice = gridSource.slice((safePage - 1) * BLOG_PAGE_SIZE, safePage * BLOG_PAGE_SIZE)

  return (
    <div className="blog-page">
      <header className="blog-page__hero">
        <Container>
          <div className="blog-page__hero-inner">
            <p className="blog-page__badge">مدونة إترا</p>
            <h1 className="blog-page__title">مقالات برمجية وتصميم وتقنية</h1>
            <p className="blog-page__lead">
              محتوى عام موجّه لمحركات البحث وسريع التحميل — ابحث، صفِّ حسب التصنيف، وتنقّل بين الصفحات.
            </p>
          </div>
        </Container>
      </header>

      <div className="blog-page__main">
        <Container>
          <article className="blog-featured" aria-labelledby="blog-featured-title">
            <div className="blog-featured__media">
              <div className={`landing-shaghuf-card__visual landing-shaghuf-card__visual--${featured.gradient}`} aria-hidden />
            </div>
            <div className="blog-featured__body">
              <Badge tone="brand">{featured.topic}</Badge>
              <h2 id="blog-featured-title" className="blog-featured__title">
                {featured.title}
              </h2>
              <p className="blog-featured__excerpt">{featured.excerpt}</p>
              <Link to={`/blog/${featured.slug}`} className="landing-cta-pill blog-featured__cta">
                اقرأ المزيد
              </Link>
            </div>
          </article>

          <div className="blog-page__toolbar">
            <div className="blog-page__search-wrap">
              <InputField
                id="blog-search"
                placeholder="ابحث عن موضوع أو كلمات في المقالات..."
                aria-label="بحث في المدونة"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setPage(1)
                }}
                autoComplete="off"
              />
            </div>
            <div className="blog-page__chips" role="tablist" aria-label="تصنيف المقالات">
              {BLOG_TOPIC_FILTERS.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={activeTopic === c}
                  className={`blog-page__chip${activeTopic === c ? ' blog-page__chip--active' : ''}`.trim()}
                  onClick={() => {
                    setActiveTopic(c)
                    setPage(1)
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {pageSlice.length === 0 ? (
            <p className="blog-page__empty" role="status">
              لا توجد مقالات مطابقة لبحثك أو التصنيف المحدد.
            </p>
          ) : (
            <ul className="blog-page__grid" aria-label="قائمة المقالات">
              {pageSlice.map((p) => (
                <li key={p.slug} className="blog-page__grid-item">
                  <Link to={`/blog/${p.slug}`} className="blog-card">
                    <div className="blog-card__media">
                      <div className={`landing-shaghuf-card__visual landing-shaghuf-card__visual--${p.gradient}`} aria-hidden />
                    </div>
                    <div className="blog-card__body">
                      <Badge tone="info">{p.topic}</Badge>
                      <h3 className="blog-card__title">{p.title}</h3>
                      <p className="blog-card__excerpt">{p.excerpt}</p>
                      <p className="blog-card__meta">
                        {p.date} · {p.readMin} دقائق قراءة
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {totalPages > 1 ? (
            <nav className="blog-pagination" aria-label="ترقيم صفحات المدونة">
              <button
                type="button"
                className="blog-pagination__btn"
                disabled={safePage <= 1}
                onClick={() => setPage((n) => Math.max(1, n - 1))}
              >
                السابق
              </button>
              <ol className="blog-pagination__pages">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <li key={n}>
                    <button
                      type="button"
                      className={`blog-pagination__page${n === safePage ? ' blog-pagination__page--current' : ''}`.trim()}
                      onClick={() => setPage(n)}
                      aria-current={n === safePage ? 'page' : undefined}
                    >
                      {n.toLocaleString('ar-SA')}
                    </button>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                className="blog-pagination__btn"
                disabled={safePage >= totalPages}
                onClick={() => setPage((n) => Math.min(totalPages, n + 1))}
              >
                التالي
              </button>
            </nav>
          ) : null}
        </Container>
      </div>
    </div>
  )
}

export function BlogDetailPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug) ?? BLOG_POSTS[0]
  const articleRef = useRef<HTMLElement>(null)
  useArticleSeo(post)

  const related = useMemo(() => getRelatedPosts(post, 3), [post])

  const jsonLd = useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.seoDescription,
        datePublished: post.date,
        author: { '@type': 'Person', name: post.author.name },
      }),
    [post],
  )

  return (
    <div className="blog-page blog-page--article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <BlogReadingProgress articleRef={articleRef} />

      <header className="blog-page__article-hero">
        <Container>
          <nav className="blog-page__breadcrumb" aria-label="مسار التصفح">
            <Link to="/">الرئيسية</Link>
            {' › '}
            <Link to="/blog">المدونة</Link>
            {' › '}
            <span>{post.title}</span>
          </nav>
          <Badge tone="brand" className="blog-page__article-badge">
            {post.topic}
          </Badge>
          <h1>{post.title}</h1>
          <p className="blog-page__article-meta">
            {post.author.name} · {post.date} · {post.readMin} دقائق قراءة
          </p>
          <BlogShareBar title={post.title} text={post.excerpt} />
        </Container>
      </header>

      <div className="blog-page__article-wrap">
        <Container>
          <div className="blog-page__article-inner">
            <article ref={articleRef} className="blog-page__article-body etra-body-lg">
              {post.content.map((block, i) => {
                if (block.type === 'p') {
                  return <p key={i}>{block.text}</p>
                }
                if (block.type === 'h2') {
                  return (
                    <h2 key={i} className="blog-article__h2">
                      {block.text}
                    </h2>
                  )
                }
                return (
                  <figure key={i} className="blog-article__figure">
                    <div className="blog-article__figure-visual" role="img" aria-label={block.alt} />
                    {block.caption ? <figcaption className="blog-article__caption">{block.caption}</figcaption> : null}
                  </figure>
                )
              })}
            </article>

            <aside className="blog-author" aria-labelledby="blog-author-heading">
              <div className="blog-author__avatar" aria-hidden>
                {post.author.name.charAt(0)}
              </div>
              <div>
                <h2 id="blog-author-heading" className="blog-author__name">
                  {post.author.name}
                </h2>
                <p className="blog-author__role">{post.author.role}</p>
                <p className="blog-author__bio">{post.author.bio}</p>
              </div>
            </aside>

            {related.length > 0 ? (
              <section className="blog-related" aria-labelledby="blog-related-heading">
                <h2 id="blog-related-heading" className="blog-related__title">
                  مقالات ذات صلة
                </h2>
                <ul className="blog-related__grid">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/blog/${r.slug}`} className="blog-related__card">
                        <div
                          className={`landing-shaghuf-card__visual landing-shaghuf-card__visual--${r.gradient} blog-related__thumb`}
                          aria-hidden
                        />
                        <p className="blog-related__card-title">{r.title}</p>
                        <span className="blog-related__meta">{r.readMin} دقائق</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="blog-page__cta blog-page__cta--article">
              <h2>انضم إلى منصة إترا</h2>
              <p>سجّل مجاناً واختر مسارك: إرشاد تقني، معسكرات، ورش، وملخصات إترا Bit — وابدأ التعلّم بجدول يناسبك.</p>
              <div className="blog-page__cta-row">
                <Link to="/register" className="landing-cta-pill">
                  إنشاء حساب
                </Link>
                <Link to="/store/products" className="landing-cta-pill landing-cta-pill--ghost">
                  تصفّح المتجر
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

function RegisterGoogleMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function IconEye({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function RegisterPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const email = String(fd.get('email') ?? '').trim()
    if (!email) {
      setEmailError('البريد الإلكتروني مطلوب')
      return
    }
    setEmailError('')
    const as = searchParams.get('as')
    const role = as === 'mentor' ? 'mentor' : as === 'ambassador' ? 'ambassador' : 'student'
    startEtraSession(role)
    navigate(dashboardPathForRole(role))
  }

  return (
    <div className="register-page">
      <div className="register-page__card">
        <h1 className="register-page__title">تسجيل حساب جديد</h1>
        <form className="register-page__form" onSubmit={onSubmit}>
          <InputField id="register-name" name="name" label="الاسم" autoComplete="name" placeholder="" />
          <div className="register-page__field">
            <label className="etra-field__label" htmlFor="register-phone">
              رقم الجوال
            </label>
            <div className="register-page__phone-row">
              <select className="register-page__phone-cc" name="countryCode" defaultValue="+966" aria-label="رمز الدولة">
                <option value="+966">🇸🇦 +966</option>
              </select>
              <input
                id="register-phone"
                name="phone"
                className="etra-input register-page__phone-input"
                type="tel"
                inputMode="numeric"
                placeholder="51 234 5678"
                autoComplete="tel-national"
              />
            </div>
          </div>
          <InputField
            id="register-email"
            name="email"
            label="البريد الإلكتروني"
            type="email"
            autoComplete="email"
            error={emailError || undefined}
            onChange={() => {
              if (emailError) setEmailError('')
            }}
          />
          <div className="register-page__field">
            <label className="etra-field__label" htmlFor="register-password">
              كلمة المرور
            </label>
            <div className="register-page__pw-wrap">
              <input
                id="register-password"
                name="password"
                className="etra-input register-page__pw-input"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="register-page__pw-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              >
                <IconEye open={showPassword} />
              </button>
            </div>
          </div>
          <label className="register-page__terms">
            <input type="checkbox" name="terms" required />
            <span>
              أوافق على{' '}
              <Link to="/about">الشروط والأحكام</Link>
            </span>
          </label>
          <button type="submit" className="register-page__submit">
            تسجيل
          </button>
        </form>
        <div className="register-page__divider" role="separator">
          <span>أو</span>
        </div>
        <button type="button" className="register-page__google">
          <RegisterGoogleMark />
          استخدام Google
        </button>
        <p className="register-page__login-hint">
          لديك حساب؟ <Link to="/login">تسجيل دخول</Link>
        </p>
      </div>
    </div>
  )
}

export function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const asMentor = searchParams.get('as') === 'mentor'
  const asAmbassador = searchParams.get('as') === 'ambassador'
  const nextPath = searchParams.get('next')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const email = String(fd.get('email') ?? '').trim()
    if (!email) {
      setEmailError('البريد الإلكتروني مطلوب')
      return
    }
    setEmailError('')
    const role = asAmbassador ? 'ambassador' : asMentor ? 'mentor' : 'student'
    startEtraSession(role)
    if (nextPath && nextPath.startsWith('/') && !nextPath.startsWith('//')) {
      navigate(nextPath)
    } else {
      navigate(dashboardPathForRole(role))
    }
  }

  const loginTitle = asAmbassador ? 'تسجيل الدخول كسفير' : asMentor ? 'تسجيل الدخول كمرشد' : 'تسجيل الدخول كمتعلم'

  return (
    <div className={`login-page${asMentor ? ' login-page--mentor' : ''}`.trim()}>
      <div className="login-page__card">
        <div className="login-page__form-col">
          <h1 className="login-page__title">{loginTitle}</h1>
          <p className="login-page__role-switch">
            {asMentor ? (
              <>
                لست مرشد؟ <Link to="/login">أدخل كمتعلم</Link>
              </>
            ) : asAmbassador ? (
              <>
                تريد الدخول كمتعلم؟ <Link to="/login">دخول كمتعلم</Link>
              </>
            ) : (
              <>
                لست متعلماً؟{' '}
                <Link to="/login?as=ambassador">أدخل كسفير</Link>
                <span aria-hidden> أو </span>
                <Link to="/login?as=mentor">كمرشد</Link>
              </>
            )}
          </p>
          <form className="login-page__form" onSubmit={onSubmit}>
            <InputField
              id="login-email"
              name="email"
              label="البريد الإلكتروني"
              type="email"
              autoComplete="email"
              error={emailError || undefined}
              onChange={() => {
                if (emailError) setEmailError('')
              }}
            />
            <div className="register-page__field">
              <label className="etra-field__label" htmlFor="login-password">
                كلمة المرور
              </label>
              <div className="login-page__pw-wrap">
                <input
                  id="login-password"
                  name="password"
                  className="etra-input login-page__pw-input"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-page__pw-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  <IconEye open={showPassword} />
                </button>
              </div>
            </div>
            <div className="login-page__options">
              <label className="login-page__remember">
                <input type="checkbox" name="remember" />
                تذكرني
              </label>
              <Link to="/reset-password" className="login-page__forgot">
                نسيت كلمة المرور؟
              </Link>
            </div>
            <button type="submit" className="login-page__submit">
              تسجيل الدخول
            </button>
          </form>
          {!asMentor ? (
            <>
              <div className="login-page__divider" role="separator">
                <span>أو</span>
              </div>
              <button type="button" className="login-page__google">
                <RegisterGoogleMark />
                استخدام قوقل
              </button>
            </>
          ) : null}
          <p className="login-page__signup-hint">
            ليس لديك حساب؟ <Link to={asMentor ? '/register?as=mentor' : '/register'}>{asMentor ? 'انضم كمرشد' : 'إنشاء حساب'}</Link>
          </p>
        </div>
        {asMentor ? (
          <div className="login-page__mentor-visual" aria-hidden>
            <div className="login-page__mentor-board">
              <div className="login-page__mentor-glow" />
              <div className="login-page__mentor-node login-page__mentor-node--top">
                <span>جلسة مباشرة</span>
              </div>
              <div className="login-page__mentor-center">
                <span className="login-page__mentor-kicker">منطقة المرشد</span>
                <strong>وجّه المتعلمين باحتراف</strong>
                <small>تابع الجلسات، الملاحظات، وخطوات التطور من مكان واحد.</small>
              </div>
              <div className="login-page__mentor-node login-page__mentor-node--right">
                <span>خطة واضحة</span>
              </div>
              <div className="login-page__mentor-node login-page__mentor-node--left">
                <span>متابعة التقدم</span>
              </div>
              <div className="login-page__mentor-node login-page__mentor-node--bottom">
                <span>مخرجات عملية</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function ResetPasswordPage() {
  const [step, setStep] = useState(0)
  return (
    <Container style={{ paddingBlock: 48, maxWidth: 440 }}>
      <Card>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block' }}>
            <Logo height={36} />
          </div>
        </div>
        {step === 0 && (
          <>
            <h3 className="etra-h3" style={{ marginTop: 24 }}>
              أدخل بريدك الإلكتروني
            </h3>
            <p className="etra-small" style={{ marginTop: 8 }}>
              سنرسل لك رابط إعادة تعيين كلمة المرور
            </p>
            <InputField label="البريد" type="email" style={{ marginTop: 16 }} />
            <Button variant="primary" block style={{ marginTop: 16 }} onClick={() => setStep(1)}>
              إرسال رابط الاسترداد
            </Button>
          </>
        )}
        {step === 1 && (
          <>
            <h3 className="etra-h3" style={{ marginTop: 24 }}>
              رمز التحقق
            </h3>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'center' }}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <input key={i} maxLength={1} style={{ width: 52, height: 60, textAlign: 'center', fontSize: 24, borderRadius: 8, border: '1.5px solid var(--border-default)' }} />
              ))}
            </div>
            <Button variant="ghost" block style={{ marginTop: 16 }} onClick={() => setStep(2)}>
              متابعة
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <h3 className="etra-h3" style={{ marginTop: 24 }}>
              كلمة المرور الجديدة
            </h3>
            <InputField label="كلمة المرور" type="password" />
            <InputField label="تأكيد" type="password" />
            <Button variant="primary" block style={{ marginTop: 16 }} onClick={() => setStep(3)}>
              تحديث كلمة المرور
            </Button>
          </>
        )}
        {step === 3 && (
          <>
            <p style={{ textAlign: 'center', fontSize: 48 }}>✓</p>
            <h3 className="etra-h3" style={{ textAlign: 'center' }}>
              تم تغيير كلمة المرور بنجاح
            </h3>
            <Button to="/login" variant="primary" block style={{ marginTop: 16 }}>
              تسجيل الدخول
            </Button>
          </>
        )}
      </Card>
    </Container>
  )
}
