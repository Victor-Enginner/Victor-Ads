import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus } from 'lucide-react'
import { useTranslation } from '../i18n/LanguageContext'

export default function FaqSection() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<number | null>(0)

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
  ]

  return (
    <section id="faq" className="bg-ink-soft py-16 sm:py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="font-mono text-lime text-xs uppercase tracking-[0.2em]">{t('faq.tag')}</span>
          <h2 className="font-display text-[2.1rem] sm:text-4xl md:text-5xl mt-4 text-balance text-white">
            {t('faq.title.line1')} <span className="text-gradient">{t('faq.title.line2')}</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-colors ${
                  isOpen ? 'bg-ink-card border-white/15' : 'bg-white/[0.02] border-white/8'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg text-white">{faq.q}</span>
                  <Plus
                    size={18}
                    className={`text-white/40 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45 text-neon-violet' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/50 text-sm leading-relaxed px-6 pb-6">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
