import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormationsOpen, setIsFormationsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour vérifier si le lien est actif
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setIsFormationsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsFormationsOpen(false);
    }, 500);
    setCloseTimeout(timeout);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-purple-950/95 backdrop-blur-md shadow-lg shadow-purple-900/50' : 'bg-transparent'
    }`}>
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div>
            <img className='w-22 h-22' src="/Logo.png" alt="Logo" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
           
            <Link 
              to="/" 
              className={`transition-colors duration-200 font-medium ${
                isActiveLink('/') 
                  ? 'text-orange-400 font-bold' 
                  : 'text-white hover:text-orange-400'
              }`}
            >
              Accueil
            </Link>
            
            {/* Formations Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/formations" 
                className={`flex items-center transition-colors duration-200 font-medium ${
                  isActiveLink('/formations') 
                    ? 'text-orange-400 font-bold' 
                    : 'text-white hover:text-orange-400'
                }`}
              >
                <span>Nos Formations</span>
                
              </Link>
              
            
            </div>

              <Link 
              to="/certifications" 
              className={`transition-colors duration-200 font-medium ${
                isActiveLink('/certifications') 
                  ? 'text-orange-400 font-bold' 
                  : 'text-white hover:text-orange-400'
              }`}
            >
              Certifications
            </Link>

            <Link 
              to="/apropos" 
              className={`transition-colors duration-200 font-medium ${
                isActiveLink('/apropos') 
                  ? 'text-orange-400 font-bold' 
                  : 'text-white hover:text-orange-400'
              }`}
            >
              Qui Sommes-Nous ?
            </Link>

            <Link 
              to="/contact" 
              className={`transition-colors duration-200 font-medium ${
                isActiveLink('/contact') 
                  ? 'text-orange-400 font-bold' 
                  : 'text-white hover:text-orange-400'
              }`}
            >
              Contact
            </Link>
            
            <Link 
              to="/avis" 
              className={`transition-colors duration-200 font-medium ${
                isActiveLink('/avis') 
                  ? 'text-orange-400 font-bold' 
                  : 'text-white hover:text-orange-400'
              }`}
            >
              Nos Avis Clients
            </Link>
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <Link to="/etre-contacte">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300">
                Etre Contacté 
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-orange-400 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-purple-950/98 backdrop-blur-md border-t border-purple-800/50">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link 
              to="/"
              className="block text-white hover:text-orange-400 hover:bg-purple-900/50 transition-all py-3 px-4 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accueil
            </Link>

            <Link 
              to="/formations"
              className="block text-white hover:text-orange-400 hover:bg-purple-900/50 transition-all py-3 px-4 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nos Formations
            </Link>

            <Link 
              to="/certifications"
              className="block text-white hover:text-orange-400 hover:bg-purple-900/50 transition-all py-3 px-4 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Certifications
            </Link>

            <Link 
              to="/apropos"
              className="block text-white hover:text-orange-400 hover:bg-purple-900/50 transition-all py-3 px-4 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Qui Sommes-Nous ?
            </Link>

            <Link 
              to="/contact"
              className="block text-white hover:text-orange-400 hover:bg-purple-900/50 transition-all py-3 px-4 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <Link 
              to="/avis"
              className="block text-white hover:text-orange-400 hover:bg-purple-900/50 transition-all py-3 px-4 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nos Avis Clients
            </Link>
           
            <Link to="/formations">
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold mt-4 hover:shadow-lg hover:shadow-orange-500/50 transition-all">
                Commencer Maintenant
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}