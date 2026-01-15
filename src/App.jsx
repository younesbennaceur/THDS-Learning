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
import Formulaires from './pages/Formulaires';
import FormulaireEleve1 from './pages/Eleve1'; // ✅ Importer le composant
import Eleve5 from './pages/Eleve5';
import Eleve6 from './pages/Eleve6';
import Formateur1 from './pages/Formateur1';
import Formateur2 from './pages/Formateur2';
import Formateur3 from './pages/Formateur3';
import Formateur4 from './pages/Formateur4';
import Certifications from './pages/Certifications';
import TestAnglais from './pages/TestAnglais';
import ContactPage from './pages/EtreContacte';
import ReclamationForm from './pages/ReclamationForm';
import CertificationVTest from './pages/VtestFrance';


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
        alt="Handicap logo"
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
        <Route path='/questionnaires' element={<Formulaires />} />
        <Route path='/certifications' element={<Certifications />} />

        {/* ✅ NOUVELLES ROUTES POUR LES FORMULAIRES */}
        <Route 
          path='/formulaires/eleve/Fiche-analyse-des-besoins-et-attentes-clients' 
          element={<FormulaireEleve1  />} 
        />
         <Route 
          path='/formulaires/eleve/ENQUÊTE-DE-SATISFACTION-EN-FIN-DE-FORMATION' 
          element={<Eleve5 />} 
        />
          <Route
          path='/formulaires/eleve/ENQUÊTE-DE-SATISFACTION-À-FROID-(1-MOIS-APRÈS)'
          element={<Eleve6 />}
        />
        <Route 
          path='/formulaires/formateur/Fiche-Formateur' 
          element={<Formateur1  />} 
        />
        <Route 
          path='/formulaires/formateur/Évaluation-annuelle-des-compétences' 
          element={<Formateur2  />} 
        />
        <Route
          path='/formulaires/formateur/Questionnaire-formateur-fin-de-formations'
          element={<Formateur3 />}
        />
        <Route
          path='formulaires/formateur/test-anglais'
          element={<Formateur4 />}
        />

        <Route
          path='/formulaires/test-de-positionnement-BUSINESS-ENGLISH-4-SKILLS'
          element={<TestAnglais />}
        />
        <Route
          path='/etre-contacte'
          element={<ContactPage />}
        />
        <Route
          path='/formulaires/reclamation-form'
          element={<ReclamationForm />}
        />
        <Route path='/reclamation' element={<Reclamation />} />
        <Route
          path='/certification-vtest-france'
          element={<CertificationVTest />}
        />
        


        
       
      </Routes>

      <Footer />
    </div>
  );
}

export default App;