import { Check, Zap, Download, CreditCard } from 'lucide-react';

interface UsageMeter {
  label: string;
  used: number;
  limit: number;
  unit: string;
}

const usage: UsageMeter[] = [
  { label: 'Messages', used: 1840, limit: 5000, unit: '' },
  { label: 'Contacts', used: 320, limit: 1000, unit: '' },
  { label: 'Knowledge docs', used: 5, limit: 25, unit: '' },
];

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    current: false,
    features: ['1,000 messages / mo', '100 contacts', '5 knowledge docs', 'Web chat only'],
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/mo',
    current: true,
    features: ['5,000 messages / mo', '1,000 contacts', '25 knowledge docs', 'WhatsApp + Instagram', 'Appointment reminders'],
  },
  {
    name: 'Scale',
    price: '$149',
    period: '/mo',
    current: false,
    features: ['Unlimited messages', 'Unlimited contacts', 'Unlimited docs', 'All channels', 'Priority support', 'Custom AI persona'],
  },
];

const invoices = [
  { id: 'INV-0007', date: 'Jun 1, 2026', amount: '$49.00', status: 'Paid' },
  { id: 'INV-0006', date: 'May 1, 2026', amount: '$49.00', status: 'Paid' },
  { id: 'INV-0005', date: 'Apr 1, 2026', amount: '$49.00', status: 'Paid' },
];

export default function BillingPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-askan text-white">Billing</h1>
        <p className="text-white/40 text-sm mt-1">Manage your plan and usage</p>
      </div>

      {/* Current plan + usage */}
      <div className="bg-gradient-to-br from-brand-green/10 to-white/[0.02] border border-brand-green/20 rounded-2xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-askan text-xl">Pro plan</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-green/20 text-brand-green">Current</span>
            </div>
            <p className="text-white/40 text-xs mt-1">Renews Jul 1, 2026 · $49/mo</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-medium rounded-xl hover:bg-white/90 transition-colors">
            <Zap size={14} />
            Upgrade plan
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
          {usage.map((m) => {
            const pct = Math.min(100, Math.round((m.used / m.limit) * 100));
            return (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-xs">{m.label}</span>
                  <span className="text-white/40 text-[11px]">{m.used.toLocaleString()} / {m.limit.toLocaleString()}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${pct > 85 ? 'bg-red-400' : 'bg-brand-green'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Plans */}
      <div>
        <h3 className="text-white text-sm font-medium mb-4">Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 border transition-colors ${
                plan.current
                  ? 'bg-brand-green/[0.07] border-brand-green/30'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{plan.name}</span>
                {plan.current && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-green/20 text-brand-green">Current</span>
                )}
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-askan text-white">{plan.price}</span>
                <span className="text-white/30 text-xs">{plan.period}</span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-white/60 text-xs">
                    <Check size={13} className="text-brand-green shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                disabled={plan.current}
                className={`w-full mt-6 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  plan.current
                    ? 'bg-white/5 text-white/30 cursor-default'
                    : 'bg-white text-black hover:bg-white/90'
                }`}
              >
                {plan.current ? 'Current plan' : `Switch to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment method + invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          <h3 className="text-white text-sm font-medium mb-4">Payment method</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <CreditCard size={18} className="text-white/50" />
            </div>
            <div>
              <p className="text-white text-xs">Visa ending 4242</p>
              <p className="text-white/30 text-[10px]">Expires 09/27</p>
            </div>
          </div>
          <button className="w-full mt-5 py-2 rounded-xl text-xs text-white/50 bg-white/5 hover:bg-white/10 transition-colors">
            Update card
          </button>
        </div>

        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          <h3 className="text-white text-sm font-medium mb-4">Billing history</h3>
          <div className="divide-y divide-white/5">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-white text-xs">{inv.id}</p>
                  <p className="text-white/30 text-[10px]">{inv.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-green/15 text-brand-green">{inv.status}</span>
                  <span className="text-white/60 text-xs">{inv.amount}</span>
                  <button className="text-white/30 hover:text-white/70 transition-colors">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
