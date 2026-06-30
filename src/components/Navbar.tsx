import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'service', href: '#services' },
  { label: 'patient resources', href: '#portfolio' },
  { label: 'about us', href: '#sentinel' },
  { label: 'education center', href: '#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 py-6 md:py-10 bg-gradient-to-b from-[#f1f1f1]/80 to-transparent backdrop-blur-[2px]">
        <div className="grid grid-cols-12 max-w-7xl mx-auto px-4 md:px-8 items-center">
          {/* Left — Brand */}
          <div className="col-span-4 md:col-span-3 flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="8" r="5" fill="#1a1a1a" />
              <circle cx="8" cy="16" r="5" fill="#1a1a1a" />
              <circle cx="20" cy="16" r="5" fill="#1a1a1a" />
              <circle cx="14" cy="22" r="4" fill="#1a1a1a" />
            </svg>
            <span className="font-display text-xl font-semibold tracking-tight text-[#1a1a1a]">
              mėntality
            </span>
          </div>

          {/* Center — Desktop nav */}
          <div className="hidden md:flex col-span-6 justify-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs lowercase text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right — CTA + Hamburger */}
          <div className="col-span-8 md:col-span-3 flex items-center justify-end gap-3">
            <a
              href="#contact"
              className="hidden md:block text-xs text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
            >
              find help
            </a>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center bg-[#1a1a1a] text-white text-xs px-5 py-2.5 rounded-full hover:bg-[#1a1a1a]/80 transition-colors"
            >
              get started →
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[#1a1a1a]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#f1f1f1]/95 backdrop-blur-md pt-28 px-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-display text-[#1a1a1a] lowercase"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-[#1a1a1a]/70"
                >
                  find help
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center bg-[#1a1a1a] text-white text-sm px-6 py-3 rounded-full w-fit"
                >
                  get started →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
