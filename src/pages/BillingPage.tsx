import { useSubscriptions } from '../hooks/useSubscriptions';
import { CreditCard, Crown, Zap, Check, Loader2 } from 'lucide-react';

const plans = [
  { id: 'starter', name: 'Starter', price: 29, messages: 1000, features: ['1000 messages/month', '1 user', 'Basic support', 'WhatsApp integration'] },
  { id: 'pro', name: 'Pro', price: 99, messages: 10000, features: ['10,000 messages/month', '5 users', 'Priority support', 'AI assistant', 'Analytics'] },
  { id: 'enterprise', name: 'Enterprise', price: 299, messages: 50000, features: ['50,000 messages/month', 'Unlimited users', '24/7 support', 'Custom AI training', 'API access', 'Dedicated server'] },
];

export default function BillingPage() {
  const { subscription, loading } = useSubscriptions();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-white/40" />
      </div>
    );
  }

  const currentPlan = subscription?.plan || 'starter';

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-white text-xl font-semibold">Billing & Plans</h1>
        <p className="text-white/40 text-sm mt-1">
          Manage your subscription and billing
        </p>
      </div>

      {/* Current Plan */}
      <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Current Plan</p>
            <p className="text-white text-lg font-medium">{plans.find(p => p.id === currentPlan)?.name || 'Starter'}</p>
            {subscription && (
              <p className="text-white/30 text-xs mt-1">
                {subscription.messagesUsed} / {subscription.messageLimit} messages used
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-white text-2xl font-askan">${plans.find(p => p.id === currentPlan)?.price}</p>
            <p className="text-white/30 text-xs">/month</p>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.id;
          return (
            <div
              key={plan.id}
              className={`p-5 rounded-2xl border transition-colors ${
                isCurrent
                  ? 'bg-white/10 border-white/20'
                  : 'bg-white/5 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">{plan.name}</h3>
                {isCurrent && (
                  <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                    <Check size={10} />
                    Active
                  </span>
                )}
              </div>

              <div className="mb-4">
                <span className="text-3xl font-askan text-white">${plan.price}</span>
                <span className="text-white/30 text-sm">/month</span>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                    <Check size={12} className="mt-0.5 shrink-0 text-white/40" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                disabled={isCurrent}
                className={`w-full py-2 rounded-xl text-xs font-medium transition-colors ${
                  isCurrent
                    ? 'bg-white/10 text-white/40 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-white/90'
                }`}
              >
                {isCurrent ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}