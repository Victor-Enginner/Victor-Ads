import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left pointer-events-none"
      style={{
        transform: `scaleX(${progress})`,
        background: 'linear-gradient(90deg, #9EFF00, #00E5A8)',
        boxShadow: '0 0 12px rgba(158,255,0,0.45)',
      }}
    />
  )
}
