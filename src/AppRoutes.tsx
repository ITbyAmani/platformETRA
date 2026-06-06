import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from './layouts/DashboardLayout'
import { PublicLayout } from './layouts/PublicLayout'
import {
  AboutPage,
  AmbassadorJoinPage,
  BlogDetailPage,
  BlogListPage,
  CartPage,
  CreatorsGatePage,
  LandingPage,
  LoginPage,
  MentorJoinPage,
  PricingPage,
  ProjectConsultingGatePage,
  RegisterPage,
  ResetPasswordPage,
} from './pages/publicScreens'
import { StoreProductsPage, StoreSubscriptionsPage } from './pages/storePublicPages'
import {
  AmbassadorAnalytics,
  AmbassadorEarnings,
  AmbassadorHome,
  AmbassadorLinks,
  AmbassadorProfile,
} from './pages/ambassadorScreens'
import {
  AdminAmbassadorDetail,
  AdminAnnouncements,
  AdminContentModeration,
  AdminEmailBroadcast,
  AdminFinance,
  AdminHome,
  AdminInternalChat,
  AdminInternalFiles,
  AdminMentorDetail,
  AdminPlatformSettings,
  AdminPayouts,
  AdminReports,
  AdminStudentDetail,
  AdminSupportTickets,
  AdminTracks,
  AdminTransactions,
  AdminUsers,
  AdminWordFilters,
} from './pages/adminScreens'
import { AdminPortalPage } from './pages/adminPortal'
import {
  MentorAssignments,
  MentorCertificates,
  MentorContentEditor,
  MentorEarnings,
  MentorHome,
  MentorProfile,
  MentorQuizBuilder,
  MentorSessionNotes,
  MentorSessions,
  MentorStudentDetail,
  MentorStudents,
} from './pages/mentorScreens'
import {
  StudentAchievements,
  StudentAssignmentDetail,
  StudentAssignments,
  StudentCertificates,
  StudentChat,
  StudentCodePlayground,
  StudentCommunity,
  StudentCourses,
  StudentHome,
  StudentLiveSessions,
  StudentNotifications,
  StudentProfile,
  StudentProgressMap,
  StudentQuiz,
  StudentSessionDetail,
  StudentSessionsCalendar,
  StudentSupport,
  StudentVideoLesson,
} from './pages/studentScreens'
import { Error500Page, MaintenancePage, NotFoundPage, UiStatesGalleryPage } from './pages/sharedScreens'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="ambassador-join" element={<AmbassadorJoinPage />} />
        <Route path="mentor-join" element={<MentorJoinPage />} />
        <Route path="creators-gate" element={<CreatorsGatePage />} />
        <Route path="project-consulting-gate" element={<ProjectConsultingGatePage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="store" element={<Navigate to="/store/products" replace />} />
        <Route path="store/subscriptions" element={<StoreSubscriptionsPage />} />
        <Route path="store/products" element={<StoreProductsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="blog" element={<BlogListPage />} />
        <Route path="blog/:slug" element={<BlogDetailPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="dev/ui-states" element={<UiStatesGalleryPage />} />

        <Route path="student" element={<DashboardLayout />}>
          <Route index element={<StudentHome />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="learn/video" element={<StudentVideoLesson />} />
          <Route path="learn/code" element={<StudentCodePlayground />} />
          <Route path="quiz" element={<StudentQuiz />} />
          <Route path="live-sessions" element={<StudentLiveSessions />} />
          <Route path="progress-map" element={<StudentProgressMap />} />
          <Route path="assignments" element={<StudentAssignments />} />
          <Route path="assignments/:id" element={<StudentAssignmentDetail />} />
          <Route path="sessions-calendar" element={<StudentSessionsCalendar />} />
          <Route path="sessions/:id" element={<StudentSessionDetail />} />
          <Route path="certificates" element={<StudentCertificates />} />
          <Route path="achievements" element={<StudentAchievements />} />
          <Route path="community" element={<StudentCommunity />} />
          <Route path="chat" element={<StudentChat />} />
          <Route path="notifications" element={<StudentNotifications />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="support" element={<StudentSupport />} />
        </Route>

        <Route path="mentor" element={<DashboardLayout />}>
          <Route index element={<MentorHome />} />
          <Route path="students" element={<MentorStudents />} />
          <Route path="students/:id" element={<MentorStudentDetail />} />
          <Route path="content" element={<MentorContentEditor />} />
          <Route path="quizzes" element={<MentorQuizBuilder />} />
          <Route path="sessions" element={<MentorSessions />} />
          <Route path="session-notes" element={<MentorSessionNotes />} />
          <Route path="assignments" element={<MentorAssignments />} />
          <Route path="certificates" element={<MentorCertificates />} />
          <Route path="earnings" element={<MentorEarnings />} />
          <Route path="profile" element={<MentorProfile />} />
        </Route>

        <Route path="ambassador" element={<DashboardLayout />}>
          <Route index element={<AmbassadorHome />} />
          <Route path="links" element={<AmbassadorLinks />} />
          <Route path="analytics" element={<AmbassadorAnalytics />} />
          <Route path="earnings" element={<AmbassadorEarnings />} />
          <Route path="profile" element={<AmbassadorProfile />} />
        </Route>

        <Route path="admin" element={<DashboardLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="finance" element={<AdminFinance />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="payouts" element={<AdminPayouts />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/students/:id" element={<AdminStudentDetail />} />
          <Route path="users/mentors/:id" element={<AdminMentorDetail />} />
          <Route path="users/ambassadors/:id" element={<AdminAmbassadorDetail />} />
          <Route path="content" element={<AdminContentModeration />} />
          <Route path="word-filters" element={<AdminWordFilters />} />
          <Route path="chat" element={<AdminInternalChat />} />
          <Route path="email" element={<AdminEmailBroadcast />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="files" element={<AdminInternalFiles />} />
          <Route path="support" element={<AdminSupportTickets />} />
          <Route path="settings" element={<AdminPlatformSettings />} />
          <Route path="tracks" element={<AdminTracks />} />
        </Route>
      </Route>

      <Route path="maintenance" element={<MaintenancePage />} />
      <Route path="admin-portal" element={<AdminPortalPage />} />
      <Route path="500" element={<Error500Page />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
