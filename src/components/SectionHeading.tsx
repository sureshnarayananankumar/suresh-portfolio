import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface Props {
  eyebrow: string
  title: ReactNode
  description?: string
  id?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, id, align = 'left' }: Props) {
  const center = align === 'center'
  return (
    <Reveal className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className={`mb-4 inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-blue uppercase ${center ? 'justify-center' : ''}`}>
        <span aria-hidden className="h-px w-8 bg-gradient-brand" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl leading-[1.1] font-semibold text-fg sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </Reveal>
  )
}
