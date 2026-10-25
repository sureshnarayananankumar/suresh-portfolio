import { ArrowUp, Mail } from 'lucide-react'
import { navItems, profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon } from './BrandIcons'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()
  const socials = [
    { href: `mailto:${profile.email}`, label: 'Email', icon: <Mail className="size-4" aria-hidden /> },
    { href: profile.linkedin, label: 'LinkedIn', icon: <LinkedInIcon />, external: true },
    ...(profile.github ? [{ href: profile.github, label: 'GitHub', icon: <GitHubIcon />, external: true }] : []),
  ]

  return (
    <footer className="border-t border-line">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_auto] md:items-start">
        <div>
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <p className="font-display font-semibold text-fg">{profile.name}</p>
              <p className="text-sm text-muted">{profile.title} · {profile.location}</p>
            </div>
          </div>
          <ul className="mt-6 flex gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="glass grid size-10 place-items-center rounded-full text-muted transition-colors hover:text-fg"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-muted transition-colors hover:text-fg">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#top" className="glass inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-fg">
          <ArrowUp className="size-4" aria-hidden /> Back to top
        </a>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p>Designed and built with care.</p>
        </div>
      </div>
    </footer>
  )
}
