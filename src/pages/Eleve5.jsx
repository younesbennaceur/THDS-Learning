import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Target } from 'lucide-react';
import { Send, ChevronRight, ChevronLeft, User, Star, ThumbsUp, MessageSquare, BarChart2, CheckCircle, Check } from 'lucide-react';

export default function Eleve5() {
  const [step, setStep] = useState(1);
  
  // State pour toutes les données (6 étapes)
  const [formData, setFormData] = useState({
    // Étape 1 : Coordonnées
    civilite: '', prenom: '', nom: '', email: '', telephone: '',
    fonction: '', nomEntreprise: '',
    intituleFormation: '', dateDebut: '', dateFin: '',

    // Étape 2 : Raisons & Niveau
    raisonsParticipation: [], // Checkbox
    niveauFormation: '',      // Radio
    langageFormateur: '',     // Radio

    // Étape 3 : Objectifs (Oui/Non/Partie)
    objectifsDefinis: '',
    objectifsAtteints: '',
    lacunesComblees: '',
    objectifsPersonnelsAtteints: '',
    equilibreTheoriePratique: '',

    // Étape 4 : Satisfaction détaillée (Très satisfait...)
    accueil: '',
    methodes: '',
    rythme: '',
    moyensPedagogiques: '',
    animation: '',
    organisationMaterielle: '',
    echangesGroupe: '',
    aideRecue: '',
    disponibiliteFormateur: '',

    // Étape 5 : Bilan Global
    globalSatisfaction: '',
    recommandation: '',

    // Étape 6 : Bilan Qualitatif (Texte)
    partieUtile: '',
    partieMoinsUtile: '',
    partieADevelopper: '',
    autreCommentaire: ''
  });

  // --- GESTIONNAIRES D'INPUTS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setSelection = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  // --- VALIDATION DES ÉTAPES ---
  const validateStep = (currentStep) => {
    const errors = [];
    
    if (currentStep === 1) {
      if (!formData.civilite) errors.push("Civilité");
      if (!formData.prenom) errors.push("Prénom");
      if (!formData.nom) errors.push("Nom");
      if (!formData.email) errors.push("E-mail");
      if (!formData.intituleFormation) errors.push("Intitulé formation");
      if (!formData.dateDebut) errors.push("Date début");
      if (!formData.dateFin) errors.push("Date fin");
    }
    if (currentStep === 2) {
      if (formData.raisonsParticipation.length === 0) errors.push("Q1. Raisons participation");
      if (!formData.niveauFormation) errors.push("Q2. Niveau formation");
      if (!formData.langageFormateur) errors.push("Q3. Langage formateur");
    }
    if (currentStep === 3) {
      if (!formData.objectifsDefinis) errors.push("Q4. Objectifs définis");
      if (!formData.objectifsAtteints) errors.push("Q5. Objectifs atteints");
      if (!formData.lacunesComblees) errors.push("Q6. Lacunes comblées");
      if (!formData.objectifsPersonnelsAtteints) errors.push("Q7. Objectifs personnels");
      if (!formData.equilibreTheoriePratique) errors.push("Q8. Équilibre Théorie/Pratique");
    }
    if (currentStep === 4) {
      // Liste des champs obligatoires pour l'étape 4
      const fields = ['accueil', 'methodes', 'rythme', 'moyensPedagogiques', 'animation', 'organisationMaterielle', 'echangesGroupe', 'aideRecue', 'disponibiliteFormateur'];
      fields.forEach(f => {
        if (!formData[f]) errors.push(`Question ${f} non remplie`);
      });
      if (errors.length > 0) return ["Toutes les questions de satisfaction sont obligatoires"];
    }
    if (currentStep === 5) {
      if (!formData.globalSatisfaction) errors.push("Q18. Satisfaction globale");
      if (!formData.recommandation) errors.push("Q19. Recommandation");
    }
    // Etape 6 : Facultative (Textes)

    return errors;
  };

  // --- NAVIGATION ---
  const handleNext = (e) => {
    e.preventDefault();
    const errors = validateStep(step);
    if (errors.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Champs manquants',
        html: `Veuillez compléter :<br/><ul style="text-align:left;">${errors.map(e => `<li>- ${e}</li>`).join('')}</ul>`,
        confirmButtonColor: '#4c1d95'
      });
      return;
    }
    setStep(prev => Math.min(prev + 1, 6));
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
    if (step !== 6) return;

    Swal.fire({
      title: 'Envoi en cours...',
      didOpen: () => Swal.showLoading()
    });

    try {
      // Attention : Tu devras créer cette route côté backend plus tard
      const response = await axios.post('http://localhost:5000/api/eleve/satisfaction-chaud', formData);

      if (response.status === 200) {
        Swal.fire({
          title: 'Merci !',
          text: 'Votre enquête de satisfaction a bien été envoyée.',
          icon: 'success',
          confirmButtonColor: '#4c1d95'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Erreur',
        text: "Impossible d'envoyer le formulaire. Vérifiez le serveur.",
        icon: 'error'
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
    "Cela fait parti de mon plan de développement personnel",
    "Je viens de changer de métier ou de responsabilités",
    "Pour améliorer mes compétences et mes connaissances",
    "Mon manager me l'a suggéré",
    "Mon manager me l'a imposé",
    "On ne sait jamais, ça me servira peut être un jour",
    "Autre"
  ];

  const optionsSatisfaction = ["Très satisfait(e)", "Satisfait(e)", "Neutre", "Insatisfait(e)", "Très insatisfait(e)"];
  const optionsOuiNonPartie = ["Oui", "Non", "En partie"];

  return (
    <div className="relative min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=600&fit=crop"
          alt="Satisfaction"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/90"></div>
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">ENQUÊTE DE SATISFACTION</h1>
            <p className="opacity-90 uppercase tracking-widest text-sm">Fin de formation (À chaud)</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-10">
        
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

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 mb-10">
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="p-6 md:p-10">
            
            {/* === ÉTAPE 1 : COORDONNÉES === */}
            {step === 1 && (
              <div className="animate-fade-in-up space-y-6">
                <SectionTitle title="Vos Coordonnées" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label req>Civilité</Label>
                    <select name="civilite" value={formData.civilite} onChange={handleChange} className="input-modern">
                      <option value="">-</option>
                      <option value="M.">M.</option>
                      <option value="Mme">Mme</option>
                    </select>
                  </div>
                  <div>
                    <Label req>Prénom</Label>
                    <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} className="input-modern"/>
                  </div>
                  <div>
                    <Label req>Nom</Label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} className="input-modern"/>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label req>Téléphone</Label>
                    <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} className="input-modern"/>
                  </div>
                  <div>
                    <Label req>E-mail</Label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-modern"/>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Fonction</Label>
                    <input type="text" name="fonction" value={formData.fonction} onChange={handleChange} className="input-modern"/>
                  </div>
                  <div>
                    <Label>Nom d'entreprise</Label>
                    <input type="text" name="nomEntreprise" value={formData.nomEntreprise} onChange={handleChange} className="input-modern"/>
                  </div>
                </div>

                <div>
                   <Label req>Intitulé de la formation</Label>
                   <input type="text" name="intituleFormation" value={formData.intituleFormation} onChange={handleChange} className="input-modern"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label req>Date de début</Label>
                    <input type="date" name="dateDebut" value={formData.dateDebut} onChange={handleChange} className="input-modern"/>
                  </div>
                  <div>
                    <Label req>Date de fin</Label>
                    <input type="date" name="dateFin" value={formData.dateFin} onChange={handleChange} className="input-modern"/>
                  </div>
                </div>
              </div>
            )}

            {/* === ÉTAPE 2 : RAISONS & NIVEAU === */}
            {step === 2 && (
              <div className="animate-fade-in-up space-y-8">
                <SectionTitle title="Raisons & Niveau" />

                <div>
                  <Label req>1. Quelles raisons vous ont poussées à participer ? (Plusieurs choix)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {optionsRaisons.map(opt => (
                       <SelectCard key={opt} label={opt} selected={formData.raisonsParticipation.includes(opt)} onClick={() => toggleSelection('raisonsParticipation', opt)} />
                    ))}
                  </div>
                </div>

                <div>
                  <Label req>2. Le niveau de la formation vous a semblé :</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Très satisfaisant", "Satisfaisant", "Neutre", "Insatisfaisant", "Très insatisfaisant"].map(opt => (
                       <RadioPill key={opt} label={opt} selected={formData.niveauFormation === opt} onClick={() => setSelection('niveauFormation', opt)} />
                    ))}
                  </div>
                </div>

                <div>
                  <Label req>3. Le formateur a-t-il tenu un langage :</Label>
                  <div className="flex gap-4 mt-2">
                    {["Trop simple", "Adapté", "Trop technique"].map(opt => (
                       <RadioCard key={opt} label={opt} selected={formData.langageFormateur === opt} onClick={() => setSelection('langageFormateur', opt)} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* === ÉTAPE 3 : OBJECTIFS === */}
            {step === 3 && (
              <div className="animate-fade-in-up space-y-8">
                <SectionTitle title="Objectifs Pédagogiques" />
                
                <QuestionBlock req label="4. Les objectifs ont-ils été clairement définis au début ?" 
                  options={optionsOuiNonPartie} 
                  value={formData.objectifsDefinis} 
                  onChange={(val) => setSelection('objectifsDefinis', val)} 
                />

                <QuestionBlock req label="5. Selon vous, ont-ils été atteints ?" 
                  options={optionsOuiNonPartie} 
                  value={formData.objectifsAtteints} 
                  onChange={(val) => setSelection('objectifsAtteints', val)} 
                />

                <QuestionBlock req label="6. Globalement, pensez-vous avoir comblé des lacunes ?" 
                  options={optionsOuiNonPartie} 
                  value={formData.lacunesComblees} 
                  onChange={(val) => setSelection('lacunesComblees', val)} 
                />

                <QuestionBlock req label="7. Cette formation a-t-elle permis d'atteindre vos objectifs personnels ?" 
                  options={optionsOuiNonPartie} 
                  value={formData.objectifsPersonnelsAtteints} 
                  onChange={(val) => setSelection('objectifsPersonnelsAtteints', val)} 
                />

                <QuestionBlock req label='8. L&apos;alternance "théorie" / "pratique" était-elle équilibrée ?'
                  options={optionsOuiNonPartie} 
                  value={formData.equilibreTheoriePratique} 
                  onChange={(val) => setSelection('equilibreTheoriePratique', val)} 
                />
              </div>
            )}

            {/* === ÉTAPE 4 : SATISFACTION DÉTAILLÉE === */}
            {step === 4 && (
              <div className="animate-fade-in-up space-y-8">
                <SectionTitle title="Satisfaction Détails" />
                <p className="text-sm text-slate-500 italic mb-4">Pour chaque point, indiquez votre niveau de satisfaction.</p>

                {[
                  { id: 'accueil', label: "9. L'accueil reçu pendant la formation" },
                  { id: 'methodes', label: "10. Les méthodes utilisées" },
                  { id: 'rythme', label: "11. Le rythme de la formation" },
                  { id: 'moyensPedagogiques', label: "12. Les moyens pédagogiques (supports...)" },
                  { id: 'animation', label: "13. L'animation" },
                  { id: 'organisationMaterielle', label: "14. L'organisation matérielle" },
                  { id: 'echangesGroupe', label: "15. Les échanges dans le groupe" },
                  { id: 'aideRecue', label: "16. L'aide reçue en cas de difficulté" },
                  { id: 'disponibiliteFormateur', label: "17. La disponibilité du formateur" }
                ].map((q) => (
                  <div key={q.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <Label req>{q.label}</Label>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {optionsSatisfaction.map(opt => (
                        <RadioPillTiny key={opt} label={opt} selected={formData[q.id] === opt} onClick={() => setSelection(q.id, opt)} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* === ÉTAPE 5 : BILAN GLOBAL === */}
            {step === 5 && (
              <div className="animate-fade-in-up space-y-8">
                <SectionTitle title="Bilan Global" />

                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 text-center">
                  <Label req>18. Globalement vous diriez que la formation a été :</Label>
                  <div className="flex flex-col gap-2 mt-4 max-w-md mx-auto">
                    {optionsSatisfaction.map(opt => (
                       <SelectCard key={opt} label={opt} selected={formData.globalSatisfaction === opt} onClick={() => setSelection('globalSatisfaction', opt)} />
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <Label req>19. Recommanderiez-vous cette formation à votre entourage ?</Label>
                  <div className="flex justify-center gap-6 mt-4">
                     <RadioCard label="Oui" selected={formData.recommandation === 'Oui'} onClick={() => setSelection('recommandation', 'Oui')} />
                     <RadioCard label="Non" selected={formData.recommandation === 'Non'} onClick={() => setSelection('recommandation', 'Non')} />
                  </div>
                </div>
              </div>
            )}

            {/* === ÉTAPE 6 : COMMENTAIRES === */}
            {step === 6 && (
              <div className="animate-fade-in-up space-y-6">
                <SectionTitle title="Commentaires (Facultatif)" />

                <div>
                  <Label>20. Quelle partie vous a semblé la plus utile ?</Label>
                  <textarea name="partieUtile" rows="3" value={formData.partieUtile} onChange={handleChange} className="input-modern"/>
                </div>
                <div>
                  <Label>21. Quelle partie vous a semblé moins indispensable ?</Label>
                  <textarea name="partieMoinsUtile" rows="3" value={formData.partieMoinsUtile} onChange={handleChange} className="input-modern"/>
                </div>
                <div>
                  <Label>22. Quelle partie auriez-vous souhaité voir plus développée ?</Label>
                  <textarea name="partieADevelopper" rows="3" value={formData.partieADevelopper} onChange={handleChange} className="input-modern"/>
                </div>
                <div>
                  <Label>23. Autre commentaire :</Label>
                  <textarea name="autreCommentaire" rows="3" value={formData.autreCommentaire} onChange={handleChange} className="input-modern"/>
                </div>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
              {step > 1 ? (
                <button type="button" onClick={handlePrev} className="flex items-center text-slate-500 hover:text-purple-900 font-medium px-4 py-2 transition-colors">
                  <ChevronLeft className="w-5 h-5 mr-1" /> Précédent
                </button>
              ) : <div></div>}

              {step < 6 ? (
                <button type="button" onClick={handleNext} className="btn-primary">
                  Suivant <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button type="submit" className="btn-success">
                  Envoyer <Send className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
      
      {/* Styles & Composants Internes */}
      <style>{`
        .input-modern { width: 100%; padding: 10px 14px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; color: #1E293B; outline: none; transition: all 0.2s; }
        .input-modern:focus { background: white; border-color: #9333ea; box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1); }
        .btn-primary { background: linear-gradient(135deg, #6b21a8, #3b0764); color: white; padding: 12px 24px; border-radius: 10px; font-weight: 600; display: flex; align-items: center; transition: all 0.2s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(107, 33, 168, 0.3); }
        .btn-success { background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 12px 24px; border-radius: 10px; font-weight: 600; display: flex; align-items: center; transition: all 0.2s; }
        .btn-success:hover { transform: translateY(-2px); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}

// --- SOUS-COMPOSANTS ---

const Label = ({ children, req }) => (
  <label className="block text-sm font-bold text-slate-800 mb-1">
    {children} {req && <span className="text-red-500">*</span>}
  </label>
);

const SectionTitle = ({ title }) => (
  <h2 className="text-xl font-bold text-purple-900 uppercase border-b border-slate-100 pb-3 mb-4">
    {title}
  </h2>
);

const Line = ({ step, target }) => (
  <div className={`h-1 flex-1 mx-2 rounded transition-colors duration-500 ${step >= target ? 'bg-purple-900' : 'bg-slate-200'}`} />
);

const StepIcon = ({ num, curr, icon }) => {
  const active = curr >= num;
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${active ? 'bg-purple-900 border-purple-900 text-white' : 'bg-white border-slate-300 text-slate-400'}`}>
      {icon}
    </div>
  );
};

const SelectCard = ({ label, selected, onClick }) => (
  <div onClick={onClick} className={`cursor-pointer px-4 py-3 rounded-lg border flex justify-between items-center transition-all ${selected ? 'border-purple-900 bg-purple-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
    <span className={`text-sm font-medium ${selected ? 'text-purple-900' : 'text-slate-600'}`}>{label}</span>
    {selected && <Check size={16} className="text-purple-900" />}
  </div>
);

const RadioCard = ({ label, selected, onClick }) => (
  <div onClick={onClick} className={`cursor-pointer px-6 py-2 rounded-lg border text-center min-w-[80px] transition-all ${selected ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const RadioPill = ({ label, selected, onClick }) => (
  <div onClick={onClick} className={`cursor-pointer px-4 py-2 rounded-full border text-xs font-bold transition-all ${selected ? 'bg-purple-900 text-white border-purple-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}>
    {label}
  </div>
);

const RadioPillTiny = ({ label, selected, onClick }) => (
    <div onClick={onClick} className={`cursor-pointer px-3 py-1 rounded text-[10px] md:text-xs font-medium border transition-all ${selected ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'}`}>
      {label}
    </div>
);

const QuestionBlock = ({ label, options, value, onChange, req }) => (
  <div>
    <Label req={req}>{label}</Label>
    <div className="flex gap-3 mt-2">
      {options.map(opt => (
        <RadioCard key={opt} label={opt} selected={value === opt} onClick={() => onChange(opt)} />
      ))}
    </div>
  </div>
);