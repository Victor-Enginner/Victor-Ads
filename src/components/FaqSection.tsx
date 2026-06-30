import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'Do I need to be technical to work with you?',
    a: 'Not at all. You bring the problem — "I waste hours doing X" — and I design the system. You just press go and watch the manual work disappear.',
  },
  {
    q: 'Which tools do you build on?',
    a: 'Make, n8n and Zapier for automation; GPT, Claude and Gemini for intelligence; ManyChat for messaging; ElevenLabs, HeyGen and Midjourney for media. I pick the right stack for your case — no lock-in.',
  },
  {
    q: 'How long does a project take?',
    a: 'A single automation usually ships in a few days. A full Growth System takes 1–3 weeks depending on complexity. You see progress the whole way.',
  },
  {
    q: 'What happens after it goes live?',
    a: 'On a retainer I monitor, maintain and keep improving your systems. On a one-off project you get documentation and a support window so it keeps running smoothly.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. I work within your own accounts and tools, follow least-privilege access, and never sell or repurpose your data. You stay in full control.',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-ink-soft py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-lime text-xs uppercase tracking-[0.2em]">FAQ</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 text-white">
            Questions, <span className="text-gradient">answered</span>
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
