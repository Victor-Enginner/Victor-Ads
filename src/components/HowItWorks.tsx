import { motion } from 'motion/react'
import { Search, Cog, Rocket } from 'lucide-react'
import { useTranslation } from '../i18n/LanguageContext'

export default function HowItWorks() {
  const { t } = useTranslation()

  const steps = [
    {
      icon: Search,
      step: '01',
      title: t('process.step1.title'),
      desc: t('process.step1.desc'),
    },
    {
      icon: Cog,
      step: '02',
      title: t('process.step2.title'),
      desc: t('process.step2.desc'),
    },
    {
      icon: Rocket,
      step: '03',
      title: t('process.step3.title'),
      desc: t('process.step3.desc'),
    },
  ]

  const termLines = [
    { pfx: '$', cls: 'text-lime', txt: t('process.term.init') },
    { pfx: '→', cls: 'text-white/40', txt: t('process.term.mapping') },
    { pfx: '✓', cls: 'text-mint', txt: t('process.term.identified') },
    { pfx: '$', cls: 'text-lime', txt: t('process.term.build') },
    { pfx: '→', cls: 'text-white/40', txt: t('process.term.wiring') },
    { pfx: '✓', cls: 'text-mint', txt: t('process.term.deployed') },
    { pfx: '◇', cls: 'text-lime font-bold', txt: t('process.term.result') },
  ]

  return (
    <section id="process" className="relative bg-ink-soft py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="font-mono text-lime text-xs uppercase tracking-[0.2em]">{t('process.tag')}</span>
          <h2 className="font-display text-[2.1rem] sm:text-4xl md:text-5xl lg:text-6xl mt-4 text-balance text-white">
            {t('process.title.line1')} <span className="text-gradient">{t('process.title.line2')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">
          {/* Steps */}
          <div className="flex flex-col">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`flex gap-5 py-6 ${i !== steps.length - 1 ? 'border-b border-white/8' : ''}`}
              >
                <div className="w-11 h-11 rounded-xl bg-lime/10 border border-lime/25 flex items-center justify-center shrink-0">
                  <s.icon size={19} className="text-lime" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lime/70 text-xs">{s.step}</span>
                    <h3 className="font-display text-xl text-white">{s.title}</h3>
                  </div>
                  <p className="text-sm text-white/45 leading-relaxed mt-1.5">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-white/10 overflow-hidden bg-[#080d10]"
            style={{ boxShadow: '0 18px 60px rgba(0,0,0,0.45)' }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-white/[0.02]">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[12px] text-white/35">victor@studio : ~/automation</span>
            </div>
            {/* Body */}
            <div className="p-5 font-mono text-[13px] leading-[1.9] min-h-[280px]">
              {termLines.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.18 }}
                  className="flex items-baseline gap-3"
                >
                  <span className={`w-3.5 text-center shrink-0 ${l.cls}`}>{l.pfx}</span>
                  <span className={l.pfx === '◇' ? 'text-lime font-bold' : 'text-white/80'}>{l.txt}</span>
                </motion.div>
              ))}
              <div className="flex items-center gap-3 mt-1">
                <span className="w-3.5 text-center text-lime shrink-0">$</span>
                <span className="term-cursor" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
