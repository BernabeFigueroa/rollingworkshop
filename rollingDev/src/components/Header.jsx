import { useEffect, useState } from 'react'

const counterItems = [
  { id: 1, target: 120, label: 'lugares presenciales' },
  { id: 2, target: 10, label: 'charlas de speakers' },
  { id: 3, target: 220, label: 'de 18.00 a 21.40 hs' },
  { id: 4, target: 2, label: 'modalidades: presencial y virtual' },
]

function StatsCounter() {
  const [values, setValues] = useState(counterItems.map(() => 0))

  useEffect(() => {
    const steps = 60
    const interval = 2000 / steps
    let step = 0

    const timer = setInterval(() => {
      step += 1
      setValues(counterItems.map(({ target }) => Math.round((target * step) / steps)))

      if (step === steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <section aria-label="Datos del evento" className="bg-negro-pagina px-6 py-10">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-gray-800 bg-negro-pantalla px-8 py-10">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {counterItems.map(({ id, label }) => {
            const value = values[id - 1]
            const displayValue = id === 3
              ? `${Math.floor(value / 60)}h ${value % 60}`
              : value

            return (
              <div key={id} className="space-y-2">
                <p className="text-4xl font-bold tracking-tight text-red-600">
                  {displayValue}
                </p>
                <p className="text-sm leading-relaxed text-gray-400">{label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const Header = () => (
  <>
    <section className="flex min-h-screen items-center justify-center bg-negro-pagina p-6">
      <div className="w-full max-w-5xl rounded-2xl bg-rojo-rolling p-8 shadow-2xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div className="space-y-6 text-white">
            <span className="text-sm font-semibold tracking-wider">
              Workshop • Entradas Limitadas
            </span>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              ¿Por dónde empiezo a <span className="text-black">programar?</span>
            </h1>

            <p className="text-lg text-red-100">
              Una tarde con diez speakers de Rolling Code School para ordenar tus primeros pasos, qué aprender, cómo practicar y cómo mostrar lo que sabés.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#entradas" className="rounded-lg bg-black px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-gray-800">
                Comprar entrada
              </a>
              <a href="#agenda" className="rounded-lg bg-white/20 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/30">
                Ver agenda
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-negro-pagina p-6 text-white backdrop-blur-sm">
            <div className="mb-5 flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="mt-1 h-6 w-6 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-2xl font-bold">JUE 19/11</p>
                <p className="text-lg text-gray-400">18.00 hs</p>
              </div>
            </div>

            <div className="mb-5 flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="mt-1 h-6 w-6 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-semibold">Rolling Code School</p>
                <p className="text-sm text-gray-400">Gral. Paz 516, Entrerríos</p>
              </div>
            </div>

            <div className="mb-6 flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="mt-1 h-6 w-6 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold">Entradas desde $15.000</p>
                <p className="text-xs text-gray-400">Early Bird hasta el 21/10</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-gray-800 px-4 py-1.5 text-sm font-medium">Presencial</span>
              <span className="rounded-full bg-gray-800 px-4 py-1.5 text-sm font-medium">Virtual</span>
              <span className="rounded-full bg-red-600 px-4 py-1.5 text-sm font-medium">Cupos limitados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <StatsCounter />
  </>
)

export default Header
