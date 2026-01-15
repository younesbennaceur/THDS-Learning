import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Send, ChevronRight, ChevronLeft, User, Calendar, BarChart2, Star, Check } from 'lucide-react';

export default function Eleve6() {
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    // Step 1
    prenom: '', nom: '', email: '', 
    intituleFormation: '', nomFormateur: '', 
    dateDebut: '', dateFin: '',

    // Step 2
    reponseBesoins: '',         // Satisfait...
    applicationAcquis: '',      // Oui/Non
    difficultesMiseEnOeuvre: '',// Oui/Non
    amelioration: '',           // Satisfait...
    attentesInitiales: '',      // Satisfait...
    objectifsAtteints: '',      // Satisfait...

    // Step 3
    avisGlobal: '',             // Satisfaisante...
    recommandation: '',         // Oui/Non

    // Step 4
    commentaires: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setSelection = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Validation
  const validateStep = (currentStep) => {
    const errors = [];
    if (currentStep === 1) {
      if (!formData.prenom) errors.push("Prénom");
      if (!formData.nom) errors.push("Nom");
      if (!formData.email) errors.push("E-mail");
      if (!formData.intituleFormation) errors.push("Intitulé formation");
      if (!formData.dateDebut) errors.push("Date début");
      if (!formData.dateFin) errors.push("Date fin");
    }
    if (currentStep === 2) {
      if (!formData.reponseBesoins) errors.push("Q1. Réponse aux besoins");
      if (!formData.applicationAcquis) errors.push("Q2. Application des acquis");
      if (!formData.difficultesMiseEnOeuvre) errors.push("Q3. Difficultés rencontrées");
      if (!formData.amelioration) errors.push("Q4. Amélioration");
      if (!formData.attentesInitiales) errors.push("Q5. Attentes initiales");
      if (!formData.objectifsAtteints) errors.push("Q6. Objectifs atteints");
    }
    if (currentStep === 3) {
      if (!formData.avisGlobal) errors.push("Avis global");
      if (!formData.recommandation) errors.push("Recommandation");
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
    setStep(prev => Math.min(prev + 1, 4));
    window.scrollTo(0, 0);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step !== 4) return;

    Swal.fire({ title: 'Envoi...', didOpen: () => Swal.showLoading() });

    try {
      const response = await axios.post('http://localhost:5000/api/eleve/satisfaction-froid', formData);
      if (response.status === 200) {
        Swal.fire({
          title: 'Envoyé !',
          text: 'Merci pour ce retour à froid.',
          icon: 'success',
          confirmButtonColor: '#4c1d95'
        });
      }
    } catch (error) {
      Swal.fire({ title: 'Erreur', icon: 'error' });
    }
  };

  // Options
  const optionsSatisfaction = ["Très satisfait(e)", "Satisfait(e)", "Neutre", "Insatisfait(e)", "Très insatisfait(e)"];
  const optionsGlobal = ["Très satisfaisante", "Satisfaisante", "Neutre", "Insatisfaisante", "Très insatisfaisante"];

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* Banner */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=600&fit=crop"
          alt="Bilan"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/90"></div>
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">ENQUÊTE DE SATISFACTION À FROID</h1>
            <p className="opacity-90 uppercase tracking-widest text-sm">1 Mois après la formation</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-10 mb-16">
        
        {/* Stepper */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex justify-between items-center">
           <StepIcon num={1} curr={step} icon={<User size={16}/>} />
           <Line step={step} target={2} />
           <StepIcon num={2} curr={step} icon={<BarChart2 size={16}/>} />
           <Line step={step} target={3} />
           <StepIcon num={3} curr={step} icon={<Star size={16}/>} />
           <Line step={step} target={4} />
           <StepIcon num={4} curr={step} icon={<Send size={16}/>} />
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <form className="p-6 md:p-10">
            
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in-up">
                <SectionTitle title="Informations Participant" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label req>Prénom</Label><input name="prenom" value={formData.prenom} onChange={handleChange} className="input-modern"/></div>
                  <div><Label req>Nom</Label><input name="nom" value={formData.nom} onChange={handleChange} className="input-modern"/></div>
                </div>
                <div><Label req>E-mail</Label><input name="email" type="email" value={formData.email} onChange={handleChange} className="input-modern" placeholder="confirmez l'e-mail ici"/></div>
                
                <SectionTitle title="La Formation" />
                <div><Label req>Intitulé de la formation</Label><input name="intituleFormation" value={formData.intituleFormation} onChange={handleChange} className="input-modern"/></div>
                <div><Label>Nom du formateur</Label><input name="nomFormateur" value={formData.nomFormateur} onChange={handleChange} className="input-modern"/></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label req>Date début</Label><input type="date" name="dateDebut" value={formData.dateDebut} onChange={handleChange} className="input-modern"/></div>
                  <div><Label req>Date fin</Label><input type="date" name="dateFin" value={formData.dateFin} onChange={handleChange} className="input-modern"/></div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in-up">
                <SectionTitle title="Retour sur la formation" />
                
                <QuestionBlock req label="1. La formation choisie semblait-elle répondre aux besoins ?" 
                  options={optionsSatisfaction} value={formData.reponseBesoins} onChange={(v) => setSelection('reponseBesoins', v)} />

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <Label req>2. Avez-vous pu appliquer les acquis de la formation ?</Label>
                  <div className="flex gap-4 mt-2">
                    <RadioCard label="Oui" selected={formData.applicationAcquis === 'Oui'} onClick={() => setSelection('applicationAcquis', 'Oui')} />
                    <RadioCard label="Non" selected={formData.applicationAcquis === 'Non'} onClick={() => setSelection('applicationAcquis', 'Non')} />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <Label req>3. Avez-vous rencontré des difficultés dans la mise en œuvre ?</Label>
                  <div className="flex gap-4 mt-2">
                    <RadioCard label="Oui" selected={formData.difficultesMiseEnOeuvre === 'Oui'} onClick={() => setSelection('difficultesMiseEnOeuvre', 'Oui')} />
                    <RadioCard label="Non" selected={formData.difficultesMiseEnOeuvre === 'Non'} onClick={() => setSelection('difficultesMiseEnOeuvre', 'Non')} />
                  </div>
                </div>

                <QuestionBlock req label="4. Est-ce que la formation vous a permis de vous améliorer ?" 
                  options={optionsSatisfaction} value={formData.amelioration} onChange={(v) => setSelection('amelioration', v)} />

                <QuestionBlock req label="5. La formation a t-elle répondu à vos attentes initiales ?" 
                  options={optionsSatisfaction} value={formData.attentesInitiales} onChange={(v) => setSelection('attentesInitiales', v)} />

                <QuestionBlock req label="6. Pensez-vous avoir atteint les objectifs pédagogiques ?" 
                  options={optionsSatisfaction} value={formData.objectifsAtteints} onChange={(v) => setSelection('objectifsAtteints', v)} />
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-8 animate-fade-in-up">
                <SectionTitle title="Avis Général" />
                
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 text-center">
                  <Label req>Globalement, vous diriez que la formation a été :</Label>
                  <div className="flex flex-col gap-2 mt-4 max-w-md mx-auto">
                    {optionsGlobal.map(opt => (
                       <SelectCard key={opt} label={opt} selected={formData.avisGlobal === opt} onClick={() => setSelection('avisGlobal', opt)} />
                    ))}
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Label req>Recommanderiez-vous cette formation à vos collègues / amis ?</Label>
                  <div className="flex justify-center gap-6 mt-4">
                     <RadioCard label="Oui" selected={formData.recommandation === 'Oui'} onClick={() => setSelection('recommandation', 'Oui')} />
                     <RadioCard label="Non" selected={formData.recommandation === 'Non'} onClick={() => setSelection('recommandation', 'Non')} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in-up">
                <SectionTitle title="Commentaires" />
                <div>
                  <Label>Autres commentaires / remarques</Label>
                  <textarea name="commentaires" rows="6" value={formData.commentaires} onChange={handleChange} className="input-modern" placeholder="Votre avis nous intéresse..."/>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
              {step > 1 ? (
                <button type="button" onClick={handlePrev} className="flex items-center text-slate-500 hover:text-purple-900 font-medium px-4 py-2 transition-colors">
                  <ChevronLeft className="w-5 h-5 mr-1" /> Précédent
                </button>
              ) : <div></div>}

              {step < 4 ? (
                <button type="button" onClick={handleNext} className="btn-primary">
                  Suivant <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} className="btn-success">
                  Envoyer <Send className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>

          </form>
        </div>
      </div>

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
const Label = ({ children, req }) => (<label className="block text-sm font-bold text-slate-800 mb-1">{children} {req && <span className="text-red-500">*</span>}</label>);
const SectionTitle = ({ title }) => (<h2 className="text-xl font-bold text-purple-900 uppercase border-b border-slate-100 pb-3 mb-4">{title}</h2>);
const Line = ({ step, target }) => (<div className={`h-1 flex-1 mx-2 rounded transition-colors duration-500 ${step >= target ? 'bg-purple-900' : 'bg-slate-200'}`} />);
const StepIcon = ({ num, curr, icon }) => {
  const active = curr >= num;
  return (<div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${active ? 'bg-purple-900 border-purple-900 text-white' : 'bg-white border-slate-300 text-slate-400'}`}>{icon}</div>);
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
const RadioPillTiny = ({ label, selected, onClick }) => (
    <div onClick={onClick} className={`cursor-pointer px-3 py-1 rounded text-[10px] md:text-xs font-medium border transition-all ${selected ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'}`}>{label}</div>
);
const QuestionBlock = ({ label, options, value, onChange, req }) => (
  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
    <Label req={req}>{label}</Label>
    <div className="flex flex-wrap gap-2 mt-3">
      {options.map(opt => (
        <RadioPillTiny key={opt} label={opt} selected={value === opt} onClick={() => onChange(opt)} />
      ))}
    </div>
  </div>
);