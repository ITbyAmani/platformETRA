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
import type { ReactNode } from 'react'
import { Avatar } from '../components/Avatar/Avatar'
import { Badge } from '../components/Badge/Badge'
import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import { Container } from '../components/Container/Container'
import { InputField, SelectField, TextAreaField } from '../components/InputField/InputField'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { StatCard } from '../components/StatCard/StatCard'
import { Table } from '../components/Table/Table'
import { formatArCurrency } from '../lib/formatAr'
import './mentor-dashboard.css'

const earningsData = [
  { month: 'يناير', value: 1800 },
  { month: 'فبراير', value: 2200 },
  { month: 'مارس', value: 2600 },
  { month: 'أبريل', value: 3100 },
  { month: 'مايو', value: 4200 },
  { month: 'يونيو', value: 3800 },
]

const students = [
  { id: '1', name: 'أحمد المحمود', track: 'تطوير الويب', progress: '٦٨٪', active: 'اليوم', plan: 'متقدم' },
  { id: '2', name: 'نورة السبيعي', track: 'الأمن السيبراني', progress: '٤٤٪', active: 'أمس', plan: 'مميز' },
  { id: '3', name: 'فيصل الحربي', track: 'تحليل البيانات', progress: '٧٦٪', active: 'قبل ساعتين', plan: 'متقدم' },
  { id: '4', name: 'سارة الأحمدي', track: 'UI/UX', progress: '٥٨٪', active: 'اليوم', plan: 'أساسي' },
]

const submissions = [
  { id: '1', student: 'نورة السبيعي', assignment: 'واجهة لوحة التحكم', submitted: 'اليوم ٢:١٠م', status: 'بانتظار التقييم' },
  { id: '2', student: 'أحمد المحمود', assignment: 'مشروع React', submitted: 'أمس', status: 'إعادة مراجعة' },
  { id: '3', student: 'فيصل الحربي', assignment: 'تحليل CSV', submitted: 'قبل يومين', status: 'بانتظار التقييم' },
]

const sessions = [
  { time: '٤:٠٠م', student: 'أحمد المحمود', topic: 'مراجعة مشروع React', state: 'اليوم' },
  { time: '٦:٣٠م', student: 'نورة السبيعي', topic: 'خطة الأمن السيبراني', state: 'اليوم' },
  { time: 'غداً ٥:٠٠م', student: 'سارة الأحمدي', topic: 'تصميم مشروع التخرج', state: 'قادمة' },
]

const contentTree = [
  { module: 'الوحدة ١: أساسيات المسار', lessons: ['مقدمة المسار', 'إعداد بيئة العمل', 'أول تطبيق'] },
  { module: 'الوحدة ٢: التطبيق العملي', lessons: ['بناء الواجهة', 'ربط البيانات', 'نشر المشروع'] },
]

function MentorPanel({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <Card className="mentor-card">
      <div className="mentor-card__head">
        <h3>{title}</h3>
        {action}
      </div>
      {children}
    </Card>
  )
}

function ProgressBar({ value }: { value: string }) {
  const width = value.replace('٪', '')
  return (
    <div className="mentor-progress">
      <span style={{ width: `${width}%` }} />
      <strong>{value}</strong>
    </div>
  )
}

export function MentorHome() {
  return (
    <Container>
      <PageHeader title="مرحباً، م. خالد" meta="لوحة متابعة الطلاب، الجلسات، التسليمات، والأرباح." />
      <section className="mentor-hero">
        <div>
          <Badge tone="brand">مرشد تطوير ويب</Badge>
          <h2>تابع أداء متعلميك ووجّههم بخطوات واضحة</h2>
          <p>كل ما تحتاجه لإدارة جلساتك، محتواك، وتسليمات الطلاب في مكان واحد.</p>
        </div>
        <div className="mentor-hero__actions">
          <Button to="/mentor/sessions" variant="secondary">إضافة وقت متاح</Button>
          <Button to="/mentor/content" variant="primary">إدارة المحتوى</Button>
        </div>
      </section>

      <div className="mentor-stats">
        <StatCard icon="👥" label="إجمالي الطلاب" value="٤٢" trend={{ direction: 'up', text: '+٨ هذا الشهر' }} />
        <StatCard icon="✨" label="الطلاب النشطون" value="٣٨" trend={{ direction: 'up', text: '٩٠٪ نشاط' }} />
        <StatCard icon="📝" label="الواجبات المعلقة" value="٧" />
        <StatCard icon="💰" label="أرباح هذا الشهر" value={formatArCurrency(2400)} trend={{ direction: 'up', text: '+١٢٪' }} />
      </div>

      <div className="mentor-grid mentor-grid--home">
        <MentorPanel title="جدول اليوم" action={<Button to="/mentor/sessions" size="sm" variant="ghost">عرض التقويم</Button>}>
          <div className="mentor-list">
            {sessions.slice(0, 2).map((session) => (
              <div key={`${session.student}-${session.time}`} className="mentor-list__item">
                <div>
                  <strong>{session.time} — {session.student}</strong>
                  <span>{session.topic}</span>
                </div>
                <Button to="/mentor/session-notes" size="sm" variant="secondary">ملاحظات</Button>
              </div>
            ))}
          </div>
        </MentorPanel>
        <MentorPanel title="أحدث التسليمات" action={<Button to="/mentor/assignments" size="sm" variant="ghost">كل الواجبات</Button>}>
          <div className="mentor-list">
            {submissions.map((item) => (
              <div key={item.id} className="mentor-list__item">
                <div>
                  <strong>{item.student}</strong>
                  <span>{item.assignment} — {item.submitted}</span>
                </div>
                <Button to="/mentor/assignments" size="sm" variant="primary">تقييم</Button>
              </div>
            ))}
          </div>
        </MentorPanel>
      </div>

      <MentorPanel title="أرباح الشهر">
        <div className="mentor-chart">
          <ResponsiveContainer>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(82,52,183,0.12)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#5234B7" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </MentorPanel>
    </Container>
  )
}

export function MentorStudents() {
  return (
    <Container>
      <PageHeader title="طلابي" actions={<Button variant="secondary">تصدير القائمة</Button>} />
      <div className="mentor-filters">
        <InputField label="بحث" placeholder="ابحث باسم الطالب" />
        <SelectField label="المسار" defaultValue="all">
          <option value="all">كل المسارات</option>
          <option value="web">تطوير الويب</option>
          <option value="cyber">الأمن السيبراني</option>
        </SelectField>
        <SelectField label="النشاط" defaultValue="active">
          <option value="active">الأكثر نشاطاً</option>
          <option value="low">يحتاج متابعة</option>
        </SelectField>
      </div>
      <MentorPanel title="قائمة الطلاب">
        <Table
          rowKey={(r) => r.id}
          columns={[
            {
              key: 'name',
              header: 'الطالب',
              render: (r) => <span className="mentor-person"><Avatar name={r.name} size="sm" />{r.name}</span>,
            },
            { key: 'track', header: 'المسار', render: (r) => r.track },
            { key: 'progress', header: 'التقدم', render: (r) => <ProgressBar value={r.progress} /> },
            { key: 'active', header: 'آخر نشاط', render: (r) => r.active },
            { key: 'plan', header: 'الاشتراك', render: (r) => <Badge tone="brand">{r.plan}</Badge> },
            { key: 'action', header: '', render: (r) => <Button to={`/mentor/students/${r.id}`} size="sm" variant="ghost">عرض</Button> },
          ]}
          rows={students}
        />
      </MentorPanel>
    </Container>
  )
}

export function MentorStudentDetail() {
  return (
    <Container>
      <section className="mentor-student-hero">
        <Avatar name="أحمد المحمود" size="lg" />
        <div>
          <h2>أحمد المحمود</h2>
          <p>مسار تطوير الويب · مسجل منذ ١٥ مارس · اشتراك متقدم</p>
          <div className="mentor-inline-actions">
            <Button variant="secondary">إرسال رسالة</Button>
            <Button to="/mentor/sessions" variant="primary">جدولة جلسة</Button>
          </div>
        </div>
        <Badge tone="success">نشط</Badge>
      </section>
      <div className="mentor-tabs">
        {['مسار التعلم', 'الواجبات', 'الجلسات', 'ملاحظاتي الخاصة'].map((tab, index) => (
          <Badge key={tab} tone={index === 0 ? 'brand' : 'gray'}>{tab}</Badge>
        ))}
      </div>
      <div className="mentor-grid mentor-grid--student">
        <MentorPanel title="مسار التعلم">
          {['HTML وCSS', 'JavaScript', 'React', 'المشروع النهائي'].map((step, index) => (
            <div key={step} className="mentor-road-row">
              <span>{index + 1}</span>
              <strong>{step}</strong>
              <Badge tone={index < 2 ? 'success' : index === 2 ? 'brand' : 'gray'}>{index < 2 ? 'مكتمل' : index === 2 ? 'قيد التعلم' : 'مغلق'}</Badge>
            </div>
          ))}
        </MentorPanel>
        <MentorPanel title="ملاحظات خاصة">
          <TextAreaField label="ملاحظات لا تظهر للطالب" rows={8} defaultValue="يحتاج تركيزاً أكبر على تنظيم المكونات، لكنه متقدم في التطبيق العملي." />
          <Button variant="primary" style={{ marginTop: 14 }}>حفظ الملاحظة</Button>
        </MentorPanel>
      </div>
    </Container>
  )
}

export function MentorContentEditor() {
  return (
    <Container>
      <PageHeader title="إدارة المحتوى" actions={<><Button variant="secondary">معاينة</Button><Button variant="primary">نشر</Button></>} />
      <div className="mentor-editor">
        <MentorPanel title="هيكل الدورة" action={<Button size="sm" variant="ghost">+ وحدة</Button>}>
          <div className="mentor-course-tree">
            {contentTree.map((item) => (
              <details key={item.module} open>
                <summary>{item.module}</summary>
                {item.lessons.map((lesson) => <p key={lesson}>{lesson}</p>)}
              </details>
            ))}
          </div>
        </MentorPanel>
        <MentorPanel title="محرر الدرس">
          <div className="mentor-form-grid">
            <InputField label="عنوان الدرس" defaultValue="بناء واجهة React" />
            <SelectField label="حالة النشر" defaultValue="draft">
              <option value="draft">مسودة</option>
              <option value="published">منشور</option>
            </SelectField>
          </div>
          <div className="mentor-upload">رفع فيديو الدرس أو التسجيل</div>
          <TextAreaField label="وصف الدرس" rows={5} defaultValue="شرح عملي لبناء واجهة منظمة وربط المكونات." />
          <div className="mentor-code-box">
            <span>مثال كود</span>
            <code>{`function LessonCard() {\n  return <article>محتوى الدرس</article>\n}`}</code>
          </div>
        </MentorPanel>
      </div>
    </Container>
  )
}

export function MentorQuizBuilder() {
  return (
    <Container>
      <PageHeader title="منشئ الاختبارات" actions={<Button variant="secondary">معاينة الاختبار</Button>} />
      <div className="mentor-editor mentor-editor--quiz">
        <MentorPanel title="قائمة الأسئلة" action={<Button size="sm" variant="ghost">+ سؤال</Button>}>
          {['اختيار متعدد', 'صح أم خطأ', 'إكمال الكود', 'سؤال نصي'].map((type, index) => (
            <div key={type} className="mentor-question-row">
              <span>{index + 1}</span>
              <strong>{type}</strong>
            </div>
          ))}
        </MentorPanel>
        <MentorPanel title="تحرير السؤال">
          <div className="mentor-form-grid">
            <SelectField label="نوع السؤال" defaultValue="multiple">
              <option value="multiple">اختيار متعدد</option>
              <option value="truefalse">صح أم خطأ</option>
              <option value="code">إكمال الكود</option>
            </SelectField>
            <InputField label="النقاط" defaultValue="٢" />
          </div>
          <TextAreaField label="نص السؤال" rows={4} defaultValue="ما الوظيفة الأساسية للـ component في React؟" />
          <div className="mentor-answer-grid">
            <InputField label="الخيار ١" defaultValue="تقسيم الواجهة إلى أجزاء قابلة لإعادة الاستخدام" />
            <InputField label="الخيار ٢" defaultValue="تشغيل الخادم" />
            <InputField label="الخيار ٣" defaultValue="حذف البيانات" />
            <InputField label="الخيار ٤" defaultValue="تغيير المتصفح" />
          </div>
          <TextAreaField label="شرح الإجابة" rows={3} defaultValue="المكوّن يساعد على تنظيم الواجهة وإعادة استخدام الأجزاء." />
          <Button variant="primary" style={{ marginTop: 14 }}>حفظ السؤال</Button>
        </MentorPanel>
      </div>
    </Container>
  )
}

export function MentorSessions() {
  return (
    <Container>
      <PageHeader title="جدولة الجلسات" actions={<Button variant="primary">إنشاء جلسة جماعية</Button>} />
      <div className="mentor-grid mentor-grid--sessions">
        <MentorPanel title="تقويم التوفر">
          <div className="mentor-calendar">
            {Array.from({ length: 21 }).map((_, i) => (
              <button key={i} className={i % 5 === 0 ? 'is-booked' : i % 3 === 0 ? 'is-available' : ''}>
                {i + 1}
              </button>
            ))}
          </div>
        </MentorPanel>
        <MentorPanel title="الجلسات القادمة">
          <div className="mentor-list">
            {sessions.map((session) => (
              <div key={`${session.student}-${session.time}`} className="mentor-list__item">
                <div>
                  <strong>{session.time}</strong>
                  <span>{session.student} · {session.topic}</span>
                </div>
                <Badge tone={session.state === 'اليوم' ? 'brand' : 'info'}>{session.state}</Badge>
              </div>
            ))}
          </div>
        </MentorPanel>
      </div>
    </Container>
  )
}

export function MentorSessionNotes() {
  return (
    <Container>
      <PageHeader title="ملاحظات الجلسة" meta="ملخص الجلسة، الأهداف، المهام، والروابط المشتركة." />
      <div className="mentor-grid mentor-grid--notes">
        <MentorPanel title="بيانات الجلسة">
          <p className="mentor-muted">أحمد المحمود · اليوم ٤:٠٠م · ٦٠ دقيقة</p>
          <div className="mentor-checklist">
            {['مراجعة المشروع', 'تحديد مهام الأسبوع', 'مشاركة روابط مفيدة'].map((item) => (
              <label key={item}><input type="checkbox" defaultChecked={item !== 'مشاركة روابط مفيدة'} /> {item}</label>
            ))}
          </div>
        </MentorPanel>
        <MentorPanel title="ملاحظات مشتركة">
          <TextAreaField label="ملخص الجلسة" rows={7} defaultValue="تمت مراجعة بنية المشروع، والاتفاق على تحسين تقسيم المكونات." />
          <Button variant="danger" style={{ marginTop: 14 }}>إنهاء الجلسة وإرسال الملخص</Button>
        </MentorPanel>
      </div>
    </Container>
  )
}

export function MentorAssignments() {
  return (
    <Container>
      <PageHeader title="قائمة انتظار الواجبات" actions={<Button variant="secondary">تقييم جماعي</Button>} />
      <div className="mentor-grid mentor-grid--assignments">
        <MentorPanel title="التسليمات">
          <Table
            rowKey={(r) => r.id}
            columns={[
              { key: 'student', header: 'الطالب', render: (r) => r.student },
              { key: 'assignment', header: 'الواجب', render: (r) => r.assignment },
              { key: 'submitted', header: 'وقت التسليم', render: (r) => r.submitted },
              { key: 'status', header: 'الحالة', render: (r) => <Badge tone={r.status === 'إعادة مراجعة' ? 'warning' : 'brand'}>{r.status}</Badge> },
            ]}
            rows={submissions}
          />
        </MentorPanel>
        <MentorPanel title="لوحة التقييم">
          <div className="mentor-submission-preview">معاينة ملف الطالب / ZIP / PDF</div>
          <InputField label="الدرجة من ٢٠" defaultValue="١٨" />
          <TextAreaField label="ملاحظات للطالب" rows={4} defaultValue="عمل ممتاز، حسّن تسمية الملفات ونظافة الكود." />
          <div className="mentor-inline-actions">
            <Button variant="secondary">إرجاع للتعديل</Button>
            <Button variant="primary">اعتماد التقييم</Button>
          </div>
        </MentorPanel>
      </div>
    </Container>
  )
}

export function MentorCertificates() {
  return (
    <Container>
      <PageHeader title="اعتماد الشهادات" />
      <MentorPanel title="طلاب مكتملو المتطلبات">
        <Table
          rowKey={(r) => r.id}
          columns={[
            { key: 'name', header: 'الطالب', render: (r) => r.name },
            { key: 'lessons', header: 'الدروس', render: () => <Badge tone="success">مكتمل</Badge> },
            { key: 'quizzes', header: 'الاختبارات', render: () => <Badge tone="success">مكتمل</Badge> },
            { key: 'assignments', header: 'الواجبات', render: () => <Badge tone="success">مكتمل</Badge> },
            { key: 'project', header: 'المشروع', render: () => <Badge tone="brand">جاهز</Badge> },
            { key: 'action', header: '', render: () => <Button size="sm" variant="primary">اعتماد الشهادة</Button> },
          ]}
          rows={students.slice(0, 3)}
        />
      </MentorPanel>
    </Container>
  )
}

export function MentorEarnings() {
  return (
    <Container>
      <PageHeader title="لوحة الأرباح" actions={<Button variant="secondary">تصدير CSV</Button>} />
      <div className="mentor-stats mentor-stats--three">
        <StatCard icon="💰" label="أرباح هذا الشهر" value={formatArCurrency(2400)} />
        <StatCard icon="📈" label="إجمالي الأرباح" value={formatArCurrency(48000)} />
        <StatCard icon="⏳" label="المدفوعات القادمة" value={formatArCurrency(3600)} />
      </div>
      <div className="mentor-grid mentor-grid--earnings">
        <MentorPanel title="أرباح آخر ٦ أشهر">
          <div className="mentor-chart">
            <ResponsiveContainer>
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(82,52,183,0.12)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#9E59CD" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </MentorPanel>
        <MentorPanel title="تفصيل الإيرادات ٤٠٪">
          <Table
            rowKey={(r) => r.id}
            columns={[
              { key: 'name', header: 'الطالب', render: (r) => r.name },
              { key: 'plan', header: 'الخطة', render: (r) => r.plan },
              { key: 'amount', header: 'المبلغ', render: () => '١٩٩ ريال' },
              { key: 'share', header: 'حصتي', render: () => '٧٩٫٦ ريال' },
            ]}
            rows={students.slice(0, 3)}
          />
        </MentorPanel>
      </div>
    </Container>
  )
}

export function MentorProfile() {
  return (
    <Container>
      <PageHeader title="الملف الشخصي" />
      <div className="mentor-grid mentor-grid--profile">
        <MentorPanel title="بطاقة المرشد">
          <div className="mentor-profile-card">
            <Avatar name="م. خالد العتيبي" size="lg" />
            <h3>م. خالد العتيبي</h3>
            <p>مرشد تطوير ويب · تقييم ٤.٩</p>
            <Badge tone="brand">مرشد معتمد</Badge>
          </div>
        </MentorPanel>
        <MentorPanel title="بيانات الحساب">
          <div className="mentor-form-grid">
            <InputField label="الاسم" defaultValue="م. خالد العتيبي" />
            <InputField label="البريد الإلكتروني" defaultValue="khalid@etra.sa" />
            <InputField label="رقم الجوال" defaultValue="0551459985" />
            <InputField label="التخصص" defaultValue="تطوير الويب" />
          </div>
          <TextAreaField label="نبذة مختصرة" rows={4} defaultValue="أساعد المتعلمين على بناء مشاريع ويب عملية وتجهيزهم لسوق العمل." />
          <Button variant="primary" style={{ marginTop: 14 }}>حفظ التغييرات</Button>
        </MentorPanel>
      </div>
    </Container>
  )
}
