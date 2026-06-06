import { type FormEvent, type ReactNode, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Container } from '../components/Container/Container'
import { PublicChatWidget } from '../components/PublicChatWidget/PublicChatWidget'
import {
  authedCartCount,
  dashboardPathForRole,
  isEtraSessionAuthed,
  logoutEtraSession,
  readEtraRole,
  subscribeCart,
  type EtraUserRole,
} from '../lib/cartStorage'
import './PublicLayout.css'

function IconSearch({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="url(#etraNavStrokeGrad)" strokeWidth="2" />
      <path d="M15.2 15.2 21 21" stroke="url(#etraNavStrokeGrad)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconCart({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6h15l-1.5 9h-12L6 6Zm0 0L5 3H2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.35" fill="currentColor" />
      <circle cx="17" cy="20" r="1.35" fill="currentColor" />
    </svg>
  )
}

function IconChevronDown({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** أيقونات وسائل التواصل — دوائر بيضاء (أسلوب شغوف) */
const footerSocialLinks: { href: string; label: string; icon: ReactNode }[] = [
  {
    href: 'https://www.linkedin.com/company/etra',
    label: 'لينكدإن',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: 'https://x.com/etra',
    label: 'إكس (تويتر)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zm-1.292 19.494h2.039L6.516 3.24H4.298z" />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/etra',
    label: 'إنستغرام',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.75" fill="none" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.75" fill="none" />
        <circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: 'https://www.tiktok.com/@etra',
    label: 'تيك توك',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M15.75 2.5c.32 2.36 1.62 3.86 3.95 4.02v3.08a7.5 7.5 0 0 1-3.9-1.07v6.36c0 3.98-2.5 6.61-6.12 6.61-3.17 0-5.38-2.06-5.38-5.02 0-3.12 2.43-5.14 5.7-5.14.34 0 .65.03.94.08v3.21a3.1 3.1 0 0 0-1.09-.19c-1.38 0-2.33.74-2.33 1.9 0 1.08.86 1.8 2.06 1.8 1.47 0 2.33-.87 2.33-2.65V2.5h3.84Z" />
      </svg>
    ),
  },
  {
    href: 'https://t.me/etra',
    label: 'تيليجرام',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    href: 'https://wa.me/966551459985',
    label: 'واتساب',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.48 0 .12 5.36.12 11.96c0 2.1.55 4.16 1.6 5.98L0 24l6.2-1.63a11.96 11.96 0 0 0 5.88 1.5h.01c6.6 0 11.96-5.36 11.96-11.96a11.88 11.88 0 0 0-3.53-8.43ZM12.09 21.84h-.01a9.92 9.92 0 0 1-5.05-1.38l-.36-.21-3.68.97.98-3.59-.23-.37a9.88 9.88 0 1 1 8.35 4.58Zm5.42-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    ),
  },
]

const AUTH_NO_FOOTER_PATHS = new Set(['/login', '/register', '/reset-password'])

const STORE_MENU_ID = 'public-nav-store-menu'

const storeNavItems: { to: string; label: string; emoji: string }[] = [
  { to: '/store/products', label: 'المنتجات', emoji: '🛒' },
  { to: '/store/subscriptions', label: 'الاشتراكات', emoji: '💳' },
]

export function PublicLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const isDashboardPath =
    location.pathname.startsWith('/student') ||
    location.pathname.startsWith('/mentor') ||
    location.pathname.startsWith('/ambassador') ||
    location.pathname.startsWith('/admin')
  const hidePublicFooter = AUTH_NO_FOOTER_PATHS.has(location.pathname) || isDashboardPath
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartBadgeCount, setCartBadgeCount] = useState(0)
  const [sessionAuthed, setSessionAuthed] = useState(false)
  const [userRole, setUserRole] = useState<EtraUserRole>('student')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const bump = () => {
      setSessionAuthed(isEtraSessionAuthed())
      setUserRole(readEtraRole())
      setCartBadgeCount(authedCartCount())
    }
    bump()
    return subscribeCart(bump)
  }, [])

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = searchQuery.trim()
    navigate(q ? `/store/products?q=${encodeURIComponent(q)}` : '/store/products')
  }

  const dashboardTo = dashboardPathForRole(userRole)
  const dashboardLabel =
    userRole === 'mentor' ? 'صفحة المرشد' : userRole === 'ambassador' ? 'صفحة السفير' : 'صفحة المتعلم'

  const showAccountMenu = sessionAuthed
  const showCartButton = !sessionAuthed || userRole === 'student'

  const onLogout = () => {
    logoutEtraSession()
    navigate('/')
  }

  return (
    <div className="public-layout">
      <svg className="public-nav__svg-defs" width="1" height="1" aria-hidden>
        <defs>
          <linearGradient id="etraNavStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5234B7" />
            <stop offset="100%" stopColor="#9E59CD" />
          </linearGradient>
        </defs>
      </svg>
      <header className={`public-nav ${scrolled ? 'public-nav--scrolled' : ''}`.trim()}>
        <div className="public-nav__inner">
          <div className="public-nav__start">
            <NavLink to="/" className="public-nav__brand" aria-label="إترا — الرئيسية">
              <img src="/etralogo.png" alt="" className="public-nav__brand-img" width={248} height={62} decoding="async" />
            </NavLink>
            <nav className="public-nav__links" aria-label="التنقل الرئيسي">
              <NavLink to="/" className="public-nav__link" end>
                الرئيسية
              </NavLink>
              <div className="public-nav__dropdown public-nav__dropdown--store">
                <button
                  type="button"
                  className="public-nav__store-trigger"
                  aria-haspopup="menu"
                  aria-controls={STORE_MENU_ID}
                  id="public-nav-store-trigger"
                >
                  المتجر
                  <IconChevronDown className="public-nav__chevron public-nav__chevron--store" aria-hidden />
                </button>
                <div
                  id={STORE_MENU_ID}
                  className="public-nav__dropdown-panel public-nav__dropdown-panel--store"
                  role="menu"
                  aria-labelledby="public-nav-store-trigger"
                >
                  {storeNavItems.map((it) => (
                    <NavLink key={it.to} to={it.to} className="public-nav__dd-item public-nav__dd-item--store" role="menuitem">
                      <span className="public-nav__dd-emoji" aria-hidden>
                        {it.emoji}
                      </span>
                      <span className="public-nav__dd-text">{it.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
              <NavLink to="/about" className="public-nav__link">
                عن إترا
              </NavLink>
              <NavLink to="/blog" className="public-nav__link">
                المدونة
              </NavLink>
            </nav>
          </div>

          <div className="public-nav__search-wrap">
            <form className="public-nav__search" role="search" onSubmit={onSearchSubmit}>
              <label htmlFor="public-nav-search" className="visually-hidden">
                ابحث عن مادة أو معلم
              </label>
              <button type="submit" className="public-nav__search-icon-btn" aria-label="بحث">
                <IconSearch />
              </button>
              <input
                id="public-nav-search"
                className="public-nav__search-input"
                type="search"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مادة أو معلم"
                autoComplete="off"
              />
            </form>
          </div>

          <div className="public-nav__end">
            <Link
              to={showAccountMenu ? dashboardTo : '/login'}
              className={`public-nav__login${showAccountMenu ? ' public-nav__login--when-authed' : ''}`.trim()}
            >
              {showAccountMenu ? dashboardLabel : 'تسجيل الدخول'}
            </Link>
            {showAccountMenu ? (
              <button type="button" className="public-nav__logout" onClick={onLogout}>
                تسجيل الخروج
              </button>
            ) : null}
            {!showAccountMenu ? (
              <div className="public-nav__dropdown public-nav__dropdown--join">
                <button type="button" className="public-nav__join-trigger" tabIndex={0}>
                  انضم الآن
                  <span className="public-nav__join-chevron-wrap" aria-hidden>
                    <IconChevronDown className="public-nav__chevron public-nav__chevron--on-primary" />
                  </span>
                </button>
                <div className="public-nav__dropdown-panel public-nav__dropdown-panel--join" role="menu">
                  <NavLink to="/register" className="public-nav__dd-item public-nav__dd-item--join" role="menuitem">
                    <span className="public-nav__dd-emoji" aria-hidden>
                      🎓
                    </span>
                    انضم كمتعلم
                  </NavLink>
                  <NavLink to="/mentor-join" className="public-nav__dd-item public-nav__dd-item--join" role="menuitem">
                    <span className="public-nav__dd-emoji" aria-hidden>
                      👨‍🏫
                    </span>
                    انضم كمرشد
                  </NavLink>
                  <NavLink to="/ambassador-join" className="public-nav__dd-item public-nav__dd-item--join" role="menuitem">
                    <span className="public-nav__dd-emoji" aria-hidden>
                      🏆
                    </span>
                    انضم كسفير
                  </NavLink>
                </div>
              </div>
            ) : null}
            {showCartButton ? (
              <>
                <span className="public-nav__divider" aria-hidden />
                <Link to="/cart" className="public-nav__cart" aria-label="عربة التسوق والدفع">
                  <IconCart />
                  {cartBadgeCount > 0 ? (
                    <span className="public-nav__cart-badge">
                      {cartBadgeCount.toLocaleString('ar-SA', { maximumFractionDigits: 0 })}
                    </span>
                  ) : null}
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </header>
      <main className="public-main">
        <Outlet />
      </main>
      {!hidePublicFooter ? (
        <footer className="public-footer">
          <Container>
            <div className="public-footer__top">
              <div className="public-footer__center-col">
                <ul className="public-footer__social" aria-label="وسائل التواصل الاجتماعي">
                  {footerSocialLinks.map(({ href, label, icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="public-footer__social-link"
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {icon}
                      </a>
                    </li>
                  ))}
                </ul>
                <nav className="public-footer__quick" aria-label="روابط سريعة">
                  <Link to="/about">الشروط والأحكام</Link>
                </nav>
              </div>
            </div>

            <div className="public-footer__grid">
              <div>
                <p className="public-footer__col-title">المنصة</p>
                <div className="public-footer__col-links">
                  <NavLink to="/">الرئيسية</NavLink>
                  <NavLink to="/about">عن إترا</NavLink>
                  <NavLink to="/store/products">المتجر</NavLink>
                  <NavLink to="/blog">المدونة</NavLink>
                </div>
              </div>
              <div>
                <p className="public-footer__col-title">للمتعلمين</p>
                <div className="public-footer__col-links">
                  <Link to="/register">ابدأ الآن</Link>
                  <Link to="/store/products">المسارات</Link>
                  <Link to="/about">الأسئلة الشائعة</Link>
                  <Link to="/mentor-join">انضم كمعلم</Link>
                </div>
              </div>
              <div>
                <p className="public-footer__col-title">تواصل معنا</p>
                <div className="public-footer__col-links">
                  <a href="mailto:etrahub@gmail.com">etrahub@gmail.com</a>
                  <a href="https://wa.me/966551459985" target="_blank" rel="noopener noreferrer">
                    <span dir="ltr">+966 55 145 9985</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="public-footer__bottom">
              <p className="public-footer__vat">الأسعار المعروضة تشمل ضريبة القيمة المضافة وفق الأنظمة المعمول بها.</p>
              <p className="public-footer__copy">جميع الحقوق محفوظة لمنصة إترا التعليمية ٢٠٢٦</p>
            </div>
          </Container>
        </footer>
      ) : null}
      <PublicChatWidget />
    </div>
  )
}
