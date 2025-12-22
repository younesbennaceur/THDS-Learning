import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Zap, Hammer, Sliders, Users, Heart } from 'lucide-react';

export default function Financement() {

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

        {/* Section: Pourquoi choisir nos formations */}
        <div className="">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
              Pourquoi choisir nos formations ?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-orange-500 mx-auto"></div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Benefit 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-8 border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Interaction directe et humaine
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <span>Échanges en temps réel avec le formateur et les autres participants</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <span>Possibilité de poser des questions immédiatement et d'obtenir des réponses claires</span>
                </li>
              </ul>
            </div>

            {/* Benefit 2 */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 border border-orange-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Meilleure motivation et concentration
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 font-bold mr-2">•</span>
                  <span>Cadre structuré qui limite les distractions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 font-bold mr-2">•</span>
                  <span>Engagement plus fort qu'en formation à distance</span>
                </li>
              </ul>
            </div>

            {/* Benefit 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-8 border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  <Hammer className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Apprentissage pratique et concret
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <span>Exercices, mises en situation, travaux de groupe</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <span>Feedback immédiat du formateur</span>
                </li>
              </ul>
            </div>

            {/* Benefit 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 border border-orange-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center">
                  <Sliders className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Adaptation au rythme du groupe
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 font-bold mr-2">•</span>
                  <span>Le formateur peut ajuster son contenu selon les difficultés ou le niveau des participants</span>
                </li>
              </ul>
            </div>

            {/* Benefit 5 */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-8 border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Développement du réseau professionnel
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <span>Rencontres, échanges d'expériences et opportunités de collaboration</span>
                </li>
              </ul>
            </div>

            {/* Benefit 6 */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 border border-orange-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Encadrement et suivi personnalisés
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 font-bold mr-2">•</span>
                  <span>Accompagnement plus humain et rassurant</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 font-bold mr-2">•</span>
                  <span>Meilleure détection des besoins individuels</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Summary Box */}
          <div className="border border-purple-100 rounded-xl p-8  mb-12">
            <p className="text-lg leading-relaxed text-center">
              La formation en présentiel permet une <strong>interaction directe</strong>, une <strong>meilleure concentration</strong>, 
              un <strong>apprentissage pratique</strong>, un <strong>accompagnement personnalisé</strong> et 
              favorise le <strong>travail en groupe</strong> ainsi que le <strong>réseau professionnel</strong>.
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link to="/formations">
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-12 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                DÉCOUVRIR NOS FORMATIONS
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}