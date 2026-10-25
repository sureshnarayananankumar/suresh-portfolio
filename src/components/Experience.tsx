import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Briefcase, MapPin } from 'lucide-react'
import type { ExperienceItem } from '../types'
import { experience } from '../data/profile'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title={
            <>
              Three platforms. <span className="text-gradient">One continuous journey.</span>
            </>
          }
        />

        {experience.map((job) => (
          <div key={job.company} className="mt-14 grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <div className="glass rounded-3xl p-7">
                <span className="grid size-11 place-items-center rounded-xl border border-line text-blue">
                  <Briefcase className="size-5" aria-hidden />
                </span>
                <p className="mt-6 font-mono text-xs tracking-[0.16em] text-blue uppercase">{job.period}</p>
                <h3 className="mt-2 text-2xl font-semibold text-fg">{job.role}</h3>
                <p className="mt-1 font-medium text-fg/90">{job.company}</p>
                <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="size-4" aria-hidden /> {job.location}
                </p>
                <p className="mt-6 border-t border-line pt-6 text-sm leading-relaxed text-muted">{job.summary}</p>
              </div>
            </Reveal>

            <ProjectTabs tracks={job.tracks} />
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectTabs({ tracks }: { tracks: ExperienceItem['tracks'] }) {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const t = tracks[active]

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = tracks.length - 1
    let next = active
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    else return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <Reveal className="min-w-0">
      <p className="mb-4 text-sm text-muted">Platforms delivered in this role. Select one to see what I worked on.</p>
      <div role="tablist" aria-label="Projects in this role" onKeyDown={onKey} className="grid grid-cols-3 gap-2">
        {tracks.map((tr, i) => {
          const on = i === active
          return (
            <button
              key={tr.project}
              ref={(el) => {
                tabs.current[i] = el
              }}
              role="tab"
              id={`exp-tab-${i}`}
              aria-selected={on}
              aria-controls="exp-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`glass relative overflow-hidden rounded-2xl px-3 py-4 text-left transition-colors sm:px-5 ${on ? 'border-line-strong' : 'hover:border-line-strong'}`}
            >
              {on && (
                <motion.span
                  layoutId="exp-tab"
                  aria-hidden
                  className="absolute inset-0 bg-[color-mix(in_srgb,var(--blue)_12%,transparent)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                />
              )}
              <span className="relative block font-mono text-[11px] text-muted">0{i + 1}</span>
              <span className={`relative mt-1 block font-display text-lg font-semibold sm:text-xl ${on ? 'text-gradient' : 'text-fg'}`}>{tr.project}</span>
              <span className="relative mt-3 block h-0.5 w-full overflow-hidden rounded-full bg-line">
                {on && (
                  <motion.span
                    className="bg-gradient-brand block h-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </span>
            </button>
          )
        })}
      </div>

      <div id="exp-panel" role="tabpanel" aria-labelledby={`exp-tab-${active}`} tabIndex={0} className="glass mt-4 overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={t.project}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-display text-2xl font-semibold text-fg">{t.project}</h4>
              <p className="font-mono text-xs text-muted">{t.stack}</p>
            </div>
            <ol className="relative mt-6 space-y-5 border-l border-line pl-6">
              {t.points.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.08 }}
                  className="relative text-sm leading-relaxed text-muted sm:text-[15px]"
                >
                  <span aria-hidden className="bg-gradient-brand absolute top-[0.55em] -left-[calc(1.5rem+4.5px)] size-2 rounded-full ring-4 ring-bg" />
                  {p}
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </AnimatePresence>
      </div>
    </Reveal>
  )
}
