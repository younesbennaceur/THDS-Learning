import React from 'react';
import { Shield, Users, Droplet, BookOpen, BarChart, Palette, Wrench, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Formations() {
  const formations = [
  
    {
      id: 2,
      title: "English Business",
      subtitle: "10 Heures",
      icon: Code,
      color: "from-blue-600 to-blue-700",
      description: "Programme de formation en anglais professionnel - 10H",
      link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_BE10/83277408700023_EB10?contexteFormation=ACTIVITE_PROFESSIONNELLE",
    },
    {
      id: 3,
      title: "English Business",
      subtitle: "20 Heures",
      icon: Code,
      color: "from-cyan-600 to-cyan-700",
      description: "Programme de formation en anglais professionnel - 20H",
      link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_BE10/83277408700023_EB20?contexteFormation=ACTIVITE_PROFESSIONNELLE",
    },
    {
      id: 4,
      title: "English Business",
      subtitle: "30 Heures",
      icon: Code,
      color: "from-teal-600 to-teal-700",
      description: "Programme de formation en anglais professionnel - 30H",
      link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_BE10/83277408700023_EB30",
    },
    {
      id: 5,
      title: "English Business",
      subtitle: "40 Heures",
      icon: Code,
      color: "from-emerald-600 to-emerald-700",
      description: "Programme de formation en anglais professionnel - 40H",
      link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_BE10/83277408700023_EB40?contexteFormation=ACTIVITE_PROFESSIONNELLE",
    },
    {
      id: 6,
      title: "English Business",
      subtitle: "50 Heures",
      icon: Code,
      color: "from-green-600 to-green-700",
      description: "Programme de formation en anglais professionnel - 50H",
      link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_BE10/83277408700023_EB50?contexteFormation=ACTIVITE_PROFESSIONNELLE",
    },
  ];

  return (
    <div className="relative">
      
      {/* Hero Section with Background */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=600&fit=crop"
          alt="Nos Formations"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/85"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              NOS FORMATIONS
            </h1>
            <p className="text-xl text-purple-200">
              Des programmes adaptés à vos besoins professionnels
            </p>
          </div>
        </div>
      </div>

      {/* Liste des Formations */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((formation) => {
              const Icon = formation.icon;
              return (
                <div 
                  key={formation.id}
                  className={`rounded-2xl shadow-md transition-all duration-300 overflow-hidden group ${
                    formation.comingSoon ? 'relative opacity-90' : ''
                  }`}
                >
                  {/* Badge "À venir" */}
                  {formation.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-orange-500 text-white shadow-lg">
                        {formation.badge}
                      </span>
                    </div>
                  )}

                  <div className={`bg-gradient-to-br ${formation.color} p-8 text-center relative ${formation.comingSoon ? 'opacity-80' : ''}`}>
                    <Icon className="w-16 h-16 text-white mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white">
                      {formation.title}
                    </h3>
                    {formation.subtitle && (
                      <p className="text-purple-100 text-sm font-semibold mt-2">
                        {formation.subtitle}
                      </p>
                    )}
                  </div>
                  
                  <div className="p-6 bg-white">
                    <p className="text-gray-600 text-center mb-6">
                      {formation.description}
                    </p>
                    
                    {formation.comingSoon ? (
                      <div className="w-full text-center bg-gray-300 text-gray-600 font-semibold py-3 rounded-lg cursor-not-allowed">
                        Lien EDOF à venir
                      </div>
                    ) : (
                      <div className='w-full text-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
                        <Link to={formation.link} className="text-lg block">
                          En savoir plus
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

         

        </div>
      </div>

    </div>
  );
}