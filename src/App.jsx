import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'  // <-- Pas d'accolades {Home}, car c'est un export default
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Formations from './pages/Formations'
import Wordpress from './pages/Wordpress'
import Excel from './pages/Excel'
import Contact from './components/Contact'


function App() {
  return (
    <div className=''>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/formations' element={<Formations />} />
        <Route path='/formation-wordpress' element={<Wordpress />} />
        <Route path='/Contact' element={<Contact />} />

        <Route path='/formation-excel' element={<Excel />} />

        
       
      </Routes>
      <Footer/>
      

    </div>
  )
}

export default App  // <-- On exporte seulement App ici