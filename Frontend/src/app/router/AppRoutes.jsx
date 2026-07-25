// filepath: src/app/router/AppRoutes.jsx
// Route table. Public vs private routes, lazy loading, and layout selection.
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { PublicLayout } from '@/layouts/PublicLayout.jsx';
import { PrivateLayout } from '@/layouts/PrivateLayout.jsx';
import { ProtectedRoute } from '@/components/guards/ProtectedRoute.jsx';
import { RoleGuard } from '@/components/guards/RoleGuard.jsx';
import { Spinner } from '@/components/ui/Spinner.jsx';

// Lazy-loaded pages for code splitting and faster initial load
const LoginPage = lazy(() => import('@/pages/auth/LoginPage.jsx'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage.jsx'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage.jsx'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage.jsx'));
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage.jsx'));
const LeadsPage = lazy(() => import('@/pages/leads/LeadsPage.jsx'));
const CustomersPage = lazy(() => import('@/pages/customers/CustomersPage.jsx'));
const DealsPage = lazy(() => import('@/pages/deals/DealsPage.jsx'));
const TasksPage = lazy(() => import('@/pages/tasks/TasksPage.jsx'));
const ReportsPage = lazy(() => import('@/pages/reports/ReportsPage.jsx'));
const EmailsPage = lazy(() => import('@/pages/emails/EmailsPage.jsx'));
const UsersPage = lazy(() => import('@/pages/users/UsersPage.jsx'));
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage.jsx'));
const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage.jsx'));

export const AppRoutes = () => (
  <Suspense fallback={<Spinner fullScreen />}>
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Private routes (auth required) */}
      <Route element={<ProtectedRoute><PrivateLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/reports" element={<RoleGuard roles={['admin', 'manager']}><ReportsPage /></RoleGuard>} />
        <Route path="/emails" element={<EmailsPage />} />
        <Route path="/users" element={<RoleGuard roles={['admin']}><UsersPage /></RoleGuard>} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);
