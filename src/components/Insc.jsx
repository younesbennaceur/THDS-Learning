import React, { useState } from 'react';
import { ChevronDown, Award, FileCheck, UserCheck } from 'lucide-react';

export default function Inscription() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const accordionItems = [
    {
      title: "Modalités et délais d'accès aux formations",
      content: `
        <p class="mb-4"><strong>En inter / intra-entreprise :</strong> L'inscription est effective après signature de la proposition commerciale et de la convention de formation par l'organisme de formation et le bénéficiaire.</p>
        
        <p class="mb-4"><strong>Formation CPF :</strong> Le bénéficiaire s'inscrit directement sur le site <a href="https://www.moncompteformation.gouv.fr" class="text-purple-600 hover:text-purple-800 underline" target="_blank">www.moncompteformation.gouv.fr</a></p>
        
        <p class="mb-4"><strong>Délais d'accès :</strong></p>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li>Délai estimé : 1 mois</li>
          <li>Inscription au plus tôt : 6 mois avant le début</li>
          <li>Inscription au plus tard : 15 jours avant le début</li>
          <li>Délai obligatoire entre proposition et début : 11 jours ouvrés (15 jours calendaires)</li>
        </ul>
        
        <p class="mb-2"><strong>Réponse aux demandes :</strong> Sous 2 jours ouvrés maximum</p>
      `
    },
    {
      title: "Accessibilité aux personnes en situation de handicap",
      content: `
        <p class="mb-4">Si vous présentez une situation de handicap, nous vous invitons à nous contacter au plus vite :</p>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li>Par e-mail : <a href="mailto:contact@thds-formation.fr" class="text-purple-600 hover:text-purple-800 underline">contact@thds-formation.fr</a></li>
          <li>Par téléphone : <a href="tel:+33000000000" class="text-purple-600 hover:text-purple-800 underline">06 XX XX XX XX</a></li>
        </ul>
        <p class="mb-4">Nous nous engageons à mettre en place les aménagements nécessaires pour compenser les situations individuelles de handicap.</p>
        <p>Un réseau de professionnels est disponible pour accueillir, accompagner, former ou orienter les personnes en situation de handicap.</p>
      `
    },
    {
      title: "Notre accueil en formation",
      content: `
        <p class="mb-4">Chaque stagiaire reçoit un <strong>livret d'accueil</strong> complet contenant :</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Les informations pratiques sur la formation</li>
          <li>Le règlement intérieur</li>
          <li>Les contacts utiles</li>
          <li>Le programme détaillé</li>
          <li>Les modalités d'évaluation</li>
        </ul>
      `
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          VOUS SOUHAITEZ VOUS INSCRIRE À UNE FORMATION ?
        </h2>

        {/* CTA Button */}
        <div className="text-center mb-16">
          <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-10 py-4 text-lg rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            PLUS DE FORMATIONS
          </button>
        </div>

        {/* Accordion */}
        <div className="space-y-4 mb-20">
          {accordionItems.map((item, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-purple-700 text-left">
                  {item.title}
                </span>
                <ChevronDown 
                  className={`w-6 h-6 text-purple-600 transition-transform duration-300 ${
                    openAccordion === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openAccordion === index ? 'max-h-[800px]' : 'max-h-0'
                }`}
              >
                <div 
                  className="p-6 bg-gray-50 text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Certification Section */}
        <div className="border-t-2 border-gray-200 pt-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Logo Qualiopi - vous pouvez remplacer par votre vrai logo */}
            <div className="flex justify-center">
             <img src="image.png" alt="" />
            </div>

            {/* Text Content */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                THDS est certifié Qualiopi au titre des catégories suivantes : "Actions de Formations".
              </h3>
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                <FileCheck className="w-5 h-5" />
                <span>NOTRE CERTIFICAT</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )}