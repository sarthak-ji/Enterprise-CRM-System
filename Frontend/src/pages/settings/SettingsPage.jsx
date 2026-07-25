// filepath: src/pages/settings/SettingsPage.jsx
// Complete CRM Settings Page orchestrating all 7 settings tabs with a responsive tab layout.
import { useState } from 'react';
import { User, Building2, Bell, Shield, Palette, Zap, CreditCard } from 'lucide-react';
import { ProfileTab } from '@/features/settings/tabs/ProfileTab.jsx';
import { CompanyTab } from '@/features/settings/tabs/CompanyTab.jsx';
import { NotificationsTab } from '@/features/settings/tabs/NotificationsTab.jsx';
import { SecurityTab } from '@/features/settings/tabs/SecurityTab.jsx';
import { AppearanceTab } from '@/features/settings/tabs/AppearanceTab.jsx';
import { IntegrationsTab } from '@/features/settings/tabs/IntegrationsTab.jsx';
import { BillingTab } from '@/features/settings/tabs/BillingTab.jsx';
import { cn } from '@/utils/cn.js';

const SETTINGS_TABS = [
  { id: 'profile', label: 'Profile', icon: User, desc: 'Personal account details & avatar' },
  { id: 'company', label: 'Company', icon: Building2, desc: 'Organization profile & currency' },
  { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Email alerts & push preferences' },
  { id: 'security', label: 'Security', icon: Shield, desc: 'Password, 2FA & active sessions' },
  { id: 'appearance', label: 'Appearance', icon: Palette, desc: 'Theme mode & display density' },
  { id: 'integrations', label: 'Integrations', icon: Zap, desc: 'Connected third-party SaaS apps' },
  { id: 'billing', label: 'Billing', icon: CreditCard, desc: 'Plan subscription & invoices' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'company':
        return <CompanyTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'security':
        return <SecurityTab />;
      case 'appearance':
        return <AppearanceTab />;
      case 'integrations':
        return <IntegrationsTab />;
      case 'billing':
        return <BillingTab />;
      case 'profile':
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Account Settings
        </h1>
        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
          Manage your personal profile, company preferences, security, and integrations
        </p>
      </div>

      {/* Main Settings Layout: Tab Navigation + Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation Tabs */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="ds-card p-2 space-y-1 sticky top-20">
            {SETTINGS_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-[var(--radius-md)] text-left transition-all duration-150',
                    isActive
                      ? 'bg-brand-600 text-white font-semibold shadow-sm'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)] font-medium'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-4 h-4 shrink-0',
                      isActive ? 'text-white' : 'text-[var(--color-text-muted)]'
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs truncate">{tab.label}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="flex-1 min-w-0">{renderActiveTabContent()}</div>
      </div>
    </div>
  );
}
