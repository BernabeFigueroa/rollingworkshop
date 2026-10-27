import Speakers from './components/Speakers'
import Footer from './components/Footer'
import Agenda from './components/Agenda'
import ComprarEntrada from './components/ComprarEntrada'
import ComoLlegar from './components/ComoLlegar'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-negro-pagina text-white">
      <main className="grow">
        <Speakers />
        <Agenda />
        <ComprarEntrada />
      </main>
      <ComoLlegar />
      <Footer />
    </div>
  )
}

export default App
