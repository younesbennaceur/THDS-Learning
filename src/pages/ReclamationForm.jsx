import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AlertTriangle, Send, User, Clock, Calendar, MessageSquare, ShieldAlert } from 'lucide-react';

export default function ReclamationForm() {
  const [formData, setFormData] = useState({
     nom: '',
     email: '',
     objet: '',
     telephone: '',
     message: ''
   });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({ title: 'Enregistrement de votre réclamation...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
      const response = await axios.post('/api/reclamation/reclamationForm', formData);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Réclamation enregistrée',
          text: 'Notre service qualité THDS traitera votre demande avec la plus haute priorité.',
          confirmButtonColor: '#4c1d95'
        });
        setFormData({ prenom: '', nom: '', email: '', telephone: '', typeReclamation: '', description: '', solutionAttendue: '', periodeContact: '', urgence: '' });
      }
    } catch (error) {
      Swal.fire('Erreur', "Une erreur est survenue lors de la transmission.", 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- BANNER --- */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-red-900/90 flex items-center justify-center z-10">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl font-extrabold mb-2 uppercase tracking-tight flex items-center justify-center">
              <AlertTriangle className="mr-3" size={36} /> Service Réclamation
            </h1>
            <p className="text-red-100 text-lg max-w-xl mx-auto">Votre satisfaction est notre priorité. Expliquez-nous votre problème pour que nous puissions le résoudre.</p>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?w=1600&h=400&fit=crop" className="w-full h-full object-cover" alt="Service Client" />
      </div>

      {/* --- FORMULAIRE --- */}
      <div className="max-w-4xl mx-auto -mt-12 px-4 pb-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-8 border-red-600">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">Prénom *</label>
                <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} className="input-modern" required />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Nom *</label>
                <input type="text" name="nom" value={formData.nom} onChange={handleChange} className="input-modern" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-bold mb-2">Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="input-modern" required /></div>
              <div><label className="block text-sm font-bold mb-2">Téléphone *</label><input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} className="input-modern" required /></div>
            </div>

            {/* Type de réclamation */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <label className="block text-sm font-bold mb-3 flex items-center text-red-900">
                <ShieldAlert size={18} className="mr-2"/> Nature de la réclamation
              </label>
              <select name="typeReclamation" value={formData.typeReclamation} onChange={handleChange} className="input-modern bg-white" required>
                <option value="">Choisir une catégorie...</option>
                <option value="Pedagogique">Problème pédagogique (Contenu, Formateur)</option>
                <option value="Administratif">Problème administratif (Inscription, CPF)</option>
                <option value="Technique">Problème technique (Plateforme, Connexion)</option>
                <option value="Logistique">Problème logistique</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Description détaillée des faits *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="input-modern resize-none" placeholder="Décrivez précisément l'incident..." required></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Solution ou résolution attendue</label>
              <textarea name="solutionAttendue" value={formData.solutionAttendue} onChange={handleChange} rows="2" className="input-modern resize-none" placeholder="Comment pouvons-nous réparer cette situation ?"></textarea>
            </div>

            {/* Préférences de rappel (Style identique au contact) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <label className="text-sm font-bold mb-3 flex items-center text-slate-800">
                  <Calendar size={18} className="mr-2"/> Période de rappel souhaitée
                </label>
                <select name="periodeContact" value={formData.periodeContact} onChange={handleChange} className="input-modern bg-white" required>
                  <option value="">Sélectionnez...</option>
                  <option value="Semaine">En semaine</option>
                 
                </select>
              </div>

              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <label className="text-sm font-bold mb-3 flex items-center text-red-900">
                  <Clock size={18} className="mr-2"/> Urgence de traitement
                </label>
                <select name="urgence" value={formData.urgence} onChange={handleChange} className="input-modern bg-white" required>
                  <option value="">Sélectionnez...</option>
                  <option value="Immediat">🚀 Le plus tôt possible</option>
                  <option value="48h">📅 Sous 48 heures</option>
                  <option value="Pas presse">🧘 Pas urgent</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full bg-red-600 text-white py-5 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-100 flex items-center justify-center">
              Transmettre ma réclamation <Send size={18} className="ml-3"/>
            </button>
          </form>
        </div>
        
        {/* Footer info THDS */}
        <div className="mt-12 text-center text-slate-400 text-xs">
          [cite_start]<p>THDS - 5 RUE PLEYEL 93200 SAINT-DENIS [cite: 33, 68]</p>
          [cite_start]<p>SIRET 832 774 087 00023 - Déclaration d'activité 11931056093 [cite: 33, 102]</p>
        </div>
      </div>

      <style>{`
        .input-modern { width: 100%; padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; outline: none; transition: 0.2s; }
        .input-modern:focus { border-color: #dc2626; background: white; box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1); }
      `}</style>
    </div>
  );
}