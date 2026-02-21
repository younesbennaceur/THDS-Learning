import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Send, ChevronRight, ChevronLeft, Check, BrainCircuit, ShieldCheck, MessageSquareText, Accessibility, LineChart } from 'lucide-react';

export default function TestPositionnementIA() {
  const [step, setStep] = useState(1);
  
  // État pour stocker les informations de l'utilisateur et ses réponses
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    // Les réponses aux 20 questions
    q1: '', q2: '', q3: [], q4: '', q5: '',
    q6: '', q7: '', q8: '', q9: '', q10: '',
    q11: '', q12: '', q13: '', q14: '', q15: [],
    q16: '', q17: '', q18: '',
    q19: '', q20: ''
  });

  // Définition des sections pour l'indicateur d'étapes
  const sections = [
    { id: 1, title: "Compréhension IA", icon: <BrainCircuit size={16}/> },
    { id: 2, title: "Réglementation", icon: <ShieldCheck size={16}/> },
    { id: 3, title: "Prompt", icon: <MessageSquareText size={16}/> },
    { id: 4, title: "Inclusivité", icon: <Accessibility size={16}/> },
    { id: 5, title: "Stratégie", icon: <LineChart size={16}/> }
  ];

  // --- GESTION DES CHANGEMENTS ---
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSingleChoice = (questionId, value) => {
    setFormData(prev => ({ ...prev, [questionId]: value }));
  };

  const handleMultipleChoice = (questionId, value) => {
    setFormData(prev => {
      const list = prev[questionId] ? [...prev[questionId]] : [];
      if (list.includes(value)) {
        return { ...prev, [questionId]: list.filter(item => item !== value) };
      } else {
        return { ...prev, [questionId]: [...list, value] };
      }
    });
  };

  // --- VALIDATION DES ÉTAPES ---
  const validateStep = (currentStep) => {
    const errors = [];
    
    if (currentStep === 1) {
      if (!formData.nom) errors.push("Nom");
      if (!formData.prenom) errors.push("Prénom");
      if (!formData.email) errors.push("Email");
      if (!formData.q1) errors.push("Question 1");
      if (!formData.q2) errors.push("Question 2");
      if (formData.q3.length === 0) errors.push("Question 3 (Au moins un choix)");
      if (!formData.q4) errors.push("Question 4");
      if (!formData.q5) errors.push("Question 5");
    } else if (currentStep === 2) {
      if (!formData.q6) errors.push("Question 6");
      if (!formData.q7) errors.push("Question 7");
      if (!formData.q8) errors.push("Question 8");
      if (!formData.q9) errors.push("Question 9");
      if (!formData.q10) errors.push("Question 10");
    } else if (currentStep === 3) {
      if (!formData.q11) errors.push("Question 11");
      if (!formData.q12) errors.push("Question 12");
      if (!formData.q13) errors.push("Question 13");
      if (!formData.q14) errors.push("Question 14");
      if (formData.q15.length === 0) errors.push("Question 15 (Au moins un choix)");
    } else if (currentStep === 4) {
      if (!formData.q16) errors.push("Question 16");
      if (!formData.q17) errors.push("Question 17");
      if (!formData.q18) errors.push("Question 18");
    } else if (currentStep === 5) {
      if (!formData.q19) errors.push("Question 19");
      if (!formData.q20) errors.push("Question 20");
    }

    return errors;
  };

  // --- NAVIGATION ---
  const handleNext = (e) => {
    e.preventDefault();
    const errors = validateStep(step);
    if (errors.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Réponses manquantes',
        html: `Veuillez répondre aux questions suivantes :<br/><br/><ul style="text-align:left;">${errors.map(e => `<li>• ${e}</li>`).join('')}</ul>`,
        confirmButtonColor: '#4c1d95'
      });
      return;
    }
    setStep(prev => Math.min(prev + 1, 5));
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
    if (step !== 5) return;

    const errors = validateStep(5);
    if (errors.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Réponses manquantes',
        text: 'Veuillez répondre à toutes les questions avant de valider.',
        confirmButtonColor: '#4c1d95'
      });
      return;
    }

    // 1. Regrouper les réponses dans un objet "answers" pour le backend
    const answersObj = {};
    for (let i = 1; i <= 20; i++) {
        answersObj[`q${i}`] = formData[`q${i}`];
    }

    // 2. Créer le payload structuré
    const payload = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        answers: answersObj
    };

    Swal.fire({
      title: 'Envoi en cours...',
      text: 'Veuillez patienter pendant l\'analyse de votre test.',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      // 3. Appel API via Axios
      const response = await axios.post('http://localhost:5000/api/test/test-ia', payload, {
          headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true" // Utile si tu utilises Ngrok
          }
      });
      
      if (response.status === 200) {
        Swal.fire({
          title: 'Test Envoyé !',
          text: 'Merci d\'avoir passé ce test. Vous recevrez vos résultats par email.',
          icon: 'success',
          confirmButtonText: 'Terminer',
          confirmButtonColor: '#4f46e5',
        }).then(() => {
          window.location.reload(); // Recharge la page après succès
        });
      }

    } catch (error) {
      console.error("Erreur d'envoi du test:", error);
      Swal.fire({
        title: 'Oups...',
        text: "Une erreur est survenue. Vérifie que le serveur Backend (port 5000) est bien lancé.",
        icon: 'error',
        confirmButtonText: 'Fermer',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <div className="relative font-sans bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&h=600&fit=crop"
          alt="Intelligence Artificielle"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-indigo-950/85"></div>
        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl mt-8">
            <h1 className="text-xl md:text-xl font-extrabold mb-4 uppercase tracking-tight">
            Création de contenus rédactionnels et visuels par l'usage responsable de l'IA
            </h1>
            <p className="text-lg text-indigo-200">Création de contenus rédactionnels et visuels par l'usage responsable de l'IA</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl -mt-10 mx-auto px-4 sm:px-6 z-10 relative">
        
        {/* Stepper Dynamique */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex justify-between items-center overflow-x-auto">
           {sections.map((sec, index) => (
             <React.Fragment key={sec.id}>
               <div className="flex flex-col items-center group min-w-[60px]">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= sec.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white border-slate-200 text-slate-400'}`}>
                   {step > sec.id ? <Check size={18} /> : sec.icon}
                 </div>
                 <span className={`text-[10px] md:text-xs font-bold mt-2 hidden sm:block uppercase tracking-wider ${step >= sec.id ? 'text-indigo-900' : 'text-slate-400'}`}>
                   {sec.title}
                 </span>
               </div>
               {index < sections.length - 1 && (
                 <div className={`h-1 flex-1 mx-2 md:mx-4 rounded transition-colors duration-500 ${step > sec.id ? 'bg-indigo-600' : 'bg-slate-100'}`} />
               )}
             </React.Fragment>
           ))}
        </div>

        {/* Conteneur Formulaire */}
        <div className="bg-white rounded-3xl mb-16 shadow-xl overflow-hidden border border-slate-100">
          <form onSubmit={handleSubmit} className="p-6 md:p-10">
            
            {/* Infos Candidat (Affiché uniquement à l'étape 1) */}
            {step === 1 && (
              <div className="mb-10 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-widest mb-4">Vos Informations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Nom <span className="text-red-500">*</span></Label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleTextChange} className="input-modern" placeholder="Votre nom..." />
                  </div>
                  <div>
                    <Label>Prénom <span className="text-red-500">*</span></Label>
                    <input type="text" name="prenom" value={formData.prenom} onChange={handleTextChange} className="input-modern" placeholder="Votre prénom..." />
                  </div>
                </div>
                <div>
                  <Label>Adresse E-mail <span className="text-red-500">*</span></Label>
                  <input type="email" name="email" value={formData.email} onChange={handleTextChange} className="input-modern" placeholder="exemple@email.com" />
                </div>
              </div>
            )}

            {/* ================= ÉTAPE 1 : Compréhension générale ================= */}
            {step === 1 && (
              <div className="space-y-8 animate-fade-in-up">
                <SectionTitle number="1" title="Compréhension générale de l'IA générative" />

                <QuestionBlock num="1" question="Qu'est-ce qu'un prompt ?">
                  <SingleChoice questionId="q1" value={formData.q1} onChange={handleSingleChoice} options={[
                    "Un code d'accès à l'outil",
                    "Une requête ou instruction rédigée par l'utilisateur",
                    "Un modèle de données prédéfini",
                    "Un algorithme de chiffrement"
                  ]} />
                </QuestionBlock>

                <QuestionBlock num="2" question="Lequel de ces outils est principalement textuel ?">
                  <SingleChoice questionId="q2" value={formData.q2} onChange={handleSingleChoice} options={[
                    "Midjourney", "ChatGPT", "Adobe Firefly", "DALL-E"
                  ]} />
                </QuestionBlock>

                <QuestionBlock num="3" question="Parmi ces outils, lesquels génèrent des images ?" isMultiple>
                  <MultipleChoice questionId="q3" values={formData.q3} onChange={handleMultipleChoice} options={[
                    "Adobe Firefly", "Microsoft Copilot", "Midjourney", "ChatGPT"
                  ]} />
                </QuestionBlock>

                <QuestionBlock num="4" question="Un modèle d'IA générative est entraîné principalement à partir :">
                  <SingleChoice questionId="q4" value={formData.q4} onChange={handleSingleChoice} options={[
                    "De données massives",
                    "De capteurs physiques",
                    "D'images satellites",
                    "De votes humains en temps réel uniquement"
                  ]} />
                </QuestionBlock>

                <QuestionBlock num="5" question="Dans un contexte professionnel, quel est l'intérêt principal d'utiliser une IA générative ?">
                  <SingleChoice questionId="q5" value={formData.q5} onChange={handleSingleChoice} options={[
                    "Produire des contenus rapidement",
                    "Supprimer la supervision humaine",
                    "Garantir l'absence totale d'erreurs",
                    "Remplacer toute l'équipe de communication"
                  ]} />
                </QuestionBlock>
              </div>
            )}

            {/* ================= ÉTAPE 2 : Confidentialité ================= */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in-up">
                <SectionTitle number="2" title="Confidentialité et réglementation" />

                <QuestionBlock num="6" question="Le RGPD vise à :">
                  <SingleChoice questionId="q6" value={formData.q6} onChange={handleSingleChoice} options={[
                    "Encadrer la protection des données personnelles",
                    "Interdire l'IA en Europe",
                    "Normaliser les formats d'images",
                    "Réduire la consommation électrique des serveurs"
                  ]} />
                </QuestionBlock>

                <QuestionBlock num="7" question="Un exemple de donnée sensible au sens du RGPD est :">
                  <SingleChoice questionId="q7" value={formData.q7} onChange={handleSingleChoice} options={[
                    "La couleur d'un logo",
                    "Un numéro de carte bancaire",
                    "Une image libre de droits",
                    "Un pseudonyme public"
                  ]} />
                </QuestionBlock>

                <QuestionBlock num="8" question="Pour protéger les données lors de l'utilisation d'un outil d'IA, il est recommandé de :">
                  <SingleChoice questionId="q8" value={formData.q8} onChange={handleSingleChoice} options={[
                    "Masquer ou anonymiser les informations sensibles",
                    "Copier le document complet sans modification",
                    "Utiliser uniquement la version gratuite de l'outil",
                    "Partager le prompt sur un forum public"
                  ]} />
                </QuestionBlock>

                <QuestionBlock num="9" question="L'IA Act européen est :">
                  <SingleChoice questionId="q9" value={formData.q9} onChange={handleSingleChoice} options={[
                    "Un règlement visant à encadrer l'usage de l'IA",
                    "Un outil d'édition de texte",
                    "Une méthode de chiffrement",
                    "Une licence open source"
                  ]} />
                </QuestionBlock>

                <QuestionBlock num="10" question="Lorsque l'on travaille avec des données internes, il est conseillé de :">
                  <SingleChoice questionId="q10" value={formData.q10} onChange={handleSingleChoice} options={[
                    "Les publier sur un site public pour tester l'IA",
                    "Vérifier les clauses de confidentialité des outils utilisés",
                    "Désactiver toutes les sécurités",
                    "Ignorer la législation locale"
                  ]} />
                </QuestionBlock>
              </div>
            )}

            {/* ================= ÉTAPE 3 : Prompt Engineering ================= */}
            {step === 3 && (
              <div className="space-y-8 animate-fade-in-up">
                <SectionTitle number="3" title="Prompt Engineering" />

                <QuestionBlock num="11" question="Un prompt efficace doit être :">
                  <SingleChoice questionId="q11" value={formData.q11} onChange={handleSingleChoice} options={[
                    "Court et ambigu",
                    "Précis, contextualisé et clair",
                    "Formulé uniquement sous forme de question",
                    "Rédigé en langage informatique uniquement"
                  ]} />
                </QuestionBlock>

                <QuestionBlock num="12" question="Pour obtenir un texte au ton professionnel, le mieux est de :">
                  <SingleChoice questionId="q12" value={formData.q12} onChange={handleSingleChoice} options={[
                    "Ne rien préciser et laisser l'IA décider",
                    "Indiquer explicitement le style attendu",
                    "Utiliser un mot-clé unique",
                    "Demander plusieurs langues à la fois"
                  ]} />
                </QuestionBlock>

                <QuestionBlock num="13" question="Quelle technique permet d'améliorer la qualité d'un résultat généré ?">
                  <SingleChoice questionId="q13" value={formData.q13} onChange={handleSingleChoice} options={[
                    "Reformuler et enrichir le prompt",
                    "Réduire la taille des données d'entraînement",
                    "Changer la couleur du texte",
                    "Supprimer les balises HTML"
                  ]} />
                </QuestionBlock>

                <QuestionBlock num="14" question="Si la réponse générée contient des informations erronées, il faut :">
                  <SingleChoice questionId="q14" value={formData.q14} onChange={handleSingleChoice} options={[
                    "La publier immédiatement",
                    "Vérifier les sources et corriger manuellement",
                    "Redémarrer l'ordinateur",
                    "Supprimer le compte utilisateur"
                  ]} />
                </QuestionBlock>

                <QuestionBlock num="15" question="Un prompt peut inclure :" isMultiple>
                  <MultipleChoice questionId="q15" values={formData.q15} onChange={handleMultipleChoice} options={[
                    "Des contraintes de style",
                    "Le format de sortie attendu",
                    "La température du processeur",
                    "Des exemples de contexte"
                  ]} />
                </QuestionBlock>
              </div>
            )}

            {/* ================= ÉTAPE 4 : Inclusivité ================= */}
            {step === 4 && (
              <div className="space-y-8 animate-fade-in-up">
                <SectionTitle number="4" title="Contenus inclusifs et accessibilité" />

                <QuestionBlock num="16" question="L'accessibilité numérique consiste à :">
                  <SingleChoice questionId="q16" value={formData.q16} onChange={handleSingleChoice} options={[
                    "Optimiser le référencement Google",
                    "Permettre à tous, y compris aux personnes handicapées, d'accéder aux contenus",
                    "Limiter la taille des fichiers",
                    "Créer des interfaces uniquement pour mobile"
                  ]} />
                </QuestionBlock>

                <QuestionBlock num="17" question="Pour rendre un contenu visuel accessible à un public malvoyant, on peut :">
                  <SingleChoice questionId="q17" value={formData.q17} onChange={handleSingleChoice} options={[
                    "Ajouter un texte alternatif (alt-text)",
                    "Augmenter la résolution uniquement",
                    "Supprimer les couleurs",
                    "Utiliser des polices fantaisie"
                  ]} />
                </QuestionBlock>

                <QuestionBlock num="18" question="Produire des contenus inclusifs signifie :">
                  <SingleChoice questionId="q18" value={formData.q18} onChange={handleSingleChoice} options={[
                    "Adapter les contenus aux besoins spécifiques de différents publics",
                    "Supprimer toute image",
                    "Créer uniquement en anglais",
                    "Limiter la créativité"
                  ]} />
                </QuestionBlock>
              </div>
            )}

            {/* ================= ÉTAPE 5 : Optimisation ================= */}
            {step === 5 && (
              <div className="space-y-8 animate-fade-in-up">
                <SectionTitle number="5" title="Optimisation et stratégie" />

                <QuestionBlock num="19" question="Avant d'intégrer l'IA générative dans une entreprise, la première étape consiste à :">
                  <SingleChoice questionId="q19" value={formData.q19} onChange={handleSingleChoice} options={[
                    "Définir une stratégie et analyser les besoins",
                    "Choisir un outil au hasard",
                    "Lancer immédiatement une campagne publique",
                    "Désactiver la protection des données"
                  ]} />
                </QuestionBlock>

                <QuestionBlock num="20" question="L'optimisation d'un contenu généré peut consister à :">
                  <SingleChoice questionId="q20" value={formData.q20} onChange={handleSingleChoice} options={[
                    "Affiner le contexte ou enrichir le prompt",
                    "Réduire la taille du fichier uniquement",
                    "Changer le nom du document",
                    "Ignorer les retours des utilisateurs"
                  ]} />
                </QuestionBlock>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
              {step > 1 ? (
                <button type="button" onClick={handlePrev} className="group flex items-center text-slate-500 hover:text-indigo-900 font-medium transition-colors px-4 py-2">
                  <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                  Précédent
                </button>
              ) : <div></div>}

              {step < 5 ? (
                <button type="button" onClick={handleNext} className="btn-primary">
                  Suivant <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button type="submit" className="btn-success">
                  Soumettre le test <Send className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

     <style>{`
        .input-modern { 
          width: 100%; padding: 12px 16px; background-color: #F8FAFC; 
          border: 1px solid #E2E8F0; border-radius: 12px; color: #1E293B; 
          transition: all 0.2s ease; outline: none; font-size: 0.95rem;
        }
        .input-modern:focus { 
          background-color: #FFFFFF; border-color: #4f46e5; 
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); 
        }
        .btn-primary { 
          background: linear-gradient(135deg, #4f46e5, #312e81); color: white; 
          padding: 14px 32px; border-radius: 12px; font-weight: 600; 
          box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3); 
          display: flex; align-items: center; transition: all 0.2s; 
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4); }
        .btn-success { 
          background: linear-gradient(135deg, #10B981, #059669); color: white; 
          padding: 14px 32px; border-radius: 12px; font-weight: 600; 
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

// --- Composants de structure UI ---

const Label = ({ children }) => (
  <label className="block text-sm font-bold text-slate-800 mb-2 ml-1">{children}</label>
);

const SectionTitle = ({ number, title }) => (
  <div className="flex items-center space-x-3 mb-8 border-b border-slate-100 pb-4">
    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wide">{title}</h2>
  </div>
);

const QuestionBlock = ({ num, question, isMultiple, children }) => (
  <div className="mb-8 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start mb-4">
      <span className="text-indigo-600 font-black text-lg mr-2">{num}.</span>
      <div>
        <h3 className="text-slate-800 font-bold text-lg leading-snug">{question}</h3>
        {isMultiple && <p className="text-xs font-semibold text-indigo-500 mt-1 uppercase tracking-wider">Plusieurs réponses possibles</p>}
      </div>
    </div>
    <div className="pl-6">
      {children}
    </div>
  </div>
);

// Composant pour choix unique
const SingleChoice = ({ questionId, value, options, onChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {options.map((opt, idx) => {
      const isSelected = value === opt;
      return (
        <div 
          key={idx}
          onClick={() => onChange(questionId, opt)}
          className={`cursor-pointer px-4 py-3 rounded-xl border transition-all duration-200 flex items-center group
            ${isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 flex items-center justify-center transition-colors
            ${isSelected ? 'border-indigo-600' : 'border-slate-300 group-hover:border-slate-400'}`}>
            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
          </div>
          <span className={`text-sm ${isSelected ? 'text-indigo-900 font-medium' : 'text-slate-700'}`}>{opt}</span>
        </div>
      );
    })}
  </div>
);

// Composant pour choix multiples (cases à cocher)
const MultipleChoice = ({ questionId, values, options, onChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {options.map((opt, idx) => {
      const isSelected = values.includes(opt);
      return (
        <div 
          key={idx}
          onClick={() => onChange(questionId, opt)}
          className={`cursor-pointer px-4 py-3 rounded-xl border transition-all duration-200 flex items-center group
            ${isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
        >
          <div className={`w-5 h-5 rounded flex-shrink-0 border flex items-center justify-center mr-3 transition-colors
             ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white group-hover:border-slate-400'}`}>
             {isSelected && <Check size={14} className="text-white" />}
          </div>
          <span className={`text-sm ${isSelected ? 'text-indigo-900 font-medium' : 'text-slate-700'}`}>{opt}</span>
        </div>
      );
    })}
  </div>
);