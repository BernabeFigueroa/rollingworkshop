
import { useEffect, useRef } from 'react'

const scheduleData = [
  { time: '18:00', title: 'Acreditación y bienvenida', speaker: '' },
  { time: '18:20', title: 'Tu primer día como developer', speaker: 'Daniela Cardozo' },
  { time: '18:40', title: 'De cero a tu primer proyecto', speaker: 'Franco Díaz' },
  { time: '19:00', title: 'Armá tu portfolio con IA', speaker: 'Gastón Roger' },
  { time: '19:20', title: 'Git y GitHub sin miedo', speaker: 'Mauro Coniglio' },
  { time: '19:40', title: 'Tu primer backend con Node', speaker: 'José Díaz' },
  { time: '20:00', title: 'Preparate para tu primera entrevista', speaker: 'Tomás Gómez' },
  { time: '20:20', title: 'Mi primer trabajo en IT', speaker: 'Pablo Basso' },
  { time: '20:40', title: 'Testing: cómo no romper todo', speaker: 'Julián Martín' },
  { time: '21:00', title: 'Diseño para developers', speaker: 'Tomás Escudero' },
  { time: '21:20', title: 'Tu primera base de datos', speaker: 'Andrés Perlo' },
  { time: '21:40', title: 'Preguntas y networking', speaker: '' }
];


const Agenda = () => {
  const list = useRef(null)

  useEffect(() => {
    const element = list.current
    const rows = [...element.children]
    let frame = 0

    function update() {
      frame = 0
      const points = rows.map((row,index) => row.offsetTop + (index === 0 ? 24.5 : 36.5))
      const start = points[0]
      const length = Math.max(1,points.at(-1) - start)
      const readingPosition = window.innerHeight * .48 - element.getBoundingClientRect().top
      const progress = Math.max(0,Math.min(1,(readingPosition - start) / length))
      element.style.setProperty('--agenda-line-start',`${start}px`)
      element.style.setProperty('--agenda-line-length',`${length}px`)
      element.style.setProperty('--agenda-progress',progress)
      const closest = points.reduce((best,point,index) => Math.abs(point - readingPosition) < Math.abs(points[best] - readingPosition) ? index : best,0)
      const withinAgenda = readingPosition >= start - 45 && readingPosition <= points.at(-1) + 45
      rows.forEach((row,index) => {
        row.classList.toggle('is-reading',withinAgenda && index === closest)
        row.classList.toggle('is-passed',points[index] <= readingPosition)
      })
    }

    function schedule() { if (!frame) frame = requestAnimationFrame(update) }
    const resize = new ResizeObserver(schedule)
    resize.observe(element)
    window.addEventListener('scroll',schedule,{ passive: true })
    window.addEventListener('resize',schedule)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      window.removeEventListener('scroll',schedule)
      window.removeEventListener('resize',schedule)
    }
  },[])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.15 })
    const rows = Array.from(list.current.children)
    rows.forEach(row => observer.observe(row))
    return () => {
      observer.disconnect()
      rows.forEach(row => row.classList.remove('is-revealed'))
    }
  }, [])

  return (
  <section id="agenda" className="landing-container landing-section agenda-layout" aria-labelledby="agenda-title">
    <header className="agenda-intro"><p className="section-eyebrow">Agenda</p><h2 id="agenda-title" className="section-title">Jueves 19 de<br />noviembre</h2><p>Diez charlas cortas para salir con un plan claro.<br />Al final queda tiempo para preguntas y networking.</p></header>
    <ul ref={list} className="agenda-list">{scheduleData.map(event => <li key={event.time}><time>{event.time}</time><div><h3>{event.title}</h3>{event.speaker && <p>{event.speaker}</p>}</div></li>)}</ul>
  </section>
)
}
export default Agenda
