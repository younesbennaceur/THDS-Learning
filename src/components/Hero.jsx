import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Votre formation en présentiel",
      subtitle: "THDS vous propose des formations  100% en présentiel. Les formations en présentiel permettent une interaction directe, une meilleure concentration, un apprentissage pratique, un accompagnement personnalisé et favorise le travail en groupe ainsi que le réseau professionnel.",
      cta: "Demander Un Devis",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop", 
      link:"/etre-contacte"
    },
    {
      title: "Formations Certifiantes et Diplômantes",
      subtitle: "Obtenez des certifications reconnues et valorisez votre parcours professionnel avec nos programmes de formation certifiés.",
      cta: "Nos Formations",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop", 
      link:"/formations"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[100dvh] min-h-[650px] w-full overflow-hidden">
      
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
            <div className="absolute inset-0 bg-gradient-to-r from-purple-950/95 via-purple-900/85 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      {/* J'ai augmenté pb-28 à pb-40 sur mobile pour faire de la place aux 2 logos verticaux */}
      <div className="relative h-full w-full mx-auto px-4 sm:px-6 lg:px-24 flex items-center pb-40 sm:pb-0 pt-12 sm:pt-0">
        <div className="max-w-4xl">
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
            {slides[currentSlide].title}
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
            {slides[currentSlide].subtitle}
          </p>

          <Link to={slides[currentSlide].link}>
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              {slides[currentSlide].cta}
            </button>
          </Link>

        </div>
      </div>

      {/* === LOGOS : Disposition Verticale === */}
      {/* Utilisation de flex-col pour forcer l'empilement vertical */}
      <div className="absolute bottom-24 md:bottom-10 left-4 sm:left-6 lg:left-24 z-10 flex flex-col md:flex-row gap-3 sm:gap-6 w-full pr-4">
        
        {/* Premier Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/certification-vtest-france"> 
            <img 
              src="/vtestfrance.png" 
              alt="VTest Logo 1"
              className="h-10 sm:h-16 md:h-24 w-auto"
            />
          </Link>
          <ul className="m-0 p-0 flex flex-col justify-center">
            <li>
              <Link to="/certification-vtest-france" className="text-blue-100 hover:text-orange-400 transition-colors flex items-center space-x-1 sm:space-x-2 group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 transition-transform"></span>
                <span className="text-sm sm:text-lg md:text-xl font-medium">VTest-France</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Deuxième Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/certification-vtest-france"> 
            <img 
              src="/inkrea.png" 
              alt="inkrea certefication Logo 2"
              className="h-10 sm:h-16 md:h-24 w-auto"
            />
          </Link>
          <ul className="m-0 p-0 flex flex-col justify-center">
            <li>
              <a href="https://www.inkrea-certifications.fr/" className="text-blue-100 hover:text-orange-400 transition-colors flex items-center space-x-1 sm:space-x-2 group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 transition-transform"></span>
                <span className="text-sm sm:text-lg md:text-xl font-medium">Inkrea Certificatios</span>
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="hidden sm:block absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="hidden sm:block absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20"
        aria-label="Slide suivant"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="hidden md:flex absolute bottom-12 left-1/2 transform -translate-x-1/2 space-x-3 z-20">
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