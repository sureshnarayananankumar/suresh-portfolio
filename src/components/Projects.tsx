import { useState } from 'react'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { projects } from '../data/profile'
import type { Project } from '../types'
import { GitHubIcon } from './BrandIcons'
import { ProjectIllustration } from './ProjectIllustration'
import { ProjectModal } from './ProjectModal'
import { Reveal } from './Reveal'
import { Tilt } from './Tilt'
import { SectionHeading } from './SectionHeading'

function ProjectCard({ project, featured, onOpen }: { project: Project; featured?: boolean; onOpen: () => void }) {
  const shown = project.stack.slice(0, featured ? 8 : 6)
  const rest = project.stack.length - shown.length
  return (
    <Tilt
      as="article"
      max={4}
      className={`glass gradient-border group flex h-full flex-col overflow-hidden rounded-3xl p-4 sm:p-5 ${
        featured ? 'lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-10' : ''
      }`}
    >
      <div className="overflow-hidden rounded-2xl">
        <div className="transition-transform duration-700 group-hover:scale-[1.02]">
          <ProjectIllustration project={project} />
        </div>
      </div>

      <div className={`flex flex-1 flex-col px-2 pt-6 pb-2 ${featured ? 'lg:pt-0' : ''}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-gradient-brand px-2.5 py-1 font-mono font-semibold text-white">{project.code}</span>
          <span className="text-muted">{project.region}</span>
        </div>
        <h3 className={`mt-4 font-semibold text-fg ${featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>{project.name}</h3>
        <p className="mt-1 text-xs text-muted">{project.context}</p>
        <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Highlights">
          {project.highlights.map((h) => (
            <li key={h} className="rounded-lg border border-line bg-[color-mix(in_srgb,var(--blue)_8%,transparent)] px-2.5 py-1 text-xs font-medium text-fg">
              {h}
            </li>
          ))}
        </ul>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {shown.map((s) => (
            <li key={s} className="rounded-full px-2 py-0.5 font-mono text-[11px] text-muted ring-1 ring-line">{s}</li>
          ))}
          {rest > 0 && <li className="rounded-full px-2 py-0.5 font-mono text-[11px] text-muted ring-1 ring-line">+{rest}</li>}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-blue hover:text-blue"
          >
            View case study <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only">: {project.fullName}</span>
          </button>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
              <ExternalLink className="size-4" aria-hidden /> Live
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
              <GitHubIcon /> Code
            </a>
          )}
        </div>
      </div>
    </Tilt>
  )
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  const [first, ...others] = projects

  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,var(--glow-2),transparent_65%)] blur-3xl" />
      <div className="container-x relative">
        <SectionHeading
          id="work-title"
          eyebrow="Featured work"
          title={
            <>
              Government platforms, <span className="text-gradient">built end to end.</span>
            </>
          }
          description="Professional projects I developed as part of my role at Business Gateways International. Visuals are original illustrations — client systems and source code remain confidential."
        />

        <div className="mt-14 grid gap-6">
          <Reveal>
            <ProjectCard project={first} featured onOpen={() => setOpen(first)} />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {others.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08} className="h-full">
                <ProjectCard project={p} onOpen={() => setOpen(p)} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  )
}
