import Navbar from './components/Navbar'
import Speakers from './components/Speakers'
import Footer from './components/Footer'
import Agenda from './components/Agenda'
import ComprarEntrada from './components/ComprarEntrada'
import ComoLlegar from './components/ComoLlegar'
import Header from './components/Header'

function App() {
  return (
    <div id="inicio" className="min-h-screen flex flex-col bg-negro-pagina text-white">
      <Navbar />
      <Header/>
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
