import { motion } from 'motion/react'
import { Workflow, Sparkles, Bot, LineChart, Mic, ArrowUpRight } from 'lucide-react'

const cards = [
  {
    icon: Workflow,
    title: 'Workflow Automation',
    desc: 'Custom pipelines on Make, n8n and Zapier that connect your tools and erase repetitive manual work — running 24/7 without you.',
    span: 'md:col-span-2 md:row-span-2',
    big: true,
  },
  {
    icon: Bot,
    title: 'AI Chatbots',
    desc: 'Smart assistants on WhatsApp & Instagram that qualify leads and book meetings.',
    span: '',
  },
  {
    icon: Sparkles,
    title: 'Content at Scale',
    desc: 'Dozens of on-brand posts, scripts and articles generated in minutes.',
    span: '',
  },
  {
    icon: LineChart,
    title: 'Data & Insights',
    desc: 'AI reads your reports, transcribes calls and turns noise into action plans.',
    span: '',
  },
  {
    icon: Mic,
    title: 'Voice & Video',
    desc: 'Realistic voiceovers, AI avatars and auto-cut shorts from long content.',
    span: '',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="relative bg-ink py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-neon-violet/10 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <span className="font-mono text-lime text-xs uppercase tracking-[0.2em]">What I build</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 text-white leading-[1.05]">
            AI systems that run<br />
            <span className="text-gradient">your business for you</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`glow-border group relative rounded-2xl bg-ink-card border border-white/8 p-7 flex flex-col justify-between overflow-hidden ${card.span}`}
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
