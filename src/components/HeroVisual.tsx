import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react'
import { Bot, ShieldCheck } from 'lucide-react'
import { heroTech } from '../data/profile'
import { useFinePointer } from '../hooks/useFinePointer'

/* ─────────────────────────── Illustrative code snippets ───────────────────────────
   Generic examples of each stack — not code from any client project. */
type Seg = [cls: string, text: string]
interface Snippet {
  file: string
  tech: string // which floating label lights up
  method: string
  route: string
  meta: string
  lines: Seg[][]
}

const K = 'text-blue' // keyword
const A = 'text-violet' // annotation / decorator
const S = 'text-cyan' // string
const T = 'text-fg' // type / identifier
const P = '' // plain (inherits muted)

const snippets: Snippet[] = [
  {
    file: 'SupplierController.java',
    tech: 'Spring Boot',
    method: 'POST',
    route: '/api/v1/suppliers',
    meta: 'JWT · RBAC',
    lines: [
      [[A, '@RestController']],
      [[A, '@PreAuthorize'], [P, '('], [S, '"hasRole(\'ADMIN\')"'], [P, ')']],
      [[K, 'public class '], [T, 'SupplierController'], [P, ' {']],
      [[P, '  '], [A, '@PostMapping'], [P, '('], [S, '"/suppliers"'], [P, ')']],
      [[P, '  '], [K, 'public '], [T, 'ResponseEntity'], [P, '<Dto>']],
      [[P, '    create('], [A, '@Valid'], [P, ' Dto req) {']],
      [[P, '    '], [K, 'return '], [P, 'service.register(req);']],
      [[P, '  }']],
      [[P, '}']],
    ],
  },
  {
    file: 'tenders.routes.ts',
    tech: 'Node.js',
    method: 'GET',
    route: '/api/tenders',
    meta: '200 OK · Express',
    lines: [
      [[K, 'const '], [T, 'router'], [P, ' = express.'], [T, 'Router'], [P, '();']],
      [],
      [[P, 'router.'], [T, 'get'], [P, '('], [S, "'/tenders'"], [P, ',']],
      [[P, '  authenticate, '], [T, 'authorize'], [P, '('], [S, "'SUPPLIER'"], [P, '),']],
      [[P, '  '], [K, 'async '], [P, '(req, res) => {']],
      [[P, '    '], [K, 'const '], [P, 'list = '], [K, 'await']],
      [[P, '      tenderService.'], [T, 'listOpen'], [P, '();']],
      [[P, '    res.'], [T, 'json'], [P, '(list);']],
      [[P, '  });']],
    ],
  },
  {
    file: 'registration.component.ts',
    tech: 'Angular',
    method: 'SSR',
    route: '/ar/registration',
    meta: 'dir="rtl" · Signals',
    lines: [
      [[A, '@Component'], [P, '({ standalone: '], [K, 'true'], [P, ' })']],
      [[K, 'export class '], [T, 'RegistrationComponent'], [P, ' {']],
      [[P, '  step = '], [T, 'signal'], [P, '(1);']],
      [[P, '  lang = '], [T, 'inject'], [P, '(Locale).lang;']],
      [],
      [[P, '  dir = '], [T, 'computed'], [P, '(() =>']],
      [[P, '    '], [K, 'this'], [P, '.lang() === '], [S, "'ar'"]],
      [[P, '      ? '], [S, "'rtl'"], [P, ' : '], [S, "'ltr'"], [P, ');']],
      [[P, '}']],
    ],
  },
]

const lengthOf = (s: Snippet) => s.lines.reduce((n, l) => n + l.reduce((m, [, t]) => m + t.length, 0) + 1, 0)

/** Types a snippet, holds it, erases it, then moves to the next. */
function useTypewriter(active: boolean, reduce: boolean) {
  const [idx, setIdx] = useState(0)
  const [n, setN] = useState(reduce ? lengthOf(snippets[0]) : 0)
  const [phase, setPhase] = useState<'type' | 'hold' | 'erase'>(reduce ? 'hold' : 'type')

  useEffect(() => {
    if (reduce || !active) return
    const total = lengthOf(snippets[idx])
    let t: ReturnType<typeof setTimeout>
    if (phase === 'type') {
      if (n >= total) t = setTimeout(() => setPhase('hold'), 60)
      else t = setTimeout(() => setN((v) => Math.min(total, v + 2)), 22)
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('erase'), 3200)
    } else {
      if (n <= 0) {
        t = setTimeout(() => {
          setIdx((i) => (i + 1) % snippets.length)
          setPhase('type')
        }, 200)
      } else t = setTimeout(() => setN((v) => Math.max(0, v - 8)), 14)
    }
    return () => clearTimeout(t)
  }, [n, phase, idx, active, reduce])

  return { snippet: snippets[idx], n, typing: phase !== 'hold' }
}

function Code({ snippet, n }: { snippet: Snippet; n: number }) {
  let left = n
  let cursorPlaced = false
  return (
    <code>
      {snippet.lines.map((line, li) => {
        const parts = line.map(([cls, text], si) => {
          if (left <= 0) return null
          const shown = text.slice(0, left)
          left -= shown.length
          return (
            <span key={si} className={cls}>
              {shown}
            </span>
          )
        })
        let cursor = null
        if ((left <= 0 || li === snippet.lines.length - 1) && !cursorPlaced) {
          cursorPlaced = true
          cursor = <span className="anim-blink ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-blue" />
        }
        left -= 1 // newline
        return (
          <span key={li} className="block min-h-[1.75em]">
            {parts}
            {cursor}
          </span>
        )
      })}
    </code>
  )
}

/* ─────────────────────────── Layout ─────────────────────────── */
const labelPos: { top: string; left: string; delay: string; depth: number }[] = [
  { top: '7%', left: '22%', delay: '0s', depth: 34 },
  { top: '3%', left: '64%', delay: '1.2s', depth: 24 },
  { top: '46%', left: '88%', delay: '0.6s', depth: 40 },
  { top: '86%', left: '78%', delay: '1.8s', depth: 28 },
  { top: '93%', left: '34%', delay: '0.9s', depth: 36 },
  { top: '30%', left: '10%', delay: '1.5s', depth: 30 },
]

const nodes = [
  [80, 70], [330, 40], [450, 230], [380, 440], [110, 450], [30, 240],
] as const

function useDepth(px: MotionValue<number>, py: MotionValue<number>, depth: number) {
  return { x: useTransform(px, (v) => v * depth), y: useTransform(py, (v) => v * depth) }
}

function Label({ text, i, px, py, active }: { text: string; i: number; px: MotionValue<number>; py: MotionValue<number>; active: boolean }) {
  const pos = labelPos[i]
  const { x, y } = useDepth(px, py, pos.depth)
  return (
    <motion.span className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: pos.top, left: pos.left, x, y }}>
      <span
        className={`glass anim-float block rounded-full px-2.5 py-1 text-[10px] font-medium whitespace-nowrap transition-all duration-500 sm:px-3 sm:py-1.5 sm:text-xs ${
          active ? 'scale-110 border-blue/60 text-fg shadow-[0_0_24px_-4px_var(--blue)]' : 'text-fg/80'
        }`}
        style={{ animationDelay: pos.delay }}
      >
        <span className={`mr-1.5 inline-block size-1.5 -translate-y-px rounded-full ${active ? 'bg-emerald-400' : 'bg-gradient-brand'}`} />
        {text}
      </span>
    </motion.span>
  )
}

/**
 * Decorative, original illustration of a full-stack workspace: the editor types illustrative
 * snippets for each stack, and layers drift with the pointer for depth.
 * Hidden from assistive tech.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const reduce = !!useReducedMotion()
  const fine = useFinePointer()
  const { snippet, n } = useTypewriter(inView, reduce)

  // pointer parallax (-0.5..0.5)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 60, damping: 18 })
  const py = useSpring(my, { stiffness: 60, damping: 18 })
  const rotY = useTransform(px, (v) => v * 10)
  const rotX = useTransform(py, (v) => v * -10)
  const card = useDepth(px, py, 14)
  const floatA = useDepth(px, py, 30)
  const floatB = useDepth(px, py, 22)
  const ringsX = useTransform(px, (v) => v * -10)
  const ringsY = useTransform(py, (v) => v * -10)

  useEffect(() => {
    if (!fine) return
    const move = (e: PointerEvent) => {
      mx.set(e.clientX / innerWidth - 0.5)
      my.set(e.clientY / innerHeight - 0.5)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [fine, mx, my])

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[520px] select-none"
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
    >
      {/* glow */}
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,var(--glow-1),transparent_65%)] blur-2xl" />
      <div className="absolute inset-[25%] translate-x-[18%] rounded-full bg-[radial-gradient(circle,var(--glow-2),transparent_65%)] blur-2xl" />

      {/* orbit rings + network */}
      <motion.svg viewBox="0 0 480 480" className="absolute inset-0 size-full" style={{ x: ringsX, y: ringsY }}>
        <defs>
          <linearGradient id="hv-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--blue)" />
            <stop offset="1" stopColor="var(--violet)" />
          </linearGradient>
        </defs>
        <g className="anim-orbit" style={{ transformOrigin: '240px 240px' }}>
          <circle cx="240" cy="240" r="226" fill="none" stroke="var(--line-strong)" strokeDasharray="2 8" />
          <circle cx="240" cy="14" r="4" fill="var(--blue)" />
        </g>
        <g className="anim-orbit-rev" style={{ transformOrigin: '240px 240px' }}>
          <circle cx="240" cy="240" r="170" fill="none" stroke="var(--line)" />
          <circle cx="410" cy="240" r="3" fill="var(--violet)" />
        </g>
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <line x1="240" y1="240" x2={x} y2={y} stroke="url(#hv-stroke)" strokeOpacity="0.35" className="anim-dash" />
            <circle cx={x} cy={y} r="3.5" fill="var(--bg)" stroke="url(#hv-stroke)" strokeWidth="1.5" className="anim-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
          </g>
        ))}
        {/* data packets travelling along the network */}
        {!reduce &&
          nodes.map(([x, y], i) => (
            <circle key={`p${i}`} r="2.5" fill="var(--cyan)">
              <animateMotion dur={`${2.6 + i * 0.35}s`} repeatCount="indefinite" path={`M240 240 L${x} ${y}`} begin={`${i * 0.5}s`} />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${2.6 + i * 0.35}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
            </circle>
          ))}
      </motion.svg>

      {/* main editor card */}
      <motion.div className="absolute top-1/2 left-1/2 w-[74%] -translate-x-1/2 -translate-y-1/2" style={card}>
        <div className="glass overflow-hidden rounded-2xl shadow-[var(--shadow)]">
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
            <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="size-2.5 rounded-full bg-[#28c840]/80" />
            <AnimatePresence mode="wait">
              <motion.span
                key={snippet.file}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="ml-3 truncate font-mono text-[10px] text-muted sm:text-[11px]"
              >
                {snippet.file}
              </motion.span>
            </AnimatePresence>
            <span className="ml-auto flex gap-1">
              {snippets.map((s) => (
                <span key={s.file} className={`h-1 rounded-full transition-all duration-500 ${s === snippet ? 'w-4 bg-blue' : 'w-1.5 bg-line-strong'}`} />
              ))}
            </span>
          </div>
          <pre className="overflow-hidden px-4 py-4 font-mono text-[9.5px] leading-[1.75] whitespace-pre text-muted sm:text-[11.5px]">
            <Code snippet={snippet} n={n} />
          </pre>
        </div>
      </motion.div>

      {/* API status card */}
      <motion.div className="absolute top-[14%] right-[2%]" style={floatA}>
        <div className="glass anim-float rounded-xl px-3 py-2 shadow-[var(--shadow)] sm:px-4 sm:py-3">
          <AnimatePresence mode="wait">
            <motion.div key={snippet.route} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs">
                <span className="rounded-md bg-[color-mix(in_srgb,var(--blue)_18%,transparent)] px-1.5 py-0.5 font-semibold text-blue">{snippet.method}</span>
                <span className="text-fg">{snippet.route}</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-muted sm:text-xs">
                <ShieldCheck className="size-3 text-cyan" /> {snippet.meta}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* AI card */}
      <motion.div className="absolute bottom-[12%] left-0 hidden max-w-[54%] sm:block" style={floatB}>
        <div className="glass anim-float rounded-xl px-4 py-3 shadow-[var(--shadow)]" style={{ animationDelay: '1.4s' }}>
          <div className="flex items-center gap-2 text-xs font-semibold text-fg">
            <span className="bg-gradient-brand grid size-5 place-items-center rounded-md text-white">
              <Bot className="size-3" />
            </span>
            LLM summary
            <span className="ml-1 flex gap-0.5">
              {[0, 1, 2].map((d) => (
                <span key={d} className="anim-pulse size-1 rounded-full bg-violet" style={{ animationDelay: `${d * 0.25}s` }} />
              ))}
            </span>
          </div>
          <div className="mt-2 space-y-1.5">
            {['w-36', 'w-28', 'w-32'].map((w, i) => (
              <motion.div
                key={w}
                className={`h-1.5 rounded-full ${w} ${i === 2 ? 'bg-gradient-brand opacity-70' : 'bg-line-strong'} origin-left`}
                animate={reduce ? undefined : { scaleX: [0.2, 1, 1, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.3, times: [0, 0.35, 0.8, 1], ease: 'easeInOut' }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* tech labels */}
      {heroTech.map((t, i) => (
        <Label key={t} text={t} i={i} px={px} py={py} active={t === snippet.tech || (t === 'Java' && snippet.tech === 'Spring Boot')} />
      ))}
    </motion.div>
  )
}
