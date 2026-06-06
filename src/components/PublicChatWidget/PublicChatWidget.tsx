import { useCallback, useEffect, useId, useState } from 'react'
import './PublicChatWidget.css'

function IconChatFab() {
  return (
    <svg className="public-chat__fab-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M19 4H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.2L14 22v-4H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"
        stroke="#fff"
        strokeWidth="1.65"
        strokeLinejoin="round"
        fill="rgba(255,255,255,0.14)"
      />
      <circle cx="9" cy="11" r="1.1" fill="#fff" />
      <circle cx="12" cy="11" r="1.1" fill="#fff" />
      <circle cx="15" cy="11" r="1.1" fill="#fff" />
    </svg>
  )
}

function IconLogoMark() {
  return (
    <svg className="public-chat__logo" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="etra-public-chat-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="50%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#f0abfc" />
        </linearGradient>
      </defs>
      <path
        fill="url(#etra-public-chat-logo-grad)"
        d="M8 22c2-8 10-14 18-12 2 6-1 14-8 18-4 2-8 2-10-6Zm6-4c2 1 5-1 6-4-3 0-5 2-6 4Z"
      />
    </svg>
  )
}

function IconNavHome({ active }: { active: boolean }) {
  return (
    <svg className="public-chat__nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V20a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H5.5A1.5 1.5 0 0 1 4 20V10.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill={active ? 'rgba(82,52,183,0.12)' : 'none'}
      />
      <circle cx="12" cy="11" r="1.2" fill="currentColor" />
    </svg>
  )
}

function IconNavMessages({ active }: { active: boolean }) {
  return (
    <svg className="public-chat__nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill={active ? 'rgba(82,52,183,0.12)' : 'none'}
      />
    </svg>
  )
}

const SUPPORT_MAIL = 'etrahub@gmail.com'

export function PublicChatWidget() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'home' | 'messages'>('home')
  const titleId = useId()
  const panelId = useId()

  const onEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) return
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [open, onEscape])

  const mailtoSuggest = `mailto:${SUPPORT_MAIL}?subject=${encodeURIComponent('اقتراح لمنصة إترا')}`

  return (
    <div className="public-chat">
      <div className="public-chat__stack">
        {open ? (
          <div className="public-chat__panel" id={panelId} role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <div className="public-chat__header">
            <div className="public-chat__header-top">
              <IconLogoMark />
              <div className="public-chat__header-actions">
                <span className="public-chat__avatar" aria-hidden>
                  أ
                </span>
                <span className="public-chat__avatar" aria-hidden>
                  ر
                </span>
                <button type="button" className="public-chat__close" onClick={() => setOpen(false)} aria-label="إغلاق الشات">
                  ×
                </button>
              </div>
            </div>
            <p id={titleId} className="public-chat__greeting">
              أهلاً 👋
            </p>
            <p className="public-chat__greeting-en">How can we help?</p>
          </div>

          <div className="public-chat__body">
            {tab === 'home' ? (
              <>
                <a href={`mailto:${SUPPORT_MAIL}`} className="public-chat__card public-chat__card--row">
                  <p className="public-chat__card-title">أرسل لنا رسالة</p>
                  <span className="public-chat__card-chevron" aria-hidden>
                    ‹
                  </span>
                </a>
                <div className="public-chat__card">
                  <p className="public-chat__card-text">عندك اقتراح أو فكرة حاب نضيفها للمنصة؟</p>
                  <a href={mailtoSuggest} className="public-chat__cta">
                    شاركنا اقتراحك!
                  </a>
                </div>
              </>
            ) : (
              <p className="public-chat__messages-placeholder">
                لا توجد محادثات بعد. يمكنك البدء بإرسال رسالة عبر البريد وسنرد عليك قريباً.
              </p>
            )}
          </div>

          <nav className="public-chat__nav" aria-label="تبويبات الشات">
            <button
              type="button"
              className={`public-chat__nav-btn${tab === 'home' ? ' public-chat__nav-btn--active' : ''}`.trim()}
              onClick={() => setTab('home')}
            >
              <IconNavHome active={tab === 'home'} />
              Home
            </button>
            <button
              type="button"
              className={`public-chat__nav-btn${tab === 'messages' ? ' public-chat__nav-btn--active' : ''}`.trim()}
              onClick={() => setTab('messages')}
            >
              <IconNavMessages active={tab === 'messages'} />
              Messages
            </button>
          </nav>
        </div>
        ) : null}

        <button
          type="button"
          className="public-chat__fab"
          onClick={() => {
            setOpen((v) => {
              const next = !v
              if (next) setTab('home')
              return next
            })
          }}
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          aria-label={open ? 'إغلاق مساعد إترا' : 'فتح مساعد إترا'}
        >
          <IconChatFab />
        </button>
      </div>
    </div>
  )
}
