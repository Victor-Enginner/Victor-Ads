import { useEffect, useState } from 'react'

/**
 * True when continuous JS-driven animation should be skipped: small/touch
 * screens, or a user who asked the OS to reduce motion. CSS keyframes can be
 * disabled from a media query, but `motion/react` loops run on rAF and have to
 * be opted out of in JS.
 */
export function useLiteMotion() {
  const [lite, setLite] = useState(false)

  useEffect(() => {
    const queries = [
      window.matchMedia('(max-width: 767px)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
    ]
    const update = () => setLite(queries.some((q) => q.matches))
    update()
    queries.forEach((q) => q.addEventListener('change', update))
    return () => queries.forEach((q) => q.removeEventListener('change', update))
  }, [])

  return lite
}
