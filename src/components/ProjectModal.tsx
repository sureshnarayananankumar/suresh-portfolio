import { useEffect, useRef } from 'react'
import { CircleCheck, ExternalLink, X } from 'lucide-react'
import type { Project } from '../types'
import { GitHubIcon } from './BrandIcons'
import { ProjectIllustration } from './ProjectIllustration'

interface Props {
  project: Project | null
  onClose: () => void
}

/**
 * Case-study dialog built on the native <dialog> element:
 * focus trapping, Escape-to-close and an inert background come for free.
 */
export function ProjectModal({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (!project) {
      if (d.open) d.close()
      return
    }
    if (!d.open) d.showModal()
    d.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [project])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close() // backdrop click
      }}
      aria-labelledby="case-title"
      className="m-auto max-h-[92svh] w-[min(920px,calc(100vw-24px))] overflow-hidden rounded-3xl border border-line-strong bg-bg-2 p-0 text-fg shadow-[var(--shadow)] backdrop:bg-black/60 backdrop:backdrop-blur-sm open:animate-[modal-in_.35s_cubic-bezier(.22,1,.36,1)]"
    >
      {project && (
        <div className="max-h-[92svh] overflow-y-auto overscroll-contain">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-bg-2/90 px-5 py-4 backdrop-blur sm:px-8">
            <p className="truncate font-mono text-xs tracking-[0.18em] text-blue uppercase">Case study · {project.code}</p>
            <button
              type="button"
              data-autofocus
              onClick={() => ref.current?.close()}
              aria-label="Close case study"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>

          <div className="px-5 pt-6 pb-10 sm:px-8">
            <h2 id="case-title" className="text-2xl font-semibold sm:text-4xl">{project.fullName}</h2>
            <p className="mt-3 text-sm text-muted">
              {project.region} · <span className="text-fg">{project.context}</span>
            </p>

            <div className="mt-6">
              <ProjectIllustration project={project} />
            </div>

            <p className="mt-4 rounded-xl border border-line bg-bg/40 px-4 py-3 text-xs leading-relaxed text-muted">
              Developed as part of my employment at Business Gateways International. The platform belongs to its client;
              source code, screenshots and internal details are confidential and not shown here.
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <section>
                <h3 className="font-mono text-xs tracking-[0.18em] text-violet uppercase">The challenge</h3>
                <p className="mt-3 leading-relaxed text-muted">{project.challenge}</p>
              </section>
              <section>
                <h3 className="font-mono text-xs tracking-[0.18em] text-violet uppercase">The solution</h3>
                <p className="mt-3 leading-relaxed text-muted">{project.solution}</p>
              </section>
            </div>

            <section className="mt-10">
              <h3 className="font-mono text-xs tracking-[0.18em] text-violet uppercase">My contributions</h3>
              <ul className="mt-4 space-y-3">
                {project.contributions.map((c) => (
                  <li key={c} className="flex gap-3 leading-relaxed text-muted">
                    <CircleCheck className="mt-1 size-4 shrink-0 text-blue" aria-hidden />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h3 className="font-mono text-xs tracking-[0.18em] text-violet uppercase">Documented outcomes</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.achievements.map((a) => (
                  <li key={a} className="glass rounded-xl px-4 py-3 text-sm font-medium text-fg">{a}</li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h3 className="font-mono text-xs tracking-[0.18em] text-violet uppercase">Technology stack</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line px-3 py-1.5 text-xs text-fg">{s}</li>
                ))}
              </ul>
            </section>

            {(project.liveUrl || project.repoUrl) && (
              <div className="mt-10 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-gradient-brand inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white">
                    <ExternalLink className="size-4" aria-hidden /> Live demo
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-fg">
                    <GitHubIcon /> Source code
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}
