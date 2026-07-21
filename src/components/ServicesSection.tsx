import { motion } from 'motion/react'
import { Workflow, Sparkles, Bot, LineChart, Mic, ArrowUpRight } from 'lucide-react'
import { useTranslation } from '../i18n/LanguageContext'

export default function ServicesSection() {
  const { t } = useTranslation()

  const cards = [
    {
      icon: Workflow,
      title: t('services.card1.title'),
      desc: t('services.card1.desc'),
      span: 'md:col-span-2 md:row-span-2',
      big: true,
    },
    {
      icon: Bot,
      title: t('services.card2.title'),
      desc: t('services.card2.desc'),
      span: '',
    },
    {
      icon: Sparkles,
      title: t('services.card3.title'),
      desc: t('services.card3.desc'),
      span: '',
    },
    {
      icon: LineChart,
      title: t('services.card4.title'),
      desc: t('services.card4.desc'),
      span: '',
    },
    {
      icon: Mic,
      title: t('services.card5.title'),
      desc: t('services.card5.desc'),
      span: '',
    },
  ]

  return (
    <section id="services" className="relative bg-ink py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-neon-violet/10 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16 max-w-2xl"
        >
          <span className="font-mono text-lime text-xs uppercase tracking-[0.2em]">{t('services.tag')}</span>
          <h2 className="font-display text-[2.1rem] sm:text-4xl md:text-5xl lg:text-6xl mt-4 text-balance text-white leading-[1.05]">
            {t('services.title.line1')}<br />
            <span className="text-gradient">{t('services.title.line2')}</span>
          </h2>
        </motion.div>

        {/* Fixed 200px rows only from md up — on a phone the single column has to
            grow with its text, otherwise the descriptions get clipped. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[200px]">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`glow-border group relative rounded-2xl bg-ink-card border border-white/8 p-6 sm:p-7 flex flex-col justify-between gap-8 md:gap-4 overflow-hidden ${card.span}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-start justify-between">
                <div className={`rounded-xl bg-gradient-to-br from-neon-violet/20 to-neon-cyan/10 flex items-center justify-center ${card.big ? 'w-14 h-14' : 'w-11 h-11'}`}>
                  <card.icon size={card.big ? 26 : 20} className="text-neon-violet" />
                </div>
                <ArrowUpRight size={18} className="text-white/20 group-hover:text-white/60 group-hover:rotate-45 transition-all" />
              </div>
              <div className="relative">
                <h3 className={`font-display text-white mb-2 ${card.big ? 'text-3xl' : 'text-xl'}`}>
                  {card.title}
                </h3>
                <p className={`text-white/45 leading-relaxed ${card.big ? 'text-base max-w-md' : 'text-sm'}`}>
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
