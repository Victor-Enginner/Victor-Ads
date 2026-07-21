import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Globe } from 'lucide-react'
import { WHATSAPP_URL } from '../lib/contact'
import { useTranslation } from '../i18n/LanguageContext'

function BrandMark({ className }: { className?: string }) {
  return (
    <div className={`rounded-lg bg-gradient-to-br from-lime to-mint flex items-center justify-center ${className}`}>
      <span className="font-mono text-ink text-sm font-extrabold">V</span>
    </div>
  )
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t, lang, toggleLang } = useTranslation()

  const navLinks = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.process'), href: '#process' },
    { label: t('nav.work'), href: '#work' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [menuOpen])

  // Close the drawer if the viewport grows into the desktop layout
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => { if (mq.matches) setMenuOpen(false) }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[80] transition-colors duration-300 ${
          scrolled || menuOpen
            ? 'bg-ink/85 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent border-b border-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8 py-3 sm:py-4">
          <a
            href="#top"
            className={`flex items-center gap-2.5 rounded-2xl px-3 py-2 sm:px-5 sm:py-3 transition-colors ${
              scrolled || menuOpen
                ? 'bg-transparent'
                : 'bg-white/[0.06] backdrop-blur-md border border-white/10'
            }`}
          >
            <BrandMark className="w-7 h-7 shrink-0" />
            <span className="font-display text-white text-base sm:text-lg tracking-wide">Victor Ads</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-white/70 text-sm hover:text-lime transition-colors drop-shadow"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-white/60 hover:text-lime transition-colors text-sm px-3 py-1.5 rounded-full border border-white/10 hover:border-lime/40"
              title={lang === 'en' ? 'Mudar para Português' : 'Switch to English'}
            >
              <Globe size={14} />
              <span className="font-medium text-xs">{lang === 'en' ? 'PT' : 'EN'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/login" className="hidden sm:block text-white/70 text-sm hover:text-white transition-colors">
              {t('nav.login')}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-lime text-ink font-bold text-sm px-5 py-2.5 rounded-full hover:brightness-110 transition-all"
              style={{ boxShadow: '0 0 28px rgba(158,255,0,0.25)' }}
            >
              {t('nav.letsTalk')}
            </a>

            {/* Language toggle stays reachable on mobile */}
            <button
              onClick={toggleLang}
              className="md:hidden flex items-center gap-1 text-white/70 text-xs px-2.5 py-2 rounded-full border border-white/15 active:bg-white/10"
              title={lang === 'en' ? 'Mudar para Português' : 'Switch to English'}
            >
              <Globe size={13} />
              <span className="font-medium">{lang === 'en' ? 'PT' : 'EN'}</span>
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden text-white p-2 -mr-1 rounded-lg active:bg-white/10"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer — full-screen overlay so it never pushes the page around */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-[75] bg-ink flex flex-col overflow-y-auto"
            style={{ paddingTop: 'calc(env(safe-area-inset-top) + 76px)' }}
          >
            <div className="flex flex-col px-6 pb-10">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-2xl text-white py-4 border-b border-white/8 active:text-lime"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-white/60 text-base py-4 border-b border-white/8"
              >
                {t('nav.login')}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-8 w-full text-center bg-lime text-ink font-bold text-base px-6 py-4 rounded-full"
                style={{ boxShadow: '0 0 34px rgba(158,255,0,0.25)' }}
              >
                {t('nav.letsTalk')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
