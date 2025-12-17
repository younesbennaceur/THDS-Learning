import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Send, ChevronRight, ChevronLeft, User, ClipboardList, BookOpen, AlertTriangle, Check } from 'lucide-react';

export default function Formateur3() {
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    // Step 1
    prenom: '', nom: '', email: '',
    intituleFormation: '',
    dateDebut: '', dateFin: '',
    typeFormation: '', // Presentiel/Distanciel
    lieuFormation: '',
    nbInscrits: '',
    nbPresents: '',

    // Step 2
    conditionsMaterielles: '',
    groupeAdapte: '',
    coordination: '',
    salleAdaptee: '',
    adaptations: '', // Oui/Non
    remarquesEtape2: '',

    // Step 3
    sequencePedagogique: '',
    animation: '',
    echangesGroupe: '',
    satisfactionAttentes: '',
    remarquesEtape3: '',

    // Step 4
    stagiairesAise: '',
    globalFormation: '',
    incident: '', incidentDetails: '',
    handicap: '', handicapActions: '',
    remarquesEtape4: ''
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
      if (!formData.email) errors.push("E-mail");
      if (!formData.intituleFormation) errors.push("Intitulé formation");
      if (!formData.dateDebut) errors.push("Date début");
      if (!formData.dateFin) errors.push("Date fin");
      if (!formData.typeFormation) errors.push("Type de formation");
      if (!formData.lieuFormation) errors.push("Lieu de réalisation");
      if (!formData.nbInscrits) errors.push("Nb stagiaires inscrits");
      if (!formData.nbPresents) errors.push("Nb stagiaires présents");
    }
    if (currentStep === 2) {
      if (!formData.conditionsMaterielles) errors.push("Conditions matérielles");
      if (!formData.groupeAdapte) errors.push("Groupe adapté");
      if (!formData.coordination) errors.push("Coordination THDSFormation");
      if (!formData.salleAdaptee) errors.push("Salle adaptée");
      if (!formData.adaptations) errors.push("Adaptations (Oui/Non)");
    }
    if (currentStep === 3) {
      if (!formData.sequencePedagogique) errors.push("Séquence pédagogique");
      if (!formData.animation) errors.push("Animation");
      if (!formData.echangesGroupe) errors.push("Échanges groupe");
      if (!formData.satisfactionAttentes) errors.push("Satisfaction attentes stagiaires");
    }
    if (currentStep === 4) {
      if (!formData.stagiairesAise) errors.push("Stagiaires à l'aise");
      if (!formData.globalFormation) errors.push("Avis global");
      if (!formData.incident) errors.push("Incident survenu ?");
      if (formData.incident === 'Oui' && !formData.incidentDetails) errors.push("Précisions incident");
      if (!formData.handicap) errors.push("Stagiaire handicap ?");
      if (formData.handicap === 'Oui' && !formData.handicapActions) errors.push("Actions amélioration handicap");
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
    const errors = validateStep(4);
    if (errors.length > 0) {
        Swal.fire({ icon: 'warning', title: 'Champs manquants', html: `<ul>${errors.map(e => `<li>- ${e}</li>`).join('')}</ul>`, confirmButtonColor: '#4c1d95' });
        return;
    }

    Swal.fire({ title: 'Envoi du bilan...', didOpen: () => Swal.showLoading() });

    try {
      const response = await axios.post('http://localhost:5000/api/formateur/fin-formation', formData);
      if (response.status === 200) {
        Swal.fire({
          title: 'Transmis !',
          text: 'Votre bilan de fin de formation a été envoyé avec succès.',
          icon: 'success',
          confirmButtonColor: '#4c1d95'
        });
      }
    } catch (error) {
      Swal.fire({ title: 'Erreur', text: 'Erreur serveur.', icon: 'error' });
    }
  };

  // Options
  const optionsSatisfaction = ["Très satisfait(e)", "Satisfait(e)", "Neutre", "Insatisfait(e)", "Très insatisfait(e)"];
  const optionsGlobal = ["Très satisfaisante", "Satisfaisante", "Neutre", "Insatisfaisante", "Très insatisfaisante"];
  const optionsAise = ["Totalement", "En partie", "Insuffisamment", "Pas du tout"];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="relative h-64 bg-purple-950 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="text-center text-white px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">BILAN FIN DE FORMATION</h1>
          <p className="opacity-90 tracking-widest text-sm uppercase">Espace Formateur</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-10 mb-16">
        
        {/* Stepper */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex justify-between items-center overflow-x-auto">
           <StepIcon num={1} curr={step} icon={<User size={18}/>} />
           <Line step={step} target={2} />
           <StepIcon num={2} curr={step} icon={<ClipboardList size={18}/>} />
           <Line step={step} target={3} />
           <StepIcon num={3} curr={step} icon={<BookOpen size={18}/>} />
           <Line step={step} target={4} />
           <StepIcon num={4} curr={step} icon={<AlertTriangle size={18}/>} />
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <form className="p-8 md:p-12">
            
            {/* ETAPE 1 : INFOS */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in-up">
                <SectionTitle title="1. Informations Générales" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label req>Prénom Formateur</Label><input name="prenom" value={formData.prenom} onChange={handleChange} className="input-modern"/></div>
                  <div><Label req>Nom Formateur</Label><input name="nom" value={formData.nom} onChange={handleChange} className="input-modern"/></div>
                </div>
                <div><Label req>E-mail</Label><input name="email" type="email" value={formData.email} onChange={handleChange} className="input-modern" placeholder="Pour confirmation"/></div>
                
                <div><Label req>Intitulé de l'action de formation</Label><input name="intituleFormation" value={formData.intituleFormation} onChange={handleChange} className="input-modern"/></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label req>Date début</Label><input type="date" name="dateDebut" value={formData.dateDebut} onChange={handleChange} className="input-modern"/></div>
                  <div><Label req>Date fin</Label><input type="date" name="dateFin" value={formData.dateFin} onChange={handleChange} className="input-modern"/></div>
                </div>

                <div>
                    <Label req>Type de Formation</Label>
                    <div className="flex gap-4 mt-2">
                        <RadioCard label="Présentiel" selected={formData.typeFormation === 'Présentiel'} onClick={() => setSelection('typeFormation', 'Présentiel')} />
                        <RadioCard label="Distanciel" selected={formData.typeFormation === 'Distanciel'} onClick={() => setSelection('typeFormation', 'Distanciel')} />
                    </div>
                </div>

                <div><Label req>Lieu de réalisation</Label><input name="lieuFormation" value={formData.lieuFormation} onChange={handleChange} className="input-modern"/></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label req>Stagiaires Inscrits (1-100)</Label><input type="number" name="nbInscrits" min="1" max="100" value={formData.nbInscrits} onChange={handleChange} className="input-modern"/></div>
                  <div><Label req>Stagiaires Présents (1-100)</Label><input type="number" name="nbPresents" min="1" max="100" value={formData.nbPresents} onChange={handleChange} className="input-modern"/></div>
                </div>
              </div>
            )}

            {/* ETAPE 2 : CONDITIONS */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in-up">
                <SectionTitle title="2. Conditions & Coordination" />

                <QuestionBlock req label="Les conditions matérielles étaient-elles adaptées ?" 
                  options={optionsSatisfaction} value={formData.conditionsMaterielles} onChange={(v) => setSelection('conditionsMaterielles', v)} />

                <QuestionBlock req label="Le groupe de stagiaires était-il adapté ?" 
                  options={optionsSatisfaction} value={formData.groupeAdapte} onChange={(v) => setSelection('groupeAdapte', v)} />

                <QuestionBlock req label="La coordination avec THDSFORMATION.FR s'est-elle bien passée ?" 
                  options={optionsSatisfaction} value={formData.coordination} onChange={(v) => setSelection('coordination', v)} />

                <QuestionBlock req label="La salle de formation était-elle adaptée ?" 
                  options={optionsSatisfaction} value={formData.salleAdaptee} onChange={(v) => setSelection('salleAdaptee', v)} />

                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <Label req>Y a-t-il eu des adaptations en cours de formation ?</Label>
                    <div className="flex gap-4 mt-2">
                        <RadioCard label="Oui" selected={formData.adaptations === 'Oui'} onClick={() => setSelection('adaptations', 'Oui')} />
                        <RadioCard label="Non" selected={formData.adaptations === 'Non'} onClick={() => setSelection('adaptations', 'Non')} />
                    </div>
                </div>

                <div>
                    <Label>Remarques éventuelles sur cette partie</Label>
                    <textarea name="remarquesEtape2" rows="2" value={formData.remarquesEtape2} onChange={handleChange} className="input-modern"/>
                </div>
              </div>
            )}

            {/* ETAPE 3 : PÉDAGOGIE */}
            {step === 3 && (
              <div className="space-y-8 animate-fade-in-up">
                <SectionTitle title="3. Séquence Pédagogique" />

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <Label req>Séquence pédagogique</Label>
                    <p className="text-xs text-slate-500 mb-3 text-justify">La séquence vise un objectif d’apprentissage fixé au terme d’un nombre défini de séances. Elle vise la maîtrise d’une ou plusieurs compétences.</p>
                    <div className="flex flex-wrap gap-2">
                        {optionsSatisfaction.map(opt => <RadioPillTiny key={opt} label={opt} selected={formData.sequencePedagogique === opt} onClick={() => setSelection('sequencePedagogique', opt)} />)}
                    </div>
                </div>

                <QuestionBlock req label="Animation de la formation" options={optionsSatisfaction} value={formData.animation} onChange={(v) => setSelection('animation', v)} />
                <QuestionBlock req label="Échanges dans le groupe" options={optionsSatisfaction} value={formData.echangesGroupe} onChange={(v) => setSelection('echangesGroupe', v)} />
                <QuestionBlock req label="Satisfaction des attentes personnelles des stagiaires ?" options={optionsSatisfaction} value={formData.satisfactionAttentes} onChange={(v) => setSelection('satisfactionAttentes', v)} />

                <div>
                    <Label>Remarques / Questions pédagogiques</Label>
                    <textarea name="remarquesEtape3" rows="3" value={formData.remarquesEtape3} onChange={handleChange} className="input-modern"/>
                </div>
              </div>
            )}

            {/* ETAPE 4 : BILAN & INCIDENTS */}
            {step === 4 && (
              <div className="space-y-8 animate-fade-in-up">
                <SectionTitle title="4. Bilan, Incidents & Handicap" />

                <QuestionBlock req label="Selon vous, les stagiaires se sont-ils sentis à l'aise ?" 
                  options={optionsAise} value={formData.stagiairesAise} onChange={(v) => setSelection('stagiairesAise', v)} />

                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 text-center">
                    <Label req>Globalement, la formation a été :</Label>
                    <div className="flex flex-col gap-2 mt-3 max-w-md mx-auto">
                        {optionsGlobal.map(opt => <SelectCard key={opt} label={opt} selected={formData.globalFormation === opt} onClick={() => setSelection('globalFormation', opt)} />)}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
                    {/* INCIDENT */}
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                        <Label req>Un incident est-il survenu ?</Label>
                        <div className="flex gap-4 mt-2">
                            <RadioCard label="Oui" selected={formData.incident === 'Oui'} onClick={() => setSelection('incident', 'Oui')} />
                            <RadioCard label="Non" selected={formData.incident === 'Non'} onClick={() => setSelection('incident', 'Non')} />
                        </div>
                        {formData.incident === 'Oui' && (
                            <div className="mt-3 animate-fade-in-up">
                                <Label req>Précisez :</Label>
                                <textarea name="incidentDetails" rows="2" value={formData.incidentDetails} onChange={handleChange} className="input-modern bg-white"/>
                            </div>
                        )}
                    </div>

                    {/* HANDICAP */}
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <Label req>Stagiaire en situation de handicap ?</Label>
                        <div className="flex gap-4 mt-2">
                            <RadioCard label="Oui" selected={formData.handicap === 'Oui'} onClick={() => setSelection('handicap', 'Oui')} />
                            <RadioCard label="Non" selected={formData.handicap === 'Non'} onClick={() => setSelection('handicap', 'Non')} />
                        </div>
                        {formData.handicap === 'Oui' && (
                            <div className="mt-3 animate-fade-in-up">
                                <Label req>Actions d'amélioration possibles :</Label>
                                <textarea name="handicapActions" rows="2" value={formData.handicapActions} onChange={handleChange} className="input-modern bg-white"/>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Label>Dernières remarques / questions</Label>
                    <textarea name="remarquesEtape4" rows="3" value={formData.remarquesEtape4} onChange={handleChange} className="input-modern"/>
                </div>
              </div>
            )}

            {/* NAVIGATION */}
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
                  Envoyer Bilan <Send className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>

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

// --- SOUS-COMPOSANTS ---
const Label = ({ children, req }) => (<label className="block text-sm font-bold text-slate-800 mb-1">{children} {req && <span className="text-red-600">*</span>}</label>);
const SectionTitle = ({ title }) => (<h2 className="text-xl font-bold text-purple-950 uppercase border-b border-slate-100 pb-3 mb-4">{title}</h2>);
const StepIcon = ({ num, curr, icon }) => {
  const active = curr >= num;
  return (<div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${active ? 'bg-purple-950 border-purple-950 text-white' : 'bg-white border-slate-300 text-slate-400'}`}>{icon}</div>);
};
const Line = ({ step, target }) => (<div className={`h-1 flex-1 mx-2 rounded transition-colors duration-500 ${step >= target ? 'bg-purple-950' : 'bg-slate-200'}`} />);
const RadioCard = ({ label, selected, onClick }) => (
  <div onClick={onClick} className={`cursor-pointer px-6 py-2 rounded-lg border text-center min-w-[80px] transition-all font-medium ${selected ? 'bg-purple-950 text-white border-purple-950' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{label}</div>
);
const SelectCard = ({ label, selected, onClick }) => (
  <div onClick={onClick} className={`cursor-pointer px-4 py-3 rounded-lg border flex justify-between items-center transition-all ${selected ? 'border-purple-950 bg-purple-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
    <span className={`text-sm font-medium ${selected ? 'text-purple-900' : 'text-slate-600'}`}>{label}</span>
    {selected && <Check size={16} className="text-purple-900" />}
  </div>
);
const RadioPillTiny = ({ label, selected, onClick }) => (
    <div onClick={onClick} className={`cursor-pointer px-3 py-1 rounded text-[10px] md:text-xs font-medium border transition-all ${selected ? 'bg-purple-950 text-white border-purple-950' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'}`}>{label}</div>
);
const QuestionBlock = ({ label, options, value, onChange, req }) => (
  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
    <Label req={req}>{label}</Label>
    <div className="flex flex-wrap gap-2 mt-3">
      {options.map(opt => <RadioPillTiny key={opt} label={opt} selected={value === opt} onClick={() => onChange(opt)} />)}
    </div>
  </div>
);