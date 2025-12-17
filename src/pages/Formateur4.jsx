import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Send, ChevronRight, User, BookOpen, Check, Flag, HelpCircle } from 'lucide-react';

export default function GrilleEvaluation() {
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    // Step 2
    niveauAnglais: '',
    
    // Step 3 (Quiz Partie 1)
    q2: '', // Where do you come from?
    q3: '', // How old are you?
    q4: '', // Profession
    q6: '', // News

    // Step 4 (Quiz Partie 2 + Identité)
    q7: '', // Managers
    q8: '', // Luggage
    nom: '',
    prenom: '',
    email: '',
    telephone: ''
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
    
    if (currentStep === 2) {
      if (!formData.niveauAnglais) errors.push("Votre niveau d'anglais");
    }

    if (currentStep === 3) {
      if (!formData.q2) errors.push("Question 2 (Where do you come from?)");
      if (!formData.q3) errors.push("Question 3 (How old are you?)");
      if (!formData.q4) errors.push("Question 4 (Profession)");
      if (!formData.q6) errors.push("Question 6 (The news)");
    }

    if (currentStep === 4) {
      if (!formData.q7) errors.push("Question 7 (Managers)");
      if (!formData.q8) errors.push("Question 8 (Luggage)");
      if (!formData.prenom) errors.push("Prénom");
      if (!formData.nom) errors.push("Nom");
      if (!formData.email) errors.push("E-mail");
      // Téléphone n'était pas marqué (Nécessaire) explicitement mais c'est mieux
    }

    return errors;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const errors = validateStep(step);
    if (errors.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Réponses manquantes',
        html: `<ul>${errors.map(e => `<li>- ${e}</li>`).join('')}</ul>`,
        confirmButtonColor: '#4c1d95'
      });
      return;
    }
    setStep(prev => Math.min(prev + 1, 4));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateStep(4);
    if (errors.length > 0) {
      Swal.fire({ icon: 'warning', title: 'Champs manquants', html: `<ul>${errors.map(e => `<li>- ${e}</li>`).join('')}</ul>`, confirmButtonColor: '#4c1d95' });
      return;
    }

    Swal.fire({ title: 'Correction en cours...', didOpen: () => Swal.showLoading() });

    try {
      const response = await axios.post('http://localhost:5000/api/formateur/evaluation-sous-traitants', formData);

      if (response.status === 200) {
        Swal.fire({
          title: 'Test terminé !',
          text: 'Vos réponses ont été envoyées. Nous reviendrons vers vous avec le résultat.',
          icon: 'success',
          confirmButtonColor: '#4c1d95'
        });
      }
    } catch (error) {
      Swal.fire({ title: 'Erreur', text: "Erreur serveur.", icon: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="relative h-64 bg-purple-950 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="text-center text-white px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">TEST D'ÉVALUATION</h1>
          <p className="opacity-90 tracking-widest text-sm uppercase">Anglais & Compétences</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-10 mb-16">
        
        {/* Stepper */}
        <div className="flex justify-center mb-6 px-10">
            {[1, 2, 3, 4].map(num => (
                <div key={num} className={`h-2 flex-1 mx-1 rounded-full transition-all ${step >= num ? 'bg-purple-900' : 'bg-slate-300'}`}></div>
            ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <form className="p-8 md:p-12">
            
            {/* ETAPE 1 : INTRO */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in-up text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-purple-100 p-4 rounded-full">
                        <Flag size={48} className="text-purple-900"/>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Bienvenue !</h2>
                <p className="text-slate-600 leading-relaxed">
                  Bonjour,<br/><br/>
                  Pour valider votre niveau de connaissances et être sûr de suivre la bonne formation, nous vous proposons de réaliser ce test.<br/>
                  En fonction de vos résultats, vous pourrez suivre la formation recommandée.
                </p>
                <div className="pt-6">
                    <button onClick={handleNext} className="btn-primary w-full justify-center py-4 text-lg">
                        À vos marques, prêt, partez ! <ChevronRight className="ml-2"/>
                    </button>
                </div>
              </div>
            )}

            {/* ETAPE 2 : NIVEAU */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in-up">
                <SectionTitle title="1. Auto-évaluation" />
                
                <Label req>Quel est mon niveau d'Anglais actuel ?</Label>
                <div className="flex flex-col gap-3">
                    {['Débutant', 'Intermédiaire', 'Avancé'].map(opt => (
                        <SelectCard key={opt} label={opt} selected={formData.niveauAnglais === opt} onClick={() => setSelection('niveauAnglais', opt)} />
                    ))}
                </div>

                <div className="pt-6 flex justify-end">
                    <button onClick={handleNext} className="btn-primary">Suivant <ChevronRight className="ml-2"/></button>
                </div>
              </div>
            )}

            {/* ETAPE 3 : QUIZ PART 1 */}
            {step === 3 && (
              <div className="space-y-8 animate-fade-in-up">
                <SectionTitle title="2. Grammaire & Vocabulaire (1/2)" />

                <QuizQuestion 
                    req label="2. Where do you come from?" 
                    options={["I'm in Lille", "I'm from Lille", "I'm at Lille"]}
                    value={formData.q2} onChange={(v) => setSelection('q2', v)}
                />

                <QuizQuestion 
                    req label="3. How old are you?" 
                    options={["I have 35 years old", "I was 35 years old", "I am 35 years old"]}
                    value={formData.q3} onChange={(v) => setSelection('q3', v)}
                />

                <QuizQuestion 
                    req label="4. What is your profession?" 
                    options={["I’m a engineer.", "I’m an engineer.", "I’m engineer."]}
                    value={formData.q4} onChange={(v) => setSelection('q4', v)}
                />

                <QuizQuestion 
                    req label="6. I usually ____________ the news at 8pm on television." 
                    options={["see", "watch", "look"]}
                    value={formData.q6} onChange={(v) => setSelection('q6', v)}
                />

                <div className="pt-6 flex justify-end">
                    <button onClick={handleNext} className="btn-primary">Suivant <ChevronRight className="ml-2"/></button>
                </div>
              </div>
            )}

            {/* ETAPE 4 : QUIZ PART 2 + CONTACT */}
            {step === 4 && (
              <div className="space-y-8 animate-fade-in-up">
                <SectionTitle title="3. Grammaire (2/2) & Identité" />

                <QuizQuestion 
                    req label="7. Managers usually have to _____________ hard decisions." 
                    options={["do", "be", "make"]}
                    value={formData.q7} onChange={(v) => setSelection('q7', v)}
                />

                <QuizQuestion 
                    req label="8. The luggage was __________ heavy for me to carry." 
                    options={["too", "two", "to"]}
                    value={formData.q8} onChange={(v) => setSelection('q8', v)}
                />

                <div className="border-t pt-6 mt-6">
                    <h3 className="font-bold text-purple-900 mb-4 flex items-center"><User className="mr-2"/> Vos Coordonnées</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><Label req>Prénom</Label><input name="prenom" value={formData.prenom} onChange={handleChange} className="input-modern"/></div>
                        <div><Label req>Nom</Label><input name="nom" value={formData.nom} onChange={handleChange} className="input-modern"/></div>
                    </div>
                    <div className="mt-4"><Label req>E-mail</Label><input name="email" type="email" value={formData.email} onChange={handleChange} className="input-modern"/></div>
                    <div className="mt-4"><Label>Téléphone</Label><input name="telephone" type="tel" value={formData.telephone} onChange={handleChange} className="input-modern"/></div>
                </div>

                <div className="pt-6 flex justify-between">
                    <button onClick={() => setStep(1)} className="text-slate-500 hover:text-purple-900 font-medium px-4">Retour</button>
                    <button onClick={handleSubmit} className="btn-success">Envoyer mes réponses <Send className="ml-2 w-5 h-5"/></button>
                </div>
              </div>
            )}

          </form>
        </div>
      </div>

      <style>{`
        .input-modern { width: 100%; padding: 12px 16px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; color: #1E293B; outline: none; transition: all 0.2s; }
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

// Composants UI
const Label = ({ children, req }) => (
    <label className="block text-sm font-bold text-slate-800 mb-1">
        {children} {req && <span className="text-red-600">*</span>}
    </label>
);

const SectionTitle = ({ title }) => (<h2 className="text-xl font-bold text-purple-900 border-b border-slate-100 pb-3 mb-6 uppercase">{title}</h2>);

const SelectCard = ({ label, selected, onClick }) => (
  <div onClick={onClick} className={`cursor-pointer px-4 py-3 rounded-lg border flex justify-between items-center transition-all ${selected ? 'border-purple-900 bg-purple-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
    <span className={`text-sm font-medium ${selected ? 'text-purple-900' : 'text-slate-600'}`}>{label}</span>
    {selected && <Check size={16} className="text-purple-900" />}
  </div>
);

const QuizQuestion = ({ label, options, value, onChange, req }) => (
    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
        <Label req={req}>{label}</Label>
        <div className="flex flex-col gap-2 mt-3">
            {options.map(opt => (
                <label key={opt} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${value === opt ? 'bg-purple-900 text-white border-purple-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}>
                    <input type="radio" name={label} value={opt} checked={value === opt} onChange={() => onChange(opt)} className="hidden" />
                    <div className={`w-4 h-4 rounded-full border border-current mr-3 flex items-center justify-center`}>
                        {value === opt && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-sm font-medium">{opt}</span>
                </label>
            ))}
        </div>
    </div>
);