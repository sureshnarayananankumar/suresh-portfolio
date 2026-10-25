import type { Project } from '../types'

const accentVar: Record<Project['accent'], string> = {
  blue: 'var(--blue)',
  violet: 'var(--violet)',
  cyan: 'var(--cyan)',
}

/** Original, abstract architecture visuals — not screenshots of the real systems. */
export function ProjectIllustration({ project }: { project: Project }) {
  const a = accentVar[project.accent]
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-bg-2" aria-hidden="true">
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 70% 20%, color-mix(in srgb, ${a} 22%, transparent), transparent 60%)` }} />
      {project.visual === 'microservices' && <Microservices a={a} />}
      {project.visual === 'bilingual' && <Bilingual a={a} />}
      {project.visual === 'documents' && <Documents a={a} />}
      <span className="absolute top-3 right-3 rounded-full border border-line bg-bg/70 px-2.5 py-1 font-mono text-[10px] tracking-wide text-muted backdrop-blur">
        Illustrative visual
      </span>
    </div>
  )
}

const box = 'fill-[var(--card-solid)] stroke-[var(--line-strong)]'
const label = 'fill-[var(--muted)] font-mono text-[10px]'
const strong = 'fill-[var(--fg)] font-mono text-[11px] font-semibold'

function Microservices({ a }: { a: string }) {
  const modules: [string, string][] = [
    ['Enterprise', 'Admin'],
    ['Company', 'Profile'],
    ['Contract', 'Mgmt'],
    ['JStore', 'service'],
    ['Sky', 'Cards'],
  ]
  return (
    <svg viewBox="0 0 400 250" className="absolute inset-0 size-full">
      {/* client */}
      <rect x="150" y="20" width="100" height="30" rx="8" className={box} />
      <text x="200" y="39" textAnchor="middle" className={strong}>Angular UI</text>
      {/* gateway */}
      <rect x="90" y="70" width="220" height="30" rx="8" fill={`color-mix(in srgb, ${a} 16%, var(--card-solid))`} stroke={a} strokeOpacity="0.6" />
      <text x="200" y="89" textAnchor="middle" className={strong}>JWT · Spring Security · RBAC</text>
      <line x1="200" y1="50" x2="200" y2="70" stroke={a} className="anim-dash" />
      {modules.map((m, i) => {
        const x = 14 + i * 76
        return (
          <g key={m[0]}>
            <path d={`M200 100 C200 120, ${x + 34} 115, ${x + 34} 135`} fill="none" stroke={a} strokeOpacity="0.45" className="anim-dash" />
            <rect x={x} y="135" width="68" height="44" rx="8" className={box} />
            <text x={x + 34} y="153" textAnchor="middle" className={label}>{m[0]}</text>
            <text x={x + 34} y="167" textAnchor="middle" className={label}>{m[1]}</text>
            <line x1={x + 34} y1="179" x2={x + 34} y2="200" stroke="var(--line-strong)" />
          </g>
        )
      })}
      <rect x="14" y="200" width="372" height="26" rx="8" className={box} />
      <text x="200" y="217" textAnchor="middle" className={label}>MySQL · Spring Data JPA / Hibernate</text>
    </svg>
  )
}

function Bilingual({ a }: { a: string }) {
  return (
    <svg viewBox="0 0 400 250" className="absolute inset-0 size-full">
      {/* EN page */}
      <g>
        <rect x="24" y="26" width="160" height="190" rx="10" className={box} />
        <text x="38" y="48" className={strong}>/en</text>
        <rect x="38" y="62" width="110" height="8" rx="4" fill={a} opacity="0.75" />
        {[80, 94, 108].map((y, i) => <rect key={y} x="38" y={y} width={120 - i * 18} height="6" rx="3" fill="var(--line-strong)" />)}
        <rect x="38" y="130" width="62" height="40" rx="6" fill="var(--line)" />
        <rect x="106" y="130" width="62" height="40" rx="6" fill="var(--line)" />
        <rect x="38" y="184" width="56" height="18" rx="9" fill={a} opacity="0.5" />
      </g>
      {/* AR page (mirrored layout = RTL) */}
      <g>
        <rect x="216" y="26" width="160" height="190" rx="10" className={box} />
        <text x="362" y="48" textAnchor="end" className={strong}>/ar</text>
        <rect x="252" y="62" width="110" height="8" rx="4" fill={a} opacity="0.75" />
        {[80, 94, 108].map((y, i) => <rect key={y} x={362 - (120 - i * 18)} y={y} width={120 - i * 18} height="6" rx="3" fill="var(--line-strong)" />)}
        <rect x="300" y="130" width="62" height="40" rx="6" fill="var(--line)" />
        <rect x="232" y="130" width="62" height="40" rx="6" fill="var(--line)" />
        <rect x="306" y="184" width="56" height="18" rx="9" fill={a} opacity="0.5" />
      </g>
      {/* swap arrows */}
      <g stroke={a} fill="none" strokeWidth="1.5">
        <path d="M188 112 h24 m-5 -5 l5 5 l-5 5" />
        <path d="M212 130 h-24 m5 -5 l-5 5 l5 5" />
      </g>
      <text x="200" y="236" textAnchor="middle" className={label}>LTR ⇄ RTL · SSR · JSON-LD</text>
    </svg>
  )
}

function Documents({ a }: { a: string }) {
  return (
    <svg viewBox="0 0 400 250" className="absolute inset-0 size-full">
      {/* stacked docs */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${30 + i * 10} ${40 + i * 10})`}>
          <rect width="96" height="122" rx="8" className={box} />
          {[22, 36, 50, 64].map((y, j) => <rect key={y} x="14" y={y} width={68 - j * 8} height="6" rx="3" fill="var(--line-strong)" />)}
        </g>
      ))}
      <path d="M150 112 C175 112, 175 112, 196 112" stroke={a} fill="none" className="anim-dash" />
      {/* AI classifier */}
      <circle cx="222" cy="112" r="26" fill={`color-mix(in srgb, ${a} 16%, var(--card-solid))`} stroke={a} strokeOpacity="0.7" />
      <text x="222" y="116" textAnchor="middle" className={strong}>LLM</text>
      <path d="M248 112 C262 112, 262 70, 280 70" stroke={a} fill="none" className="anim-dash" />
      <path d="M248 112 C262 112, 262 150, 280 150" stroke={a} fill="none" className="anim-dash" />
      {/* results */}
      <rect x="280" y="54" width="96" height="32" rx="8" className={box} />
      <circle cx="294" cy="70" r="4" fill={a} />
      <text x="304" y="74" className={label}>type: classified</text>
      <rect x="280" y="134" width="96" height="32" rx="8" className={box} />
      <circle cx="294" cy="150" r="4" fill="var(--violet)" />
      <text x="304" y="154" className={label}>missing details</text>
      {/* chart */}
      <g transform="translate(30 196)">
        {[18, 28, 14, 34, 24, 40, 30, 46].map((h, i) => (
          <rect key={i} x={i * 14} y={40 - h} width="9" height={h} rx="2" fill={a} opacity={0.35 + i * 0.07} transform="translate(0 -16)" />
        ))}
      </g>
      <polyline points="170,212 210,200 250,206 290,188 330,192 370,176" fill="none" stroke="var(--violet)" strokeWidth="1.5" />
      <text x="270" y="232" textAnchor="middle" className={label}>aggregation → dashboards</text>
    </svg>
  )
}
