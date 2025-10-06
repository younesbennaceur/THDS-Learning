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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              NOS AVIS CLIENTS
            </h1>
            <p className="text-xl text-purple-200">
              Découvrez les retours d'expérience de nos stagiaires
            </p>
          </div>
        </div>
      </div>

      {/* No Reviews Yet Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-20">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <MessageSquare className="w-16 h-16 text-purple-300 mx-auto mb-6" />
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              THDS n'a pas encore d'avis clients
            </h3>
            
           
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-3">100%</div>
              <p className="text-gray-600">Satisfaction garantie</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-orange-500 mb-3">24/7</div>
              <p className="text-gray-600">Support disponible</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-3">+500</div>
              <p className="text-gray-600">Stagiaires formés</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}