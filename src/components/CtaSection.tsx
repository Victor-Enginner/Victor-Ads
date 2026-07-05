import { motion } from 'motion/react'
import { ArrowRight, Mail } from 'lucide-react'
import { WHATSAPP_URL } from '../lib/contact'
import { useTranslation } from '../i18n/LanguageContext'

export default function CtaSection() {
  const { t } = useTranslation()
  return (
    <section id="contact" className="relative bg-ink py-24 md:py-36 overflow-hidden">
      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[420px] h-[420px] rounded-full bg-neon-violet/25 blur-[130px] animate-aurora" />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-neon-cyan/20 blur-[130px] animate-aurora" style={{ animationDelay: '-9s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-3xl mx-auto px-4 md:px-8 text-center"
      >
        <span className="font-mono text-lime text-xs uppercase tracking-[0.2em]">{t('cta.tag')}</span>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl mt-5 text-white leading-[1.05]">
          {t('cta.title.line1')}<br />
          <span className="text-gradient">{t('cta.title.line2')}</span>
        </h2>
        <p className="text-white/50 text-base md:text-lg mt-6 max-w-xl mx-auto">
          {t('cta.subtitle')}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine group inline-flex items-center gap-2 bg-lime text-ink font-bold text-sm px-7 py-3.5 rounded-full hover:brightness-110 transition-all"
            style={{ boxShadow: '0 0 34px rgba(158,255,0,0.3)' }}
          >
            {t('cta.cta.audit')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="mailto:shoponsup@gmail.com"
            className="inline-flex items-center gap-2 border border-white/15 text-white/80 text-sm px-7 py-3.5 rounded-full hover:bg-white/5 transition-colors"
          >
            <Mail size={15} />
            {t('cta.cta.email')}
          </a>
        </div>
      </motion.div>
    </section>
  )
}
