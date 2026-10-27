const Header = () => {
  return (
    <div className="min-h-screen bg-negro-pagina flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-rojo-rolling rounded-2xl p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
    
          <div className="text-white space-y-6">
            <span className="text-sm font-semibold tracking-wider">
              Workshop • Entradas Limitadas
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              ¿Por dónde empiezo a <span className="text-black">programar?</span>
            </h1>
            
            <p className="text-red-100 text-lg">
              Una tarde con diez speakers de Rolling Code School para ordenar tus primeros pasos, qué aprender, cómo practicar y cómo mostrar lo que sabés.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#entradas" className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300">
                Comprar entrada
              </a>
              <a href="#agenda" className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors duration-300 backdrop-blur-sm">
                Ver agenda
              </a>
            </div>
          </div>

          <div className="bg-negro-pagina rounded-xl p-6 text-white backdrop-blur-sm border border-white/10">
            <div className="flex items-start gap-4 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-2xl font-bold">JUE 19/11</p>
                <p className="text-gray-400 text-lg">18.00 hs</p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-semibold">Rolling Code School</p>
                <p className="text-gray-400 text-sm">Gral. Paz 516, Entrerríos</p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold">Entradas desde $15.000</p>
                <p className="text-gray-400 text-xs">Early Bird hasta el 21/10</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 bg-gray-800 rounded-full text-sm font-medium">
                Presencial
              </span>
              <span className="px-4 py-1.5 bg-gray-800 rounded-full text-sm font-medium">
                Virtual
              </span>
              <span className="px-4 py-1.5 bg-red-600 rounded-full text-sm font-medium">
                Cupos limitados
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
