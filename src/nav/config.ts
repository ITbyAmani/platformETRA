export type NavItem = { to: string; label: string; icon: string }

export const STUDENT_NAV: NavItem[] = [
  { to: '/student', label: 'الرئيسية', icon: '🏠' },
  { to: '/student/courses', label: 'دوراتي', icon: '📚' },
  { to: '/student/learn/code', label: 'محرر الأكواد', icon: '💻' },
  { to: '/student/live-sessions', label: 'الجلسات المباشرة', icon: '🎥' },
  { to: '/student/progress-map', label: 'خريطة التقدم', icon: '🗺️' },
  { to: '/student/assignments', label: 'الواجبات', icon: '📝' },
  { to: '/student/achievements', label: 'إنجازاتي', icon: '🏆' },
  { to: '/student/community', label: 'المجتمع', icon: '💬' },
  { to: '/student/chat', label: 'المحادثات', icon: '💭' },
  { to: '/student/notifications', label: 'الإشعارات', icon: '🔔' },
  { to: '/student/support', label: 'الدعم الفني', icon: '🎫' },
  { to: '/student/profile', label: 'الملف الشخصي', icon: '👤' },
]

export const MENTOR_NAV: NavItem[] = [
  { to: '/mentor', label: 'الرئيسية', icon: '🏠' },
  { to: '/mentor/students', label: 'طلابي', icon: '👥' },
  { to: '/mentor/content', label: 'إدارة المحتوى', icon: '📤' },
  { to: '/mentor/quizzes', label: 'منشئ الاختبارات', icon: '❓' },
  { to: '/mentor/sessions', label: 'الجلسات', icon: '📅' },
  { to: '/mentor/session-notes', label: 'ملاحظات الجلسة', icon: '📝' },
  { to: '/mentor/assignments', label: 'الواجبات', icon: '📋' },
  { to: '/mentor/certificates', label: 'الشهادات', icon: '🎓' },
  { to: '/mentor/earnings', label: 'أرباحي', icon: '💰' },
  { to: '/mentor/profile', label: 'الملف الشخصي', icon: '👤' },
]

export const AMBASSADOR_NAV: NavItem[] = [
  { to: '/ambassador', label: 'الرئيسية', icon: '🏠' },
  { to: '/ambassador/links', label: 'روابط الإحالة', icon: '🔗' },
  { to: '/ambassador/analytics', label: 'التحليلات', icon: '📊' },
  { to: '/ambassador/earnings', label: 'الأرباح', icon: '💰' },
  { to: '/ambassador/profile', label: 'الملف الشخصي', icon: '👤' },
]

export const ADMIN_NAV: NavItem[] = [
  { to: '/admin', label: 'الرئيسية', icon: '🏠' },
  { to: '/admin/finance', label: 'نظرة مالية', icon: '💰' },
  { to: '/admin/transactions', label: 'المعاملات', icon: '🧾' },
  { to: '/admin/payouts', label: 'المدفوعات', icon: '💳' },
  { to: '/admin/reports', label: 'التقارير', icon: '📑' },
  { to: '/admin/users', label: 'المستخدمون', icon: '👥' },
  { to: '/admin/content', label: 'الإشراف على المحتوى', icon: '📚' },
  { to: '/admin/word-filters', label: 'فلاتر الكلمات', icon: '🔤' },
  { to: '/admin/chat', label: 'المحادثات', icon: '💬' },
  { to: '/admin/email', label: 'البث البريدي', icon: '📣' },
  { to: '/admin/announcements', label: 'الإعلانات', icon: '📢' },
  { to: '/admin/files', label: 'الملفات الداخلية', icon: '📁' },
  { to: '/admin/support', label: 'تذاكر الدعم', icon: '🎫' },
  { to: '/admin/settings', label: 'إعدادات المنصة', icon: '⚙️' },
  { to: '/admin/tracks', label: 'إدارة المسارات', icon: '🗺️' },
]

export function navForPath(pathname: string): NavItem[] {
  if (pathname.startsWith('/student')) return STUDENT_NAV
  if (pathname.startsWith('/mentor')) return MENTOR_NAV
  if (pathname.startsWith('/ambassador')) return AMBASSADOR_NAV
  if (pathname.startsWith('/admin')) return ADMIN_NAV
  return STUDENT_NAV
}
