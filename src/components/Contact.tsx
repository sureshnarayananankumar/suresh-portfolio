import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, CircleAlert, CircleCheck, Copy, LoaderCircle, Mail, Phone, Send } from 'lucide-react'
import { profile } from '../data/profile'
import { LinkedInIcon } from './BrandIcons'
import { Reveal } from './Reveal'

/**
 * Optional form endpoint (e.g. Formspree). Configure with VITE_FORM_ENDPOINT.
 * Without it, the form opens the visitor's email app with the message pre-filled (mailto).
 */
const FORM_ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim() || ''

type Fields = { name: string; email: string; subject: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = { kind: 'idle' | 'sending' | 'success' | 'mailto' | 'error'; message?: string }

const empty: Fields = { name: '', email: '', subject: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.'
  if (f.subject.trim().length < 3) e.subject = 'Please add a short subject.'
  if (f.message.trim().length < 10) e.message = 'Your message should be at least 10 characters.'
  return e
}

export function Contact() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [copied, setCopied] = useState(false)
  const uid = useId()

  const set = (k: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...fields, [k]: e.target.value }
    setFields(next)
    if (touched[k]) setErrors(validate(next))
  }
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(fields))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if ((form.elements.namedItem('company') as HTMLInputElement | null)?.value) return // honeypot

    const errs = validate(fields)
    setErrors(errs)
    setTouched({ name: true, email: true, subject: true, message: true })
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    if (!FORM_ENDPOINT) {
      const body = `${fields.message.trim()}\n\n— ${fields.name.trim()} (${fields.email.trim()})`
      const href = `mailto:${profile.email}?subject=${encodeURIComponent(fields.subject.trim())}&body=${encodeURIComponent(body)}`
      window.location.href = href
      setStatus({
        kind: 'mailto',
        message: 'Your email app should open with the message ready to send. If nothing happened, email me directly at ' + profile.email + '.',
      })
      return
    }

    setStatus({ kind: 'sending' })
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...fields, _subject: `[Portfolio] ${fields.subject}` }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus({ kind: 'success', message: 'Thanks — your message has been sent. I’ll get back to you soon.' })
      setFields(empty)
      setTouched({})
      setErrors({})
    } catch {
      setStatus({
        kind: 'error',
        message: `Sorry, the message couldn’t be sent right now. Please email me directly at ${profile.email}.`,
      })
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  }

  const field = (k: keyof Fields) => {
    const err = touched[k] ? errors[k] : undefined
    return {
      id: `${uid}-${k}`,
      name: k,
      value: fields[k],
      onChange: set(k),
      onBlur: blur(k),
      'aria-invalid': !!err,
      'aria-describedby': err ? `${uid}-${k}-err` : undefined,
      className: `w-full rounded-xl border bg-bg/50 px-4 py-3 text-[15px] text-fg placeholder:text-muted/70 transition-colors outline-none focus:border-blue focus:ring-4 focus:ring-blue/15 ${
        err ? 'border-rose-400/70' : 'border-line'
      }`,
    }
  }
  const errorText = (k: keyof Fields) =>
    touched[k] && errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
        <CircleAlert className="size-3.5" aria-hidden /> {errors[k]}
      </p>
    ) : null

  const contactLinks = [
    { href: `mailto:${profile.email}`, label: 'Email', value: profile.email, icon: <Mail className="size-5" aria-hidden /> },
    { href: profile.linkedin, label: 'LinkedIn', value: 'suresh-kumar-bbb113253', icon: <LinkedInIcon className="size-5" />, external: true },
    { href: profile.phoneHref, label: 'Phone', value: profile.phone, icon: <Phone className="size-5" aria-hidden /> },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,var(--glow-2),transparent_60%)] blur-3xl" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-blue uppercase">
              <span aria-hidden className="bg-gradient-brand h-px w-8" /> Contact
            </p>
            <h2 id="contact-title" className="text-4xl leading-[1.05] font-semibold text-fg sm:text-5xl lg:text-6xl">
              Have a challenging idea? <span className="text-gradient">Let’s build something meaningful.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted sm:text-lg">
              Open to full stack roles and collaborations — remote or on-site. The quickest way to reach me is email.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 space-y-3">
            {contactLinks.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="glass group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-line-strong"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line text-blue transition-colors group-hover:text-violet">
                  {c.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-muted">{c.label}</span>
                  <span className="block truncate font-medium text-fg">{c.value}</span>
                </span>
                <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" aria-hidden />
                {c.external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            ))}
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-1 pt-1 text-sm text-muted transition-colors hover:text-fg"
            >
              {copied ? <Check className="size-4 text-emerald-400" aria-hidden /> : <Copy className="size-4" aria-hidden />}
              <span aria-live="polite">{copied ? 'Email copied' : 'Copy email address'}</span>
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="glass gradient-border rounded-3xl p-6 sm:p-8" aria-describedby={`${uid}-form-note`}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-name`} className="mb-2 block text-sm font-medium text-fg">Name</label>
                <input {...field('name')} type="text" autoComplete="name" placeholder="Your name" />
                {errorText('name')}
              </div>
              <div>
                <label htmlFor={`${uid}-email`} className="mb-2 block text-sm font-medium text-fg">Email</label>
                <input {...field('email')} type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" />
                {errorText('email')}
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor={`${uid}-subject`} className="mb-2 block text-sm font-medium text-fg">Subject</label>
              <input {...field('subject')} type="text" placeholder="Role, project or collaboration" />
              {errorText('subject')}
            </div>
            <div className="mt-5">
              <label htmlFor={`${uid}-message`} className="mb-2 block text-sm font-medium text-fg">Message</label>
              <textarea {...field('message')} rows={5} placeholder="Tell me a little about what you're building…" className={`${field('message').className} resize-y`} />
              {errorText('message')}
            </div>

            {/* honeypot for bots — hidden from people and assistive tech */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Company <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <button
              type="submit"
              disabled={status.kind === 'sending'}
              className="bg-gradient-brand mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_40px_-12px_var(--blue)] transition-all hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
            >
              {status.kind === 'sending' ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" aria-hidden /> Sending…
                </>
              ) : (
                <>
                  <Send className="size-4" aria-hidden /> {FORM_ENDPOINT ? 'Send message' : 'Send via email'}
                </>
              )}
            </button>
            <p id={`${uid}-form-note`} className="mt-3 text-xs text-muted">
              {FORM_ENDPOINT
                ? 'Your message is delivered securely to my inbox.'
                : 'Submitting opens your email app with this message pre-filled.'}
            </p>

            <div aria-live="polite" role="status">
              <AnimatePresence>
                {status.message && status.kind !== 'sending' && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-5 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${
                      status.kind === 'error'
                        ? 'border-rose-400/40 bg-rose-400/10 text-rose-700 dark:text-rose-300'
                        : 'border-emerald-400/40 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300'
                    }`}
                  >
                    {status.kind === 'error' ? <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden /> : <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden />}
                    <span>{status.message}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
