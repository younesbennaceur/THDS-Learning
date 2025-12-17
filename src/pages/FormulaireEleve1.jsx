import React, { useState } from 'react';
import axios from 'axios'; 
import { Send, ChevronRight, ChevronLeft, User, Target, ClipboardCheck, Check } from 'lucide-react';
import Swal from 'sweetalert2';

export default function FicheAnalyseModern() {
  const [step, setStep] = useState(1);
  
  // State pour stocker les données
  const [formData, setFormData] = useState({
    civilite: '', prenom: '', nom: '', email: '', telephone: '', dateEntretien: '',
    formationVisee: '', raisonsFormation: [], attentesPrioritaires: '', criteresImportants: [],
    objectifsRepondent: '', dejaParticipe: '', situationOrigine: '', priseEnCharge: [],
    lieuRealisation: '', dateDemarrage: '', handicap: '', contraintesHandicap: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSelection = (field, value) => {
    setFormData(prev => {
      const list = prev[field] ? [...prev[field]] : [];
      if (list.includes(value)) {
        return { ...prev, [field]: list.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...list, value] };
      }
    });
  };

  const setSelection = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- NAVIGATION ---
  const handleNext = (e) => {
    e.preventDefault();
    setStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setStep(prev => Math.max(prev - 1, 1));
  };
  
  // --- SOUMISSION CONNECTÉE AU BACKEND ---
const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (step !== 3) return;

    // On affiche un petit chargement pendant l'envoi
    Swal.fire({
      title: 'Envoi en cours...',
      text: 'Veuillez patienter quelques instants.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/api/eleve/analyse-besoins', formData);

      if (response.status === 200) {
        // --- SUCCÈS : JOLI POP-UP ---
        Swal.fire({
          title: 'Dossier Envoyé !',
          text: 'Nous avons bien reçu votre fiche. Un email de confirmation vous a été envoyé.',
          icon: 'success',
          confirmButtonText: 'Super !',
          confirmButtonColor: '#4c1d95', // Ta couleur violette
          background: '#fff',
          backdrop: `
            rgba(0,0,123,0.4)
          `
        });
        
        // Optionnel : Reset du formulaire ici si tu veux
      }

    } catch (error) {
      // --- ERREUR : POP-UP D'ERREUR ---
      console.error('Erreur:', error);
      Swal.fire({
        title: 'Oups...',
        text: "Une erreur est survenue lors de l'envoi. Le serveur est-il allumé ?",
        icon: 'error',
        confirmButtonText: 'Réessayer',
        confirmButtonColor: '#d33'
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
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
             Fiche analyse des besoins et attentes clients [ VISIO ]
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        <h5 className="text-sm text-center text-slate-500 mt-6 px-4 md:px-0">
          Vos données personnelles sont utilisées dans le cadre strict de l’exécution et du suivi de vos réponses par les services de THDS en charge du traitement. Elles sont nécessaires à l’exécution de ce service. Elles sont conservées pour une durée de trois ans à compter de notre dernier contact. En application de la réglementation sur la protection des données à caractère personnel, vous bénéficiez d’un droit d’accès, de rectification, de limitation du traitement ainsi que d’un droit d’opposition et de portabilité de vos données si cela est applicable que vous pouvez exercer en vous adressant à THDS , ou par mail : contact@thds.fr .
Vous bénéficiez également du droit d’introduire une réclamation auprès d’une autorité de contrôle si nécessaire.
        </h5>
        
        {/* Header */}
        <div className="my-10 text-center">
          
          <div className="flex justify-center items-center mt-8 space-x-4">
            <StepIndicator number={1} current={step} icon={<User size={18} />} label="Contact" />
            <div className={`h-1 w-16 rounded transition-colors duration-500 ${step >= 2 ? 'bg-purple-950' : 'bg-slate-200'}`} />
            <StepIndicator number={2} current={step} icon={<Target size={18} />} label="Attentes" />
            <div className={`h-1 w-16 rounded transition-colors duration-500 ${step >= 3 ? 'bg-purple-950' : 'bg-slate-200'}`} />
            <StepIndicator number={3} current={step} icon={<ClipboardCheck size={18} />} label="Analyse" />
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-3xl mb-16 shadow-xl overflow-hidden border border-slate-100">
          <form 
            onSubmit={handleSubmit} 
            onKeyDown={handleKeyDown}
            className="p-8 md:p-12"
          >
            
            {/* ÉTAPE 1 */}
            {step === 1 && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-800">Faisons connaissance</h2>
                  <p className="text-slate-500 mt-1">Vos informations de contact</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-2">
                    <Label>Civilité</Label>
                    <select name="civilite" value={formData.civilite} onChange={handleChange} className="input-modern">
                      <option value="">-</option>
                      <option value="M.">M.</option>
                      <option value="Mme">Mme</option>
                    </select>
                  </div>
                  <div className="md:col-span-5">
                    <Label>Prénom</Label>
                    <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} className="input-modern" placeholder="Jean" />
                  </div>
                  <div className="md:col-span-5">
                    <Label>Nom</Label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} className="input-modern" placeholder="Dupont" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label required>Email professionnel</Label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-modern" placeholder="jean.dupont@entreprise.com" required />
                  </div>
                  <div>
                    <Label required>Téléphone</Label>
                    <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} className="input-modern" placeholder="06 12 34 56 78" required />
                  </div>
                </div>
                <div>
                   <Label required>Date de l'entretien</Label>
                   <input type="date" name="dateEntretien" value={formData.dateEntretien} onChange={handleChange} className="input-modern w-full md:w-1/3" />
                </div>
              </div>
            )}

            {/* ÉTAPE 2 */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-800">Vos Objectifs</h2>
                  <p className="text-slate-500 mt-1">Dites-nous en plus sur vos attentes</p>
                </div>

                <div>
                  <Label>Quelle formation allez-vous suivre ?</Label>
                  <input type="text" name="formationVisee" value={formData.formationVisee} onChange={handleChange} className="input-modern" placeholder="Nom de la formation..." />
                </div>

                <div>
                  <Label>Pourquoi souhaitez-vous suivre cette formation ? (Choix multiples)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {['Demande entreprise', 'Demande personnelle', 'Renforcer compétences', 'Évolution pro'].map(opt => (
                      <SelectCard key={opt} label={opt} selected={formData.raisonsFormation.includes(opt)} onClick={() => toggleSelection('raisonsFormation', opt)} />
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Vos attentes prioritaires</Label>
                  <textarea name="attentesPrioritaires" rows="4" value={formData.attentesPrioritaires} onChange={handleChange} className="input-modern resize-none" placeholder="J'aimerais approfondir..." />
                </div>

                <div>
                   <Label>Adéquation des objectifs</Label>
                   <div className="flex flex-wrap gap-3 mt-2">
                     {['Oui', 'Partiellement', 'Non'].map(opt => (
                       <RadioCard key={opt} label={opt} selected={formData.objectifsRepondent === opt} onClick={() => setSelection('objectifsRepondent', opt)} />
                     ))}
                   </div>
                </div>
              </div>
            )}

            {/* ÉTAPE 3 */}
            {step === 3 && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-800">Détails Logistiques</h2>
                  <p className="text-slate-500 mt-1">Finalisons votre dossier</p>
                </div>

                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                   <Label>Avez-vous déjà participé à une formation sur ce thème ?</Label>
                   <div className="flex gap-4 mt-3">
                      <RadioCard label="Oui" selected={formData.dejaParticipe === 'Oui'} onClick={() => setSelection('dejaParticipe', 'Oui')} />
                      <RadioCard label="Non" selected={formData.dejaParticipe === 'Non'} onClick={() => setSelection('dejaParticipe', 'Non')} />
                   </div>
                </div>

                <div>
                  <Label>Mode de financement envisagé</Label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {['CPF', 'Pôle Emploi', 'OPCO', 'FNE', 'Autre'].map(opt => (
                       <SelectCard key={opt} label={opt} selected={formData.priseEnCharge.includes(opt)} onClick={() => toggleSelection('priseEnCharge', opt)} />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label>Lieu de réalisation</Label>
                        <input type="text" name="lieuRealisation" value={formData.lieuRealisation} onChange={handleChange} className="input-modern" />
                    </div>
                    <div>
                        <Label>Date de démarrage souhaitée</Label>
                        <input type="text" name="dateDemarrage" value={formData.dateDemarrage} onChange={handleChange} className="input-modern" placeholder="JJ/MM/AAAA" />
                    </div>
                </div>

                <div>
                    <Label>Situation de handicap</Label>
                    <div className="flex gap-4 mt-2">
                      <RadioCard label="Oui" selected={formData.handicap === 'Oui'} onClick={() => setSelection('handicap', 'Oui')} />
                      <RadioCard label="Non" selected={formData.handicap === 'Non'} onClick={() => setSelection('handicap', 'Non')} />
                    </div>
                    {formData.handicap === 'Oui' && (
                        <div className="mt-4 animate-fade-in-up">
                            <Label>Précisez vos contraintes</Label>
                            <input type="text" name="contraintesHandicap" value={formData.contraintesHandicap} onChange={handleChange} className="input-modern" />
                        </div>
                    )}
                </div>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="mt-12 pt-6 border-t border-slate-100 flex justify-between items-center">
              {step > 1 ? (
                <button 
                  type="button" 
                  onClick={handlePrev} 
                  className="group flex items-center text-slate-500 hover:text-purple-950 font-medium transition-colors px-4 py-2"
                >
                  <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                  Précédent
                </button>
              ) : <div></div>}

              {step < 3 ? (
                <button 
                  type="button" 
                  onClick={handleNext} 
                  className="btn-primary"
                >
                  Suivant <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="btn-success"
                >
                  Envoyer le dossier <Send className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

     <style>{`
        .input-modern { 
          width: 100%; 
          padding: 12px 16px; 
          background-color: #F8FAFC; 
          border: 1px solid #E2E8F0; 
          border-radius: 12px; 
          color: #1E293B; 
          transition: all 0.2s ease; 
          outline: none; 
        }
        /* Changement de couleur de Focus en Violet */
        .input-modern:focus { 
          background-color: #FFFFFF; 
          border-color: #9333ea; 
          box-shadow: 0 0 0 4px rgba(147, 51, 234, 0.1); 
        }
        
        /* Bouton Primaire (Suivant) en Purple 950 Gradient */
        .btn-primary { 
          background: linear-gradient(135deg, #6b21a8, #3b0764); 
          color: white; 
          padding: 14px 32px; 
          border-radius: 12px; 
          font-weight: 600; 
          box-shadow: 0 4px 6px -1px rgba(107, 33, 168, 0.3); 
          display: flex; 
          align-items: center; 
          transition: transform 0.2s, box-shadow 0.2s; 
        }
        .btn-primary:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 10px 15px -3px rgba(107, 33, 168, 0.4); 
        }

        /* Bouton Success (Envoyer) reste Vert (standard) */
        .btn-success { 
          background: linear-gradient(135deg, #10B981, #059669); 
          color: white; 
          padding: 14px 32px; 
          border-radius: 12px; 
          font-weight: 600; 
          box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3); 
          display: flex; 
          align-items: center; 
          transition: transform 0.2s; 
        }
        .btn-success:hover { transform: translateY(-2px); }
        
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}

// --- Composants UI ---
const Label = ({ children, required }) => (
  <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const StepIndicator = ({ number, current, icon, label }) => {
  const active = current >= number;
  const isCurrent = current === number;
  return (
    <div className="flex flex-col items-center relative z-10">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${active ? 'bg-purple-950 border-purple-950 text-white shadow-lg shadow-purple-200' : 'bg-white border-slate-300 text-slate-400'} ${isCurrent ? 'ring-4 ring-purple-100' : ''}`}>
        {active ? <Check size={20} /> : icon}
      </div>
      <span className={`text-xs font-semibold mt-2 transition-colors duration-300 ${active ? 'text-purple-950' : 'text-slate-400'}`}>{label}</span>
    </div>
  );
};

const SelectCard = ({ label, selected, onClick }) => (
  <div onClick={onClick} className={`cursor-pointer px-5 py-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${selected ? 'border-purple-950 bg-purple-50/50' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
    <span className={`font-medium ${selected ? 'text-purple-950' : 'text-slate-600'}`}>{label}</span>
    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected ? 'border-purple-950 bg-purple-950' : 'border-slate-300 bg-white group-hover:border-slate-400'}`}>
       {selected && <Check size={14} className="text-white" />}
    </div>
  </div>
);

const RadioCard = ({ label, selected, onClick }) => (
  <div onClick={onClick} className={`cursor-pointer px-6 py-3 rounded-xl border transition-all duration-200 text-center min-w-[100px] ${selected ? 'bg-slate-800 text-white border-slate-800 shadow-lg shadow-slate-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
    <span className="font-medium text-sm">{label}</span>
  </div>
);