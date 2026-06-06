import { Link } from 'react-router-dom'
import { Badge } from '../components/Badge/Badge'
import { Button } from '../components/Button/Button'
import { Avatar } from '../components/Avatar/Avatar'
import './student-dashboard.css'

type Tone = 'brand' | 'success' | 'warning' | 'error' | 'info' | 'gray'

const stats = [
  { icon: '📚', label: 'الدورات المكتملة', value: '٣ من ٨', hint: 'مساران قيد التقدم' },
  { icon: '📝', label: 'الواجبات المعلقة', value: '٢', hint: 'أقرب موعد بعد ٢٤ ساعة' },
  { icon: '🎥', label: 'الجلسة القادمة', value: 'غداً ٤:٠٠م', hint: 'م. خالد العتيبي' },
  { icon: '⭐', label: 'النقاط المكتسبة', value: '١٬٢٥٠', hint: '+١٢٠ هذا الأسبوع' },
]

const courses = [
  { title: 'تطوير مواقع الويب بـ React وNext.js', domain: 'تطوير الويب', mentor: 'م. سارة الأحمدي', progress: 65, state: 'قيد التعلم' },
  { title: 'أساسيات الأمن السيبراني للمبتدئين', domain: 'الأمن السيبراني', mentor: 'م. خالد العتيبي', progress: 42, state: 'قيد التعلم' },
  { title: 'تحليل البيانات باستخدام Python وPandas', domain: 'تحليل البيانات', mentor: 'م. نورة السبيعي', progress: 100, state: 'مكتملة' },
  { title: 'تصميم واجهات المستخدم بـ Figma من الصفر', domain: 'تصميم UI/UX', mentor: 'م. فيصل الحربي', progress: 0, state: 'غير مبدوءة' },
]

const sessions = [
  { mentor: 'م. خالد العتيبي', topic: 'مراجعة واجب JavaScript', time: 'غداً ٤:٠٠م', status: 'قادمة' },
  { mentor: 'م. سارة الأحمدي', topic: 'تحسين مشروع React', time: 'الخميس ٧:٣٠م', status: 'محجوزة' },
  { mentor: 'م. نورة السبيعي', topic: 'خطة تحليل البيانات', time: 'الأحد ٦:٠٠م', status: 'متاحة' },
]

const assignments = [
  { id: 'a1', title: 'واجب HTML الدلالي', course: 'تطوير الويب', due: 'اليوم ١١:٥٩م', status: 'معلق', tone: 'warning' as Tone, grade: '-' },
  { id: 'a2', title: 'تحليل سجل زيارات متجر', course: 'تحليل البيانات', due: 'غداً', status: 'مُقدَّم', tone: 'info' as Tone, grade: 'بانتظار التقييم' },
  { id: 'a3', title: 'تقرير ثغرة XSS', course: 'الأمن السيبراني', due: 'منتهٍ', status: 'مُقيَّم', tone: 'success' as Tone, grade: '١٨/٢٠' },
]

const notifications = [
  { icon: '📝', text: 'واجب جديد في مسار تطوير الويب', time: 'منذ ٣ ساعات', type: 'المهام' },
  { icon: '✅', text: 'تم تقييم واجبك: درجتك ١٨/٢٠', time: 'أمس', type: 'التقييمات' },
  { icon: '🎥', text: 'جلستك القادمة غداً الساعة ٤ مساءً', time: 'أمس', type: 'الجلسات' },
  { icon: '🏆', text: 'حصلت على شارة المثابر', time: 'قبل يومين', type: 'الإنجازات' },
]

function StudentPage({ title, eyebrow, children, action }: { title: string; eyebrow?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="student-page">
      <div className="student-page__header">
        <div>
          {eyebrow ? <p className="student-page__eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
        </div>
        {action ? <div className="student-page__action">{action}</div> : null}
      </div>
      {children}
    </section>
  )
}

function Panel({ title, children, className = '' }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <article className={`student-panel ${className}`.trim()}>
      {title ? <h2 className="student-panel__title">{title}</h2> : null}
      {children}
    </article>
  )
}

function Progress({ value }: { value: number }) {
  return (
    <div className="student-progress" aria-label={`نسبة التقدم ${value}%`}>
      <span style={{ width: `${value}%` }} />
    </div>
  )
}

function CourseTile({ course }: { course: (typeof courses)[number] }) {
  return (
    <article className="student-course-tile">
      <div className="student-course-tile__thumb">
        <span>{course.domain}</span>
      </div>
      <div className="student-course-tile__body">
        <Badge tone={course.progress === 100 ? 'success' : course.progress === 0 ? 'gray' : 'brand'}>{course.state}</Badge>
        <h3>{course.title}</h3>
        <p>{course.mentor} · ١٢ ساعة · ٤.٩ ★</p>
        <div className="student-course-tile__progress-row">
          <Progress value={course.progress} />
          <strong>{course.progress}٪</strong>
        </div>
        <Button to="/student/learn/video" variant="primary" size="sm">
          متابعة التعلم
        </Button>
      </div>
    </article>
  )
}

export function StudentHome() {
  return (
    <StudentPage
      title="مرحباً، أحمد"
      eyebrow="الثلاثاء، ١٩ مايو ٢٠٢٦"
      action={
        <div className="student-header-badges">
          <Badge tone="brand">متعلم</Badge>
          <Badge tone="warning">٧ أيام متتالية 🔥</Badge>
          <Badge tone="info">المستوى: متوسط</Badge>
        </div>
      }
    >
      <div className="student-stats-grid">
        {stats.map((s) => (
          <Panel key={s.label} className="student-stat">
            <span className="student-stat__icon">{s.icon}</span>
            <p>{s.label}</p>
            <strong>{s.value}</strong>
            <small>{s.hint}</small>
          </Panel>
        ))}
      </div>

      <div className="student-layout student-layout--main">
        <Panel title="استمر من حيث توقفت">
          <div className="student-current-course">
            <div className="student-current-course__visual">React</div>
            <div>
              <Badge tone="brand">تطوير الويب</Badge>
              <h3>تطوير مواقع الويب بـ React وNext.js</h3>
              <p>آخر درس: إدارة الحالة باستخدام Hooks</p>
              <Progress value={65} />
              <div className="student-actions-row">
                <Button to="/student/learn/video" variant="primary">متابعة التعلم</Button>
                <Button to="/student/progress-map" variant="secondary">عرض الخريطة</Button>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="جلساتك القادمة">
          <div className="student-list">
            {sessions.map((s) => (
              <div className="student-list-item" key={s.topic}>
                <Avatar name={s.mentor} size="sm" />
                <div>
                  <strong>{s.mentor}</strong>
                  <span>{s.topic}</span>
                  <small>{s.time}</small>
                </div>
                <Button variant="secondary" size="sm">انضم</Button>
              </div>
            ))}
          </div>
          <Link to="/student/sessions-calendar" className="student-text-link">عرض الجدول الكامل</Link>
        </Panel>
      </div>

      <div className="student-layout">
        <Panel title="آخر نشاط">
          <ol className="student-timeline">
            <li>أكملت درس «Hooks» في مسار تطوير الويب — منذ ساعتين</li>
            <li>قدّمت واجب HTML الدلالي — أمس</li>
            <li>حصلت على ١٢٠ نقطة من اختبار JavaScript — قبل يومين</li>
          </ol>
        </Panel>
        <Panel title="إجراءات سريعة">
          <div className="student-quick-actions">
            <Button to="/student/assignments" variant="secondary">رفع واجب</Button>
            <Button to="/student/sessions-calendar" variant="secondary">احجز جلسة</Button>
            <Button to="/student/community" variant="ghost">المجتمع</Button>
          </div>
        </Panel>
      </div>
    </StudentPage>
  )
}

export function StudentCourses() {
  return (
    <StudentPage title="دوراتي" eyebrow="تابع تقدمك في المسارات المسجلة">
      <div className="student-tabs">
        {['الكل', 'قيد التعلم', 'مكتملة', 'غير مبدوءة'].map((t, i) => (
          <button className={i === 0 ? 'is-active' : ''} key={t} type="button">{t}</button>
        ))}
      </div>
      <div className="student-courses-grid">
        {courses.map((course) => <CourseTile key={course.title} course={course} />)}
      </div>
    </StudentPage>
  )
}

export function StudentVideoLesson() {
  const modules = ['مقدمة المسار', 'أساسيات React', 'إدارة الحالة', 'المشروع النهائي']
  return (
    <StudentPage title="درس الفيديو" eyebrow="تطوير مواقع الويب بـ React وNext.js">
      <div className="student-player-layout">
        <aside className="student-lesson-sidebar">
          <h2>محتوى الدورة</h2>
          {modules.map((m, index) => (
            <details key={m} open={index < 2}>
              <summary>{m}<span>{index + 3} دروس</span></summary>
              <button type="button" className={index === 1 ? 'is-current' : ''}>▶ إدارة الحالة باستخدام Hooks</button>
              <button type="button">✓ تطبيق عملي قصير</button>
              <button type="button" disabled>🔒 اختبار الوحدة</button>
            </details>
          ))}
        </aside>
        <Panel className="student-player-panel">
          <div className="student-video-box">
            <button type="button">▶</button>
            <span>مشغل الفيديو · ١٦:٩</span>
          </div>
          <div className="student-video-controls">
            <span>٠:٢٤</span>
            <Progress value={38} />
            <span>١٢:٤٠</span>
            <Badge tone="gray">1.25x</Badge>
            <Badge tone="gray">1080p</Badge>
          </div>
          <div className="student-tabs">
            {['الملاحظات', 'الموارد', 'المناقشة'].map((t, i) => <button type="button" className={i === 0 ? 'is-active' : ''} key={t}>{t}</button>)}
          </div>
          <textarea className="student-textarea" placeholder="اكتب ملاحظاتك وسيتم حفظها تلقائياً..." rows={5} />
          <div className="student-actions-row">
            <Button variant="ghost">الدرس السابق</Button>
            <Button to="/student/learn/code" variant="primary">الدرس التالي</Button>
          </div>
        </Panel>
      </div>
    </StudentPage>
  )
}

export function StudentCodePlayground() {
  return (
    <StudentPage title="محرر الأكواد" eyebrow="طبّق أثناء التعلم">
      <div className="student-code-layout">
        <Panel title="الفيديو المصغّر">
          <div className="student-mini-video">▶ شرح التحدي</div>
        </Panel>
        <Panel title="محرر Python">
          <pre className="student-code-editor">{`students = ["أحمد", "نورة", "سارة"]\nfor name in students:\n    print(f"مرحباً {name}")`}</pre>
          <div className="student-actions-row">
            <Button variant="gradient">تشغيل الكود</Button>
            <Button variant="secondary">ملء الشاشة</Button>
          </div>
          <pre className="student-console">Console: مرحباً أحمد، مرحباً نورة، مرحباً سارة</pre>
        </Panel>
      </div>
    </StudentPage>
  )
}

export function StudentQuiz() {
  return (
    <StudentPage title="اختبار الوحدة الثانية" eyebrow="السؤال ٣ من ١٠">
      <Panel>
        <div className="student-quiz-head">
          <Badge tone="warning">الوقت المتبقي ٧:٣٢</Badge>
          <Progress value={30} />
        </div>
        <h2 className="student-question">ما الفرق بين let و const في JavaScript؟</h2>
        <div className="student-options">
          {['let قابل لإعادة التعيين و const ثابت', 'كلاهما ثابت دائماً', 'لا يوجد فرق بينهما', 'const يستخدم للدوال فقط'].map((o, i) => (
            <button key={o} type="button" className={i === 0 ? 'is-selected' : ''}>{o}</button>
          ))}
        </div>
        <div className="student-actions-row">
          <Button variant="ghost">السابق</Button>
          <Button variant="primary">التالي</Button>
          <Button variant="secondary">إنهاء الاختبار</Button>
        </div>
      </Panel>
    </StudentPage>
  )
}

export function StudentLiveSessions() {
  return (
    <StudentPage title="الجلسات المباشرة" eyebrow="تقويم أسبوعي وجلسات Discord" action={<Button to="/student/sessions-calendar" variant="primary">احجز جلسة جديدة</Button>}>
      <Panel title="جلساتي القادمة">
        <div className="student-week-calendar">
          {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((d, i) => (
            <div className={i === 2 ? 'is-booked' : i === 4 ? 'is-open' : ''} key={d}>
              <strong>{d}</strong>
              <span>{i === 2 ? 'جلسة ٤:٠٠م' : i === 4 ? 'موعد متاح' : 'لا يوجد'}</span>
            </div>
          ))}
        </div>
      </Panel>
      <div className="student-layout">
        <Panel title="Discord">
          <div className="student-discord-card">
            <strong>جلسة مراجعة المشروع</strong>
            <p>سيتم فتح رابط Discord قبل الموعد بـ ١٥ دقيقة.</p>
            <Button variant="discord">انضم للجلسة</Button>
          </div>
        </Panel>
        <Panel title="التسجيلات السابقة">
          <div className="student-list">
            {['مراجعة DOM', 'مقدمة APIs', 'تحسين السيرة التقنية'].map((r) => <div className="student-list-row" key={r}><span>{r}</span><Button size="sm" variant="ghost">مشاهدة</Button></div>)}
          </div>
        </Panel>
      </div>
    </StudentPage>
  )
}

export function StudentProgressMap() {
  const nodes = ['درس', 'اختبار', 'واجب', 'درس', 'مشروع', 'شهادة']
  return (
    <StudentPage title="خريطة التقدم" eyebrow="رحلتك من البداية حتى الشهادة">
      <Panel>
        <div className="student-roadmap">
          {nodes.map((n, i) => (
            <div key={`${n}-${i}`} className={i < 3 ? 'is-done' : i === 3 ? 'is-current' : 'is-locked'}>
              <span>{i < 3 ? '✓' : i === 3 ? '•' : '🔒'}</span>
              <strong>{n}</strong>
              <small>{i < 3 ? 'مكتمل' : i === 3 ? 'الحالي' : 'مقفل'}</small>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="ملخص التقدم">
        <div className="student-summary-row">
          <Badge tone="success">٥ من ١٢ مكتمل</Badge>
          <Badge tone="brand">٤٨ ساعة تعلم</Badge>
          <Badge tone="warning">٣ مهام متبقية</Badge>
        </div>
      </Panel>
    </StudentPage>
  )
}

export function StudentAssignments() {
  return (
    <StudentPage title="الواجبات" eyebrow="مرتبة حسب أقرب موعد تسليم">
      <div className="student-tabs">
        {['الكل', 'معلق', 'مُقدَّم', 'مُقيَّم', 'مُعاد'].map((t, i) => <button type="button" className={i === 0 ? 'is-active' : ''} key={t}>{t}</button>)}
      </div>
      <div className="student-card-list">
        {assignments.map((a) => (
          <Panel key={a.id} className="student-assignment-card">
            <div>
              <Badge tone={a.tone}>{a.status}</Badge>
              <h3>{a.title}</h3>
              <p>{a.course} · الموعد: {a.due} · الدرجة: {a.grade}</p>
            </div>
            <Button to={`/student/assignments/${a.id}`} variant="secondary">عرض التفاصيل</Button>
          </Panel>
        ))}
      </div>
    </StudentPage>
  )
}

export function StudentAssignmentDetail() {
  return (
    <StudentPage title="واجب HTML الدلالي" eyebrow="تطوير الويب · ٢٠ نقطة" action={<Badge tone="warning">معلق</Badge>}>
      <div className="student-layout student-layout--main">
        <Panel title="تعليمات الواجب">
          <p>أنشئ صفحة هبوط عربية باستخدام عناصر HTML الدلالية، ثم أرفق ملف ZIP يحتوي على المشروع وصورة للنتيجة النهائية.</p>
          <pre className="student-code-snippet">{`<main>\n  <section aria-labelledby="hero-title">\n    ...\n  </section>\n</main>`}</pre>
        </Panel>
        <Panel title="التسليم">
          <div className="student-upload">اسحب ملفات PDF أو ZIP أو الصور هنا</div>
          <Button variant="primary" block>تقديم الواجب</Button>
          <div className="student-feedback">
            <strong>ملاحظات المرشد</strong>
            <p>سيظهر التقييم هنا بعد المراجعة.</p>
          </div>
        </Panel>
      </div>
    </StudentPage>
  )
}

export function StudentSessionsCalendar() {
  return (
    <StudentPage title="جدولة الجلسات" eyebrow="اختر وقتاً مناسباً مع مرشدك">
      <div className="student-calendar-grid">
        {Array.from({ length: 28 }, (_, i) => (
          <button key={i} type="button" className={i === 10 ? 'is-mine' : i % 6 === 0 ? 'is-open' : ''}>
            <strong>{i + 1}</strong>
            <span>{i === 10 ? 'حجزي' : i % 6 === 0 ? 'متاح' : '—'}</span>
          </button>
        ))}
      </div>
      <Panel title="تأكيد الحجز">
        <div className="student-booking-flow">
          <span>١. اختر الموعد</span>
          <span>٢. اكتب أهداف الجلسة</span>
          <span>٣. استلم رابط Discord</span>
        </div>
      </Panel>
    </StudentPage>
  )
}

export function StudentSessionDetail() {
  return (
    <StudentPage title="جلسة مع م. خالد العتيبي" eyebrow="الخميس، ٤:٠٠م · ٦٠ دقيقة">
      <div className="student-layout">
        <Panel title="أهداف الجلسة">
          <ul className="student-checklist">
            <li>مراجعة مشروع React</li>
            <li>تحديد نقاط التحسين</li>
            <li>تجهيز خطة الأسبوع القادم</li>
          </ul>
        </Panel>
        <Panel title="ملاحظات مشتركة">
          <textarea className="student-textarea" rows={6} defaultValue="ركّز على تقسيم المكونات وتحسين أسماء المتغيرات." />
        </Panel>
      </div>
      <Panel title="المهام بعد الجلسة">
        <div className="student-card-list">
          {['تحديث صفحة المنتجات', 'رفع المشروع على GitHub', 'حجز جلسة متابعة'].map((task) => <label className="student-task" key={task}><input type="checkbox" /> {task}</label>)}
        </div>
      </Panel>
    </StudentPage>
  )
}

export function StudentCertificates() {
  return (
    <StudentPage title="الشهادات" eyebrow="شهاداتك المكتملة وقيد الإنجاز">
      <div className="student-certificate-grid">
        {['React وNext.js', 'تحليل البيانات', 'الأمن السيبراني'].map((c, i) => (
          <Panel key={c} className="student-certificate">
            <div className="student-certificate__frame">
              <span>ETRA</span>
              <strong>شهادة إتمام</strong>
              <small>{c}</small>
              <em>QR</em>
            </div>
            <div className="student-actions-row">
              <Button variant="secondary" size="sm">تحميل PDF</Button>
              <Button variant="ghost" size="sm">مشاركة</Button>
            </div>
            {i === 0 ? <Badge tone="success">مكتملة</Badge> : <Badge tone="brand">قيد الإنجاز</Badge>}
          </Panel>
        ))}
      </div>
    </StudentPage>
  )
}

export function StudentAchievements() {
  return (
    <StudentPage title="إنجازاتي" eyebrow="مستواك وشاراتك داخل إترا">
      <Panel className="student-achievement-hero">
        <Avatar name="أحمد المحمود" size="xl" />
        <div>
          <h2>أحمد المحمود</h2>
          <Badge tone="brand">المستوى: متوسط</Badge>
          <Progress value={62} />
          <p>١٬٢٥٠ / ٢٬٠٠٠ نقطة للوصول للمستوى القادم</p>
        </div>
      </Panel>
      <div className="student-stats-grid">
        {['الدورات المكتملة', 'الواجبات المسلمة', 'أيام متتالية', 'اختبارات ناجحة'].map((s, i) => <Panel className="student-stat" key={s}><strong>{['٣', '١٢', '٧', '٩'][i]}</strong><p>{s}</p></Panel>)}
      </div>
      <Panel title="الشارات">
        <div className="student-badges-grid">
          {['المثابر', 'صائد الأخطاء', 'متمكن React', 'محلل البيانات', 'مقفل: المشروع النهائي'].map((b) => <span key={b}>{b}</span>)}
        </div>
      </Panel>
      <Panel title="لوحة المتصدرين">
        <div className="student-leaderboard">
          {['نورة السبيعي · ٣٬٢٠٠', 'أحمد المحمود · ١٬٢٥٠', 'سارة الحربي · ١٬١٩٠'].map((r, i) => <div className={i === 1 ? 'is-you' : ''} key={r}><strong>{i + 1}</strong><span>{r}</span></div>)}
        </div>
      </Panel>
    </StudentPage>
  )
}

export function StudentCommunity() {
  return (
    <StudentPage title="المجتمع" eyebrow="نقاشات المتعلمين والمرشدين" action={<Button variant="primary">إنشاء موضوع جديد</Button>}>
      <div className="student-community-layout">
        <Panel title="الفئات">
          {['الكل', 'الأمن السيبراني', 'تطوير الويب', 'تحليل البيانات', 'تصميم UI/UX'].map((c) => <button className="student-category" type="button" key={c}>{c}</button>)}
        </Panel>
        <div className="student-card-list">
          {['كيف أختار أول مشروع؟', 'أفضل طريقة للتدرب على المقابلات التقنية', 'مصادر مفيدة لـ React'].map((p, i) => (
            <Panel key={p}>
              <div className="student-post-head"><Avatar name={i === 0 ? 'نورة' : 'فيصل'} size="sm" /><span>{i === 0 ? 'نورة · متعلمة' : 'فيصل · مرشد'} · منذ ساعة</span></div>
              <h3>{p}</h3>
              <p>نقاش مفتوح مع وسوم ومساحة لإضافة مقاطع كود وتجارب عملية.</p>
              <small>👍 ٢٣ · 💬 ٨ · مثبت</small>
            </Panel>
          ))}
        </div>
      </div>
    </StudentPage>
  )
}

export function StudentChat() {
  return (
    <StudentPage title="المحادثات" eyebrow="تواصل مباشر مع المرشدين والدعم">
      <div className="student-chat-layout">
        <Panel>
          <input className="student-search-input" placeholder="ابحث في المحادثات..." />
          {['م. خالد العتيبي', 'م. سارة الأحمدي', 'الدعم الفني'].map((n, i) => <div className={`student-conversation ${i === 0 ? 'is-active' : ''}`} key={n}><Avatar name={n} size="sm" /><div><strong>{n}</strong><span>آخر رسالة قبل {i + 1} ساعة</span></div></div>)}
        </Panel>
        <Panel className="student-thread">
          <div className="student-thread__head"><Avatar name="م. خالد" size="sm" /><strong>م. خالد العتيبي</strong><Badge tone="success">متصل</Badge></div>
          <div className="student-message is-received">أرسل لي نسخة GitHub وسأراجع تنظيم المكونات.</div>
          <div className="student-message is-sent">تمام، أضفت الرابط في الواجب.</div>
          <div className="student-thread__input"><input placeholder="اكتب رسالة..." /><Button variant="primary">إرسال</Button></div>
        </Panel>
      </div>
    </StudentPage>
  )
}

export function StudentNotifications() {
  return (
    <StudentPage title="الإشعارات" eyebrow="كل تحديثاتك في مكان واحد" action={<Button variant="ghost">تعليم الكل كمقروء</Button>}>
      <div className="student-tabs">
        {['الكل', 'غير مقروء', 'المهام', 'الجلسات', 'التقييمات'].map((t, i) => <button className={i === 0 ? 'is-active' : ''} type="button" key={t}>{t}</button>)}
      </div>
      <Panel title="اليوم">
        <div className="student-card-list">
          {notifications.map((n) => <div className="student-notification" key={n.text}><span>{n.icon}</span><div><strong>{n.text}</strong><small>{n.type} · {n.time}</small></div><i /></div>)}
        </div>
      </Panel>
    </StudentPage>
  )
}

export function StudentProfile() {
  return (
    <StudentPage title="الملف الشخصي" eyebrow="إعدادات الحساب والأمان">
      <div className="student-profile-layout">
        <Panel>
          {['المعلومات الشخصية', 'الأمان', 'الإشعارات', 'حساب Discord', 'المدفوعات'].map((t, i) => <button className={i === 0 ? 'is-active' : ''} type="button" key={t}>{t}</button>)}
        </Panel>
        <Panel title="المعلومات الشخصية">
          <div className="student-form-grid">
            <label>الاسم الكامل<input defaultValue="أحمد المحمود" /></label>
            <label>البريد الإلكتروني<input defaultValue="ahmad@etra.sa" /></label>
            <label>رقم الجوال<input defaultValue="+966 55 145 9985" /></label>
            <label>المدينة<input defaultValue="الرياض" /></label>
          </div>
          <label className="student-form-wide">نبذة مختصرة<textarea defaultValue="متعلم مهتم بتطوير الويب وبناء منتجات رقمية." /></label>
          <Button variant="primary">حفظ التغييرات</Button>
        </Panel>
      </div>
    </StudentPage>
  )
}

export function StudentSupport() {
  return (
    <StudentPage title="الدعم الفني" eyebrow="افتح تذكرة وتابع الردود" action={<Button variant="primary">فتح تذكرة جديدة</Button>}>
      <div className="student-layout">
        <Panel title="تذكرة جديدة">
          <div className="student-form-grid">
            <label>الموضوع<input placeholder="مثلاً: مشكلة في الفيديو" /></label>
            <label>التصنيف<select><option>تقني</option><option>فوترة</option><option>محتوى</option></select></label>
            <label>الأولوية<select><option>متوسطة</option><option>عالية</option><option>منخفضة</option></select></label>
          </div>
          <label className="student-form-wide">الوصف<textarea placeholder="اكتب تفاصيل المشكلة..." /></label>
          <Button variant="primary">إرسال التذكرة</Button>
        </Panel>
        <Panel title="تذاكري">
          <div className="student-card-list">
            {['١٠٢ · مشكلة في الفيديو · مفتوح', '٩٨ · استفسار فوترة · تم الحل'].map((t) => <div className="student-list-row" key={t}><span>{t}</span><Button size="sm" variant="ghost">عرض</Button></div>)}
          </div>
        </Panel>
      </div>
    </StudentPage>
  )
}
