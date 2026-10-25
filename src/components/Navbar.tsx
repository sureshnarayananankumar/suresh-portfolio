import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Download, Menu, Moon, Sun, X } from 'lucide-react'
import { navItems, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import type { Theme } from '../hooks/useTheme'
import { asset } from '../lib/asset'
import { Logo } from './Logo'

const ids = navItems.map((n) => n.id)

interface Props {
  theme: Theme
  onToggleTheme: (origin?: { x: number; y: number }) => void
}

export function Navbar({ theme, onToggleTheme }: Props) {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on Escape and lock background scroll while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Close the menu if the viewport grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const ThemeIcon = theme === 'dark' ? Sun : Moon

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled || open ? 'border-b border-line bg-bg/75 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav aria-label="Primary" className="container-x flex h-[72px] items-center justify-between gap-4">
          <a href="#top" className="group flex items-center gap-3 rounded-xl" aria-label={`${profile.name} — back to top`}>
            <Logo />
            <span className="hidden font-display text-[15px] font-semibold tracking-tight text-fg sm:block">
              {profile.name}
            </span>
          </a>

          <ul className="glass hidden items-center gap-1 rounded-full p-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-line-strong bg-[color-mix(in_srgb,var(--blue)_14%,transparent)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                onToggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
              }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="glass grid size-10 place-items-center rounded-full text-muted transition-colors hover:text-fg"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid place-items-center"
                >
                  <ThemeIcon className="size-[18px]" aria-hidden />
                </motion.span>
              </AnimatePresence>
            </button>
            <a
              href={asset(profile.resumeFile)}
              download={profile.resumeDownloadName}
              className="bg-gradient-brand hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-10px_var(--blue)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              <Download className="size-4" aria-hidden /> Resume
            </a>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="glass grid size-10 place-items-center rounded-full text-fg md:hidden"
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-6">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={`flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl font-semibold ${
                      active === item.id ? 'text-fg' : 'text-muted'
                    }`}
                  >
                    {item.label}
                    {active === item.id && <span className="bg-gradient-brand size-2 rounded-full" aria-hidden />}
                  </a>
                </motion.li>
              ))}
              <li className="mt-4 px-4">
                <a
                  href={asset(profile.resumeFile)}
                  download={profile.resumeDownloadName}
                  className="bg-gradient-brand flex items-center justify-center gap-2 rounded-2xl px-5 py-4 font-semibold text-white"
                >
                  <Download className="size-4" aria-hidden /> Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
