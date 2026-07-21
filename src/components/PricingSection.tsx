import { useState } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { WHATSAPP_URL } from '../lib/contact'
import { useTranslation } from '../i18n/LanguageContext'

type Mode = 'project' | 'retainer'

export default function PricingSection() {
  const { t } = useTranslation()
  const [mode, setMode] = useState<Mode>('retainer')

  const plans = [
    {
      name: t('pricing.plan1.name'),
      tagline: t('pricing.plan1.tagline'),
      price: { project: '$490', retainer: '$190' },
      highlight: false,
      features: [t('pricing.feature1.plan1'), t('pricing.feature2.plan1'), t('pricing.feature3.plan1'), t('pricing.feature4.plan1')],
    },
    {
      name: t('pricing.plan2.name'),
      tagline: t('pricing.plan2.tagline'),
      price: { project: '$1,490', retainer: '$590' },
      highlight: true,
      features: [t('pricing.feature1.plan2'), t('pricing.feature2.plan2'), t('pricing.feature3.plan2'), t('pricing.feature4.plan2'), t('pricing.feature5.plan2')],
    },
    {
      name: t('pricing.plan3.name'),
      tagline: t('pricing.plan3.tagline'),
      price: { project: t('pricing.custom'), retainer: '$1,200' },
      highlight: false,
      features: [t('pricing.feature1.plan3'), t('pricing.feature2.plan3'), t('pricing.feature3.plan3'), t('pricing.feature4.plan3'), t('pricing.feature5.plan3')],
    },
  ]

  return (
    <section id="pricing" className="relative bg-ink py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-neon-violet/8 blur-[140px]" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="font-mono text-lime text-xs uppercase tracking-[0.2em]">{t('pricing.tag')}</span>
          <h2 className="font-display text-[2.1rem] sm:text-4xl md:text-5xl lg:text-6xl mt-4 text-balance text-white">
            {t('pricing.title.line1')} <span className="text-gradient">{t('pricing.title.line2')}</span>
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
                {m === 'retainer' ? t('pricing.toggle.retainer') : t('pricing.toggle.project')}
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
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col ${
                plan.highlight
                  ? 'glow-border bg-ink-card border border-neon-violet/30 md:-translate-y-3'
                  : 'bg-white/[0.02] border border-white/8'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-neon-violet to-neon-cyan text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                  {t('pricing.popular')}
                </span>
              )}
              <h3 className="font-display text-2xl text-white">{plan.name}</h3>
              <p className="text-white/40 text-xs mt-1">{plan.tagline}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl sm:text-5xl text-white">{plan.price[mode]}</span>
                {plan.price[mode] !== t('pricing.custom') && (
                  <span className="text-white/40 text-sm">{mode === 'retainer' ? t('pricing.perMonth') : t('pricing.once')}</span>
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
                {t('pricing.cta')}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
