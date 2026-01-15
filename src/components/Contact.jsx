import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Calendar } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    periodeContact: '',
    urgence: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({ title: 'Transmission de votre demande...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
      await axios.post('http://localhost:5000/api/contact/contact-complet', formData);
      Swal.fire({
        icon: 'success',
        title: 'Demande envoyée !',
        text: 'Notre équipe THDS vous recontactera selon vos préférences.',
        confirmButtonColor: '#4c1d95'
      });
      // Reset form
      setFormData({ prenom: '', nom: '', email: '', telephone: '', periodeContact: '', urgence: '', message: '' });
    } catch (error) {
      Swal.fire('Erreur', "Échec de l'envoi.", 'error');
    }
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
      <div className="relative h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600&h=600&fit=crop"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/85"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CONTACTEZ-NOUS
            </h1>
            <p className="text-xl text-purple-200">
              Utilisez le formulaire ci-dessous si vous souhaitez être contacté par notre équipe.
            </p>
            <p className="text-lg text-purple-200 mt-2">
              Pour toute demande d'informations sur nos services, laissez-nous un message.
            </p>
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

      {/* --- FORMULAIRE --- */}
      <div className="max-w-7xl mx-auto mt-16  pb-20 relative z-10">
        <div className="bg-white rounded-xl shadow-md  p-8 md:p-12 border border-slate-100">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700">Prénom *</label>
                <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} className="input-modern" required placeholder="Ex: Jean" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700">Nom *</label>
                <input type="text" name="nom" value={formData.nom} onChange={handleChange} className="input-modern" required placeholder="Ex: DUPONT" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700">E-mail *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-modern" required placeholder="jean.dupont@mail.com" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700">Téléphone *</label>
                <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} className="input-modern" required placeholder="06 00 00 00 00" />
              </div>
            </div>

            {/* Préférences de rappel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <label className="text-sm font-bold mb-3 flex items-center text-purple-900">
                  <Calendar size={18} className="mr-2"/> Période souhaitée
                </label>
                <select name="periodeContact" value={formData.periodeContact} onChange={handleChange} className="input-modern bg-white" required>
                  <option value="">Sélectionnez...</option>
                  <option value="Semaine">En semaine (Lundi - Vendredi)</option>
                  <option value="Week-end">Le Week-end (Samedi)</option>
                </select>
              </div>

              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                <label className="text-sm font-bold mb-3 flex items-center text-purple-900">
                  <Clock size={18} className="mr-2"/> Urgence de l'appel
                </label>
                <select name="urgence" value={formData.urgence} onChange={handleChange} className="input-modern bg-white" required>
                  <option value="">Sélectionnez...</option>
                  <option value="Dès que possible">🚀 Le plus tôt possible</option>
                  <option value="Sous 48h">📅 Sous 48 heures</option>
                  <option value="Pas pressé">🧘 Je ne suis pas pressé</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700">Message ou précisions</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="input-modern resize-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
            </div>

            <button type="submit" className="w-full bg-purple-900 text-white py-5 rounded-2xl font-bold hover:bg-purple-950 transition-all shadow-xl shadow-purple-200 flex items-center justify-center">
              Être recontacté par un conseiller <Send size={18} className="ml-3"/>
            </button>
          </form>
        </div>
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
      <style>{`
        .input-modern { width: 100%; padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; outline: none; transition: 0.2s; }
        .input-modern:focus { border-color: #6b21a8; background: white; box-shadow: 0 0 0 4px rgba(107, 33, 168, 0.1); }
      `}</style>
    </div>
  );
}