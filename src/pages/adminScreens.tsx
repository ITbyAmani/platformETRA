import { useParams } from 'react-router-dom'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Badge } from '../components/Badge/Badge'
import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import { Container } from '../components/Container/Container'
import { InputField, TextAreaField } from '../components/InputField/InputField'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { StatCard } from '../components/StatCard/StatCard'
import { Table } from '../components/Table/Table'
import { formatArCurrency, formatArNumber } from '../lib/formatAr'

const revenue = [
  { m: '١', v: 52000 },
  { m: '٢', v: 61000 },
  { m: '٣', v: 58000 },
  { m: '٤', v: 72000 },
  { m: '٥', v: 89400 },
  { m: '٦', v: 92000 },
]

const pie = [
  { name: 'ويب', value: 40 },
  { name: 'أمن', value: 25 },
  { name: 'بيانات', value: 35 },
]
const PIE_COLORS = ['#5234B7', '#9E59CD', '#C4B5FD']

export function AdminHome() {
  return (
    <Container>
      <PageHeader title="لوحة تحكم إترا" actions={<Button variant="secondary">تصدير تقرير</Button>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="dash-grid-4">
        <StatCard icon="💰" label="إيرادات اليوم" value={formatArCurrency(4200)} />
        <StatCard icon="📅" label="إيرادات الشهر" value={formatArCurrency(89400)} trend={{ direction: 'up', text: '+١٢٪' }} />
        <StatCard icon="📆" label="إيرادات السنة" value={formatArCurrency(920000)} />
        <StatCard icon="📈" label="معدل النمو" value="١٢٪" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 16 }} className="dash-grid-4">
        <StatCard icon="👥" label="إجمالي المستخدمين" value={formatArNumber(2412)} />
        <StatCard icon="✨" label="مستخدمون جدد" value={formatArNumber(123)} />
        <StatCard icon="🔥" label="النشطون" value={formatArNumber(1890)} />
        <StatCard icon="⛔" label="معدل التوقف" value="٢٫١٪" trend={{ direction: 'down', text: '▼' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, marginTop: 24 }} className="dash-two-col">
        <Card style={{ height: 300 }}>
          <h3 className="etra-h4">اتجاه الإيرادات</h3>
          <ResponsiveContainer>
            <AreaChart data={revenue}>
              <defs>
                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5234B7" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#5234B7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
              <XAxis dataKey="m" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="v" stroke="#5234B7" fill="url(#revFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card style={{ height: 300 }}>
          <h3 className="etra-h4">الإيراد حسب المسار</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}>
                {pie.map((_, i) => (
                  <Cell key={pie[i].name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }} className="dash-two-col">
        <Card>
          <h3 className="etra-h4">أفضل ٥ دورات</h3>
          <Table
            rowKey={(r) => r.t}
            columns={[
              { key: 't', header: 'الدورة', render: (r) => r.t },
              { key: 'e', header: 'التسجيلات', render: (r) => r.e },
              { key: 'r', header: 'الإيراد', render: (r) => r.r },
            ]}
            rows={[
              { t: 'React', e: '٣٢٠', r: '٦٤٬٠٠٠' },
              { t: 'أمن سيبراني', e: '٢١٠', r: '٤٢٬٠٠٠' },
            ]}
          />
        </Card>
        <Card>
          <h3 className="etra-h4">إجراءات معلقة</h3>
          <p className="etra-small">٧ مراجعات محتوى + ٣ طلبات مرشدين</p>
          <Button variant="ghost" style={{ marginTop: 12 }}>
            عرض
          </Button>
        </Card>
      </div>
    </Container>
  )
}

export function AdminFinance() {
  return (
    <Container>
      <PageHeader title="نظرة مالية" />
      <Card>
        <p className="etra-h2" style={{ textAlign: 'center' }}>
          ٦٠٪ ETRA — ٤٠٪ المرشدون
        </p>
      </Card>
      <div style={{ marginTop: 24 }}>
        <Table
          rowKey={(r) => r.n}
          columns={[
          { key: 'n', header: 'المرشد', render: (r) => r.n },
          { key: 's', header: 'الطلاب', render: (r) => r.s },
          { key: 't', header: 'إجمالي الإيراد', render: (r) => r.t },
        ]}
          rows={[
            { n: 'م. خالد', s: '٤٢', t: '٨٩٬٠٠٠' },
            { n: 'م. سارة', s: '٣٨', t: '٧٦٬٠٠٠' },
          ]}
        />
      </div>
    </Container>
  )
}

export function AdminTransactions() {
  return (
    <Container>
      <PageHeader title="المعاملات" actions={<Button variant="secondary">تصدير Excel</Button>} />
      <Table
        rowKey={(r) => r.id}
        columns={[
          { key: 'id', header: '#', render: (r) => r.id },
          { key: 'st', header: 'الطالب', render: (r) => r.st },
          { key: 'p', header: 'المنتج', render: (r) => r.p },
          { key: 'a', header: 'المبلغ', render: (r) => r.a },
          { key: 's', header: 'الحالة', render: (r) => <Badge tone="success">{r.s}</Badge> },
        ]}
        rows={[
          { id: '٨٨١', st: 'أحمد', p: 'اشتراك', a: '١٩٩', s: 'مكتمل' },
          { id: '٨٨٠', st: 'نورة', p: 'دورة', a: '٢٤٩', s: 'مكتمل' },
        ]}
      />
    </Container>
  )
}

export function AdminPayouts() {
  return (
    <Container>
      <PageHeader title="المدفوعات" />
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Badge tone="brand">مرشدون</Badge>
        <Badge tone="gray">سفراء</Badge>
      </div>
      <Table
        rowKey={(r) => r.id}
        columns={[
          { key: 'n', header: 'الاسم', render: (r) => r.n },
          { key: 'a', header: 'المبلغ', render: (r) => r.a },
          { key: 's', header: 'الحالة', render: (r) => <Badge tone="warning">{r.s}</Badge> },
          {
            key: 'x',
            header: '',
            render: () => (
              <>
                <Button size="sm" variant="primary">
                  موافقة
                </Button>{' '}
                <Button size="sm" variant="ghost">
                  رفض
                </Button>
              </>
            ),
          },
        ]}
        rows={[
          { id: '1', n: 'م. خالد', a: '٣٬٢٠٠', s: 'معلق' },
          { id: '2', n: 'فهد', a: '٤٥٠', s: 'معلق' },
        ]}
      />
    </Container>
  )
}

export function AdminReports() {
  return (
    <Container>
      <PageHeader title="التقارير" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="dash-two-col">
        {['تقرير الأرباح والخسائر', 'إيرادات حسب المسار', 'تقرير المصاريف', 'الأداء السنوي'].map((t) => (
          <Card key={t}>
            <h3 className="etra-h4">{t}</h3>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <Button size="sm" variant="secondary">
                PDF
              </Button>
              <Button size="sm" variant="ghost">
                Excel
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <label className="etra-small" style={{ display: 'flex', gap: 8, marginTop: 24, alignItems: 'center' }}>
        <input type="checkbox" /> إرسال تلقائي شهرياً للبريد
      </label>
    </Container>
  )
}

export function AdminUsers() {
  return (
    <Container>
      <PageHeader title="جميع المستخدمين" actions={<Button variant="primary">إضافة مستخدم +</Button>} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['الكل', 'الطلاب', 'المرشدون', 'السفراء', 'الإدارة'].map((t, i) => (
          <Badge key={t} tone={i === 0 ? 'brand' : 'gray'}>
            {t}
          </Badge>
        ))}
      </div>
      <Table
        rowKey={(r) => r.id}
        columns={[
          { key: 'n', header: 'الاسم', render: (r) => r.n },
          { key: 'e', header: 'البريد', render: (r) => r.e },
          { key: 'r', header: 'الدور', render: (r) => r.r },
          {
            key: 'a',
            header: '',
            render: () => (
              <Button size="sm" variant="ghost">
                عرض
              </Button>
            ),
          },
        ]}
        rows={[
          { id: '1', n: 'أحمد', e: 'a@etra.sa', r: 'طالب' },
          { id: '2', n: 'خالد', e: 'k@etra.sa', r: 'مرشد' },
        ]}
      />
    </Container>
  )
}

export function AdminStudentDetail() {
  const { id } = useParams()
  return (
    <Container>
      <PageHeader title={`طالب #${id ?? '—'}`} actions={<Button variant="danger">تعليق</Button>} />
      <div style={{ display: 'flex', gap: 8 }}>
        {['المعلومات', 'الاشتراك', 'التقدم', 'المدفوعات', 'النشاط', 'ملاحظات'].map((t, i) => (
          <Badge key={t} tone={i === 0 ? 'brand' : 'gray'}>
            {t}
          </Badge>
        ))}
      </div>
      <Card style={{ marginTop: 16 }}>
        <p className="etra-body">تفاصيل الطالب وإدارة الاشتراك.</p>
      </Card>
    </Container>
  )
}

export function AdminMentorDetail() {
  const { id } = useParams()
  return (
    <Container>
      <PageHeader title={`مرشد #${id ?? '—'}`} actions={<Badge tone="success">معتمد ✓</Badge>} />
      <Card>
        <p className="etra-body">تبويبات: الطلاب المعيّنون، الأرباح، المحتوى، الأداء.</p>
      </Card>
    </Container>
  )
}

export function AdminAmbassadorDetail() {
  const { id } = useParams()
  return (
    <Container>
      <PageHeader title={`سفير #${id ?? '—'}`} />
      <Card>
        <p className="etra-body">إحالات، عمولات، وسجل السحوبات.</p>
      </Card>
    </Container>
  )
}

export function AdminContentModeration() {
  return (
    <Container>
      <PageHeader title="قائمة الإشراف على المحتوى" />
      <Table
        rowKey={(r) => r.id}
        columns={[
          { key: 'c', header: 'المحتوى', render: (r) => r.c },
          { key: 'rs', header: 'السبب', render: (r) => r.rs },
          {
            key: 'a',
            header: '',
            render: () => (
              <>
                <Button size="sm" variant="ghost">
                  احتفاظ
                </Button>
                <Button size="sm" variant="danger">
                  حذف
                </Button>
              </>
            ),
          },
        ]}
        rows={[
          { id: '1', c: 'مشاركة مجتمع', rs: 'سبام' },
          { id: '2', c: 'تعليق', rs: 'ألفاظ' },
        ]}
      />
    </Container>
  )
}

export function AdminWordFilters() {
  return (
    <Container>
      <PageHeader title="فلاتر الكلمات" />
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Badge tone="brand">العربية</Badge>
        <Badge tone="gray">الإنجليزية</Badge>
      </div>
      <Card>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['كلمة١', 'كلمة٢'].map((w) => (
            <Badge key={w} tone="gray">
              {w} ✕
            </Badge>
          ))}
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <InputField label="إضافة كلمة" id="wf" />
          <Button variant="primary">إضافة</Button>
        </div>
      </Card>
    </Container>
  )
}

export function AdminInternalChat() {
  return (
    <Container>
      <PageHeader title="المحادثات الداخلية" />
      <Card>
        <p className="etra-body">قنوات: #قناة-التطوير · #قناة-الإدارة · #عام</p>
      </Card>
    </Container>
  )
}

export function AdminEmailBroadcast() {
  return (
    <Container>
      <PageHeader title="البث البريدي" />
      <Card>
        <p className="etra-small">الجمهور: طلاب، مرشدون، سفراء...</p>
        <div style={{ marginTop: 12 }}>
          <InputField label="العنوان" />
        </div>
        <div style={{ marginTop: 12 }}>
          <TextAreaField label="المحتوى" rows={6} defaultValue="نص عربي..." />
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <Button variant="primary">إرسال الآن</Button>
          <Button variant="secondary">جدولة</Button>
        </div>
      </Card>
    </Container>
  )
}

export function AdminAnnouncements() {
  return (
    <Container>
      <PageHeader title="الإعلانات" actions={<Button variant="primary">إنشاء إعلان +</Button>} />
      <Card>
        <InputField label="العنوان" />
        <div style={{ marginTop: 12 }}>
          <TextAreaField label="المحتوى" rows={4} />
        </div>
      </Card>
    </Container>
  )
}

export function AdminInternalFiles() {
  return (
    <Container>
      <PageHeader title="الملفات الداخلية" />
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>
        <Card>
          <p className="etra-small">📁 التسويق</p>
          <p className="etra-small">📁 المنتج</p>
        </Card>
        <Card>
          <Table
            rowKey={(r) => r.n}
            columns={[
              { key: 'n', header: 'الاسم', render: (r) => r.n },
              { key: 't', header: 'النوع', render: (r) => r.t },
              { key: 's', header: 'الحجم', render: (r) => r.s },
            ]}
            rows={[
              { n: 'عرض.pdf', t: 'PDF', s: '٢ م.ب' },
              { n: 'شعار.png', t: 'صورة', s: '٤٠٠ ك.ب' },
            ]}
          />
        </Card>
      </div>
    </Container>
  )
}

export function AdminSupportTickets() {
  return (
    <Container>
      <PageHeader title="تذاكر الدعم" />
      <Table
        rowKey={(r) => r.id}
        columns={[
          { key: 'id', header: '#', render: (r) => r.id },
          { key: 'st', header: 'الطالب', render: (r) => r.st },
          { key: 't', header: 'الموضوع', render: (r) => r.t },
          { key: 'p', header: 'الأولوية', render: (r) => <Badge tone="error">{r.p}</Badge> },
          { key: 's', header: 'الحالة', render: (r) => <Badge tone="info">{r.s}</Badge> },
        ]}
        rows={[
          { id: '٥٤', st: 'أحمد', t: 'لا يعمل الفيديو', p: 'عالية', s: 'مفتوح' },
        ]}
      />
    </Container>
  )
}

export function AdminPlatformSettings() {
  return (
    <Container>
      <PageHeader title="إعدادات المنصة" />
      <Card>
        <InputField label="اسم المنصة" defaultValue="إترا" />
        <div style={{ marginTop: 12 }}>
          <InputField label="Moyasar — المفتاح العام" />
        </div>
        <p className="etra-xs" style={{ marginTop: 16 }}>
          SMTP، النقاط، الأمان، ٢FA...
        </p>
        <Button variant="primary" style={{ marginTop: 16 }}>
          حفظ
        </Button>
      </Card>
    </Container>
  )
}

export function AdminTracks() {
  return (
    <Container>
      <PageHeader title="إدارة المسارات" actions={<Button variant="primary">إضافة مسار +</Button>} />
      <Table
        rowKey={(r) => r.n}
        columns={[
          { key: 'n', header: 'المسار', render: (r) => r.n },
          { key: 'st', header: 'الحالة', render: (r) => <Badge tone="success">{r.st}</Badge> },
          { key: 'c', header: 'الطلاب', render: (r) => r.c },
        ]}
        rows={[
          { n: 'الأمن السيبراني', st: 'نشط', c: '٤٢٠' },
          { n: 'تطوير الويب', st: 'نشط', c: '٥١٠' },
        ]}
      />
    </Container>
  )
}
