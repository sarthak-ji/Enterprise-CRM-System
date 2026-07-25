// filepath: src/pages/emails/EmailsPage.jsx
// Emails module — placeholder page until full implementation.
import { Mail } from 'lucide-react';

const EmailsPage = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-[var(--shadow-glow)]">
      <Mail className="w-8 h-8 text-white" strokeWidth={1.5} />
    </div>
    <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Emails</h2>
    <p className="text-sm text-[var(--color-text-muted)] max-w-sm text-center">
      Manage email campaigns, templates, and inbox integrations. Coming soon.
    </p>
  </div>
);

export default EmailsPage;
