import { useState } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { WHATSAPP_URL } from '../lib/contact'

type Mode = 'project' | 'retainer'

const plans = [
  {
    name: 'Starter',
    tagline: 'One workflow, fully automated',
    price: { project: '$490', retainer: '$190' },
    highlight: false,
    features: ['1 automation built', 'Up to 3 tools connected', 'Documentation included', '14 days of support'],
  },
  {
    name: 'Growth System',
    tagline: 'A full AI operation for your business',
    price: { project: '$1,490', retainer: '$590' },
    highlight: true,
    features: ['Up to 5 automations', 'AI chatbot setup', 'Content generation flow', 'Monitoring & tweaks', 'Priority support'],
  },
  {
    name: 'Partner',
    tagline: 'I become your automation team',
    price: { project: 'Custom', retainer: '$1,200' },
    highlight: false,
    features: ['Unlimited automations', 'Dedicated strategy calls', 'Custom AI integrations', 'Same-day support', 'Quarterly roadmap'],
  },
]

export default function PricingSection() {
  const [mode, setMode] = useState<Mode>('retainer')

  return (
    <section id="pricing" className="relative bg-ink py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-neon-violet/8 blur-[140px]" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="font-mono text-lime text-xs uppercase tracking-[0.2em]">Pricing</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 text-white">
            Invest once, <span className="text-gradient">save forever</span>
          </h2>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-14">
          <div className="relative flex items-center bg-ink-card border border-white/10 rounded-full p-1">
            {(['retainer', 'project'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative z-10 px-5 py-2 rounded-full text-xs font-medium transition-colors ${
                  mode === m ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {m === 'retainer' ? 'Monthly retainer' : 'One-off project'}
              </button>
            ))}
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className="absolute inset-y-1 w-[calc(50%-2px)] rounded-full bg-gradient-to-r from-neon-violet to-neon-indigo"
              style={{ left: mode === 'retainer' ? 4 : '50%' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 flex flex-col ${
                plan.highlight
                  ? 'glow-border bg-ink-card border border-neon-violet/30 md:-translate-y-3'
                  : 'bg-white/[0.02] border border-white/8'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-neon-violet to-neon-cyan text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-2xl text-white">{plan.name}</h3>
              <p className="text-white/40 text-xs mt-1">{plan.tagline}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl text-white">{plan.price[mode]}</span>
                {plan.price[mode] !== 'Custom' && (
                  <span className="text-white/40 text-sm">{mode === 'retainer' ? '/mo' : ' once'}</span>
                )}
              </div>
              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/65">
                    <Check size={15} className="text-neon-cyan shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 text-center text-sm font-medium py-3 rounded-full transition-colors ${
                  plan.highlight
                    ? 'bg-white text-ink hover:bg-white/90'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                Get started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
