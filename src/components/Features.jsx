import React from 'react';
import { Monitor, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          <source src="bg.webm" type="video/webm" />
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
Des formations 100 % en présentiel, animées par des formateurs compétents et pédagogues, pour un apprentissage efficace et concret        </h2>

        {/* Subtitle */}
        <p className="text-xl text-gray-100 mb-10 max-w-3xl mx-auto">
          Chacune de nos formations est certifiante et se conclut obligatoirement par le passage d’une certification, garantissant la reconnaissance des compétences développées
        </p>

       
       

      </div>

    </div>
  );
}