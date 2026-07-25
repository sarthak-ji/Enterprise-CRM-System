// filepath: src/features/settings/tabs/BillingTab.jsx
// Billing & Subscription Tab — Active plan, team seat progress, payment methods, invoice history.
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { CreditCard, Download, Zap, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge.jsx';

export const BillingTab = () => {
  const [invoices] = useState([
    {
      id: 'INV-2026-007',
      date: 'Jul 01, 2026',
      amount: '$299.00',
      status: 'Paid',
      plan: 'Enterprise Annual (25 seats)',
    },
    {
      id: 'INV-2026-006',
      date: 'Jun 01, 2026',
      amount: '$299.00',
      status: 'Paid',
      plan: 'Enterprise Annual (25 seats)',
    },
    {
      id: 'INV-2026-005',
      date: 'May 01, 2026',
      amount: '$299.00',
      status: 'Paid',
      plan: 'Enterprise Annual (25 seats)',
    },
  ]);

  const seatsUsed = 18;
  const seatsTotal = 25;
  const seatPercentage = Math.round((seatsUsed / seatsTotal) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Current Subscription Plan Card */}
      <div className="ds-card p-6 bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-950 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-accent-300">
              <Zap className="w-3.5 h-3.5" />
              <span>Active Subscription</span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white">
              Enterprise Plan ($299 / month)
            </h3>

            <p className="text-xs text-brand-100/90 max-w-md">
              Unlimited pipeline deals, advanced Recharts analytics, 24/7 priority support, and custom API webhooks.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={() => toast.success('Subscription plan change requested!')}
              className="ds-btn bg-white text-brand-700 hover:bg-brand-50 text-xs font-bold h-9 px-4 shadow-sm"
            >
              Upgrade Plan
            </button>
            <button
              type="button"
              onClick={() => toast.success('Managing seats...')}
              className="ds-btn bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-medium h-8 px-3"
            >
              Add Team Seats
            </button>
          </div>
        </div>

        {/* Team Seats Usage Bar */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/15 space-y-2">
          <div className="flex items-center justify-between text-xs text-brand-100 font-medium">
            <span>
              Team Seats Used: <strong className="text-white">{seatsUsed}</strong> of {seatsTotal} seats
            </span>
            <span>{seatPercentage}% allocated</span>
          </div>

          <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-400 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${seatPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Payment Method & Billing Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Method */}
        <div className="ds-card p-6 space-y-4">
          <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-brand-500" />
            <span>Payment Method</span>
          </h4>

          <div className="p-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                VISA
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--color-text-primary)]">
                  Visa ending in 4242
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)]">Expires 08/2028</p>
              </div>
            </div>

            <Badge tone="success" size="sm">
              Primary
            </Badge>
          </div>

          <button
            type="button"
            onClick={() => toast.success('Payment method updated!')}
            className="ds-btn ds-btn-secondary text-xs h-8 px-3"
          >
            Update Payment Method
          </button>
        </div>

        {/* Billing Info */}
        <div className="ds-card p-6 space-y-4">
          <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Billing Contact</span>
          </h4>

          <div className="text-xs space-y-1.5 text-[var(--color-text-secondary)]">
            <p>
              <strong className="text-[var(--color-text-primary)]">Acme Global Technologies</strong>
            </p>
            <p>Billing Email: billing@acmeglobal.com</p>
            <p>Tax Registration: US-987654321-VAT</p>
            <p>Next billing date: August 1, 2026</p>
          </div>

          <button
            type="button"
            onClick={() => toast.success('Billing contact updated')}
            className="ds-btn ds-btn-secondary text-xs h-8 px-3"
          >
            Edit Billing Contact
          </button>
        </div>
      </div>

      {/* Invoice History Table */}
      <div className="ds-card overflow-hidden">
        <div className="p-5 border-b border-[var(--color-border)]">
          <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
            Invoice History
          </h4>
          <p className="text-xs text-[var(--color-text-muted)]">
            Download PDF receipts for past monthly subscriptions
          </p>
        </div>

        <div className="ds-table-wrapper border-none shadow-none">
          <table className="ds-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Billing Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="text-right">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="font-bold text-xs text-[var(--color-text-primary)]">
                    {inv.id}
                  </td>
                  <td className="text-xs text-[var(--color-text-muted)]">{inv.date}</td>
                  <td className="text-xs text-[var(--color-text-secondary)]">{inv.plan}</td>
                  <td className="font-bold text-xs text-[var(--color-text-primary)]">
                    {inv.amount}
                  </td>
                  <td>
                    <Badge tone="success" dot size="sm">
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="text-right">
                    <button
                      type="button"
                      onClick={() => toast.success(`Downloaded receipt ${inv.id}`)}
                      className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-brand-600 transition-colors inline-flex items-center gap-1 text-xs"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
