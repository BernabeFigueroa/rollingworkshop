import Speakers from "./components/Speakers"
import Footer from "./components/Footer"


function App() {

  return (
    <div className="min-h-screen flex flex-col">
     <main className="grow">
     <Speakers/>
     </main>
     <Footer/>
    </div>
  )
}

export default App
