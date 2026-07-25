// filepath: src/features/settings/tabs/NotificationsTab.jsx
// Notifications Settings Tab — Manage email alerts, in-app push notifications, and weekly summaries.
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Bell, Mail, Smartphone, Save, ShieldAlert } from 'lucide-react';

export const NotificationsTab = () => {
  const [toggles, setToggles] = useState({
    leadAssigned: true,
    dealStageChanged: true,
    taskDueReminders: true,
    customerMention: true,
    weeklyReport: true,
    marketingUpdates: false,
    pushDesktop: true,
    pushMobile: true,
  });

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    toast.success('Notification preferences updated!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Email Notifications */}
      <div className="ds-card p-6 space-y-4">
        <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3 flex items-center gap-2">
          <Mail className="w-4 h-4 text-brand-500" />
          <span>Email Notifications</span>
        </h4>

        <div className="space-y-3 divide-y divide-[var(--color-border)]">
          {[
            {
              key: 'leadAssigned',
              title: 'New Lead Assignment',
              desc: 'Receive an immediate email when a new lead is assigned to you.',
            },
            {
              key: 'dealStageChanged',
              title: 'Deal Stage Updates',
              desc: 'Get notified when a high-priority deal moves to a new pipeline stage.',
            },
            {
              key: 'taskDueReminders',
              title: 'Task & Meeting Due Reminders',
              desc: 'Receive reminders 30 minutes before scheduled meetings and task deadlines.',
            },
            {
              key: 'customerMention',
              title: 'Team Mentions & Notes',
              desc: 'Receive an email when a teammate mentions you in a customer note.',
            },
            {
              key: 'weeklyReport',
              title: 'Weekly Executive Sales Summary',
              desc: 'Receive an automated PDF summary of pipeline metrics every Monday morning.',
            },
            {
              key: 'marketingUpdates',
              title: 'Product News & Best Practices',
              desc: 'Tips, feature updates, and product webinars from Acme CRM.',
            },
          ].map((item) => (
            <div key={item.key} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                  {item.title}
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)]">{item.desc}</p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={toggles[item.key]}
                  onChange={() => handleToggle(item.key)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Push & Desktop Notifications */}
      <div className="ds-card p-6 space-y-4">
        <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3 flex items-center gap-2">
          <Bell className="w-4 h-4 text-purple-500" />
          <span>In-App & Push Notifications</span>
        </h4>

        <div className="space-y-3 divide-y divide-[var(--color-border)]">
          <div className="pt-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                Browser Desktop Notifications
              </p>
              <p className="text-[11px] text-[var(--color-text-muted)]">
                Show pop-up alerts on your desktop while browser is active.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={toggles.pushDesktop}
                onChange={() => handleToggle('pushDesktop')}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600" />
            </label>
          </div>

          <div className="pt-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                Mobile Push Alerts
              </p>
              <p className="text-[11px] text-[var(--color-text-muted)]">
                Send push alerts to connected iOS and Android mobile devices.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={toggles.pushMobile}
                onChange={() => handleToggle('pushMobile')}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600" />
            </label>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="ds-btn ds-btn-primary text-xs h-9 px-5 shadow-sm gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Notification Preferences</span>
        </button>
      </div>
    </div>
  );
};
