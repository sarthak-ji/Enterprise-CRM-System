// filepath: src/pages/users/UsersPage.jsx
// Users management module — placeholder page until full implementation.
import { UserCog } from 'lucide-react';

const UsersPage = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-[var(--shadow-glow)]">
      <UserCog className="w-8 h-8 text-white" strokeWidth={1.5} />
    </div>
    <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Users</h2>
    <p className="text-sm text-[var(--color-text-muted)] max-w-sm text-center">
      Manage team members, roles, and permissions. Admin access required.
    </p>
  </div>
);

export default UsersPage;
