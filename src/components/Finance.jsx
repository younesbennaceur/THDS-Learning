import React from 'react';
import { Monitor, Users, MessageSquare, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Financement() {
  const features = [
    {
      icon: Monitor,
      title: "ACCÈS",
      description: "Connectez-vous de n'importe où !",
      color: "text-purple-600"
    },
    {
      icon: Users,
      title: "FORMATEUR",
      description: "Choisissez celui qui vous correspond.",
      color: "text-orange-500"
    },
    {
      icon: MessageSquare,
      title: "SUIVI",
      description: "Échangez avec votre formateur en cas de besoin.",
      color: "text-purple-600"
    },
    {
      icon: BookOpen,
      title: "CONTENU",
      description: "Apprenez avec différents supports.",
      color: "text-orange-500"
    },
    {
      icon: Award,
      title: "CERTIFICATION",
      description: "Passez votre test final avec succès !",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className='mb-20'>
         

          {/* Image Container */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
            <img 
              src="plan.png" 
              alt="Les circuits de financement de la formation - Schéma THDS"
              className="w-full h-auto"
            />
          </div>

          
        </div>

        
        {/* Section: Vous recherchez une formation */}
        <div className="">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                Vous recherchez une formation ?
              </h2>
              
              <div className="space-y-4  mb-8">
                <p className="text-lg leading-relaxed">
                  Une formation personnalisée à distance via votre téléphone, votre ordinateur ou votre tablette.
                </p>
                <p className="text-lg leading-relaxed">
                  Une formation individuelle parfaitement adaptée et personnalisée à la compétence et au niveau de chacun.
                </p>
                <p className="text-lg leading-relaxed">
                  Un rythme de formation correspondant à la disponibilité de l'élève et à sa capacité d'assimilation.
                </p>
                <p className="text-lg leading-relaxed">
                  Un formateur qualifié dans le domaine de compétence choisi.
                  <br />
                  <span className="text-base">(E-formateurs ou tuteurs)</span>
                </p>
                <p className="text-lg leading-relaxed">
                  Une assistance administrative pour le montage de votre dossier auprès des Organismes financeurs.
                </p>
              </div>

              <Link to="/formations">
               <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-10 py-4 text-lg rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                NOS FORMATIONS
              </button>
              </Link>

             
            </div>

            {/* Right Side - Features */}
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow duration-300"
                  >
                    <div className={`${feature.color} bg-white p-3 rounded-lg shadow-md`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className=" text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Divider */}
        

        {/* Section: Circuits de Financement */}
       
      </div>
    </div>
  );
}