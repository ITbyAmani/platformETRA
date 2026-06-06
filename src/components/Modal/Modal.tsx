import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

export type ModalProps = {
  open: boolean
  title: ReactNode
  children: ReactNode
  footer?: ReactNode
  onClose: () => void
}

export function Modal({ open, title, children, footer, onClose }: ModalProps) {
  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="etra-modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="etra-modal" role="dialog" aria-modal="true" aria-labelledby="etra-modal-title">
        <div className="etra-modal__header">
          <h2 id="etra-modal-title" className="etra-h4">
            {title}
          </h2>
          <button type="button" className="etra-modal__close" onClick={onClose} aria-label="إغلاق">
            ✕
          </button>
        </div>
        <div className="etra-modal__body">{children}</div>
        {footer ? <div className="etra-modal__footer">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  )
}
