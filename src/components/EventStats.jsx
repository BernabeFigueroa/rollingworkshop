import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 120, label: 'lugares presenciales' },
  { value: 10, label: 'charlas de speakers' },
  { value: 220, label: 'de 18.00 a 21.40 hs', duration: true },
  { value: 2, label: 'modalidades: presencial y virtual' },
]
const formatValue = (stat, progress) => {
  const value = Math.round(stat.value * progress)
  return stat.duration ? `${Math.floor(value / 60)} h ${String(value % 60).padStart(2,'0')}` : String(value)
}

export default function EventStats() {
  const block = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let observer
    let started = false
    let active = true

    function start() {
      if (started) return
      started = true
      if (motion.matches) { setProgress(1); return }
      let beginning
      function tick(time) {
        if (!active) return
        beginning ??= time
        const elapsed = Math.min(1,(time - beginning) / 1500)
        setProgress(1 - (1 - elapsed) ** 3)
        if (elapsed < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    function reduceMotion() {
      if (!motion.matches) return
      started = true
      cancelAnimationFrame(frame)
      setProgress(1)
      observer?.disconnect()
    }

    if (motion.matches || !('IntersectionObserver' in window)) start()
    else {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { start(); observer.disconnect() }
      },{ threshold: .2 })
      observer.observe(block.current)
    }
    motion.addEventListener('change',reduceMotion)
    return () => { active = false; cancelAnimationFrame(frame); observer?.disconnect(); motion.removeEventListener('change',reduceMotion) }
  },[])

  return <dl ref={block} className="event-stats landing-container">{stats.map(stat => <div key={stat.label}><dt><span aria-hidden="true">{formatValue(stat,progress)}</span><span className="sr-only">{formatValue(stat,1)}</span></dt><dd>{stat.label}</dd></div>)}</dl>
}
