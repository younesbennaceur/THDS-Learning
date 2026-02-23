import React, { useState } from 'react';
import { Briefcase, Bot, ChevronDown } from 'lucide-react';

// --- CRÉATION DES ICÔNES SUR MESURE ---

// Icône Anglais : Businessman avec Cabas + Vrai Drapeau UK
const EnglishIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
    {/* SVG d'un homme d'affaires avec une valise */}
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-purple-800">
      {/* Tête */}
      <circle cx="12" cy="4" r="3" />
      {/* Corps */}
      <path d="M12 8c-3 0-5 2-5 4.5V17h2v5h6v-5h2v-4.5c0-2.5-2-4.5-5-4.5z" />
      {/* Cravate */}
      <polygon points="11.5,8 12.5,8 13,11 12,13 11,11" fill="#F8FAFC" />
    
    </svg>

    {/* Le badge du drapeau UK */}
    <div className="absolute -bottom-1 -right-1 bg-white rounded-full shadow-sm border border-purple-100 w-6 h-6 flex items-center justify-center overflow-hidden p-[1px] z-20">
      <img src="/uk.png" alt="UK Flag" className="w-full h-full object-cover rounded-full" />
    </div>
  </div>
);

// Icône IA : Homme travaillant sur son ordinateur portable
const AIIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
    <svg viewBox="0 0 24 24" className="w-10 h-10">
      {/* Tête de la personne */}
      <circle cx="12" cy="5" r="3" fill="#4338ca" />
      {/* Corps de la personne */}
      <path d="M7 14c0-3 2-5 5-5s5 2 5 5v4H7v-4z" fill="#4338ca" />
      {/* Écran de l'ordinateur portable */}
      <rect x="3" y="13" width="18" height="8" rx="1" fill="#1e1b4b" />
      {/* Base du PC portable (clavier/bureau) */}
      <path d="M1 21h22v2H1z" fill="#312e81" />
      {/* Petit logo brillant sur le dos du PC (style Apple/Lumière) */}
      <circle cx="12" cy="17" r="1.2" fill="#818cf8" />
    </svg>
  </div>
);
// --------------------------------------

export default function Formations() {
  const [openFolders, setOpenFolders] = useState({
    'dossier-english': false,
    'dossier-ia': false
  });

  const toggleFolder = (folderId) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  // Organisation structurée en "Dossiers"
  const dossiers = [
    {
      id: "dossier-english",
      title: "English Business",
      themeColor: "border-purple-600",
      CustomIcon: EnglishIcon, // Utilisation de l'icône sur mesure "Businessman + UK"
      items: [
        {
          id: 1,
          title: "English Business",
          subtitle: "10 Heures",
          icon: Briefcase,
          color: "from-purple-600 to-purple-800",
          description: "Programme de formation en anglais professionnel - 10H",
          link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_BE10/83277408700023_EB10",
          bgImage: 'url("./uk.png")'
        },
        {
          id: 2,
          title: "English Business",
          subtitle: "20 Heures",
          icon: Briefcase,
          color: "from-blue-600 to-blue-800",
          description: "Programme de formation en anglais professionnel - 20H",
          link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_BE10/83277408700023_EB20",
          bgImage: 'url("./uk.png")'
        },
        {
          id: 3,
          title: "English Business",
          subtitle: "30 Heures",
          icon: Briefcase,
          color: "from-teal-600 to-teal-800",
          description: "Programme de formation en anglais professionnel - 30H",
          link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_BE10/83277408700023_EB30",
          bgImage: 'url("./uk.png")'
        },
        {
          id: 4,
          title: "English Business",
          subtitle: "40 Heures",
          icon: Briefcase,
          color: "from-emerald-600 to-emerald-800",
          description: "Programme de formation en anglais professionnel - 40H",
          link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_BE10/83277408700023_EB40",
          bgImage: 'url("./uk.png")'
        },
        {
          id: 5,
          title: "English Business",
          subtitle: "50 Heures",
          icon: Briefcase,
          color: "from-green-600 to-green-800",
          description: "Programme de formation en anglais professionnel - 50H",
          link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_BE10/83277408700023_EB50",
          bgImage: 'url("./uk.png")'
        }
      ]
    },
    {
      id: "dossier-ia",
      title: "CERTIFICATION IA GÉNÉRATIVE AUTOMATISATION NO-CODE & AGENTS IA",
      themeColor: "border-indigo-600",
      CustomIcon: AIIcon, // Utilisation de l'icône sur mesure "Personne travaillant sur PC"
      items: [
        {
          id: 6,
          title: "Intelligence Artificielle",
          subtitle: "Agents IA & No-Code",
          icon: Bot,
          color: "from-indigo-600 to-indigo-900",
          description: "Programme de formation : IA Générative, Automatisation No-Code et création d'Agents IA.",
          link: "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_IA33/83277408700023_IA33?contexteFormation=ACTIVITE_PROFESSIONNELLE", 
          bgImage: 'none'
        }
      ]
    }
  ];

  return (
    <div className="relative font-sans">
      
      {/* === HERO SECTION AVEC LES LOGOS INTÉGRÉS === */}
      <div className="relative min-h-[400px] py-12 flex flex-col justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=600&fit=crop"
          alt="Nos Formations THDS"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/85"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center px-4 text-white mb-8 mt-24">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight uppercase text-center">Nos Formations</h1>
          <p className="text-xl text-purple-100 font-medium text-center max-w-2xl">Boostez votre carrière avec THDS FORMATION et nos partenaires certifiés.</p>
        </div>

        <div className="relative z-10 flex justify-center mt-auto">
          <div className="px-8 py-4 flex items-center gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-2">
              <img src="/vtestfrance.png" alt="Vtest English" className="h-10 md:h-14 w-auto object-contain drop-shadow-md" />
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Vtest English</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img src="/inkrea.png" alt="Inkrea" className="h-10 md:h-14 w-auto object-contain drop-shadow-md" />
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Inkrea</span>
            </div>
          </div>
        </div>
      </div>
      {/* === FIN HERO SECTION === */}

      {/* === ZONE DES DOSSIERS CLIQUABLES === */}
      <div className="bg-slate-50 py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {dossiers.map((dossier) => {
            const isOpen = openFolders[dossier.id];

            return (
              <div key={dossier.id} className="mb-6">
                
                {/* Bouton du Dossier */}
                <button 
                  onClick={() => toggleFolder(dossier.id)}
                  className={`w-full flex items-center justify-between p-4 md:p-6 bg-white rounded-2xl shadow-sm border-l-8 ${dossier.themeColor} hover:shadow-md transition-all duration-300 cursor-pointer group`}
                >
                  <div className="flex items-center gap-4 md:gap-6 text-left">
                    
                    {/* Conteneur de l'icône sur mesure */}
                    <div className="p-2 md:p-3 rounded-xl bg-slate-50 border border-slate-100 shadow-sm flex-shrink-0 group-hover:bg-white transition-colors">
                      <dossier.CustomIcon />
                    </div>

                    <h2 className="text-lg md:text-2xl font-extrabold text-slate-800 uppercase tracking-tight">
                      {dossier.title}
                    </h2>
                  </div>
                  <div className={`p-2 rounded-full flex-shrink-0 transition-transform duration-300 ${isOpen ? 'bg-slate-100 rotate-180' : 'bg-slate-50'}`}>
                    <ChevronDown className="w-6 h-6 text-slate-500" />
                  </div>
                </button>

                {/* Contenu du Dossier */}
                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[5000px] opacity-100 mt-6 mb-12' : 'max-h-0 opacity-0 mt-0 mb-0'
                  }`}
                >
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dossier.items.map((formation) => (
                      <div 
                        key={formation.id}
                        className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-slate-100 flex flex-col"
                      >
                        <div className={`relative h-48 bg-gradient-to-br ${formation.color} flex flex-col items-center justify-center overflow-hidden`}>
                          
                          <div 
                            className="absolute inset-0 opacity-10 grayscale brightness-50 mix-blend-overlay"
                            style={{
                              backgroundImage: formation.bgImage,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          ></div>

                          <div className="relative z-10 flex flex-col items-center">
                            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                              <formation.icon className="w-10 h-10 text-white drop-shadow-lg" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight text-center px-4">
                                {formation.title}
                            </h3>
                            <span className="bg-black/20 text-white text-xs font-bold px-3 py-1 rounded-full mt-2 backdrop-blur-md">
                              {formation.subtitle}
                            </span>
                          </div>
                        </div>

                        <div className="p-8 text-center flex flex-col flex-grow">
                          <p className="text-slate-600 font-medium mb-8 leading-relaxed flex-grow">
                            {formation.description}
                          </p>
                          
                          <a 
                            href={formation.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full py-4 bg-purple-900 hover:bg-purple-950 shadow-purple-100 text-white font-black rounded-2xl transition-all shadow-xl uppercase text-sm tracking-wider hover:scale-105 active:scale-95"
                          >
                            S’inscrire via Mon Compte Formation
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}