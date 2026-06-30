import { motion } from 'motion/react'
import { Plus, FolderGit2 } from 'lucide-react'

const categories = ['Automation', 'AI Chatbot', 'Content System']

export default function PortfolioSection() {
  return (
    <section id="work" className="relative bg-ink-soft py-24 md:py-32 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-neon-cyan/8 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <span className="font-mono text-lime text-xs uppercase tracking-[0.2em]">Selected work</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 text-white">
              Case studies,<br /><span className="text-gradient">coming soon</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-sm">
            Real systems I've shipped will live here. The slots are ready — the results are on the way.
          </p>
        </motion.div>

        {/* Placeholder slots — ready to be filled with real projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glow-border group relative rounded-2xl border border-dashed border-white/12 bg-white/[0.015] aspect-[4/5] flex flex-col items-center justify-center text-center p-8 overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-ink-card border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <FolderGit2 size={22} className="text-white/30 group-hover:text-neon-violet transition-colors" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-neon-violet/70 mb-2">{cat}</span>
              <p className="text-white/50 text-sm">Project coming soon</p>
              <div className="mt-5 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-white/70 group-hover:border-white/30 transition-colors">
                <Plus size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
