// filepath: src/features/settings/tabs/IntegrationsTab.jsx
// Integrations Settings Tab — Third-party app integrations (Google, Slack, Zapier, HubSpot, Mailchimp, Stripe).
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Zap, Check, Plus, ExternalLink } from 'lucide-react';
import { cn } from '@/utils/cn.js';

const INITIAL_INTEGRATIONS = [
  {
    id: 'google',
    name: 'Google Workspace',
    category: 'Email & Calendar Sync',
    desc: 'Sync emails, Google Meet calls, and Google Calendar events automatically.',
    connected: true,
    iconBg: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
  },
  {
    id: 'slack',
    name: 'Slack Notifications',
    category: 'Team Communication',
    desc: 'Get real-time channel alerts when high-value deals are won.',
    connected: true,
    iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
  },
  {
    id: 'zapier',
    name: 'Zapier Automation',
    category: 'Workflow Automation',
    desc: 'Connect Acme CRM to 5,000+ web applications via automated Zaps.',
    connected: false,
    iconBg: 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
  },
  {
    id: 'stripe',
    name: 'Stripe Billing & Payments',
    category: 'Payment Processing',
    desc: 'Sync customer invoices, subscription statuses, and LTV revenue directly.',
    connected: true,
    iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400',
  },
  {
    id: 'hubspot',
    name: 'HubSpot Inbound Sync',
    category: 'Marketing Automation',
    desc: 'Import inbound contacts and marketing lead scores bi-directionally.',
    connected: false,
    iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp Campaigns',
    category: 'Email Marketing',
    desc: 'Sync customer segments directly to Mailchimp mailing lists.',
    connected: false,
    iconBg: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400',
  },
];

export const IntegrationsTab = () => {
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS);

  const toggleConnection = (id) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.connected;
          toast.success(
            nextState
              ? `${item.name} connected successfully!`
              : `${item.name} disconnected`
          );
          return { ...item, connected: nextState };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="ds-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
          <div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">
              Connected Apps & Integrations
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Automate data flow between Acme CRM and your enterprise tech stack
            </p>
          </div>

          <a
            href="#marketplace"
            onClick={(e) => {
              e.preventDefault();
              toast.success('Redirecting to Integration Marketplace...');
            }}
            className="ds-btn ds-btn-secondary text-xs h-9 px-4 gap-2 self-start sm:self-auto"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Browse Marketplace</span>
          </a>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {integrations.map((app) => (
            <div
              key={app.id}
              className="p-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] flex flex-col justify-between space-y-4 hover:border-brand-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center font-bold text-sm shrink-0',
                      app.iconBg
                    )}
                  >
                    {app.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--color-text-primary)]">
                      {app.name}
                    </h4>
                    <span className="text-[10px] text-[var(--color-text-muted)] font-medium">
                      {app.category}
                    </span>
                  </div>
                </div>

                <span
                  className={cn(
                    'ds-badge text-[10px] font-semibold',
                    app.connected ? 'ds-badge-success' : 'ds-badge-neutral'
                  )}
                >
                  {app.connected ? 'Connected' : 'Not Connected'}
                </span>
              </div>

              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {app.desc}
              </p>

              <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleConnection(app.id)}
                  className={cn(
                    'ds-btn text-xs h-8 px-3 gap-1.5',
                    app.connected ? 'ds-btn-secondary text-red-600' : 'ds-btn-primary'
                  )}
                >
                  {app.connected ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Disconnect</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Connect App</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
