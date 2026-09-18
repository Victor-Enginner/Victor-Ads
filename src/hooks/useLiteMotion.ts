import { useEffect, useState } from 'react'

/**
 * True on small screens, where continuous JS-driven animation should be
 * skipped. CSS keyframes can be turned off from a media query, but
 * `motion/react` loops run on rAF and have to be opted out of in JS.
 *
 * This deliberately does NOT read `prefers-reduced-motion`. It used to, and the
 * result was that a desktop with Windows' animation effects switched off got a
 * completely inert page — see the note in index.css.
 */
export function useLiteMotion() {
  const [lite, setLite] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => setLite(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return lite
}
