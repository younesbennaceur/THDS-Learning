import React from 'react';
import { Shield, Users, Droplet, BookOpen, BarChart, Palette, Wrench, Code } from 'lucide-react';

export default function Formations() {
  const formations = [
    {
      id: 1,
      title: "WORDPRESS",
      icon: BookOpen,
      color: "from-purple-600 to-purple-700",
      description: "Créez et gérez votre site web professionnel",
      link: "/formation-wordpress"
    },
    {
      id: 2,
      title: "EXCEL",
      icon: BarChart,
      color: "from-orange-500 to-orange-600",
      description: "Maîtrisez les tableaux et l'analyse de données",
        link: "/formation-excel"
    },
    {
      id: 3,
      title: "CAO",
      icon: Wrench,
      color: "from-purple-600 to-purple-700",
      description: "Conception Assistée par Ordinateur",
        link: "/formation-cao"
    },
    {
      id: 4,
      title: "PAO",
      icon: Code,
      color: "from-orange-500 to-orange-600",
      description: "Programmation à assister par ordinateur",
        link: "/formation-pao"
    }
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

      {/* Règles Sanitaires Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-20">
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
          
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-br from-purple-600 to-orange-500 p-4 rounded-full">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
            Règles sanitaires appliquées à toutes les formations intra et inter-entreprises
          </h2>

          <div className="space-y-6 text-gray-700">
            <p className="text-lg leading-relaxed">
              <strong>Conformément au protocole sanitaire gouvernemental, toutes les conditions requises pour garantir la sécurité de tous les stagiaires sont mises en place. La réalisation des formations en visioconférence est privilégiée.</strong>
            </p>

            <div>
              <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Aménagement des locaux pour les formations en présentiel :
              </h3>
              <ul className="space-y-3 ml-8">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Respect des distances de sécurité dès l'accueil des participants</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Lavage des mains au savon à l'arrivée</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Organisation des salles de formation et respect de la jauge par personne pour assurer la distanciation physique</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Mise à disposition de matériel permettant le respect des gestes barrières (essuie-main jetable, gel hydroalcoolique…)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Pédagogie adaptée :
              </h3>
              <ul className="space-y-3 ml-8">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Contenus pédagogiques dématérialisés</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Emargement électronique</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Exercices pédagogiques adaptés pour respecter les mesures de distanciation physique</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Conformément au protocole sanitaire gouvernemental, les stagiaires devront se munir de leurs propres outils de travail (stylos, bloc-notes etc) et de leur équipement de protection individuelle (masque).</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Liste des Formations */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nos Programmes de Formation
            </h2>
            <p className="text-lg text-gray-600">
              Des formations professionnelles adaptées à vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {formations.map((formation) => {
              const Icon = formation.icon;
              return (
                <div 
                  key={formation.id}
                  className="bg-white rounded-2xl shadow-md transition-all duration-300 overflow-hidden group "
                >
                  <div className={`bg-gradient-to-br ${formation.color} p-8 text-center`}>
                    <Icon className="w-16 h-16 text-white mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white">
                      {formation.title}
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 text-center mb-6">
                      {formation.description}
                    </p>
                    <div className='w-full text-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
                     <a href={formation.link} className="">
                      En savoir plus
                    </a>
                    </div>
                   
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