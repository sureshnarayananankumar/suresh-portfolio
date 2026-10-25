import { aboutParagraphs, strengths } from '../data/profile'
import { Reveal } from './Reveal'
import { Tilt } from './Tilt'
import { SectionHeading } from './SectionHeading'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About me"
            title={
              <>
                Full stack, end to end — <span className="text-gradient">from API to interface.</span>
              </>
            }
          />
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-[17px]">
            {aboutParagraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {strengths.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={0.05 * i}>
              <Tilt className="glass gradient-border group h-full rounded-2xl p-6">
              <span className="mb-5 grid size-11 place-items-center rounded-xl border border-line bg-[color-mix(in_srgb,var(--blue)_10%,transparent)] text-blue transition-colors group-hover:scale-110 group-hover:rotate-[-6deg] group-hover:text-violet transition-transform duration-300">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="text-lg font-semibold text-fg">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </Tilt>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
