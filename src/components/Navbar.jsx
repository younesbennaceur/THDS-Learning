import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormationsOpen, setIsFormationsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <div className=" px-4 sm:px-6 lg:px-24">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="">
            <img className='w-22 h-22 ' src="/Logo.png" alt="" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white hover:text-orange-400 transition-colors font-medium">
              Accueil
            </a>
            
            {/* Formations Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href="/formations" 
                className="text-white hover:text-orange-400 transition-colors font-medium flex items-center space-x-1 cursor-pointer"
              >
                <span>Nos Formations</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFormationsOpen ? 'rotate-180' : ''}`} />
              </a>
              
              {/* Dropdown Menu */}
              {isFormationsOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl overflow-hidden z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid grid-cols-2">
                    
                    {/* Informatique Section */}
                    <div className="bg-purple-50 p-6 border-r border-gray-200">
                      <h4 className="text-purple-700 font-bold text-sm mb-4 uppercase">Informatique</h4>
                      <ul className="space-y-3">
                         <li>
                          <a 
                            href="/formation-wordpress" 
                            className="text-gray-700 hover:text-orange-500 transition-colors block"
                          >
                            WordPress
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/formation-cao" 
                            className="text-gray-700 hover:text-orange-500 transition-colors block"
                          >
                            CAO
                          </a>
                        </li>
                        <li>
                          <a 
                            href="/formation-pao" 
                            className="text-gray-700 hover:text-orange-500 transition-colors block"
                          >
                            PAO
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Bureautique Section */}
                    <div className="bg-orange-50 p-6">
                      <h4 className="text-orange-700 font-bold text-sm mb-4 uppercase">Bureautique</h4>
                      <ul className="space-y-3">
                        <li>
                          <a 
                            href="/formation-excel" 
                            className="text-gray-700 hover:text-orange-500 transition-colors block"
                          >
                            Excel
                          </a>
                        </li>
                       
                      </ul>
                    </div>

                  </div>
                </div>
              )}
            </div>
            
            <a href="/apropos" className="text-white hover:text-orange-400 transition-colors font-medium">
              Qui Sommes-Nous ?
            </a>
            <a href="/contact" className="text-white hover:text-orange-400 transition-colors font-medium">
              Contact
            </a>
            <a href="/avis" className="text-white hover:text-orange-400 transition-colors font-medium">
              Nos Avis Clients
            </a>
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300">
              Commencer Maintenant
            </button>
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
            <a 
              href="/" 
              className="block text-white hover:text-orange-400 hover:bg-purple-900/50 transition-all py-3 px-4 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accueil
            </a>
            <a 
              href="/formations" 
              className="block text-white hover:text-orange-400 hover:bg-purple-900/50 transition-all py-3 px-4 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nos Formations
            </a>
            <div className="ml-4 space-y-2">
              <div className="text-purple-300 text-xs font-bold uppercase mb-2">Informatique</div>
                <a 
                href="/formation-wordpress" 
                className="block text-white/80 hover:text-orange-400 hover:bg-purple-900/50 transition-all py-2 px-4 rounded-lg text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                WordPress
              </a>
              <a 
                href="/formation-cao" 
                className="block text-white/80 hover:text-orange-400 hover:bg-purple-900/50 transition-all py-2 px-4 rounded-lg text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CAO
              </a>
              <a 
                href="/formation-pao" 
                className="block text-white/80 hover:text-orange-400 hover:bg-purple-900/50 transition-all py-2 px-4 rounded-lg text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                PAO
              </a>
              <div className="text-orange-300 text-xs font-bold uppercase mb-2 mt-3">Bureautique</div>
              <a 
                href="/formation-excel" 
                className="block text-white/80 hover:text-orange-400 hover:bg-purple-900/50 transition-all py-2 px-4 rounded-lg text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Excel
              </a>
            
            </div>
            <a 
              href="/apropos" 
              className="block text-white hover:text-orange-400 hover:bg-purple-900/50 transition-all py-3 px-4 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Qui Sommes-Nous ?
            </a>
            <a 
              href="/contact" 
              className="block text-white hover:text-orange-400 hover:bg-purple-900/50 transition-all py-3 px-4 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <a 
              href="/avis" 
              className="block text-white hover:text-orange-400 hover:bg-purple-900/50 transition-all py-3 px-4 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nos Avis Clients
            </a>
            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold mt-4 hover:shadow-lg hover:shadow-orange-500/50 transition-all">
              Commencer Maintenant
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}