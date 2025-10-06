import React from 'react';
import { Monitor, Clock, Award } from 'lucide-react';

export default function Features() {
  return (
    <div className="relative py-20 overflow-hidden">
      
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/public/bg.webm" type="video/webm" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
        {/* Overlay noir */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Icons Row */}
        <div className="flex justify-center items-center space-x-6 mb-12">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
            <Monitor className="w-8 h-8 text-white" />
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
            <Award className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Main Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Certaines de nos formations sont disponibles en E-Learning via notre plateforme e-learning accessible 24/24 et 7/7 (EFORMA)
        </h2>

        {/* Subtitle */}
        <p className="text-xl text-gray-100 mb-10 max-w-3xl mx-auto">
          Grâce à nos formateurs de qualité, THDS c'est la garantie d'une certification réussie.
        </p>

        {/* CTA Button */}
        <button className="bg-purple-950 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-10 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          DÉMO PLATEFORME
        </button>

      </div>

    </div>
  );
}