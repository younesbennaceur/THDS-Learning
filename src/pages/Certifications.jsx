import React from 'react';
import { FileCheck, CheckCircle } from 'lucide-react';

export default function Certifications() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=600&fit=crop"
          alt="Pourquoi nous choisir"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/85"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Certifications
            </h1>
            
          </div>
        </div>
      </div>
      
      <div className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Certification Section - Qualiopi */}
          <div className="border-t-2 border-gray-200 pt-16 mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Logo Qualiopi */}
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img 
                    src="/image.png" 
                    alt="Certification Qualiopi"
                    className="h-48 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  THDS est certifié Qualiopi
                </h2>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                  <strong className="text-purple-600">Catégorie : "Actions de Formations"</strong>
                </p>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  La certification Qualiopi est la garantie d'une formation de qualité reconnue nationalement. 
                  Cela vous assure un suivi professionnel et un accompagnement personnalisé de la plus haute qualité.
                </p>
                
                {/* Benefits List */}
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span>Formation de qualité certifiée</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span>Reconnaissance nationale et européenne</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span>Suivi personnalisé et accompagnement</span>
                  </li>
                </ul>

                <a 
                  href="/certificat.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                    <FileCheck className="w-5 h-5" />
                    <span>CONSULTER NOTRE CERTIFICAT</span>
                  </button>
                </a>
              </div>

            </div>
          </div>

          {/* Partners Section */}
          <div className="border-t-2 border-gray-200 pt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Nos Partenaires Certifiants
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Nous collaborons avec des organismes reconnus pour garantir l'excellence pédagogique
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Partner Logo */}
              <div className="flex justify-center order-2 md:order-1">
                <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <img 
                    src="/Footer2.png" 
                    alt="Organisme partenaire certifié"
                    className="h-40 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Partner Text */}
              <div className="order-1 md:order-2">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Partenaires de Confiance
                </h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Nous travaillons en étroite collaboration avec des organismes certifiés et reconnus 
                  pour vous offrir les meilleures formations professionnelles. Nos partenaires garantissent 
                  la qualité et la pertinence de nos programmes.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 mr-4 flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                    </span>
                    <span className="text-gray-700 text-lg">Formations certifiées et diplômantes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 mr-4 flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                    </span>
                    <span className="text-gray-700 text-lg">Accompagnement personnalisé et professionnel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 mr-4 flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-purple-606" />
                    </span>
                    <span className="text-gray-700 text-lg">Reconnaissance professionnelle garantie</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}