import { useEffect, useState } from 'react'

/** True on devices with a precise hovering pointer (mouse/trackpad) and motion allowed. */
export function useFinePointer() {
  const query = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
  const [ok, setOk] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setOk(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return ok
}
