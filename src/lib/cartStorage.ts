import { sampleCourses } from '../fixtures/common'

export type EtraCartItem = {
  id: string
  title: string
  instructor: string
  org: string
  domain: string
  priceSar: number
  visualTitle?: string
  gradient?: 'a' | 'b' | 'c' | 'd'
}

const STORAGE_KEY = 'etra-cart'
export const ETRA_CART_CHANGED = 'etra-cart-changed'
export const ETRA_AUTH_CHANGED = 'etra-auth-changed'

const AUTH_KEY = 'etra-auth'
const ROLE_KEY = 'etra-role'

export type EtraUserRole = 'student' | 'mentor' | 'ambassador'

export function readEtraRole(): EtraUserRole {
  if (typeof window === 'undefined') return 'student'
  const r = localStorage.getItem(ROLE_KEY)
  if (r === 'mentor' || r === 'ambassador') return r
  return 'student'
}

export function setEtraRole(role: EtraUserRole) {
  localStorage.setItem(ROLE_KEY, role)
}

export function isEtraSessionAuthed(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(AUTH_KEY) === '1'
}

export function startEtraSession(role: EtraUserRole) {
  sessionStorage.setItem(AUTH_KEY, '1')
  setEtraRole(role)
  notifyAuthChanged()
}

/** مسار «الملف الشخصي» حسب الدور (لوحات التجربة). */
export function profilePathForRole(role: EtraUserRole): string {
  if (role === 'mentor') return '/mentor/profile'
  if (role === 'ambassador') return '/ambassador/profile'
  return '/student/profile'
}

/** الصفحة الأولى بعد تسجيل الدخول حسب الدور. */
export function dashboardPathForRole(role: EtraUserRole): string {
  if (role === 'mentor') return '/mentor'
  if (role === 'ambassador') return '/ambassador'
  return '/student'
}

export function logoutEtraSession() {
  sessionStorage.removeItem(AUTH_KEY)
  localStorage.removeItem(AUTH_KEY)
  localStorage.removeItem(ROLE_KEY)
  notifyAuthChanged()
}

export function notifyAuthChanged() {
  window.dispatchEvent(new CustomEvent(ETRA_AUTH_CHANGED))
}

function emitCartChanged() {
  window.dispatchEvent(new CustomEvent(ETRA_CART_CHANGED))
}

export function readCart(): EtraCartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (x): x is EtraCartItem =>
        Boolean(x) &&
        typeof x === 'object' &&
        typeof (x as EtraCartItem).id === 'string' &&
        typeof (x as EtraCartItem).title === 'string' &&
        typeof (x as EtraCartItem).priceSar === 'number',
    )
  } catch {
    return []
  }
}

export function writeCart(items: EtraCartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  emitCartChanged()
}

export function courseToCartItem(courseId: string): EtraCartItem | null {
  const c = sampleCourses.find((x) => x.id === courseId)
  if (!c) return null
  return {
    id: c.id,
    title: c.title,
    instructor: c.instructor,
    org: c.org,
    domain: c.domain,
    priceSar: c.priceSar,
    visualTitle: c.visualTitle,
    gradient: c.gradient,
  }
}

export function addCourseToCart(course: EtraCartItem) {
  const cur = readCart()
  if (cur.some((i) => i.id === course.id)) return
  writeCart([...cur, course])
}

export function removeFromCart(id: string) {
  writeCart(readCart().filter((i) => i.id !== id))
}

/** عدد عناصر السلة عند تسجيل الدخول فقط (للشارة في الشريط). */
export function authedCartCount(): number {
  if (typeof window === 'undefined') return 0
  if (!isEtraSessionAuthed()) return 0
  return readCart().length
}

export function subscribeCart(onChange: () => void): () => void {
  const handler = () => onChange()
  window.addEventListener(ETRA_CART_CHANGED, handler)
  window.addEventListener(ETRA_AUTH_CHANGED, handler)
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === AUTH_KEY || e.key === ROLE_KEY) onChange()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(ETRA_CART_CHANGED, handler)
    window.removeEventListener(ETRA_AUTH_CHANGED, handler)
    window.removeEventListener('storage', onStorage)
  }
}
