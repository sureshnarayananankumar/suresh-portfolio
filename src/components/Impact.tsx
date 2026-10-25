import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { metrics } from '../data/profile'
import { Reveal } from './Reveal'

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduce, to])

  return (
    <span ref={ref} aria-hidden>
      {val}
      {suffix}
    </span>
  )
}

export function Impact() {
  return (
    <section aria-label="Quick impact" className="relative py-10 sm:py-16">
      <div className="container-x">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal as="li" key={m.label} delay={i * 0.06} className="group relative bg-bg p-6 transition-colors duration-500 hover:bg-bg-2 sm:p-8">
              <span aria-hidden className="bg-gradient-brand absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
              <p className="text-gradient font-display text-4xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1 sm:text-5xl">
                <CountUp to={m.value} suffix={m.suffix} />
                <span className="sr-only">{`${m.value}${m.suffix ?? ''}`}</span>
              </p>
              <p className="mt-3 text-sm font-medium text-fg sm:text-base">{m.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{m.note}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs text-muted">Figures reflect delivery scope described in my resume.</p>
      </div>
    </section>
  )
}
