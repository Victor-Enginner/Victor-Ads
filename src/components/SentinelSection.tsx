import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Cpu } from 'lucide-react'
import { useTranslation } from '../i18n/LanguageContext'
import { useLiteMotion } from '../hooks/useLiteMotion'

const orbitTools = ['GPT', 'Claude', 'Make', 'n8n', 'Zapier', 'ElevenLabs', 'Midjourney', 'ManyChat']

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1400
          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(Math.round(eased * to))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [to])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

function Orbital() {
  /* 12 rAF-driven rotations running forever is the single most expensive thing
     on this page for a phone GPU. On mobile the composition is rendered static
     — it reads the same, it just stops burning frames on every scroll. */
  const lite = useLiteMotion()
  const spin = (duration: number, dir: 1 | -1) =>
    lite
      ? {}
      : {
          animate: { rotate: 360 * dir },
          transition: { duration, repeat: Infinity, ease: 'linear' as const },
        }

  return (
    <div className="relative w-[248px] h-[248px] sm:w-72 sm:h-72 md:w-96 md:h-96 mx-auto">
      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          {...spin(20 - ring * 5, ring % 2 === 0 ? 1 : -1)}
          className="absolute rounded-full border border-neon-violet/20"
          style={{ inset: `${ring * 11}%` }}
        />
      ))}

      {/* Core */}
      <motion.div
        {...(lite
          ? {}
          : {
              animate: { scale: [1, 1.08, 1] },
              transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
            })}
        className="absolute inset-[38%] rounded-2xl bg-gradient-to-br from-neon-violet/30 to-neon-cyan/20 backdrop-blur-sm flex items-center justify-center animate-pulse-glow"
      >
        <Cpu size={32} className="text-white" />
      </motion.div>

      {/* Orbiting tool chips */}
      <motion.div {...spin(28, 1)} className="absolute inset-0">
        {orbitTools.map((tool, i) => {
          const angle = (i / orbitTools.length) * 2 * Math.PI
          const r = 43 // percentage radius
          const x = 50 + r * Math.cos(angle)
          const y = 50 + r * Math.sin(angle)
          return (
            <motion.div
              key={tool}
              {...spin(28, -1)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="px-2 sm:px-2.5 py-1 rounded-full bg-ink-card border border-white/10 text-white/60 text-[9.5px] sm:text-[10px] md:text-xs whitespace-nowrap">
                {tool}
              </span>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default function SentinelSection() {
  const { t } = useTranslation()

  const stats = [
    { to: 40, suffix: 'h+', label: t('sentinel.stat1') },
    { to: 12, suffix: '', label: t('sentinel.stat2') },
    { to: 99, suffix: '%', label: t('sentinel.stat3') },
    { to: 24, suffix: '/7', label: t('sentinel.stat4') },
  ]

  return (
    <section id="stack" className="relative bg-ink py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neon-indigo/10 blur-[140px]" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="font-mono text-lime text-xs uppercase tracking-[0.2em]">{t('sentinel.tag')}</span>
          <h2 className="font-display text-[2.1rem] sm:text-4xl md:text-5xl lg:text-6xl mt-4 text-balance text-white">
            {t('sentinel.title.line1')}<br />
            <span className="text-gradient">{t('sentinel.title.line2')}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-20"
        >
          <Orbital />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center rounded-2xl bg-ink-card border border-white/8 py-6 sm:py-8 px-3 sm:px-4"
            >
              <p className="font-display text-3xl sm:text-4xl md:text-5xl text-white">
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="text-white/40 text-xs mt-2 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
