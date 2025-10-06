import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'  // <-- Pas d'accolades {Home}, car c'est un export default
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Formations from './pages/Formations'
import Wordpress from './pages/Wordpress'
import Excel from './pages/Excel'
import Contact from './components/Contact'
import Pao from './pages/Pao'
import Cao from './pages/Cao'
import AboutUs from './pages/AboutUs'
import Avis from './pages/Avis'



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
        <Route path='/formation-pao' element={<Pao />} />
        <Route path='/formation-cao' element={<Cao />} />
        <Route path='/apropos' element={<AboutUs />} />
        <Route path='/avis' element={<Avis />} />

        

        
       
      </Routes>
      <Footer/>
      

    </div>
  )
}

export default App  // <-- On exporte seulement App ici