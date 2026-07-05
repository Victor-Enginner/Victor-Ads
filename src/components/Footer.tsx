import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import { WHATSAPP_URL, PHONE_DISPLAY } from '../lib/contact'
import { useTranslation } from '../i18n/LanguageContext'

const socials = [
  { icon: Instagram, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Github, href: '#' },
]

export default function Footer() {
  const { t } = useTranslation()

  const nav = [
    { label: t('footer.nav.services'), href: '#services' },
    { label: t('footer.nav.process'), href: '#process' },
    { label: t('footer.nav.work'), href: '#work' },
    { label: t('footer.nav.pricing'), href: '#pricing' },
    { label: t('footer.nav.faq'), href: '#faq' },
  ]

  return (
    <footer className="bg-ink border-t border-white/8 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-violet to-neon-cyan flex items-center justify-center">
                <span className="font-display text-white text-sm">V</span>
              </div>
              <span className="font-display text-xl text-white">Victor Ads</span>
            </div>
            <p className="text-white/40 text-sm mt-4 leading-relaxed">
              {t('footer.brand.desc')}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-colors"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="flex gap-16">
            <div>
              <p className="text-white/30 text-[11px] uppercase tracking-wider mb-4">{t('footer.nav.title')}</p>
              <ul className="space-y-3">
                {nav.map((n) => (
                  <li key={n.label}>
                    <a href={n.href} className="text-white/55 text-sm hover:text-white transition-colors">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white/30 text-[11px] uppercase tracking-wider mb-4">{t('footer.contact.title')}</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/55 text-sm hover:text-lime transition-colors"
                  >
                    {t('footer.contact.whatsapp', { phone: PHONE_DISPLAY })}
                  </a>
                </li>
                <li>
                  <a href="mailto:shoponsup@gmail.com" className="text-white/55 text-sm hover:text-white transition-colors">
                    {t('footer.contact.email')}
                  </a>
                </li>
                <li>
                  <a href="/login" className="text-white/55 text-sm hover:text-white transition-colors">
                    {t('footer.contact.login')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">{t('footer.copyright')}</p>
          <p className="text-white/25 text-xs">{t('footer.tagline')}</p>
        </div>
      </div>
    </footer>
  )
}
