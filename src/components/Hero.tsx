import { motion } from 'motion/react'
import { Search, ChevronRight } from 'lucide-react'

function EyePill() {
  return (
    <span className="inline-flex items-center justify-center w-[16px] md:w-[42px] lg:w-[62px] h-[12px] md:h-[24px] lg:h-[32px] border-2 border-[#1a1a1a] rounded-full mx-1 align-middle">
      <span className="w-2 h-2 bg-[#1a1a1a] rounded-full" />
    </span>
  )
}

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23EDEEF5' width='1920' height='1080'/%3E%3C/svg%3E"
        >
          <source
            src="https://d2zdpiztbgorix.cloudfront.net/cdn/ff/Hf20260603132049/036591b86e924760b94ca7ea6eef315c.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient Mask */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg-base to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 grid grid-cols-12 max-w-7xl mx-auto px-4 md:px-8 min-h-screen items-center">
        <div className="col-span-12 md:col-span-10 md:col-start-2 pt-32 pb-20">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight"
          >
            <span className="text-[#1a1a1a]">Remix: Mentality offers </span>
            <span className="text-[#8e8e8e]">
              information<br />
              and resources to help you manage<br />
              your
            </span>
            <EyePill />
            <span className="text-[#8e8e8e]"> mental wellbeing.</span>
          </motion.h1>

          {/* Search Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-10 inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-[#1a1a1a]/10 rounded-full pl-5 pr-2 py-2 max-w-md"
          >
            <Search size={16} className="text-[#8e8e8e]" />
            <input
              type="text"
              placeholder="Search resources..."
              className="bg-transparent outline-none text-sm text-[#1a1a1a] placeholder:text-[#8e8e8e] w-full"
            />
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1a1a1a] text-white shrink-0">
              <ChevronRight size={14} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Architectural Edge Anchors */}
      <div className="absolute middle-right top-1/2 -translate-y-1/2 right-4 md:right-8 z-10">
        <div className="flex items-center gap-1 bg-white/40 backdrop-blur-sm border border-[#1a1a1a]/10 rounded-full px-3 py-1.5 text-[10px] text-[#1a1a1a]/60">
          <span className="font-medium">pl</span>
          <span>—</span>
          <span className="font-medium">en</span>
        </div>
      </div>

      <div className="absolute bottom-6 left-4 md:left-8 z-10">
        <span className="text-[11px] text-[#1a1a1a]/40 font-medium">2024</span>
      </div>

      <div className="absolute bottom-6 right-4 md:right-8 z-10">
        <span className="text-[11px] text-[#1a1a1a]/40 font-medium">mental health tools</span>
      </div>
    </section>
  )
}
