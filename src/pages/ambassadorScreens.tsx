import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Badge } from '../components/Badge/Badge'
import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import { Container } from '../components/Container/Container'
import { InputField, SelectField } from '../components/InputField/InputField'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { StatCard } from '../components/StatCard/StatCard'
import { Table } from '../components/Table/Table'
import { formatArCurrency, formatArNumber } from '../lib/formatAr'
import './ambassador-dashboard.css'

const referralUrl = 'https://etra.sa/r/fahad'

const trendData = [
  { day: 'السبت', clicks: 84, conversions: 12 },
  { day: 'الأحد', clicks: 112, conversions: 18 },
  { day: 'الاثنين', clicks: 96, conversions: 15 },
  { day: 'الثلاثاء', clicks: 138, conversions: 24 },
  { day: 'الأربعاء', clicks: 126, conversions: 21 },
  { day: 'الخميس', clicks: 154, conversions: 27 },
]

const productLinks = [
  { id: '1', name: 'اشتراك متقدم', url: 'etra.sa/r/fahad/pro', clicks: '٣٢٠', conversions: '٣٨' },
  { id: '2', name: 'مسار تطوير الويب', url: 'etra.sa/r/fahad/web', clicks: '٢٤٦', conversions: '٢٢' },
  { id: '3', name: 'مسار تحليل البيانات', url: 'etra.sa/r/fahad/data', clicks: '١٨٥', conversions: '١٤' },
]

const eventRows = [
  { id: '1', date: 'اليوم ٤:١٢م', link: 'اشتراك متقدم', action: 'شراء', result: 'تحويل ناجح' },
  { id: '2', date: 'اليوم ٢:٣٥م', link: 'تطوير الويب', action: 'تسجيل', result: 'متابعة' },
  { id: '3', date: 'أمس ٩:٢٠م', link: 'الرابط العام', action: 'زيارة', result: 'نقرة جديدة' },
  { id: '4', date: 'أمس ٦:١٠م', link: 'تحليل البيانات', action: 'شراء', result: 'تحويل ناجح' },
]

const payoutRows = [
  { id: '1', product: 'اشتراك متقدم', date: '١٨ مايو', amount: '١٩٩ ريال', commission: '٩٫٩٥ ريال', status: 'مدفوع' },
  { id: '2', product: 'تطوير الويب', date: '١٦ مايو', amount: '٢٩٩ ريال', commission: '١٤٫٩٥ ريال', status: 'معالجة' },
  { id: '3', product: 'الرابط العام', date: '١٤ مايو', amount: '١٩٩ ريال', commission: '٩٫٩٥ ريال', status: 'معلق' },
]

const recentActivity = [
  'تحويل ناجح من رابط اشتراك متقدم',
  '٣٢ نقرة جديدة من واتساب',
  'تسجيل متعلم جديد عبر الرابط العام',
  'طلب سحب جديد قيد المعالجة',
  'ارتفع معدل التحويل إلى ١٢٪ هذا الأسبوع',
]

function QRMock() {
  return (
    <div className="ambassador-qr" aria-label="رمز QR لرابط الإحالة">
      {Array.from({ length: 25 }).map((_, i) => (
        <span key={i} className={i % 2 === 0 || i === 7 || i === 18 ? 'is-filled' : ''} />
      ))}
    </div>
  )
}

function ReferralWidget({ compact = false }: { compact?: boolean }) {
  return (
    <Card className={`ambassador-card ambassador-referral${compact ? ' ambassador-referral--compact' : ''}`.trim()}>
      <div>
        <p className="ambassador-kicker">رابط الإحالة</p>
        <h3>شارك رابطك وابدأ بجمع العمولات</h3>
        <p>{referralUrl}</p>
      </div>
      <div className="ambassador-referral__actions">
        <QRMock />
        <Button variant="primary" size="sm">نسخ الرابط</Button>
        <Button variant="secondary" size="sm">تحميل QR</Button>
      </div>
    </Card>
  )
}

export function AmbassadorHome() {
  return (
    <Container>
      <PageHeader title="لوحة السفير" meta="تابع روابطك، التحويلات، والأرباح من مكان واحد." />
      <section className="ambassador-hero">
        <div>
          <Badge tone="brand">أنت على المسار الصحيح</Badge>
          <h2>شارك إترا مع مجتمعك التقني</h2>
          <p>استخدم روابط الإحالة، تابع الأداء، واطلب سحب أرباحك بسهولة.</p>
          <div className="ambassador-hero__share">
            <Button variant="secondary" size="sm">واتساب</Button>
            <Button variant="secondary" size="sm">X</Button>
            <Button variant="secondary" size="sm">لينكدإن</Button>
          </div>
        </div>
        <ReferralWidget compact />
      </section>

      <div className="ambassador-stats">
        <StatCard icon="🔗" label="إجمالي الإحالات" value={formatArNumber(1240)} />
        <StatCard icon="✅" label="التحويلات" value={formatArNumber(156)} />
        <StatCard icon="💰" label="أرباح هذا الشهر" value={formatArCurrency(1280)} />
        <StatCard icon="📈" label="إجمالي الأرباح" value={formatArCurrency(9200)} />
      </div>

      <div className="ambassador-grid ambassador-grid--home">
        <Card className="ambassador-card">
          <h3 className="etra-h4">أحدث النشاط</h3>
          <div className="ambassador-timeline">
            {recentActivity.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </Card>
        <Card className="ambassador-card">
          <h3 className="etra-h4">نظرة سريعة</h3>
          <div className="ambassador-mini-chart">
            <ResponsiveContainer>
              <LineChart data={trendData}>
                <XAxis dataKey="day" hide />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="clicks" stroke="#5234B7" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="conversions" stroke="#9E59CD" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </Container>
  )
}

export function AmbassadorLinks() {
  return (
    <Container>
      <PageHeader title="روابط الإحالة" actions={<Button variant="primary">إنشاء رابط مخصص</Button>} />
      <ReferralWidget />
      <Card className="ambassador-card ambassador-section">
        <div className="ambassador-section__head">
          <div>
            <h3 className="etra-h4">روابط المنتجات</h3>
            <p className="etra-small">روابط جاهزة لكل مسار أو اشتراك مع إحصاءات مختصرة.</p>
          </div>
          <SelectField aria-label="اختيار الرابط" defaultValue="all">
            <option value="all">كل الروابط</option>
            <option value="courses">المسارات</option>
            <option value="subscriptions">الاشتراكات</option>
          </SelectField>
        </div>
        <Table
          rowKey={(r) => r.id}
          columns={[
            { key: 'name', header: 'المنتج', render: (r) => r.name },
            { key: 'url', header: 'الرابط', render: (r) => <span dir="ltr">{r.url}</span> },
            { key: 'clicks', header: 'النقرات', render: (r) => r.clicks },
            { key: 'conversions', header: 'التحويلات', render: (r) => r.conversions },
            { key: 'action', header: '', render: () => <Button size="sm" variant="ghost">نسخ</Button> },
          ]}
          rows={productLinks}
        />
      </Card>
      <Card className="ambassador-card ambassador-custom-link">
        <h3 className="etra-h4">مولّد QR</h3>
        <QRMock />
        <InputField label="اسم الحملة" placeholder="مثال: حملة تويتر لشهر مايو" />
        <Button variant="secondary">توليد رابط وQR</Button>
      </Card>
    </Container>
  )
}

export function AmbassadorAnalytics() {
  return (
    <Container>
      <PageHeader title="التحليلات" actions={<Button variant="secondary">تغيير المدة</Button>} />
      <div className="ambassador-filters">
        <InputField label="من" type="date" defaultValue="2026-05-01" />
        <InputField label="إلى" type="date" defaultValue="2026-05-21" />
        <SelectField label="الرابط" defaultValue="all">
          <option value="all">كل الروابط</option>
          <option value="general">الرابط العام</option>
          <option value="pro">اشتراك متقدم</option>
        </SelectField>
      </div>
      <div className="ambassador-grid ambassador-grid--charts">
        <Card className="ambassador-card">
          <h3 className="etra-h4">النقرات والتحويلات</h3>
          <div className="ambassador-chart">
            <ResponsiveContainer>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(82,52,183,0.12)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="clicks" stroke="#5234B7" strokeWidth={3} name="النقرات" />
                <Line type="monotone" dataKey="conversions" stroke="#9E59CD" strokeWidth={3} name="التحويلات" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="ambassador-card">
          <h3 className="etra-h4">أفضل المنتجات أداءً</h3>
          <div className="ambassador-chart">
            <ResponsiveContainer>
              <BarChart data={productLinks}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(82,52,183,0.12)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="clicks" fill="#9E59CD" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <Card className="ambassador-card ambassador-funnel">
        <h3 className="etra-h4">قمع التحويل</h3>
        <div className="ambassador-funnel__row">
          <span>زيارات</span>
          <strong>١٬٢٤٠</strong>
        </div>
        <div className="ambassador-funnel__row ambassador-funnel__row--mid">
          <span>تسجيل</span>
          <strong>٣١٢</strong>
        </div>
        <div className="ambassador-funnel__row ambassador-funnel__row--low">
          <span>شراء</span>
          <strong>١٥٦</strong>
        </div>
      </Card>
      <Card className="ambassador-card ambassador-section">
        <h3 className="etra-h4">سجل الأحداث</h3>
        <Table
          rowKey={(r) => r.id}
          columns={[
            { key: 'date', header: 'التاريخ', render: (r) => r.date },
            { key: 'link', header: 'الرابط', render: (r) => r.link },
            { key: 'action', header: 'الإجراء', render: (r) => r.action },
            { key: 'result', header: 'النتيجة', render: (r) => <Badge tone={r.action === 'شراء' ? 'success' : 'brand'}>{r.result}</Badge> },
          ]}
          rows={eventRows}
        />
      </Card>
    </Container>
  )
}

export function AmbassadorEarnings() {
  return (
    <Container>
      <PageHeader title="الأرباح" actions={<Button variant="primary">طلب سحب</Button>} />
      <section className="ambassador-balance">
        <Card className="ambassador-card ambassador-balance__main">
          <p className="ambassador-kicker">الرصيد المتاح</p>
          <strong>{formatArCurrency(1420)}</strong>
          <span>الحد الأدنى للسحب: ١٠٠ ريال</span>
        </Card>
        <Card className="ambassador-card">
          <h3 className="etra-h4">الصرف القادم</h3>
          <p className="etra-body">١٢ يوم حتى موعد الصرف</p>
          <Badge tone="warning">قيد التجميع</Badge>
        </Card>
      </section>
      <Card className="ambassador-card ambassador-section">
        <h3 className="etra-h4">تفصيل العمولات</h3>
        <Table
          rowKey={(r) => r.id}
          columns={[
            { key: 'product', header: 'المنتج', render: (r) => r.product },
            { key: 'date', header: 'تاريخ البيع', render: (r) => r.date },
            { key: 'amount', header: 'المبلغ', render: (r) => r.amount },
            { key: 'commission', header: 'عمولة ٥٪', render: (r) => r.commission },
            { key: 'status', header: 'الحالة', render: (r) => <Badge tone={r.status === 'مدفوع' ? 'success' : r.status === 'معالجة' ? 'info' : 'warning'}>{r.status}</Badge> },
          ]}
          rows={payoutRows}
        />
      </Card>
      <Card className="ambassador-card ambassador-section">
        <h3 className="etra-h4">سجل السحوبات</h3>
        <div className="ambassador-payout-history">
          <p><strong>١ مايو</strong><span>{formatArCurrency(860)} — مدفوع</span></p>
          <p><strong>١ أبريل</strong><span>{formatArCurrency(720)} — مدفوع</span></p>
          <p><strong>١ مارس</strong><span>{formatArCurrency(540)} — مدفوع</span></p>
        </div>
      </Card>
    </Container>
  )
}

export function AmbassadorProfile() {
  return (
    <Container>
      <PageHeader title="الملف الشخصي" />
      <div className="ambassador-grid ambassador-grid--profile">
        <Card className="ambassador-card ambassador-profile-card">
          <div className="ambassador-profile-card__avatar">ف</div>
          <h3>فهد السفير</h3>
          <p>سفير إترا في مجتمع التقنية</p>
          <Badge tone="brand">عمولة ٥٪</Badge>
          <div className="ambassador-tier">
            <span>٥٪</span>
            <div><i style={{ width: '62%' }} /></div>
            <span>٧٪</span>
          </div>
          <p className="etra-small">تحتاج ٤ تحويلات إضافية للوصول إلى مستوى ٧٪.</p>
        </Card>
        <Card className="ambassador-card">
          <h3 className="etra-h4">البيانات الشخصية</h3>
          <div className="ambassador-form-grid">
            <InputField label="الاسم" defaultValue="فهد السفير" />
            <InputField label="البريد الإلكتروني" defaultValue="fahad@etra.sa" />
            <InputField label="رقم الجوال" defaultValue="0551459985" />
            <InputField label="المدينة" defaultValue="الرياض" />
          </div>
          <h3 className="etra-h4 ambassador-form-title">طريقة الدفع</h3>
          <div className="ambassador-form-grid">
            <InputField label="اسم البنك" defaultValue="مصرف الراجحي" />
            <InputField label="IBAN" defaultValue="SA00 0000 0000 0000 1234" dir="ltr" />
          </div>
          <Button variant="primary" style={{ marginTop: 16 }}>حفظ التغييرات</Button>
        </Card>
      </div>
    </Container>
  )
}
