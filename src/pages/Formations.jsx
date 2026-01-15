import React from 'react';
import { Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Formations() {
  const formations = [
    {
      id: 1,
      title: "English Business",
      subtitle: "10 Heures",
      icon: Briefcase,
      color: "from-purple-600 to-purple-800",
      description: "Programme de formation en anglais professionnel - 10H",
      link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_BE10/83277408700023_EB10",
    },
    {
      id: 2,
      title: "English Business",
      subtitle: "20 Heures",
      icon: Briefcase,
      color: "from-blue-600 to-blue-800",
      description: "Programme de formation en anglais professionnel - 20H",
      link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_BE10/83277408700023_EB20",
    },
    {
      id: 3,
      title: "English Business",
      subtitle: "30 Heures",
      icon: Briefcase,
      color: "from-teal-600 to-teal-800",
      description: "Programme de formation en anglais professionnel - 30H",
      link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_BE10/83277408700023_EB30",
    },
    {
      id: 4,
      title: "English Business",
      subtitle: "40 Heures",
      icon: Briefcase,
      color: "from-emerald-600 to-emerald-800",
      description: "Programme de formation en anglais professionnel - 40H",
      link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_BE10/83277408700023_EB40",
    },
    {
      id: 5,
      title: "English Business",
      subtitle: "50 Heures",
      icon: Briefcase,
      color: "from-green-600 to-green-800",
      description: "Programme de formation en anglais professionnel - 50H",
      link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_BE10/83277408700023_EB50",
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=600&fit=crop"
          alt="Nos Formations THDS"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/80"></div>
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">NOS FORMATIONS D'ANGLAIS</h1>
          <p className="text-xl text-purple-100 font-medium">Boostez votre carrière avec THDS FORMATION</p>
        </div>
      </div>

      {/* Grid de Formations */}
      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {formations.map((formation) => (
              <div 
                key={formation.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-slate-100"
              >
                {/* Header avec véritable filigrane drapeau */}
                <div className={`relative h-48 bg-gradient-to-br ${formation.color} flex flex-col items-center justify-center overflow-hidden`}>
                  
                  {/* Image du drapeau en filigrane avec contraste */}
                  <div 
                    className="absolute inset-0 opacity-20 grayscale brightness-50 mix-blend-overlay"
                    style={{
                      backgroundImage: 'url("./uk.png")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm mb-3">
                      <formation.icon className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{formation.title}</h3>
                    <span className="bg-black/20 text-white text-xs font-bold px-3 py-1 rounded-full mt-2 backdrop-blur-md">
                      {formation.subtitle}
                    </span>
                  </div>
                </div>

                {/* Corps de la carte */}
                <div className="p-8 text-center">
                  <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                    {formation.description}
                  </p>
                  
                  <a 
                    href={formation.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full py-4 bg-purple-900 text-white font-black rounded-2xl hover:bg-purple-950 transition-colors shadow-xl shadow-purple-100 tracking-wider uppercase text-sm"
                  >
                    S'inscrire via EDOF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}