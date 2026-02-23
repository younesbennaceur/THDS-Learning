import React from 'react';
import { Mail, Phone, MapPin, BookOpen, FileText, Users, Award, MessageSquare,Building2, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Footer() {
  const footerLinks = {
    liens: [
      { name: "Qui sommes-nous ?", href: "/apropos" },
      { name: "Conditions générales d'utilisation", href: "/cgv" },
      { name: "CGV Actions de formation", href: "/cgv-formation" },
      { name: "Réclamation", href: "/reclamation" },
      { name: "Engagement qualité", href: "/quality" },
      { name: "Listing questionnaires", href: "/questionnaires" }
    ]
  };

  return (
    <footer className=" bg-purple-950 text-white">
      <div className="max-w-7xl mx-auto  py-12">
        
        <div className="grid md:grid-cols-3  mb-8">
          
          {/* Section 1: THDS FORMATION */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-orange-400" />
              <span>THDS FORMATION</span>
            </h3>
            <div className="space-y-3 text-blue-100">
              <p className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1 text-orange-400" />
                <span>5 Rue Pleyel<br />93200 SAINT DENIS</span>
              </p>
                <p className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-orange-400" />
                <a href="mailto:contact@thds.fr " className="hover:text-orange-400 transition-colors">
                  SIRET : 832 774 087 00023
                </a>
              </p><p className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-orange-400" />
                <a href="mailto:contact@thds.fr " className="hover:text-orange-400 transition-colors">
                  NDA : 11931056093 
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-orange-400" />
                <a href="tel:0609968595" className="hover:text-orange-400 transition-colors">
                  06 09 96 85 95
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-orange-400" />
                <a href="mailto:contact@thds.fr " className="hover:text-orange-400 transition-colors">
                  contact@thds.fr 
                </a>
              </p>
            
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <a 
                href="mailto:contact@thds.fr "
                className="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="tel:0647272740"
                className="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Section 2: LIENS UTILES */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <FileText className="w-6 h-6 text-orange-400" />
              <span>LIENS UTILES</span>
            </h3>
            <ul className="space-y-3">
              {footerLinks.liens.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    
                  
                    className="text-blue-100 hover:text-orange-400 transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 transition-transform"></span>
                    <span >{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul>
              <li className='mt-3 space-y-3' >
                  <a
                    href='LivretDacceuilTHDS.pdf'
                    
                  
                    className="text-blue-100 hover:text-orange-400 transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 transition-transform"></span>
                    <span>Livret d’accueil en formation</span>
                  </a>
                </li>
                <li className='mt-3 space-y-3' >
                  <a
                    href='REGLEMENTINTERIEUR.pdf'
                    className="text-blue-100 hover:text-orange-400 transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 transition-transform"></span>
                    <span>Règlement Intérieur Des Stagiaires</span>
                  </a>
                </li>
            </ul>
          </div>

          {/* Section 3: CERTIFICATIONS */}
          <div className=' flex gap-4 flex-col w-full justify-baseline'>
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <Award className="w-6 h-6 text-orange-400" />
              <span>CERTIFICATIONS</span>
            </h3>
            <div className='flex gap-8 '>
                 <div className="">
              <img 
                src="/Footer2.png" 
                alt="CPF - Charte de déontologie"
                className="w-24 h-24"
              />
            </div>
            <div className="">
              <img 
                src="/qualiopi.png" 
                alt="Calibration Qualiopi THDS"
                className="h-24"
              />
            </div>
            <ul>
             <li className='mt-3 space-y-3' >
                   <a
                    href='https://www.moncompteformation.gouv.fr/espace-prive/html/#/'
                    
                  
                    className="text-blue-100 hover:text-orange-400 transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 transition-transform"></span>
                    <span>Mon compte formation</span>
                  </a>
                </li>
            </ul>
            </div>
            <div className='flex gap-8 '>
             <a href="https://vtest-france.exassess.com">

                  <div className="">
              <img 
                src="/vtestfrance.png" 
                alt="CPF - Charte de déontologie"
                className="w-32 h-16"
              />
            </div>

             </a>
             <ul>
             <li className='mt-3 space-y-3' >
                   <Link
                    to='certification-vtest-france'
                    
                  
                    className="text-blue-100 hover:text-orange-400 transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 transition-transform"></span>
                    <span>VTest-France</span>
                  </Link>
                </li>
            </ul>
            </div>
             <div className='flex gap-8 '>
             

                  <div className="">
              <img 
                src="/inkrea.png" 
                alt="CPF - Charte de déontologie"
                className="w-32 h-16"
              />
            </div>

             
             <ul>
             <li className='mt-3 space-y-3' >
                   <a
                    href='https://www.inkrea-certifications.fr/'
                    
                  
                    className="text-blue-100 hover:text-orange-400 transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 transition-transform"></span>
                    <span>Inkrea Certificatios</span>
                  </a>
                </li>
            </ul>
            </div>

          
            
            
           
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="flex justify-between border-t border-blue-700 pt-8 mt-8">
          <p className=" text-blue-200">
            Copyright 2025 © <span className="font-bold text-white">THDS FORMATION</span>
          </p>
          <p className=" text-blue-200">
            dernière mise à jour : 21/02/2026

          </p>
        </div>

      </div>
    </footer>
  );
}