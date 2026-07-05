import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Menu, X, ArrowRight, Globe } from 'lucide-react'
import { WHATSAPP_URL } from '../lib/contact'
import { useTranslation } from '../i18n/LanguageContext'

function BrandMark({ className }: { className?: string }) {
  return (
    <div className={`rounded-lg bg-gradient-to-br from-lime to-mint flex items-center justify-center ${className}`}>
      <span className="font-mono text-ink text-sm font-extrabold">V</span>
    </div>
  )
}

function useTypewriter(lines: string[], speed = 55, pause = 1400) {
  const [text, setText] = useState('')
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(lines[lines.length - 1])
      return
    }
    let li = 0, ci = 0, deleting = false
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const full = lines[li]
      if (!deleting) {
        ci++
        setText(full.slice(0, ci))
        if (ci === full.length) { deleting = true; timer = setTimeout(tick, pause); return }
      } else {
        ci--
        setText(full.slice(0, ci))
        if (ci === 0) { deleting = false; li = (li + 1) % lines.length }
      }
      timer = setTimeout(tick, deleting ? speed / 2 : speed)
    }
    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [lines, speed, pause])
  return text
}

export default function AuraiHero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, lang, toggleLang } = useTranslation()
  const termText = useTypewriter([
    t('hero.terminal.boot'),
    t('hero.terminal.orchestrated'),
    t('hero.terminal.online'),
    t('hero.terminal.ready'),
  ])

  const navLinks = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.process'), href: '#process' },
    { label: t('nav.work'), href: '#work' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-ink">
      {/* Main video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover
          [object-position:80%_center]
          md:[object-position:right_center]
          lg:[object-position:center_center]"
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23070B0D' width='1920' height='1080'/%3E%3C/svg%3E"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260618_174853_aac61aa2-0f3f-4cf1-bc78-7f657dd11164.mp4"
          type="video/mp4"
        />
      </video>

      {/* Readability scrims + green tint (Engenheiro-AI vibe) */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 95% at 16% 42%, rgba(7,11,13,0.86) 0%, rgba(7,11,13,0.45) 36%, rgba(7,11,13,0) 66%), radial-gradient(circle at 18% 36%, rgba(158,255,0,0.10), transparent 34%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen max-w-7xl mx-auto px-4 md:px-8 py-5 sm:py-7">
        {/* Nav */}
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 px-4 py-2.5 sm:px-5 sm:py-3">
            <BrandMark className="w-7 h-7" />
            <span className="font-display text-white text-lg tracking-wide">Victor Ads</span>
          </div>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="text-white/70 text-sm hover:text-lime transition-colors drop-shadow">
                {l.label}
              </a>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-white/60 hover:text-lime transition-colors text-sm px-3 py-1.5 rounded-full border border-white/10 hover:border-lime/40"
              title={lang === 'en' ? 'Mudar para Português' : 'Switch to English'}
            >
              <Globe size={14} />
              <span className="font-medium text-xs">{lang === 'en' ? 'PT' : 'EN'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
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
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-1"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 bg-black/50 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} className="text-white/85 text-sm" onClick={() => setMenuOpen(false)}>
                  {l.label}
                </a>
              ))}
              <a href="/login" className="text-white/85 text-sm" onClick={() => setMenuOpen(false)}>
                {t('nav.login')}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center bg-lime text-ink font-bold text-sm px-6 py-3 rounded-full mt-1"
              >
                {t('nav.letsTalk')}
              </a>
            </div>
          </div>
        )}

        {/* Hero body */}
        <div className="flex-1 flex flex-col justify-center max-w-3xl pb-[8vh]">
          {/* Terminal line */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 self-start bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-full pl-3.5 pr-4 py-2 mb-5 font-mono text-[13px]"
          >
            <span className="text-lime font-bold">$</span>
            <span className="text-white/70">{termText}</span>
            <span className="term-cursor" />
          </motion.div>

          {/* Badges with glowing dots */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-2.5 mb-6"
          >
            {[
              { label: t('hero.badge.claude'), cyan: false },
              { label: t('hero.badge.make'), cyan: true },
              { label: t('hero.badge.multiagent'), cyan: false },
            ].map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-2 font-mono text-[12.5px] text-white/65 bg-black/25 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1.5"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: b.cyan ? '#00E5A8' : '#9EFF00',
                    boxShadow: `0 0 8px ${b.cyan ? '#00E5A8' : '#9EFF00'}`,
                  }}
                />
                {b.label}
              </span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="font-inter font-black text-white text-[2.6rem] sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight drop-shadow-lg"
          >
            {t('hero.title.line1')}<br />
            <span className="text-gradient">{t('hero.title.line2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed mt-6 drop-shadow"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-9"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine group inline-flex items-center justify-center gap-2 bg-lime text-ink font-bold text-sm px-7 py-3.5 rounded-full hover:brightness-110 transition-all"
              style={{ boxShadow: '0 0 34px rgba(158,255,0,0.3)' }}
            >
              {t('hero.cta.audit')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 bg-black/30 backdrop-blur-md border border-white/20 text-white text-sm px-7 py-3.5 rounded-full hover:bg-black/50 hover:border-lime/40 transition-all"
            >
              {t('hero.cta.seeWork')}
            </a>
          </motion.div>

          {/* Capability pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.44 }}
            className="flex flex-wrap gap-2.5 mt-9"
          >
            {[t('hero.pill.wf'), t('hero.pill.chatbots'), t('hero.pill.content')].map((p) => (
              <span
                key={p}
                className="font-mono bg-black/25 backdrop-blur-md text-white/60 text-xs px-3.5 py-1.5 rounded-full border border-white/10"
              >
                {p}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
