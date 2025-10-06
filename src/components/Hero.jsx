import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Votre Formation Entièrement En Ligne",
      subtitle: "THDS vous propose des formations 100% en ligne. L'avantage c'est que vous êtes chez vous sans contraintes de déplacement ou de temps.",
      cta: "Demander Un Devis",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop" // Formation en groupe
    },
    {
      title: "Formations Certifiantes et Diplômantes",
      subtitle: "Obtenez des certifications reconnues et valorisez votre parcours professionnel avec nos programmes de formation certifiés.",
      cta: "Nos Formations",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop" // Écran ordinateur
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay - adapté aux couleurs THDS */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-950/95 via-purple-900/85 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full w-full mx-auto px-4 sm:px-6 lg:px-24 flex items-center">
        <div className="max-w-4xl">
          
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {slides[currentSlide].title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Button */}
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-10 py-4 text-lg rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            {slides[currentSlide].cta}
          </button>

        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20"
        aria-label="Slide suivant"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'w-10 bg-orange-500' 
                : 'w-3 bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}