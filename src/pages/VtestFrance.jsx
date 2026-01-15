import React from 'react';
import { Shield, Globe, Zap, Laptop, Monitor, Headphones, Mic, Camera, Award, ExternalLink, PlayCircle, CheckCircle } from 'lucide-react';

export default function CertificationVTest() {
  const pointsClefs = [
    {
      icon: Shield,
      title: "Reconnaissance Officielle",
      description: "Le test VTest Business English - 4 skills est inscrit au répertoire spécifique de France compétences (RS6905) depuis le 27 novembre 2024.",
      color: "text-green-600"
    },
    {
      icon: Globe,
      title: "Évaluation Complète",
      description: "Évalue les 4 compétences linguistiques : compréhension et expression à l'oral et à l'écrit via une intelligence artificielle de dernière génération.",
      color: "text-blue-600"
    },
    {
      icon: Zap,
      title: "Rapidité & Flexibilité",
      description: "Test en ligne sans rendez-vous préalable (env. 60 min). Résultats immédiats dans 85% des cas, ou sous 48 heures maximum.",
      color: "text-orange-500"
    }
  ];

  const equipementRequis = [
    { icon: Laptop, text: "Ordinateur, tablette ou smartphone" },
    { icon: Camera, text: "Caméra frontale" },
    { icon: Mic, text: "Microphone" },
    { icon: Headphones, text: "Écouteurs ou casque" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- BANNER HERO --- */}
      <div className="relative h-[450px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600&h=600&fit=crop"
          alt="Certification VTest"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/90"></div>
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
            {/* Logo Burlington VTest stylisé */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl  mb-8 border border-white/20 animate-fade-in">
               <img src="./vtestfrance.png" alt="VTest France" className='h-24 w-48' />
            </div>
            
            <h1 className="text-2xl md:text-2xl font-nold text-white  mb-4 leading-tight ">
                Validez votre anglais professionnel avec une certification mondiale
            </h1>

            <a 
                href="https://app.vtest.com/candidate/demo/VTestBusinessEnglishSampleItems-BESampleItemsLRWS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-5 rounded-2xl transition-all shadow-2xl uppercase text-sm tracking-widest transform hover:scale-105"
            >
                <PlayCircle className="mr-3" size={24}/> Test de découverte gratuit
            </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 pb-20 relative z-10">
        
        {/* --- SECTION DESCRIPTION AVEC FILIGRANE DRAPEAU --- */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 mb-12">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-14">
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-2 w-12 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-black uppercase tracking-widest text-sm">Description du test</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">Une évaluation de pointe adaptée au monde du travail</h2>
              <div className="space-y-5 text-slate-600 leading-relaxed font-medium">
                <p>
                  Le test <strong>VTest Business English - 4 skills</strong> est une solution de certification moderne, flexible et hautement sécurisée. 
                  Il fournit un niveau d'anglais professionnel précis basé sur le cadre <strong>CECR</strong> (cadre Européen de référence pour les langues).
                </p>
                <p>
                  L'interface du test est disponible en français. Le test démarre par des questions simples et monte en difficulté au niveau du candidat. 
                  L'activité d'expression orale commence par la lecture d'un texte à haute voix pour faciliter la réponse aux questions ouvertes.
                </p>
              </div>
              
              <div className="mt-10 p-6 bg-green-50 rounded-2xl border-l-8 border-green-500">
                <p className="text-slate-800 font-bold italic">
                  "Un certificat de compétence reconnu par l'état, reconnu dans le monde entier."
                </p>
              </div>
            </div>

            {/* --- CARTE CERTIFICATION AVEC FILIGRANE DRAPEAU NOIR --- */}
            <div className="relative bg-purple-900 flex items-center justify-center p-12 overflow-hidden">
                {/* Image du drapeau en filigrane avec contraste noir intense */}
                <div 
                    className="absolute inset-0 opacity-20 grayscale brightness-50 mix-blend-multiply pointer-events-none"
                    style={{
                      backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                ></div>
                
                <div className="relative z-10 text-center text-white max-w-sm">
                    <div className="bg-white/10 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
                      <img src="vtestfrance.png" alt="VTest France" className='h-12' />
                    </div>
                    <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Certification RS6905</h3>
                    <p className="text-purple-100 font-bold mb-8 leading-relaxed">
                        Inscrit au répertoire spécifique de France compétences. Éligible au financement pour votre formation.
                    </p>
                    <a 
                        href="https://vtest-france.exassess.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-white text-purple-900 px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-yellow-400 transition-colors shadow-lg"
                    >
                        Accéder à VTest France <ExternalLink className="ml-2" size={16}/>
                    </a>
                </div>
            </div>
          </div>
        </div>

        {/* --- GRILLE DES AVANTAGES --- */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pointsClefs.map((point, index) => (
            <div key={index} className="bg-white p-10 rounded-3xl shadow-lg border border-slate-50 hover:shadow-2xl transition-all group">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-50 mb-8 group-hover:scale-110 transition-transform`}>
                <point.icon className={`w-8 h-8 ${point.color}`} />
              </div>
              <h4 className="text-xl font-extrabold mb-4 text-slate-800 uppercase tracking-tight">{point.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{point.description}</p>
            </div>
          ))}
        </div>

        {/* --- SECTION TECHNIQUE (REQUIS) --- */}
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="max-w-xl">
              <div className="flex items-center space-x-3 mb-6">
                <Monitor className="text-yellow-400" size={32} />
                <h3 className="text-3xl font-black uppercase tracking-tighter italic">Pré-requis techniques</h3>
              </div>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                Préparez-vous sereinement. Le test nécessite une connexion internet stable et un environnement calme pour garantir la validité de vos résultats.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              {equipementRequis.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="bg-yellow-400/20 p-2 rounded-lg text-yellow-400">
                    <item.icon size={24} />
                  </div>
                  <span className="text-sm font-black uppercase tracking-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* --- STYLE ANIMATION --- */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}