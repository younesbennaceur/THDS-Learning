import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Formations from './pages/Formations';
import Wordpress from './pages/Wordpress';
import Excel from './pages/Excel';
import Contact from './components/Contact';
import Pao from './pages/Pao';
import Cao from './pages/Cao';
import AboutUs from './pages/AboutUs';
import Avis from './pages/Avis';
import Cgv from './pages/Cgv-formation';
import Cgv1 from './pages/Cgv1';
import Reclamation from './pages/Reclamation';
import Quality from './pages/Quality';

// ✅ ScrollToTop reste ici
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div>
      <ScrollToTop />
       {/* ✅ Logo flottant à gauche */}
      <img
        src="/handicap.png"
        alt="Hanciap logo"
        className="fixed left-4 top-1/3 -translate-y-1/2 w-14 h-14 object-contain z-50 opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/formations' element={<Formations />} />
        <Route path='/formation-wordpress' element={<Wordpress />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/formation-excel' element={<Excel />} />
        <Route path='/formation-pao' element={<Pao />} />
        <Route path='/formation-cao' element={<Cao />} />
        <Route path='/apropos' element={<AboutUs />} />
        <Route path='/avis' element={<Avis />} />
        <Route path='/cgv-formation' element={<Cgv />} />
        <Route path='/cgv' element={<Cgv1 />} />
        <Route path='/reclamation' element={<Reclamation />} />
        <Route path='/quality' element={<Quality />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
