import { GraduationCap } from 'lucide-react'
import { achievements, education } from '../data/profile'
import { Reveal } from './Reveal'
import { Tilt } from './Tilt'
import { SectionHeading } from './SectionHeading'

export function Achievements() {
  return (
    <section aria-labelledby="achievements-title" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          id="achievements-title"
          eyebrow="Key achievements"
          title={
            <>
              Milestones that <span className="text-gradient">shipped.</span>
            </>
          }
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {achievements.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={(i % 2) * 0.06}>
              <Tilt className="glass gradient-border group flex h-full gap-5 rounded-3xl p-6 sm:p-7">
              <span className="font-display text-sm font-semibold text-muted tabular-nums">0{i + 1}</span>
              <div>
                <Icon className="size-6 text-violet transition-transform duration-300 group-hover:-rotate-6" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold text-fg sm:text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">{text}</p>
              </div>
              </Tilt>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16">
          <div id="education" className="relative overflow-hidden rounded-3xl border border-line bg-bg-2 p-7 sm:p-10">
            <div aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(circle,var(--glow-1),transparent_65%)]" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-white">
                  <GraduationCap className="size-6" aria-hidden />
                </span>
                <div>
                  <p className="font-mono text-xs tracking-[0.18em] text-blue uppercase">Education</p>
                  <h3 className="mt-2 text-xl font-semibold text-fg sm:text-2xl">{education.degree}</h3>
                  <p className="mt-1 text-muted">{education.institution}</p>
                </div>
              </div>
              <dl className="flex gap-8 sm:text-right">
                <div>
                  <dt className="text-xs text-muted">Period</dt>
                  <dd className="mt-1 font-display text-lg font-semibold text-fg">{education.period}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Score</dt>
                  <dd className="text-gradient mt-1 font-display text-lg font-semibold">{education.score}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
