import React from 'react';
import { Clock, Users, Target, BookOpen, Award, Check, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FormationWordPress() {
  const durations = [
    {
      hours: "12h",
      title: "Formation Initiation",
      description: "Découvrez les bases  d'un logiciel de CAO 3D  ",
      link:"https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_CAO-12/83277408700023_CAO-12"
      
    },
    {
      hours: "22h",
      title: "Formation Intermédiaire",
      description: "Maîtrisez CAO 3D au quotidien",
      link:"https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_CAO-12/83277408700023_CAO-22"
    
    },
    {
      hours: "32h",
      title: "Formation Complète",
      description: "Devenez expert d'un logiciel de CAO 3D",
      link:"https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83277408700023_CAO-12/83277408700023_CAO-32",      
    }
  ];

  return (
    <div className="relative">
      
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&h=600&fit=crop"
          alt="Formation WordPress"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/85"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              formation Utilisation d'un logiciel de CAO 3D (PCIE - ICDL)
            </h1>
            <p className="text-xl text-purple-200">
À l'issue de cette formation, les participants seront évalués sur la base de projets concrets et d'exercices pratiques reflétant leur maîtrise des compétences enseignées.            </p>
          </div>
        </div>
      </div>

      {/* Duration Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {durations.map((duration, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                duration.popular ? 'ring-4 ring-orange-500' : ''
              }`}
            >
              {duration.popular && (
                <div className="bg-orange-500 text-white text-center py-2 text-sm font-bold">
                  LE PLUS POPULAIRE
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full mb-4">
                    <Clock className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-purple-700 mb-2">
                    {duration.hours}
                  </h3>
                  <p className="text-xl font-bold text-gray-800 mb-2">
                    {duration.title}
                  </p>
                  <p className="text-gray-600">
                    {duration.description}
                  </p>
                </div>




               <a href={duration.link}>
                 <button className={`w-full ${
                  duration.popular 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700' 
                    : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                } text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
                  Commencer cette formation
                </button>

               </a>

               
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Content */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Description & Objectifs */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <Target className="w-8 h-8 text-purple-600 mr-3" />
              Description et Objectifs
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
À l'issue de cette formation, les participants seront évalués sur la base de projets concrets et d'exercices pratiques reflétant leur maîtrise des compétences enseignées.            </p>
          </div>

          {/* Durée & Prérequis */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="w-7 h-7 text-orange-500 mr-3" />
                Durée
              </h3>
              <p className="text-gray-700 text-lg mb-2">
                De <strong className="text-purple-700">12h</strong> à <strong className="text-purple-700">42h</strong>
              </p>
              <p className="text-gray-600">
                Parcours individuel - Plusieurs rythmes possibles
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <BookOpen className="w-7 h-7 text-orange-500 mr-3" />
                Prérequis
              </h3>
              <p className="text-gray-700">
                Il est nécessaire d’être initié à l’utilisation d’un ordinateur et de pratiquer régulièrement l’environnement Windows.
              </p>
            </div>
          </div>

          {/* Public */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Users className="w-7 h-7 text-purple-600 mr-3" />
              Public
            </h3>
            <p className="text-gray-700 mb-4">
              Pour mieux vous guider, nous avons besoin de connaître votre niveau.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                TESTEZ-VOUS
              </button>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Mieux connaître vos attentes
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">
Tout utilisateur débutant avec logiciel CAO            </p>
          </div>

          {/* Modalités */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Award className="w-7 h-7 text-purple-600 mr-3" />
              Modalités de suivi et d'évaluations
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Feuille de présence émargée par demi-journée par les stagiaires et le formateur</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Exercices de mise en pratique ou quiz de connaissances tout au long de la formation permettant de mesurer la progression des stagiaires</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Questionnaire d'évaluation de la satisfaction en fin de stage</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Certificat de réalisation et attestation d'assiduité en fin de formation</span>
              </li>
            </ul>
          </div>

          {/* Méthodes pédagogiques */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Méthodes et Moyens pédagogiques
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Méthode basée sur l'observation, la compréhension et l'expression adaptée au niveau des stagiaires. Des tests de progression sont effectués régulièrement.
            </p>
            <p className="text-gray-700">
              Exposés, cas pratiques, synthèse
            </p>
          </div>

       

          {/* Accessibilité */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Accessibilité aux personnes en situation de handicap
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Si vous présentez une situation de handicap, je vous invite à nous contacter par e-mail <a href="mailto:contact@thds-formation.fr" className="text-blue-600 hover:text-blue-800 underline font-semibold">contact@thds-formation.fr</a> ou par téléphone au <a href="tel:0647272740" className="text-blue-600 hover:text-blue-800 underline font-semibold">06 47 27 27 40</a>, afin que nous puissions convenir d'aménagements spécifiques éventuels.
            </p>
            <p className="text-gray-700">
              Nous pouvons vous orienter vers un réseau de professionnels qui a les compétences et expertises nécessaires pour pouvoir accueillir, accompagner, former ou orienter certains publics.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}