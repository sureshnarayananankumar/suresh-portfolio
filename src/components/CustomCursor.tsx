import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useFinePointer } from '../hooks/useFinePointer'

const INTERACTIVE = 'a, button, [role="tab"], input, textarea, select, label, summary'

/**
 * A soft trailing ring that grows over interactive elements.
 * The native cursor stays visible, so nothing about pointing or text selection changes.
 * Only shown for mouse/trackpad users who allow motion.
 */
export function CustomCursor() {
  const fine = useFinePointer()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 })
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)
  const [down, setDown] = useState(false)

  useEffect(() => {
    if (!fine) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const t = e.target as Element | null
      setHover(!!t?.closest?.(INTERACTIVE))
    }
    const leave = () => setVisible(false)
    const pd = () => setDown(true)
    const pu = () => setDown(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', pd)
    window.addEventListener('pointerup', pu)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', pd)
      window.removeEventListener('pointerup', pu)
    }
  }, [fine, x, y])

  if (!fine) return null
  const size = hover ? 46 : 28
  return (
    <>
      <motion.div
        aria-hidden
        className="cursor-ring"
        style={{ x: sx, y: sy }}
        animate={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          opacity: visible ? 1 : 0,
          scale: down ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
      <motion.div aria-hidden className="cursor-dot" style={{ x, y }} animate={{ opacity: visible && !hover ? 1 : 0 }} />
    </>
  )
}
