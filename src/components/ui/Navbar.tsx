'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, siteConfig } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'

const SECTION_IDS = ['about', 'experience', 'projects', 'timeline', 'stack', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'glass-strong' : 'bg-transparent',
          'border-b',
          scrolled ? 'border-white/[0.06]' : 'border-transparent'
        )}
        style={{ height: 64 }}
      >
        <div className="max-content section-x h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-mono text-accent text-sm tracking-[0.12em] font-medium hover-line"
            aria-label="Ayush Mittal — home"
          >
            AM
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = active === link.href.replace('#', '')
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'text-sm transition-colors duration-200 relative group font-dm',
                    isActive ? 'text-tx-1' : 'text-tx-2 hover:text-tx-1'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                    />
                  )}
                </a>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <a
            href={siteConfig.resume}
            download
            className="hidden md:flex items-center gap-2 text-xs font-mono text-tx-2 hover:text-tx-1 border border-white/[0.12] hover:border-white/30 px-4 py-2 rounded-lg transition-all duration-200"
            data-hover
          >
            Resume ↓
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-tx-2 hover:text-tx-1 p-1 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bg flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center px-8 gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-clash text-4xl font-semibold text-tx-1 hover:text-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={siteConfig.resume}
                download
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-mono text-sm text-tx-3 mt-4"
                onClick={() => setMobileOpen(false)}
              >
                Download Resume ↓
              </motion.a>
            </div>
            <div className="px-8 pb-10 font-mono text-xs text-tx-4">
              {siteConfig.email}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
