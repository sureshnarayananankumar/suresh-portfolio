import { useRef, type ReactNode, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useFinePointer } from '../hooks/useFinePointer'

interface Props {
  children: ReactNode
  className?: string
  /** Max tilt in degrees. */
  max?: number
  as?: 'div' | 'li' | 'article'
}

/**
 * Card wrapper with a subtle 3D tilt and a pointer-following spotlight.
 * Inert on touch devices and for reduced-motion users.
 */
export function Tilt({ children, className = '', max = 6, as = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const fine = useFinePointer()
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 })
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 })
  const Comp = motion[as]

  const move = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    el.style.setProperty('--spot', '1')
    if (fine) {
      ry.set((px - 0.5) * 2 * max)
      rx.set(-(py - 0.5) * 2 * max)
    }
  }
  const leave = () => {
    ref.current?.style.setProperty('--spot', '0')
    rx.set(0)
    ry.set(0)
  }

  return (
    <Comp
      ref={ref as never}
      onPointerMove={move}
      onPointerLeave={leave}
      style={fine ? { rotateX: rx, rotateY: ry, transformPerspective: 1100 } : undefined}
      className={`spotlight relative ${className}`}
    >
      {children}
    </Comp>
  )
}
