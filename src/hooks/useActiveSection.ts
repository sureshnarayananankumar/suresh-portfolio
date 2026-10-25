import { useEffect, useState } from 'react'

/** Returns the id of the section currently in the reading zone of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!els.length) return

    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio)
          else visible.delete(e.target.id)
        }
        // pick the first section (document order) that is visible
        const first = ids.find((id) => visible.has(id))
        setActive(first ?? '')
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.01] },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
