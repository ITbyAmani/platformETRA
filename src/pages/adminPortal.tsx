import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ReactNode } from 'react'
import './admin-portal.css'

const adminRevenue = [
  { month: 'يناير', value: 52000 },
  { month: 'فبراير', value: 61000 },
  { month: 'مارس', value: 58000 },
  { month: 'أبريل', value: 72000 },
  { month: 'مايو', value: 89400 },
  { month: 'يونيو', value: 104800 },
]

const domainRevenue = [
  { name: 'تطوير الويب', value: 42 },
  { name: 'الأمن السيبراني', value: 28 },
  { name: 'تحليل البيانات', value: 18 },
  { name: 'UI/UX', value: 12 },
]

const splitData = [
  { label: 'إترا', value: 60 },
  { label: 'المرشدون', value: 40 },
]

const colors = ['#5234B7', '#9E59CD', '#22C55E', '#3B82F6']

const adminNav = [
  'الرئيسية',
  'الإدارة المالية',
  'إدارة المستخدمين',
  'إدارة المحتوى',
  'التواصل والإعلانات',
  'الملفات الداخلية',
  'تذاكر الدعم',
  'إعدادات المنصة',
]

const moneyCards = [
  { label: 'إيرادات اليوم', value: '٤٬٢٠٠ ريال', trend: '+٨٪' },
  { label: 'إيرادات الشهر', value: '١٠٤٬٨٠٠ ريال', trend: '+١٢٪' },
  { label: 'إيرادات السنة', value: '٩٢٠٬٠٠٠ ريال', trend: '+٢٤٪' },
  { label: 'نمو الإيرادات', value: '١٢٪', trend: 'مستقر' },
]

const userCards = [
  { label: 'إجمالي المستخدمين', value: '٢٬٤١٢' },
  { label: 'مستخدمون جدد', value: '١٢٣' },
  { label: 'المستخدمون النشطون', value: '١٬٨٩٠' },
  { label: 'معدل التوقف', value: '٢٫١٪' },
]

const adminModules = [
  { title: 'المعاملات', text: 'سجل الدفع، المنتجات، وسائل الدفع، وحالة العملية.' },
  { title: 'المدفوعات', text: 'اعتماد مدفوعات المرشدين والسفراء ومتابعة حالتها.' },
  { title: 'التقارير', text: 'تقارير الأرباح والخسائر، الإيرادات حسب المسار، والمصاريف.' },
  { title: 'جميع المستخدمين', text: 'طلاب، مرشدون، سفراء، وإدارة مع بحث وفلاتر.' },
  { title: 'إشراف المحتوى', text: 'مراجعة البلاغات، حذف المحتوى، وتحذير المستخدمين.' },
  { title: 'البث البريدي', text: 'إنشاء حملات بريدية وتحديد الجمهور والجدولة.' },
  { title: 'الإعلانات', text: 'إعلانات المنصة، الجمهور المستهدف، وتاريخ الانتهاء.' },
  { title: 'الملفات الداخلية', text: 'مجلدات، صلاحيات، معاينة ملفات، وسجل الإصدارات.' },
  { title: 'الدعم الفني', text: 'تذاكر الطلاب، الأولوية، المسؤول، ومؤشر SLA.' },
  { title: 'إدارة المسارات', text: 'تفعيل المسارات، تعيين المرشدين، وأعداد الطلاب.' },
]

const users = [
  { name: 'أحمد المحمود', role: 'طالب', status: 'نشط', joined: '١٢ مايو' },
  { name: 'م. سارة الأحمدي', role: 'مرشد', status: 'بانتظار مراجعة', joined: '١٠ مايو' },
  { name: 'ريما الحربي', role: 'سفير', status: 'نشط', joined: '٨ مايو' },
]

const tickets = [
  { id: '#٥٤', user: 'نورة', subject: 'مشكلة في فيديو الدرس', priority: 'عالية', status: 'مفتوح' },
  { id: '#٥٣', user: 'خالد', subject: 'استفسار عن الدفع', priority: 'متوسطة', status: 'قيد المعالجة' },
]

function AdminPortalCard({ label, value, trend }: { label: string; value: string; trend?: string }) {
  return (
    <article className="admin-portal-stat">
      <span>{label}</span>
      <strong>{value}</strong>
      {trend ? <small>{trend}</small> : null}
    </article>
  )
}

function AdminPortalPanel({
  title,
  eyebrow,
  id,
  children,
}: {
  title: string
  eyebrow?: string
  id?: string
  children: ReactNode
}) {
  return (
    <section className="admin-portal-panel" id={id}>
      <div className="admin-portal-panel__head">
        {eyebrow ? <span>{eyebrow}</span> : null}
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

export function AdminPortalPage() {
  return (
    <div className="admin-portal" dir="rtl">
      <aside className="admin-portal-sidebar" aria-label="قائمة إدارة إترا">
        <div className="admin-portal-sidebar__brand">
          <img src="/etralogo.png" alt="ETRA" />
          <span>مركز الإدارة</span>
        </div>
        <nav>
          {adminNav.map((item, index) => (
            <a key={item} href={`#admin-section-${index}`} className={index === 0 ? 'is-active' : ''}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item}
            </a>
          ))}
        </nav>
        <div className="admin-portal-sidebar__foot">
          <strong>صلاحية الدخول</strong>
          <span>مدير المنصة</span>
        </div>
      </aside>

      <main className="admin-portal-main">
        <header className="admin-portal-top" id="admin-section-0">
          <div>
            <p>ETRA ERP</p>
            <h1>لوحة إدارة إترا المستقلة</h1>
            <span>إدارة مالية، مستخدمين، محتوى، تواصل، دعم، وإعدادات المنصة في واجهة واحدة.</span>
          </div>
          <div className="admin-portal-top__actions">
            <button type="button">تصدير تقرير</button>
            <button type="button">إعدادات المنصة</button>
          </div>
        </header>

        <section className="admin-portal-hero">
          <div className="admin-portal-hero__copy">
            <span>نظرة تنفيذية</span>
            <h2>مؤشرات المنصة اليوم</h2>
            <p>
              لوحة مستقلة مصممة لإدارة إترا كمنصة LMS + Mentorship + ERP مع تتبع الإيرادات،
              المستخدمين، المحتوى، الدعم، والمدفوعات.
            </p>
          </div>
          <div className="admin-portal-hero__metrics">
            <div>
              <strong>٦٠٪</strong>
              <span>حصة إترا</span>
            </div>
            <div>
              <strong>٤٠٪</strong>
              <span>حصة المرشد</span>
            </div>
            <div>
              <strong>٥٪</strong>
              <span>عمولة السفير</span>
            </div>
          </div>
        </section>

        <div className="admin-portal-stats">
          {moneyCards.map((card) => (
            <AdminPortalCard key={card.label} {...card} />
          ))}
        </div>

        <div className="admin-portal-stats admin-portal-stats--users">
          {userCards.map((card) => (
            <AdminPortalCard key={card.label} {...card} />
          ))}
        </div>

        <div className="admin-portal-grid admin-portal-grid--charts" id="admin-section-1">
          <AdminPortalPanel title="اتجاه الإيرادات" eyebrow="الإدارة المالية">
            <div className="admin-portal-chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={adminRevenue}>
                  <defs>
                    <linearGradient id="adminRevenueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9E59CD" stopOpacity={0.42} />
                      <stop offset="100%" stopColor="#9E59CD" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#B8B0D4" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#B8B0D4" tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#9E59CD" strokeWidth={3} fill="url(#adminRevenueFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AdminPortalPanel>

          <AdminPortalPanel title="توزيع الإيرادات" eyebrow="٦٠ / ٤٠">
            <div className="admin-portal-chart admin-portal-chart--pie">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={splitData} dataKey="value" nameKey="label" outerRadius={92} innerRadius={56}>
                    {splitData.map((entry, index) => (
                      <Cell key={entry.label} fill={colors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="admin-portal-split">
              <span>إترا ٦٠٪</span>
              <span>المرشدون ٤٠٪</span>
            </div>
          </AdminPortalPanel>
        </div>

        <div className="admin-portal-grid admin-portal-grid--charts">
          <AdminPortalPanel title="الإيراد حسب المسار">
            <div className="admin-portal-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={domainRevenue}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#B8B0D4" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#B8B0D4" tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {domainRevenue.map((entry, index) => (
                      <Cell key={entry.name} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AdminPortalPanel>

          <AdminPortalPanel title="إجراءات معلقة">
            <div className="admin-portal-actions-list">
              <div>
                <strong>٧</strong>
                <span>مراجعات محتوى</span>
              </div>
              <div>
                <strong>٣</strong>
                <span>طلبات مرشدين</span>
              </div>
              <div>
                <strong>٥</strong>
                <span>تذاكر دعم عالية</span>
              </div>
            </div>
          </AdminPortalPanel>
        </div>

        <AdminPortalPanel title="وحدات الإدارة المطلوبة" eyebrow="كل شاشات AD في الملف">
          <div className="admin-portal-modules">
            {adminModules.map((module, index) => (
              <article key={module.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{module.title}</h3>
                <p>{module.text}</p>
              </article>
            ))}
          </div>
        </AdminPortalPanel>

        <div className="admin-portal-grid admin-portal-grid--tables">
          <AdminPortalPanel title="إدارة المستخدمين" id="admin-section-2">
            <table className="admin-portal-table">
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>الدور</th>
                  <th>الحالة</th>
                  <th>تاريخ الانضمام</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.name}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td><span>{user.status}</span></td>
                    <td>{user.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AdminPortalPanel>

          <AdminPortalPanel title="تذاكر الدعم" eyebrow="SLA" id="admin-section-6">
            <table className="admin-portal-table">
              <thead>
                <tr>
                  <th>الرقم</th>
                  <th>المستخدم</th>
                  <th>الموضوع</th>
                  <th>الأولوية</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.user}</td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.priority}</td>
                    <td><span>{ticket.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AdminPortalPanel>
        </div>

        <div className="admin-portal-grid admin-portal-grid--ops">
          <AdminPortalPanel title="إدارة المحتوى" id="admin-section-3">
            <div className="admin-portal-kanban">
              <article>
                <span>بلاغات</span>
                <strong>١٢</strong>
                <p>مراجعة مشاركات وتعليقات المجتمع.</p>
              </article>
              <article>
                <span>فلاتر كلمات</span>
                <strong>٤٨</strong>
                <p>قائمة عربية وإنجليزية مع دعم Regex.</p>
              </article>
              <article>
                <span>مسارات</span>
                <strong>٧</strong>
                <p>تفعيل وتعطيل المسارات وربط المرشدين.</p>
              </article>
            </div>
          </AdminPortalPanel>

          <AdminPortalPanel title="التواصل والإعلانات" eyebrow="Email + Announcements" id="admin-section-4">
            <div className="admin-portal-compose">
              <label>عنوان الرسالة</label>
              <div>تحديثات مسارات إترا لشهر يونيو</div>
              <label>الجمهور</label>
              <div>الطلاب · المرشدون · السفراء · مسار محدد</div>
              <button type="button">جدولة الإرسال</button>
            </div>
          </AdminPortalPanel>
        </div>

        <div className="admin-portal-grid admin-portal-grid--ops">
          <AdminPortalPanel title="الملفات الداخلية" id="admin-section-5">
            <div className="admin-portal-files">
              <span>التسويق</span>
              <span>المنتج</span>
              <span>المالية</span>
              <span>الشهادات</span>
            </div>
          </AdminPortalPanel>

          <AdminPortalPanel title="إعدادات المنصة" id="admin-section-7">
            <div className="admin-portal-settings">
              <div>عام: اسم المنصة، الشعار، المنطقة الزمنية</div>
              <div>المدفوعات: Moyasar API + Webhooks</div>
              <div>البريد: SMTP + قوالب الرسائل</div>
              <div>الأمان: سياسة كلمة المرور + 2FA</div>
            </div>
          </AdminPortalPanel>
        </div>
      </main>
    </div>
  )
}
