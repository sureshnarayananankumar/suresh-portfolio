import { useState } from 'react'
import { motion } from 'motion/react'
import { projects, skillGroups, skillUsage } from '../data/profile'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { Tilt } from './Tilt'

const filters = [{ id: 'all', label: 'All skills' }, ...projects.map((p) => ({ id: p.id, label: p.code }))]

export function Skills() {
  const [filter, setFilter] = useState('all')
  const usedIn = (s: string) => filter === 'all' || (skillUsage[s] ?? []).includes(filter)
  const count = filter === 'all' ? 0 : skillGroups.flatMap((g) => g.skills).filter(usedIn).length
  const active = projects.find((p) => p.id === filter)

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative border-y border-line bg-bg-2/40 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          eyebrow="Technical skills"
          title={
            <>
              A toolkit for the <span className="text-gradient">whole product.</span>
            </>
          }
          description="Grouped by where I apply them. Pick a project to see which skills I used on it."
        />

        <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label="Filter skills by project" className="glass inline-flex w-fit flex-wrap gap-1 rounded-full p-1">
            {filters.map((f) => {
              const on = filter === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f.id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${on ? 'text-white' : 'text-muted hover:text-fg'}`}
                >
                  {on && (
                    <motion.span
                      layoutId="skill-filter"
                      aria-hidden
                      className="bg-gradient-brand absolute inset-0 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              )
            })}
          </div>
          <p aria-live="polite" className="text-sm text-muted">
            {active ? (
              <>
                <span className="font-semibold text-fg">{count}</span> skills used on {active.name}
              </>
            ) : (
              'Showing every skill'
            )}
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map(({ icon: Icon, title, description, skills }, i) => {
            const hits = skills.filter(usedIn).length
            const dim = filter !== 'all' && hits === 0
            return (
              <Reveal
                as="li"
                key={title}
                delay={(i % 3) * 0.06}
                className={i === skillGroups.length - 1 ? 'md:col-span-2 lg:col-span-3' : ''}
              >
                <Tilt max={4} className={`glass gradient-border group h-full rounded-3xl p-6 transition-opacity duration-500 sm:p-7 ${dim ? 'opacity-45' : ''}`}>
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white shadow-[0_8px_24px_-10px_var(--violet)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-lg font-semibold text-fg">{title}</h3>
                        {filter !== 'all' && (
                          <span className="shrink-0 font-mono text-xs text-muted">
                            {hits}/{skills.length}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-muted">{description}</p>
                    </div>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${title} skills`}>
                    {skills.map((s, k) => {
                      const on = usedIn(s)
                      const highlighted = filter !== 'all' && on
                      return (
                        <motion.li
                          key={s}
                          layout
                          animate={{ opacity: on ? 1 : 0.3, scale: highlighted ? 1.04 : 1 }}
                          transition={{ duration: 0.35, delay: highlighted ? k * 0.02 : 0 }}
                          whileHover={{ y: -2 }}
                          className={`cursor-default rounded-lg border px-3 py-1.5 text-[13px] transition-colors duration-300 ${
                            highlighted
                              ? 'border-blue/60 bg-[color-mix(in_srgb,var(--blue)_14%,transparent)] text-fg'
                              : 'border-line bg-bg/40 text-fg hover:border-blue/60 hover:text-blue'
                          }`}
                        >
                          {s}
                          {!on && <span className="sr-only"> (not used on this project)</span>}
                        </motion.li>
                      )
                    })}
                  </ul>
                </Tilt>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
