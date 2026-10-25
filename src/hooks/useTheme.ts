import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'dark' | 'light'

// The site uses its own `data-mode` attribute (not `data-theme`) so that embedding hosts
// which set `data-theme` on <html> can never override the visitor's choice.
const ATTR = 'data-mode'

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute(ATTR) === 'light' ? 'light' : 'dark'
}

function apply(theme: Theme) {
  const root = document.documentElement
  root.setAttribute(ATTR, theme)
  root.style.colorScheme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f6f7fb' : '#080B14')
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    apply(theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage unavailable — theme still works for this visit */
    }
  }, [theme])

  /** Toggle the theme. When a click position is given, the new theme is revealed as a circle from that point. */
  const toggle = useCallback((origin?: { x: number; y: number }) => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }

    if (!doc.startViewTransition || reduce || !origin) {
      setTheme(next)
      return
    }

    const { x, y } = origin
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const t = doc.startViewTransition(() => {
      flushSync(() => setTheme(next))
      apply(next)
    })
    t.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(.22,1,.36,1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
      .catch(() => {
        /* transition skipped — theme already applied */
      })
  }, [])

  return { theme, toggle }
}
