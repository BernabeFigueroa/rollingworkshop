
const scheduleData = [
  { time: '18:00', title: 'Acreditación y bienvenida', speaker: '' },
  { time: '18:20', title: 'Tu primer día como developer', speaker: 'Daniela Cardozo' },
  { time: '18:40', title: 'De cero a tu primer proyecto', speaker: 'Franco Díaz' },
  { time: '19:00', title: 'Armá tu portfolio con IA', speaker: 'Gastón' },
  { time: '19:20', title: 'Git y GitHub sin miedo', speaker: 'Mauro' },
  { time: '19:40', title: 'Tu primer backend con Node', speaker: 'José Díaz' },
  { time: '20:00', title: 'Preparate para tu primera entrevista', speaker: 'Tomás Gómez' },
  { time: '20:20', title: 'Mi primer trabajo en IT', speaker: 'Pablo Basso' },
  { time: '20:40', title: 'Testing: cómo no romper todo', speaker: 'Julián Martín' },
  { time: '21:00', title: 'Diseño para developers', speaker: 'Tomás Escudero' },
  { time: '21:20', title: 'Tu primera base de datos', speaker: 'Andrés Perlo' },
  { time: '21:40', title: 'Preguntas y networking', speaker: '' }
];


const Agenda = () => (
  <section id="agenda" className="landing-container landing-section agenda-layout" aria-labelledby="agenda-title">
    <header className="agenda-intro"><p className="section-eyebrow">Agenda</p><h2 id="agenda-title" className="section-title">Jueves 19 de<br />noviembre</h2><p>Diez charlas cortas para salir con un plan claro.<br />Al final queda tiempo para preguntas y networking.</p></header>
    <ul className="agenda-list">{scheduleData.map(event => <li key={event.time}><time>{event.time}</time><div><h3>{event.title}</h3>{event.speaker && <p>{event.speaker}</p>}</div></li>)}</ul>
  </section>
)
export default Agenda
