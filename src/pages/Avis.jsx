import React from 'react';
import { Star, MessageSquare, Mail } from 'lucide-react';

export default function AvisClients() {
  return (
    <div className="relative">
      
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&h=600&fit=crop"
          alt="Nos Avis Clients"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/85"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              NOS AVIS CLIENTS
            </h1>
            <p className="text-xl text-purple-200">
              Découvrez les retours d'expérience de nos stagiaires
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-20">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Avis 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              "Formation exceptionnelle ! Les formateurs sont très pédagogues et à l'écoute. 
              J'ai pu acquérir des compétences concrètes en Wordpress. Le suivi personnalisé fait toute la différence."
            </p>
            
            <div className="flex items-center border-t pt-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-lg">
                NT
              </div>
               <div className="ml-4">
                <p className="font-semibold text-gray-800">NUNES THEO</p>
                <p className="text-sm text-gray-500">Formation Intermédiaire WordPress</p>
                
              </div>
            </div>
          </div>

          {/* Avis 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              "Une expérience enrichissante du début à la fin. Le programme est bien structuré 
              et les projets pratiques permettent de se confronter à des situations réelles et maitriser le logiciel excel. 
              "
            </p>
            
            <div className="flex items-center border-t pt-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg">
                FC
              </div>
             
              <div className="ml-4">
                <p className="font-semibold text-gray-800">FODIL CÉCILIA</p>
                <p className="text-sm text-gray-500">Formation Complète Excel</p>
              </div>
            </div>
          </div>

        </div>
      </div>

  

    </div>
  );
}