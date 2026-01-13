import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Send, Phone, Mail, Clock, Calendar, MessageSquare } from 'lucide-react';

export default function ContactPageModern() {
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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- BANNER EN HAUT --- */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&h=600&fit=crop" 
          alt="Contact THDS" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/80 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 uppercase tracking-tighter">Etre contacté</h1>
            <p className="text-purple-200 text-lg max-w-xl mx-auto">Une question ? Un projet de formation ? Nos experts THDS sont là pour vous accompagner.</p>
          </div>
        </div>
      </div>

      {/* --- FORMULAIRE --- */}
      <div className="max-w-4xl mx-auto -mt-16 px-4 pb-20 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100">
          
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

      <style>{`
        .input-modern { width: 100%; padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; outline: none; transition: 0.2s; }
        .input-modern:focus { border-color: #6b21a8; background: white; box-shadow: 0 0 0 4px rgba(107, 33, 168, 0.1); }
      `}</style>
    </div>
  );
}