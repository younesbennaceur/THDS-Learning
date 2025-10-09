import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    telephone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'envoi du formulaire
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: ["5 Rue Pleyel", "93200 Saint-Denis"],
      color: "text-purple-600"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: ["06 09 96 85 95"],
      link: "tel:0609968595",
      color: "text-orange-500"
    },
    {
      icon: Mail,
      title: "Email",
      content: ["contact@thds.fr "],
      link: "mailto:contact@thds.fr ",
      color: "text-purple-600"
    },
    {
      icon: Clock,
      title: "Heures de travail",
      content: ["9:00 – 13:00 14:00 – 19:00", "Du Lundi au Vendredi"],
      color: "text-orange-500"
    }
  ];

  return (
    <div className="relative">
      
      {/* Hero Section with Background */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600&h=600&fit=crop"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/85"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Réclamation
            </h1>
           
          </div>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Call Us Card */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center  transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full mb-6">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              APPELEZ-NOUS
            </h3>
            <p className="text-blue-600 mb-6">via le numéro suivant :</p>
            <a 
              href="tel:0609968595"
              className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              06 09 96 85 95
            </a>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center  transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-6">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              CONTACTEZ-NOUS PAR E-MAIL
            </h3>
            <p className="text-blue-600 mb-6">laissez-nous un message .</p>
            <a 
              href="mailto:contact@thds.fr "
              className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              contact@thds.fr 
            </a>
          </div>

        </div>

        {/* Contact Info Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center  transition-shadow duration-300">
                <Icon className={`w-12 h-12 ${info.color} mx-auto mb-4`} />
                <h4 className="text-lg font-bold text-gray-800 mb-3">
                  {info.title}
                </h4>
                {info.link ? (
                  <a 
                    href={info.link}
                    className="text-blue-600 hover:text-blue-800 font-medium block"
                  >
                    {info.content.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </a>
                ) : (
                  <div className="text-blue-600 font-medium">
                    {info.content.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
            Réclamation, Nous vous écoutons.
          </h3>
          
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Votre nom
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Votre e-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Objet
              </label>
              <input
                type="text"
                name="objet"
                value={formData.objet}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Votre N° téléphone
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Votre message (facultatif)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-12 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>ENVOYER</span>
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-16">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.0!2d2.3606!3d48.9258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66a22b5555555%3A0x1234567890abcdef!2s5%20Rue%20Pleyel%2C%2093200%20Saint-Denis!5e0!3m2!1sfr!2sfr!4v1234567890"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Localisation THDS"
          ></iframe>
          
          <div className="p-8 bg-gray-50 text-center">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Localisation</h4>
            <p className="text-blue-600 font-medium text-lg mb-2">5 Rue Pleyel</p>
            <p className="text-blue-600 font-medium text-lg mb-6">93200 Saint-Denis</p>
            <a 
              href="https://www.google.com/maps/dir//5+Rue+Pleyel,+93200+Saint-Denis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              ITINÉRAIRES 📍
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}