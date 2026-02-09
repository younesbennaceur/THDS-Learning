import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Send, ChevronRight, ChevronLeft, User, Target, ClipboardCheck, Check } from 'lucide-react';
import {  Star, ThumbsUp, MessageSquare, BarChart2, CheckCircle } from 'lucide-react';

export default function FicheAnalyseModern() {
  const [step, setStep] = useState(1);
  
  // State pour stocker les données
  const [formData, setFormData] = useState({
    // Step 1
    civilite: '', prenom: '', nom: '', email: '', telephone: '', dateEntretien: '',
    
    // Step 2
    formationVisee: '', 
    raisonsFormation: [], 
    attentesPrioritaires: [], 
    criteresImportants: [],   
    objectifsRepondent: '', 
    besoinConnaissances: [],  
    commentairesAttentes: '', // Facultatif par nature

    // Step 3
    dejaParticipe: '', 
    situationOrigine: '',     
    modalitesContraintes: '', 
    priseEnCharge: [], 
    lieuRealisation: '', 
    dateDemarrage: '', 
    remarquesFinales: '',     // Facultatif par nature
    handicap: '', 
    contraintesHandicap: ''   // Obligatoire seulement si Handicap = Oui
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

  const toggleLimitedSelection = (field, value, limit) => {
    setFormData(prev => {
      const list = prev[field] ? [...prev[field]] : [];
      if (list.includes(value)) {
        return { ...prev, [field]: list.filter(item => item !== value) }; 
      } else {
        if (list.length >= limit) return prev; 
        return { ...prev, [field]: [...list, value] }; 
      }
    });
  };

  const setSelection = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const StepIcon = ({ num, curr, icon }) => {
  const active = curr >= num;
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${active ? 'bg-purple-900 border-purple-900 text-white' : 'bg-white border-slate-300 text-slate-400'}`}>
      {icon}
    </div>
  );
};
const Line = ({ step, target }) => (
  <div className={`h-1 flex-1 mx-2 rounded transition-colors duration-500 ${step >= target ? 'bg-purple-900' : 'bg-slate-200'}`} />
);


  // --- VALIDATION DES CHAMPS (NOUVEAU) ---
  const validateStep = (currentStep) => {
    const errors = [];

    if (currentStep === 1) {
      if (!formData.civilite) errors.push("Civilité");
      if (!formData.prenom) errors.push("Prénom");
      if (!formData.nom) errors.push("Nom");
      if (!formData.email) errors.push("E-mail");
      if (!formData.telephone) errors.push("Téléphone");
      if (!formData.dateEntretien) errors.push("Date de l'entretien");
    }

    if (currentStep === 2) {
      if (!formData.formationVisee) errors.push("Q1. Formation visée");
      if (formData.raisonsFormation.length === 0) errors.push("Q2. Raisons de la formation");
      if (formData.attentesPrioritaires.length === 0) errors.push("Q3. Attentes prioritaires");
      if (formData.criteresImportants.length === 0) errors.push("Q4. Critères importants");
      if (!formData.objectifsRepondent) errors.push("Q5. Adéquation objectifs");
      if (formData.besoinConnaissances.length === 0) errors.push("Q6. Besoin connaissances");
    }

    if (currentStep === 3) {
      if (!formData.dejaParticipe) errors.push("Q8. Déjà participé");
      if (!formData.situationOrigine) errors.push("Q9. Situation d'origine");
      if (!formData.modalitesContraintes) errors.push("Q10. Modalités/Contraintes");
      if (formData.priseEnCharge.length === 0) errors.push("Q11. Prise en charge");
      if (!formData.lieuRealisation) errors.push("Q12. Lieu de réalisation");
      if (!formData.dateDemarrage) errors.push("Q13. Date de démarrage");
      if (!formData.handicap) errors.push("Q15. Handicap");
      // Conditionnel : Si Handicap est Oui, alors la contrainte est obligatoire
      if (formData.handicap === 'Oui' && !formData.contraintesHandicap) errors.push("Q15. Précisions handicap");
    }

    return errors;
  };

  // --- NAVIGATION ---
  const handleNext = (e) => {
    e.preventDefault();
    
    // Vérification avant de passer à l'étape suivante
    const errors = validateStep(step);
    if (errors.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Champs manquants',
        html: `Veuillez remplir les champs suivants :<br/><br/><ul style="text-align:left;">${errors.map(e => `<li>• ${e}</li>`).join('')}</ul>`,
        confirmButtonColor: '#4c1d95'
      });
      return; // On arrête tout si erreur
    }

    setStep(prev => Math.min(prev + 1, 3));
    window.scrollTo(0, 0);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };
  
  // --- SOUMISSION ---
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (step !== 3) return;

    // Vérification finale
    const errors = validateStep(3);
    if (errors.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Champs manquants',
        html: `Veuillez remplir les champs suivants :<br/><br/><ul style="text-align:left;">${errors.map(e => `<li>• ${e}</li>`).join('')}</ul>`,
        confirmButtonColor: '#4c1d95'
      });
      return;
    }

    Swal.fire({
      title: 'Envoi en cours...',
      text: 'Veuillez patienter quelques instants.',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const response = await axios.post('http://localhost:5000/api/eleve/analyse-besoins', formData);

      if (response.status === 200) {
        Swal.fire({
          title: 'Dossier Envoyé !',
          text: 'Nous avons bien reçu votre fiche. Un email de confirmation vous a été envoyé.',
          icon: 'success',
          confirmButtonText: 'Terminer',
          confirmButtonColor: '#4c1d95',
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
      Swal.fire({
        title: 'Oups...',
        text: "Une erreur est survenue. Vérifiez que le serveur (backend) est bien lancé sur le port 5000.",
        icon: 'error',
        confirmButtonText: 'Fermer',
        confirmButtonColor: '#d33'
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  // --- LISTES D'OPTIONS ---
  const optionsRaisons = [
    "Formation prévue par votre entreprise",
    "Formation demandée personnellement",
    "Utile pour renforcer vos compétences dans votre poste actuel",
    "Utile pour acquérir de nouvelles compétences",
    "Utile pour votre évolution professionnelle"
  ];

  const optionsAttentes = [
    "Approfondir vos connaissances",
    "Apprendre de nouveaux contenus",
    "Découvrir de nouveaux outils",
    "Développer votre réseau professionnel",
    "Actualiser vos techniques professionnelles",
    "Améliorer votre quotidien professionnel",
    "Expérimenter de nouveaux savoirs (faire, être)",
    "Autre"
  ];

  const optionsCriteres = [
    "Un côté ludique, fun, moderne",
    "Un petit groupe de travail",
    "Un contenu pratique, concret et opérationnel",
    "Un formateur empathique et captivant",
    "Une personnalisation de la formation",
    "Une formation vivante et interactive avec des échanges"
  ];

  const optionsConnaissances = [
    "Méthodologiques et théoriques",
    "Pratiques"
  ];

  const optionsFinancement = [
    "CPF (Compte Personnel de Formation)",
    "Pôle emploi",
    "OPCO (Opérateur de Compétences)",
    "FNE (Fonds National de l'Emploi)",
    "FSE (Fonds Social Européen)",
    "AGEFIPH (Association de Gestion du Fonds pour l'Insertion Professionnelle des Personnes Handicapées)",
    "Autre"
  ];

  return (
    <div className="relative">
      {/* Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600&h=600&fit=crop"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/85"></div>
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
             Fiche analyse des besoins et attentes clients
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl -mt-10 mx-auto px-4 sm:px-6 z-index-1000 relative">
        
       
        
        {/* Stepper Compact */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex justify-between items-center overflow-x-auto">
           <StepIcon num={1} curr={step} icon={<User size={16}/>} />
           <Line step={step} target={2} />
           <StepIcon num={2} curr={step} icon={<CheckCircle size={16}/>} />
           <Line step={step} target={3} />
           <StepIcon num={3} curr={step} icon={<Target size={16}/>} />
           <Line step={step} target={4} />
           <StepIcon num={4} curr={step} icon={<BarChart2 size={16}/>} />
           <Line step={step} target={5} />
           <StepIcon num={5} curr={step} icon={<Star size={16}/>} />
           <Line step={step} target={6} />
           <StepIcon num={6} curr={step} icon={<MessageSquare size={16}/>} />
        </div>

        {/* Formulaire Container */}
        <div className="bg-white rounded-3xl mb-16 shadow-xl overflow-hidden border border-slate-100">
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="p-6 md:p-12">
            
            {/* ================= ÉTAPE 1 : CONTACT ================= */}
            {step === 1 && (
              <div className="space-y-8 animate-fade-in-up">
                <SectionTitle number="1" title="Faisons connaissance" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-2">
                    <Label>Civilité <span className="text-red-500">*</span></Label>
                    <select name="civilite" value={formData.civilite} onChange={handleChange} className="input-modern">
                      <option value="">-</option>
                      <option value="M.">M.</option>
                      <option value="Mme">Mme</option>
                    </select>
                  </div>
                  <div className="md:col-span-5">
                    <Label>Prénom <span className="text-red-500">*</span></Label>
                    <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} className="input-modern" placeholder="Jean" />
                  </div>
                  <div className="md:col-span-5">
                    <Label>Nom <span className="text-red-500">*</span></Label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} className="input-modern" placeholder="Dupont" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>E-mail (Nécessaire) <span className="text-red-500">*</span></Label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-modern" placeholder="exemple@email.com" />
                  </div>
                  <div>
                    <Label>Téléphone (Nécessaire) <span className="text-red-500">*</span></Label>
                    <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} className="input-modern" placeholder="06 00 00 00 00" />
                  </div>
                </div>
                <div>
                   <Label>Date de l'entretien (Nécessaire) <span className="text-red-500">*</span></Label>
                   <input type="date" name="dateEntretien" value={formData.dateEntretien} onChange={handleChange} className="input-modern w-full md:w-1/3" />
                </div>
              </div>
            )}

            {/* ================= ÉTAPE 2 : VOS ATTENTES ================= */}
            {step === 2 && (
              <div className="space-y-10 animate-fade-in-up">
                <SectionTitle number="2" title="Vos Attentes" />

                {/* Q1 */}
                <div>
                  <Label>1. Quelle formation allez-vous suivre ? <span className="text-red-500">*</span></Label>
                  <input type="text" name="formationVisee" value={formData.formationVisee} onChange={handleChange} className="input-modern" placeholder="Intitulé de la formation..." />
                </div>
                  <div>
                  <Label>2.Quel niveau souhaiteriez-vous atteindre ? <span className="text-red-500">*</span></Label>
                  <input type="text" name="niveauSouhaite" value={formData.niveauSouhaite} onChange={handleChange} className="input-modern" placeholder="Niveau souhaité..." />
                </div>

                {/* Q2 */}
                <div>
                  <Label>3. Pour quelle(s) raison(s) souhaitez-vous suivre cette formation ? (Nécessaire) <span className="text-red-500">*</span></Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    {optionsRaisons.map(opt => (
                      <SelectCard key={opt} label={opt} selected={formData.raisonsFormation.includes(opt)} onClick={() => toggleSelection('raisonsFormation', opt)} />
                    ))}
                  </div>
                </div>

                {/* Q3 */}
                <div>
                  <Label>4. Quelles sont vos attentes prioritaires en participant à cette formation ? (Nécessaire) <span className="text-red-500">*</span></Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    {optionsAttentes.map(opt => (
                      <SelectCard key={opt} label={opt} selected={formData.attentesPrioritaires.includes(opt)} onClick={() => toggleSelection('attentesPrioritaires', opt)} />
                    ))}
                  </div>
                </div>

                {/* Q4 (Critères - Max 3) */}
                <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
                  <Label>5. Quels sont les 3 critères les plus importants pour vous en assistant à cette formation ? (Nécessaire) <span className="text-red-500">*</span></Label>
                  <p className="text-xs text-purple-700 mb-3 font-medium">Sélectionnez uniquement les 3 critères les plus importants à vos yeux.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {optionsCriteres.map(opt => (
                      <SelectCard 
                        key={opt} 
                        label={opt} 
                        selected={formData.criteresImportants.includes(opt)} 
                        onClick={() => toggleLimitedSelection('criteresImportants', opt, 3)} 
                        disabled={!formData.criteresImportants.includes(opt) && formData.criteresImportants.length >= 3}
                      />
                    ))}
                  </div>
                </div>

                {/* Q5 */}
                <div>
                   <Label>6. Les objectifs de la formation tels que décrits sur notre site répondent-ils à vos attentes ? (Nécessaire) <span className="text-red-500">*</span></Label>
                   <div className="flex flex-wrap gap-3 mt-3">
                     {['Oui', 'Partiellement', 'Non'].map(opt => (
                       <RadioCard key={opt} label={opt} selected={formData.objectifsRepondent === opt} onClick={() => setSelection('objectifsRepondent', opt)} />
                     ))}
                   </div>
                </div>

                {/* Q6 */}
                <div>
                  <Label>7. Pour cette formation, pensez-vous avoir le plus besoin d'un apport de connaissances : (Nécessaire) <span className="text-red-500">*</span></Label>
                  <p className="text-xs text-slate-500 mb-2">Plusieurs réponses sont possibles (*)</p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {optionsConnaissances.map(opt => (
                      <SelectCard key={opt} label={opt} selected={formData.besoinConnaissances.includes(opt)} onClick={() => toggleSelection('besoinConnaissances', opt)} />
                    ))}
                  </div>
                </div>

                {/* Q7 */}
                <div>
                  <Label>8. Avez-vous des commentaires à rajouter concernant vos attentes vis-à-vis de la formation ?</Label>
                  <textarea name="commentairesAttentes" rows="3" value={formData.commentairesAttentes} onChange={handleChange} className="input-modern resize-none" />
                </div>
              </div>
            )}

            {/* ================= ÉTAPE 3 : ANALYSE & LOGISTIQUE ================= */}
            {step === 3 && (
              <div className="space-y-10 animate-fade-in-up">
                <SectionTitle number="3" title="Analyse" />

                {/* Q8 */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                   <Label>9. Avez-vous déjà participé à une formation sur le même thème ? (Nécessaire) <span className="text-red-500">*</span></Label>
                   <div className="flex gap-4 mt-3">
                      <RadioCard label="Oui" selected={formData.dejaParticipe === 'Oui'} onClick={() => setSelection('dejaParticipe', 'Oui')} />
                      <RadioCard label="Non" selected={formData.dejaParticipe === 'Non'} onClick={() => setSelection('dejaParticipe', 'Non')} />
                   </div>
                </div>

                {/* Q9 */}
                <div>
                  <Label>10. Expliquer la situation d’origine, votre projet, vos attentes, objectifs et résultats attendus <span className="text-red-500">*</span></Label>
                  <textarea name="situationOrigine" rows="5" value={formData.situationOrigine} onChange={handleChange} className="input-modern" />
                </div>

                {/* Q10 */}
                <div>
                  <Label>11. Modalités de réalisation / contraintes <span className="text-red-500">*</span></Label>
                  <textarea name="modalitesContraintes" rows="3" value={formData.modalitesContraintes} onChange={handleChange} className="input-modern" />
                </div>

                {/* Q11 - Q12 - Q13 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Q11 */}
                  <div>
                    <Label>12. Y a t'il une prise en charge possible ? (Nécessaire) <span className="text-red-500">*</span></Label>
                    <div className="flex flex-col gap-2 mt-3">
                      {optionsFinancement.map(opt => (
                        <CheckboxRow key={opt} label={opt} selected={formData.priseEnCharge.includes(opt)} onClick={() => toggleSelection('priseEnCharge', opt)} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Q12 & Q13 */}
                  <div className="space-y-6">
                    <div>
                        <Label>13. Lieu de réalisation (Nécessaire) <span className="text-red-500">*</span></Label>
                        <input type="text" name="lieuRealisation" value={formData.lieuRealisation} onChange={handleChange} className="input-modern" />
                    </div>
                    <div>
                        <Label>14. Dates de démarrage de formation souhaitées / calendrier (Nécessaire) <span className="text-red-500">*</span></Label>
                        <input type="text" name="dateDemarrage" value={formData.dateDemarrage} onChange={handleChange} className="input-modern" placeholder="JJ/MM/AAAA" />
                    </div>
                  </div>
                </div>

                {/* Q14 */}
                <div className="mt-6">
                  <Label>15. Souhaitez-vous ajouter des remarques / questions au présent questionnaire ?</Label>
                  <textarea name="remarquesFinales" rows="3" value={formData.remarquesFinales} onChange={handleChange} className="input-modern" />
                </div>

                {/* Q15 Handicap */}
                <div className="border-t pt-6 mt-6">
                    <Label>16. Avez-vous un handicap (Nécessaire) <span className="text-red-500">*</span></Label>
                    <div className="flex gap-4 mt-3">
                      <RadioCard label="Oui" selected={formData.handicap === 'Oui'} onClick={() => setSelection('handicap', 'Oui')} />
                      <RadioCard label="Non" selected={formData.handicap === 'Non'} onClick={() => setSelection('handicap', 'Non')} />
                    </div>
                    {formData.handicap === 'Oui' && (
                        <div className="mt-4 animate-fade-in-up bg-red-50 p-4 rounded-xl border border-red-100">
                            <Label>Si oui, avez-vous des contraintes particulières ? <span className="text-red-500">*</span></Label>
                            <input type="text" name="contraintesHandicap" value={formData.contraintesHandicap} onChange={handleChange} className="input-modern bg-white" />
                        </div>
                    )}
                </div>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
              {step > 1 ? (
                <button type="button" onClick={handlePrev} className="group flex items-center text-slate-500 hover:text-purple-950 font-medium transition-colors px-4 py-2">
                  <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                  Précédent
                </button>
              ) : <div></div>}

              {step < 3 ? (
                <button type="button" onClick={handleNext} className="btn-primary">
                  Suivant <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button type="submit" className="btn-success">
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
          font-size: 0.95rem;
        }
        .input-modern:focus { 
          background-color: #FFFFFF; 
          border-color: #9333ea; 
          box-shadow: 0 0 0 4px rgba(147, 51, 234, 0.1); 
        }
        .btn-primary { 
          background: linear-gradient(135deg, #6b21a8, #3b0764); 
          color: white; 
          padding: 14px 32px; 
          border-radius: 12px; 
          font-weight: 600; 
          box-shadow: 0 4px 6px -1px rgba(107, 33, 168, 0.3); 
          display: flex; align-items: center; transition: all 0.2s; 
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(107, 33, 168, 0.4); }
        .btn-success { 
          background: linear-gradient(135deg, #10B981, #059669); 
          color: white; 
          padding: 14px 32px; 
          border-radius: 12px; 
          font-weight: 600; 
          box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3); 
          display: flex; align-items: center; transition: all 0.2s; 
        }
        .btn-success:hover { transform: translateY(-2px); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}

// --- Composants UI ---
const Label = ({ children }) => (
  <label className="block text-sm font-bold text-slate-800 mb-2 ml-1">
    {children}
  </label>
);

const SectionTitle = ({ number, title }) => (
  <div className="flex items-center space-x-3 mb-6 border-b border-slate-100 pb-4">
    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wide">{title}</h2>
  </div>
);

const StepIndicator = ({ number, current, icon, label }) => {
  const active = current >= number;
  const isCurrent = current === number;
  return (
    <div className="flex flex-col items-center relative z-10 group">
      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${active ? 'bg-purple-950 border-purple-950 text-white shadow-lg shadow-purple-200' : 'bg-white border-slate-300 text-slate-400'} ${isCurrent ? 'ring-4 ring-purple-100' : ''}`}>
        {active ? <Check size={18} /> : icon}
      </div>
      <span className={`text-[10px] md:text-xs font-semibold mt-2 transition-colors duration-300 uppercase tracking-wider ${active ? 'text-purple-950' : 'text-slate-400'}`}>{label}</span>
    </div>
  );
};

const SelectCard = ({ label, selected, onClick, disabled }) => (
  <div 
    onClick={!disabled ? onClick : undefined} 
    className={`cursor-pointer px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between group 
      ${selected ? 'border-purple-950 bg-purple-50/50' : 'border-slate-200 bg-white hover:border-slate-300'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
  >
    <span className={`font-medium text-sm ${selected ? 'text-purple-950' : 'text-slate-600'}`}>{label}</span>
    <div className={`w-5 h-5 rounded flex-shrink-0 border flex items-center justify-center transition-colors
       ${selected ? 'border-purple-950 bg-purple-950' : 'border-slate-300 bg-white group-hover:border-slate-400'}
    `}>
       {selected && <Check size={12} className="text-white" />}
    </div>
  </div>
);

const CheckboxRow = ({ label, selected, onClick }) => (
    <div onClick={onClick} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-colors">
        <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0
            ${selected ? 'bg-purple-950 border-purple-950' : 'bg-white border-slate-300'}
        `}>
            {selected && <Check size={12} className="text-white" />}
        </div>
        <span className={`text-sm ${selected ? 'text-purple-950 font-medium' : 'text-slate-600'}`}>{label}</span>
    </div>
);

const RadioCard = ({ label, selected, onClick }) => (
  <div onClick={onClick} className={`cursor-pointer px-6 py-2 rounded-lg border transition-all duration-200 text-center min-w-[80px] ${selected ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
    <span className="font-medium text-sm">{label}</span>
  </div>
);