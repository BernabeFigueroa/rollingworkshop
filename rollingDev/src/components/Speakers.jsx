import image1 from '../assets/image (1).png'
import image2 from '../assets/image (2).png'
import image3 from '../assets/image (3).png'
import image4 from '../assets/image (4).png'
import image5 from '../assets/image (5).png'
import image6 from '../assets/image (6).png'
import image7 from '../assets/image (7).png'
import image8 from '../assets/image (8).png'
import image9 from '../assets/image (9).png'
import image10 from '../assets/image (10).png'

const speakerList = [
  { id: 1, nombre: "Tomás Escudero", tema: "Diseño para Developers", descripcion: "Qué mira un equipo de diseño antes de que escribas código y cómo leer un mockup para construirlo igual.", image: image1 },
  { id: 2, nombre: "Franco Díaz", tema: "De cero a tu primer proyecto", descripcion: "Un recorrido para pasar de mirar tutoriales a terminar una app simple con HTML, JavaScript y React.", image: image2 },
  { id: 3, nombre: "Gastón", tema: "Arma tu portafolio con IA", descripcion: "Cómo usar asistentes de IA para construir y publicar un portafolio que muestre lo que sabes hacer.", image: image3 },
  { id: 4, nombre: "Mauro", tema: "Git y GitHub sin miedo", descripcion: "Los comandos que vas a usar todos los días y cómo trabajar en equipo sin pisar el código de otros.", image: image4 },
  { id: 5, nombre: "José Díaz", tema: "Tu primer backend con Node", descripcion: "Cómo se arma una API, qué hace una base de datos y por dónde empezar para conectar todo.", image: image5 },
  { id: 6, nombre: "Tomás Gómez", tema: "Prepárate para tu primera entrevista", descripcion: "Qué preguntan en una entrevista técnica. Cómo practicar y cómo contar tus proyectos con claridad.", image: image6 },
  { id: 7, nombre: "Pablo Basso", tema: "Mi primer trabajo en IT", descripcion: "Una charla en primera persona sobre cómo se consigue el primer puesto y qué se aprende en los primeros meses.", image: image7 },
  { id: 8, nombre: "Julián Martín", tema: "Testing: cómo no romper todo", descripcion: "Qué es testear: por qué importa y cómo escribir tus primeras pruebas sin complicarse.", image: image8 },
  { id: 9, nombre: "Daniela Cardozo", tema: "Tu primer día como developer", descripcion: "Qué esperar de tu primera semana en un equipo. Qué herramientas usar y cómo pedir ayuda sin miedo.", image: image9 },
  { id: 10, nombre: "Andrés Perlo", tema: "Tu primera base de datos", descripcion: "Qué es una base de datos, para qué sirve y cómo guardar y consultar tus primeros datos.", image: image10 },
]

function Speakers() {
  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <h4 className="mb-2 text-2xl font-semibold text-rojo-rolling">Speakers</h4>
        <h1 className="mb-10 text-3xl font-bold md:text-5xl">Diez charlas, un mismo objetivo</h1>

        <div className="grid grid-cols-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-5">
          {speakerList.map((speaker) => (
            <div key={speaker.id} className="group">
              <div className="h-full rounded-3xl border border-borde-tarjeta bg-superficie p-6 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105 group-hover:border-rojo-rolling group-hover:shadow-lg group-hover:shadow-rojo-rolling/15">
                <img
                  src={speaker.image}
                  alt={speaker.nombre}
                  className="mx-auto mb-4 h-28 w-28 rounded-3xl object-cover"
                />
                <h5 className="mb-3 text-center text-xl font-bold">{speaker.nombre}</h5>
                <button className="mb-4 h-15 w-full rounded-xl bg-borde-tarjeta px-4 py-3 transition-colors duration-300 hover:bg-rojo-oscuro">
                  <p className="text-lg font-semibold">{speaker.tema}</p>
                </button>
                <p className="text-sm leading-relaxed text-gris-claro">{speaker.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Speakers
