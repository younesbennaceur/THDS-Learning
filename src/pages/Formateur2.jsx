import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Send, ChevronRight, User, BookOpen, Check } from 'lucide-react';

export default function Formateur2() {
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '', // Ajouté pour l'envoi de confirmation
    
    actionsPassees: '',
    actionsFutures: '',
    miseAJour: '',
    accompagnement: '',
    frequenceVeille: '',
    ajoutCommentaire: '', // Oui/Non
    commentaires: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setSelection = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- VALIDATION STRICTE ---
  const validateStep = (currentStep) => {
    const errors = [];
    if (currentStep === 1) {
      if (!formData.prenom) errors.push("Prénom");
      if (!formData.nom) errors.push("Nom");
      if (!formData.email) errors.push("E-mail (pour confirmation)");
    }
    if (currentStep === 2) {
      if (!formData.actionsPassees) errors.push("Q1. Actions menées (12 derniers mois)");
      if (!formData.actionsFutures) errors.push("Q2. Actions envisagées (12 prochains mois)");
      if (!formData.miseAJour) errors.push("Q3. Mise à jour compétences");
      if (!formData.accompagnement) errors.push("Q4. Accompagnement THDSFormation");
      if (!formData.frequenceVeille) errors.push("Q5. Fréquence veille");
      if (!formData.ajoutCommentaire) errors.push("Q6. Souhaitez-vous ajouter un commentaire ?");
      
      if (formData.ajoutCommentaire === 'Oui' && !formData.commentaires) {
        errors.push("Votre commentaire (puisque vous avez répondu Oui)");
      }
    }
    return errors;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const errors = validateStep(step);
    if (errors.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Champs manquants',
        html: `<ul>${errors.map(e => `<li>- ${e}</li>`).join('')}</ul>`,
        confirmButtonColor: '#4c1d95'
      });
      return;
    }
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateStep(2);
    if (errors.length > 0) {
      Swal.fire({ icon: 'warning', title: 'Champs manquants', html: `<ul>${errors.map(e => `<li>- ${e}</li>`).join('')}</ul>`, confirmButtonColor: '#4c1d95' });
      return;
    }

    Swal.fire({ title: 'Envoi...', didOpen: () => Swal.showLoading() });

    try {
      // Pas de fichiers ici, donc pas besoin de FormData, JSON suffit
      const response = await axios.post('https://thds-learning.onrender.com/api/formateur/evaluation-competences', formData);

      if (response.status === 200) {
        Swal.fire({
          title: 'Envoyé !',
          text: 'Votre évaluation a bien été transmise.',
          icon: 'success',
          confirmButtonColor: '#4c1d95'
        });
      }
    } catch (error) {
      Swal.fire({ title: 'Erreur', text: "Impossible d'envoyer le formulaire.", icon: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="relative h-64 bg-purple-950 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="text-center text-white px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">ÉVALUATION ANNUELLE</h1>
          <p className="opacity-90 tracking-widest text-sm uppercase">Développement des compétences</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-10 mb-16">
        
        {/* Simple Stepper */}
        <div className="flex justify-center mb-6">
            <div className={`h-2 w-1/2 rounded-l-full transition-all ${step >= 1 ? 'bg-purple-900' : 'bg-slate-300'}`}></div>
            <div className={`h-2 w-1/2 rounded-r-full transition-all ${step >= 2 ? 'bg-purple-900' : 'bg-slate-300'}`}></div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <form className="p-8 md:p-12">
            
            {/* ETAPE 1 : IDENTITÉ */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-6 border-b pb-4">
                    <User className="text-purple-900" />
                    <h2 className="text-xl font-bold text-slate-800">Votre Identité</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label req>Prénom</Label>
                    <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} className="input-modern" placeholder="Votre prénom"/>
                  </div>
                  <div>
                    <Label req>Nom</Label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} className="input-modern" placeholder="Votre nom"/>
                  </div>
                </div>

                <div>
                    <Label req>E-mail</Label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-modern" placeholder="Pour recevoir la confirmation"/>
                </div>

                <div className="pt-6 flex justify-end">
                    <button onClick={handleNext} className="btn-primary">
                        Suivant <ChevronRight className="ml-2 w-5 h-5"/>
                    </button>
                </div>
              </div>
            )}

            {/* ETAPE 2 : QUESTIONNAIRE */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-6 border-b pb-4">
                    <BookOpen className="text-purple-900" />
                    <h2 className="text-xl font-bold text-slate-800">Le Questionnaire</h2>
                </div>

                <div>
                    <Label req>1. Quelles actions avez-vous mené durant les 12 derniers mois afin de développer vos compétences ?</Label>
                    <p className="text-xs text-slate-500 mb-2">(Webinaires, formations, réseaux pro...)</p>
                    <textarea name="actionsPassees" rows="4" value={formData.actionsPassees} onChange={handleChange} className="input-modern"/>
                </div>

                <div>
                    <Label req>2. Quelles actions envisagez-vous durant les 12 prochains mois ?</Label>
                    <textarea name="actionsFutures" rows="4" value={formData.actionsFutures} onChange={handleChange} className="input-modern"/>
                </div>

                <div>
                    <Label req>3. Comment mettez-vous à jour vos compétences métiers ?</Label>
                    <textarea name="miseAJour" rows="3" value={formData.miseAJour} onChange={handleChange} className="input-modern"/>
                </div>

                <div>
                    <Label req>4. En quoi THDSFORMATION.FR peut vous accompagner au quotidien ?</Label>
                    <textarea name="accompagnement" rows="3" value={formData.accompagnement} onChange={handleChange} className="input-modern"/>
                </div>

                <div>
                    <Label req>5. A quelle fréquence traitez-vous les informations de veille ?</Label>
                    <input type="text" name="frequenceVeille" value={formData.frequenceVeille} onChange={handleChange} className="input-modern" placeholder="Ex: Une fois par semaine..."/>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                    <Label req>6. Souhaitez-vous ajouter des commentaires supplémentaires ?</Label>
                    <div className="flex gap-4 mt-3">
                        <RadioCard label="Oui" selected={formData.ajoutCommentaire === 'Oui'} onClick={() => setSelection('ajoutCommentaire', 'Oui')} />
                        <RadioCard label="Non" selected={formData.ajoutCommentaire === 'Non'} onClick={() => setSelection('ajoutCommentaire', 'Non')} />
                    </div>

                    {formData.ajoutCommentaire === 'Oui' && (
                        <div className="mt-4 pt-4 border-t border-purple-200 animate-fade-in-up">
                            <Label req>Vos commentaires :</Label>
                            <textarea name="commentaires" rows="3" value={formData.commentaires} onChange={handleChange} className="input-modern bg-white"/>
                        </div>
                    )}
                </div>

                <div className="pt-6 flex justify-between">
                    <button onClick={() => setStep(1)} className="text-slate-500 hover:text-purple-900 font-medium px-4">
                        Retour
                    </button>
                    <button onClick={handleSubmit} className="btn-success">
                        Envoyer le Bilan <Send className="ml-2 w-5 h-5"/>
                    </button>
                </div>
              </div>
            )}

          </form>
        </div>
      </div>

      <style>{`
        .input-modern { width: 100%; padding: 12px 16px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; color: #1E293B; outline: none; transition: all 0.2s; resize: vertical; }
        .input-modern:focus { background: white; border-color: #4c1d95; box-shadow: 0 0 0 4px rgba(76, 29, 149, 0.1); }
        .btn-primary { background: linear-gradient(135deg, #6b21a8, #3b0764); color: white; padding: 14px 32px; border-radius: 12px; font-weight: 600; display: flex; align-items: center; transition: transform 0.2s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(76, 29, 149, 0.4); }
        .btn-success { background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 14px 32px; border-radius: 12px; font-weight: 600; display: flex; align-items: center; transition: transform 0.2s; }
        .btn-success:hover { transform: translateY(-2px); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}

// Composants
const Label = ({ children, req }) => (
    <label className="block text-sm font-bold text-slate-800 mb-1">
        {children} {req && <span className="text-red-600">*</span>}
    </label>
);

const RadioCard = ({ label, selected, onClick }) => (
  <div onClick={onClick} className={`cursor-pointer px-6 py-2 rounded-lg border text-center min-w-[80px] transition-all font-medium ${selected ? 'bg-purple-900 text-white border-purple-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{label}</div>
);