/** باقات متجر الاشتراكات — بيانات تجريبية بتوافق مع واجهة إترا */

export type BillingPeriod = 'monthly' | 'yearly'

export type SubscriptionTierId = 'basic' | 'advanced' | 'premium'

export type SubscriptionFeatures = {
  videoLibrary: boolean
  codeEditor: boolean
  liveSessions: boolean
  mentoringSessions: number
  discord: boolean
}

export type SubscriptionTier = {
  id: SubscriptionTierId
  name: string
  description: string
  badge?: string
  monthlySar: number
  yearlySar: number
  /** مجالات/مسارات مشمولة (عرض في البطاقة) */
  domainsIncluded: string[]
  features: SubscriptionFeatures
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'basic',
    name: 'أساسي',
    description: 'بداية منظّمة للتعلّم الذاتي مع محتوى مسجّل عالي الجودة.',
    monthlySar: 99,
    yearlySar: 949,
    domainsIncluded: ['مسار واحد من اختيارك', 'مكتبة فيديو أساسية للمسار'],
    features: {
      videoLibrary: true,
      codeEditor: false,
      liveSessions: false,
      mentoringSessions: 0,
      discord: false,
    },
  },
  {
    id: 'advanced',
    name: 'متقدم',
    description: 'جلسات مباشرة ومحرر أكواد مع دعم أقوى أثناء التطبيق.',
    badge: 'الأكثر شيوعاً',
    monthlySar: 199,
    yearlySar: 1909,
    domainsIncluded: ['٣ مجالات تقنية', 'ورش شهرية ضمن الاشتراك'],
    features: {
      videoLibrary: true,
      codeEditor: true,
      liveSessions: true,
      mentoringSessions: 4,
      discord: true,
    },
  },
  {
    id: 'premium',
    name: 'متميز',
    description: 'إرشاد مكثّف ووصول كامل لكل محتوى إترا للفرق والمحترفين.',
    monthlySar: 349,
    yearlySar: 3349,
    domainsIncluded: ['جميع المسارات والمعسكرات المنشورة', 'أولوية في الجلسات الحية'],
    features: {
      videoLibrary: true,
      codeEditor: true,
      liveSessions: true,
      mentoringSessions: 12,
      discord: true,
    },
  },
]

export type ComparisonRow = {
  label: string
  basic: string
  advanced: string
  premium: string
}

export const SUBSCRIPTION_COMPARISON: ComparisonRow[] = [
  { label: 'الوصول للفيديوهات المسجّلة', basic: 'مسار واحد', advanced: 'كامل ضمن ٣ مجالات', premium: 'غير محدود' },
  { label: 'محرر الأكواد داخل المنصة', basic: '—', advanced: '✓', premium: '✓' },
  { label: 'الجلسات المباشرة', basic: '—', advanced: 'حتى ٨ شهرياً', premium: 'غير محدود*' },
  { label: 'جلسات الإرشاد الفردية', basic: '٠', advanced: '٤ / شهر', premium: '١٢ / شهر' },
  { label: 'مجتمع ديسكورد إترا', basic: '—', advanced: '✓', premium: '✓ + قناة مميزة' },
  { label: 'دعم أولوية', basic: '—', advanced: '—', premium: '✓' },
]
