import { useState, useEffect, useMemo, useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { WHATSAPP_URL } from '../lib/contact'
import { useTranslation } from '../i18n/LanguageContext'

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

/* Isolated so the typewriter's ~18 updates/second only re-render this node
   instead of the whole hero (video + blurs) — that repaint was the main
   source of jank on phones. */
function TerminalLine() {
  const { t, lang } = useTranslation()
  const lines = useMemo(() => [
    t('hero.terminal.boot'),
    t('hero.terminal.orchestrated'),
    t('hero.terminal.online'),
    t('hero.terminal.ready'),
  ], [lang])
  const text = useTypewriter(lines)

  return (
    <span className="text-white/70 truncate">{text}</span>
  )
}

/* Keeps the hero background playing, and never lets it collapse into a flat
   black rectangle.

   Chrome keeps painting the `poster` until the video has actually *started*
   playing, so anything that stopped playback before the first frame left the
   hero empty. That is what a reduced-motion pause used to do: the video is the
   page's whole identity, so it now plays regardless, and the still frame is
   only a fallback for a browser that refuses to autoplay. Seeking decodes and
   paints one real frame without playing.

   The observer still pauses the video off-screen: decoding a full-screen video
   the user cannot see is what made scrolling stutter on mobile. */
function useVideoPlaybackGuard() {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let seekHandler: (() => void) | null = null

    /* Autoplay was refused — paint a single frame so the hero still has an
       image behind the copy. */
    const showStillFrame = () => {
      const apply = () => {
        try {
          if (el.currentTime === 0) el.currentTime = Math.min(0.1, (el.duration || 1) / 2)
        } catch {
          /* not seekable yet — the poster-less video just shows the section bg */
        }
      }
      if (el.readyState >= 1) apply()
      else {
        seekHandler = apply
        el.addEventListener('loadedmetadata', apply, { once: true })
      }
    }

    const detachSeek = () => {
      if (seekHandler) el.removeEventListener('loadedmetadata', seekHandler)
      seekHandler = null
    }

    const play = () => {
      el.play().catch(showStillFrame)
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play()
        else el.pause()
      },
      { threshold: 0.01 }
    )
    obs.observe(el)

    const onVisibility = () => {
      if (document.hidden) el.pause()
      else if (el.getBoundingClientRect().bottom > 0) play()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      obs.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      detachSeek()
    }
  }, [])
  return ref
}

export default function AuraiHero() {
  const { t } = useTranslation()
  const videoRef = useVideoPlaybackGuard()

  return (
    <section id="top" className="relative w-full min-h-[100svh] overflow-hidden bg-ink">
      {/* Main video background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover
          [object-position:80%_center]
          md:[object-position:right_center]
          lg:[object-position:center_center]"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260618_174853_aac61aa2-0f3f-4cf1-bc78-7f657dd11164.mp4"
          type="video/mp4"
        />
      </video>

      {/* Readability scrims + green tint (Engenheiro-AI vibe) */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20 md:via-ink/30 md:to-transparent" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 95% at 16% 42%, rgba(7,11,13,0.86) 0%, rgba(7,11,13,0.45) 36%, rgba(7,11,13,0) 66%), radial-gradient(circle at 18% 36%, rgba(158,255,0,0.10), transparent 34%)',
        }}
      />

      {/* Content — top padding clears the fixed SiteHeader */}
      <div className="relative z-10 flex flex-col min-h-[100svh] max-w-7xl mx-auto px-4 md:px-8 pt-24 sm:pt-28 pb-10">
        <div className="flex-1 flex flex-col justify-center max-w-3xl pb-[6vh]">
          {/* Terminal line */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 self-start max-w-full bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-full pl-3.5 pr-4 py-2 mb-5 font-mono text-[12px] sm:text-[13px]"
          >
            <span className="text-lime font-bold shrink-0">$</span>
            <TerminalLine />
            <span className="term-cursor shrink-0" />
          </motion.div>

          {/* Badges with glowing dots */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-2 sm:gap-2.5 mb-6"
          >
            {[
              { label: t('hero.badge.claude'), cyan: false },
              { label: t('hero.badge.make'), cyan: true },
              { label: t('hero.badge.multiagent'), cyan: false },
            ].map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-2 font-mono text-[11.5px] sm:text-[12.5px] text-white/65 bg-black/25 backdrop-blur-md border border-white/10 rounded-full px-3 sm:px-3.5 py-1.5"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
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
            className="font-inter font-black text-white text-[2.35rem] sm:text-6xl lg:text-7xl leading-[1.02] sm:leading-[0.98] tracking-tight drop-shadow-lg text-balance"
          >
            {t('hero.title.line1')}<br />
            <span className="text-gradient">{t('hero.title.line2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="text-white/70 text-[15px] sm:text-lg max-w-xl leading-relaxed mt-5 sm:mt-6 drop-shadow"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-7 sm:mt-9"
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
            className="flex flex-wrap gap-2 sm:gap-2.5 mt-7 sm:mt-9"
          >
            {[t('hero.pill.wf'), t('hero.pill.chatbots'), t('hero.pill.content')].map((p) => (
              <span
                key={p}
                className="font-mono bg-black/25 backdrop-blur-md text-white/60 text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 rounded-full border border-white/10"
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
