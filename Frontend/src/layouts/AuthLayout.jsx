// filepath: src/layouts/AuthLayout.jsx
// Centered card layout for auth screens. Optional wrapper around PublicLayout for branding.
import { Outlet, Link } from 'react-router-dom';

export const AuthLayout = () => (
  <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
    <Link to="/" className="text-2xl font-bold text-center block mb-6">CRM</Link>
    <Outlet />
  </div>
);
