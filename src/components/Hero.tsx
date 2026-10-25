import { useRef, type PointerEvent } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Download, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { asset } from '../lib/asset'
import { HeroVisual } from './HeroVisual'
import { Magnetic } from './Magnetic'

const ease = [0.22, 1, 0.36, 1] as const
const item = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
})

// Headline words; `g` marks words rendered with the animated gradient.
const headline: { w: string; g?: boolean; br?: boolean }[] = [
  { w: 'Building' },
  { w: 'Scalable', g: true },
  { w: 'Systems.', g: true, br: true },
  { w: 'Crafting' },
  { w: 'Intelligent', g: true },
  { w: 'Experiences.' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--hx', `${e.clientX - r.left}px`)
    el.style.setProperty('--hy', `${e.clientY - r.top}px`)
    el.style.setProperty('--ho', '1')
  }
  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={onMove}
      onPointerLeave={() => ref.current?.style.setProperty('--ho', '0')}
      className="relative overflow-hidden pt-[72px] [--ho:0] [--hx:50%] [--hy:30%]"
    >
      {/* background: grid + lighting */}
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      {/* pointer-following light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ opacity: 'var(--ho)', background: 'radial-gradient(520px circle at var(--hx) var(--hy), var(--glow-1), transparent 55%)' }}
      />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,var(--glow-1),transparent_60%)] blur-3xl" />

      <div className="container-x relative grid min-h-[calc(100svh-72px)] items-center gap-12 py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:py-20">
        <div className="max-w-2xl">
          {profile.availability && (
            <motion.p {...item(0)} className="glass mb-7 inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2 text-xs font-medium text-muted sm:text-sm">
              <span className="relative flex size-2.5 items-center justify-center">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </motion.p>
          )}

          <h1
            id="hero-title"
            className="text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.035em] text-balance text-fg sm:text-6xl lg:text-[4.2rem]"
          >
            {headline.map((h, i) => (
              <span key={h.w}>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className={`inline-block ${h.g ? 'text-shimmer' : ''}`}
                    initial={{ y: '110%', rotate: 4 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease }}
                  >
                    {h.w}
                  </motion.span>
                </span>
                {h.br ? <br className="hidden sm:block" /> : null}
                {i < headline.length - 1 ? ' ' : null}
              </span>
            ))}
          </h1>

          <motion.p {...item(0.16)} className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I'm <strong className="font-semibold text-fg">{profile.name}</strong>, a Full Stack Developer building secure,
            scalable web applications and AI-powered business solutions with Java, Spring Boot, Angular, React, and Node.js.
          </motion.p>

          <motion.div {...item(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic className="w-full sm:w-auto">
            <a
              href="#work"
              className="group w-full sm:w-auto bg-gradient-brand inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_40px_-12px_var(--blue)] transition-transform hover:-translate-y-0.5"
            >
              Explore My Work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
            <a
              href={asset(profile.resumeFile)}
              download={profile.resumeDownloadName}
              className="glass group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-fg transition-colors hover:border-line-strong"
            >
              <Download className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden /> Download Resume
            </a>
            </Magnetic>
            <a href="#contact" className="group inline-flex items-center justify-center gap-1 px-3 py-3 text-sm font-semibold text-fg">
              <span className="border-b border-transparent transition-colors group-hover:border-fg">Let's Connect</span>
              <ArrowUpRight className="size-4 text-blue" aria-hidden />
            </a>
          </motion.div>

          <motion.p {...item(0.32)} className="mt-10 flex items-center gap-2 text-sm text-muted">
            <MapPin className="size-4" aria-hidden /> {profile.location} · {profile.experience} experience
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="px-4 sm:px-8 lg:px-0"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  )
}
