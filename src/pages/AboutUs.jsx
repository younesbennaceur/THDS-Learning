import React from 'react';
import { Award, Users, Target, TrendingUp, BookOpen, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuiSommesNous() {
  const values = [
    {
      number: "01",
      title: "Des formations de qualités dispensées au service des stagiaires",
      description: "Dispenser des formations qui favorisent la montée en compétences, l'esprit d'analyse, le sens critique, l'épanouissement personnel pour que le stagiaire engrange des atouts profitables dont il pourra se servir tout au long de sa carrière professionnelle et sa vie personnelle.",
      icon: Award,
      color: "from-purple-600 to-purple-700"
    },
    {
      number: "02",
      title: "Une pédagogie innovante, adaptée et efficace",
      description: "Utiliser l'ingénierie pédagogique et la technologie pour obtenir les meilleurs résultats possibles. Nous nous appuyons sur un corps de formateurs compétents, sur le développement du travail personnel et de l'autoformation. Nous mettons en place un accompagnement individualisé pour les apprenants, ainsi que des outils d'informations et de communications interactifs.",
      icon: BookOpen,
      color: "from-orange-500 to-orange-600"
    },
    {
      number: "03",
      title: "La culture de l'exigence et de la qualité",
      description: "THDS attache une importance toute particulière à développer au sein de son personnel une démarche d'amélioration permanente, qui contribue à faire de THDS un acteur incontournable de la formation en ligne.",
      icon: TrendingUp,
      color: "from-purple-600 to-purple-700"
    }
  ];

  return (
    <div className="relative">
      
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=600&fit=crop"
          alt="Qui Sommes-Nous"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/85"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              POURQUOI NOUS CHOISIR ?
            </h1>
            <p className="text-xl text-purple-200">
              Découvrez notre engagement qualité et notre approche pédagogique
            </p>
          </div>
        </div>
      </div>

      {/* Charte Qualité */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              CHARTE QUALITÉ DE L'OFFRE DE FORMATION PAR THDS
            </h2>
          </div>

          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              <strong className="text-purple-700">THDS</strong> a pour objectif principal de <strong>faciliter l'apprentissage</strong> grâce à une personnalisation poussée de la formation, notamment par le choix du formateur ainsi que <strong>du contenu varié et ludique de la formation</strong>.
            </p>

            <p>
              <strong className="text-purple-700">THDS</strong> permet également de noter et d'évaluer son ou ses formateur(s) et joue donc à fond la carte de la transparence et donc de la qualité. Notre plus gros avantage est que <strong>nous prenons en charge la partie administrative afin de faciliter les démarches et faire gagner un temps</strong> précieux aux salariés et aux entreprises.
            </p>

            <p>
              Pour cela, nous nous occupons du montage de votre dossier de formation, ainsi que de la demande de prise en charge auprès de l'organisme compétent. <strong className="text-purple-700">THDS</strong> mise sur une politique de Qualité irréprochable.
            </p>

            <p>
              Chez <strong className="text-purple-700">THDS</strong> nous souhaitons offrir la possibilité aux apprenants de les faire évoluer au sein de leurs entreprises ainsi que leur permettre de développer leurs compétences.
            </p>

            <p>
              De nombreux formateurs passionnés ont rejoint l'aventure afin de proposer des formations de qualités.
            </p>

            <p>
              Par ailleurs, la montée en puissance des techniques d'information et de communication appliquées à l'enseignement et à la formation, les nouvelles attentes des clients, la mutation du contexte éducatif, etc, imposent d'intégrer et parfois d'anticiper ces évolutions dans les méthodes pédagogiques de <strong className="text-purple-700">THDS</strong>.
            </p>

            <p className="text-xl font-bold text-purple-700 text-center pt-4">
              En s'appuyant sur une démarche Qualité et en mettant en avant l'écoute et la satisfaction de ses apprenants.
            </p>
          </div>

        </div>
      </div>

      {/* Nos Valeurs */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-lg text-gray-600">
              Trois piliers qui définissent notre engagement envers l'excellence
            </p>
          </div>

          <div className="space-y-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="grid md:grid-cols-12 gap-8">
                    
                    {/* Number & Icon */}
                    <div className={`md:col-span-3 bg-gradient-to-br ${value.color} p-8 flex flex-col items-center justify-center text-white`}>
                      <div className="text-6xl font-bold mb-4 opacity-80">
                        {value.number}
                      </div>
                      <Icon className="w-16 h-16" />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-9 p-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        {value.title}
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {value.description}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Les Avantages THDS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Formateurs Experts
              </h3>
              <p className="text-gray-700">
                Des professionnels passionnés et qualifiés pour vous accompagner
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Formation Personnalisée
              </h3>
              <p className="text-gray-700">
                Un contenu adapté à votre niveau et vos objectifs
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Gestion Administrative
              </h3>
              <p className="text-gray-700">
                Nous prenons en charge toutes vos démarches administratives
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à commencer votre formation ?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Rejoignez les centaines de stagiaires qui nous font confiance
          </p>
          <Link to="/formations">
          <button className="bg-white text-purple-700 hover:bg-orange-500 hover:text-white font-bold px-10 py-4 rounded-full text-lg shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300">
            Découvrir Nos Formations
          </button>
          </Link>
          
        </div>
      </div>

    </div>
  );
}