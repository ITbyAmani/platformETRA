import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import { Container } from '../components/Container/Container'
import { EmptyState } from '../components/EmptyState/EmptyState'
import { Skeleton } from '../components/Skeleton/Skeleton'

export function NotFoundPage() {
  return (
    <Container style={{ paddingBlock: 80, textAlign: 'center' }}>
      <div style={{ fontSize: 120, opacity: 0.15, color: 'var(--color-primary)' }}>٤٠٤</div>
      <h1 className="etra-h1" style={{ marginTop: 16 }}>
        الصفحة غير موجودة
      </h1>
      <p className="etra-body" style={{ marginTop: 12 }}>
        الرابط غير صحيح أو أُزيلت الصفحة.
      </p>
      <Button to="/" variant="primary" style={{ marginTop: 24 }}>
        العودة للرئيسية
      </Button>
    </Container>
  )
}

export function Error500Page() {
  return (
    <Container style={{ paddingBlock: 80, textAlign: 'center' }}>
      <h1 className="etra-h1">٥٠٠ — حدث خطأ غير متوقع</h1>
      <p className="etra-body" style={{ marginTop: 12 }}>
        نحن نعمل على حله، يرجى المحاولة لاحقاً.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
        <Button variant="primary" onClick={() => window.location.reload()}>
          حاول مجدداً
        </Button>
        <Button to="/" variant="secondary">
          تواصل معنا
        </Button>
      </div>
    </Container>
  )
}

export function MaintenancePage() {
  return (
    <Container style={{ paddingBlock: 100, textAlign: 'center' }}>
      <h1 className="etra-h2">المنصة تحت الصيانة</h1>
      <p className="etra-body" style={{ marginTop: 12 }}>
        سنعود قريباً — العد التنازلي (نموذج): ٠١:٥٩:٤٥
      </p>
    </Container>
  )
}

export function UiStatesGalleryPage() {
  return (
    <Container style={{ paddingBlock: 40 }}>
      <h1 className="etra-h2">معرض حالات الواجهة (E-4 / E-5)</h1>
      <h2 className="etra-h3" style={{ marginTop: 32 }}>
        Skeleton (E-4)
      </h2>
      <div className="etra-skeleton-grid" style={{ marginTop: 16 }}>
        <Card>
          <div className="etra-skeleton-row">
            <Skeleton variant="avatar" />
            <div style={{ flex: 1 }}>
              <Skeleton variant="title" />
              <Skeleton variant="text" style={{ marginTop: 8 }} />
              <Skeleton variant="text" style={{ marginTop: 8, width: '80%' }} />
            </div>
          </div>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="dash-grid-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <Skeleton variant="image" />
              <Skeleton variant="text" style={{ marginTop: 12 }} />
              <Skeleton variant="text" style={{ marginTop: 8, width: '60%' }} />
            </Card>
          ))}
        </div>
      </div>
      <h2 className="etra-h3" style={{ marginTop: 48 }}>
        Empty states (E-5)
      </h2>
      <div style={{ display: 'grid', gap: 24, marginTop: 16 }}>
        <Card>
          <EmptyState
            icon="📚"
            title="لم تنضم لأي دورة بعد"
            description="استكشف المتجر واختر أول مسار لك."
            action={<Button to="/store/products" variant="primary">تصفح المتجر</Button>}
          />
        </Card>
        <Card>
          <EmptyState icon="📝" title="لا واجبات معلقة — أحسنت!" />
        </Card>
        <Card>
          <EmptyState icon="🔔" title="أنت على اطلاع بكل شيء ✓" />
        </Card>
        <Card>
          <EmptyState
            icon="💬"
            title="لا رسائل بعد"
            action={<Button to="/student/chat" variant="secondary">ابدأ محادثة</Button>}
          />
        </Card>
        <Card>
          <EmptyState icon="🔎" title={`لا نتائج لـ «React»`} action={<Button variant="ghost">مسح البحث</Button>} />
        </Card>
      </div>
    </Container>
  )
}
