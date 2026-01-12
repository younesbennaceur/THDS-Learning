import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Send, ChevronRight, ChevronLeft, User, Check, BookOpen, GraduationCap, ClipboardCheck } from 'lucide-react';

// Liste complète des 50 questions extraites du PDF 
const questionsData = [
  { id: 1, text: "Choose the correct sentence:", options: ["I am student", "I am a student", "I student", "I don't know"], category: "Grammaire" },
  { id: 2, text: "What is your name?", options: ["I fine", "My name is Paul", "Yes, I am", "I don't know"], category: "Grammaire" },
  { id: 3, text: "Choose the correct verb: I ___ in Paris.", options: ["lives", "live", "living", "I don't know"], category: "Conjugaison" },
  { id: 4, text: "How do you say 'bonjour' in English?", options: ["Goodbye", "Hello", "Thanks", "I don't know"], category: "Vocabulaire" },
  { id: 5, text: "She ___ 25 years old.", options: ["have", "is", "has", "I don't know"], category: "Conjugaison" },
  { id: 6, text: "What is the plural of 'book'?", options: ["bookes", "books", "book", "I don't know"], category: "Vocabulaire" },
  { id: 7, text: "Choose the correct article: ___ apple", options: ["a", "an", "the", "I don't know"], category: "Grammaire" },
  { id: 8, text: "What color is the sky?", options: ["table", "blue", "run", "I don't know"], category: "Vocabulaire" },
  { id: 9, text: "'I'm hungry' means:", options: ["I'm thirsty", "I'm hungry", "I'm tired", "I don't know"], category: "Vocabulaire" },
  { id: 10, text: "How do you say 'merci'?", options: ["please", "sorry", "thank you", "I don't know"], category: "Vocabulaire" },
  { id: 11, text: "Choose the correct sentence:", options: ["He go to work", "He goes to work", "He going to work", "I don't know"], category: "Conjugaison" },
  { id: 12, text: "What number comes after nine?", options: ["eight", "ten", "eleven", "I don't know"], category: "Grammaire" },
  { id: 13, text: "This is ___ car.", options: ["I", "me", "my", "I don't know"], category: "Grammaire" },
  { id: 14, text: "What is 'water'?", options: ["bread", "wine", "water", "I don't know"], category: "Grammaire" },
  { id: 15, text: "Are you French?", options: ["Yes, I am", "Yes, I do", "Yes, I have", "I don't know"], category: "Grammaire" },
  { id: 16, text: "Yesterday, I ___ at home.", options: ["stay", "stayed", "staying", "I don't know"], category: "Conjugaison" },
  { id: 17, text: "There ___ two people in the room.", options: ["is", "are", "be", "I don't know"], category: "Grammaire" },
  { id: 18, text: "What does 'cheap' mean?", options: ["expensive", "not expensive", "big", "I don't know"], category: "Vocabulaire" },
  { id: 19, text: "She is ___ than her sister.", options: ["tall", "taller", "tallest", "I don't know"], category: "Grammaire" },
  { id: 20, text: "I like tea, ___ I don't like coffee.", options: ["and", "but", "because", "I don't know"], category: "Grammaire" },
  { id: 21, text: "How often do you exercise?", options: ["yesterday", "every week", "tomorrow", "I don't know"], category: "Grammaire" },
  { id: 22, text: "What time ___ you start work?", options: ["do", "does", "are", "I don't know"], category: "Conjugaison" },
  { id: 23, text: " 'I'm looking for a job' means:", options: ["I found a job", "I am searching for a job", "I like my job", "I don't know"], category: "Grammaire" },
  { id: 24, text: "There isn't ___ sugar left.", options: ["many", "much", "few", "I don't know"], category: "Vocabulaire" },
  { id: 25, text: "The meeting is ___ Monday.", options: ["in", "on", "at", "I don't know"], category: "Grammaire" },
  { id: 26, text: "What does 'to travel' mean?", options: ["to work", "to travel", "to buy", "I don't know"], category: "Vocabulaire" },
  { id: 27, text: "She ___ TV when I arrived.", options: ["watches", "was watching", "is watching", "I don't know"], category: "Conjugaison" },
  { id: 28, text: "Which sentence is correct?", options: ["I didn't went", "I didn't go", "I don't went", "I don't know"], category: "Conjugaison" },
  { id: 29, text: "Can you help me?", options: ["an obligation", "a polite request", "an order", "I don't know"], category: "Grammaire" },
  { id: 30, text: "What is the opposite of 'early'?", options: ["fast", "late", "soon", "I don't know"], category: "Vocabulaire" },
  { id: 31, text: "If it ___ tomorrow, we will stay home.", options: ["rain", "rains", "will rain", "I don't know"], category: "Conjugaison" },
  { id: 32, text: "She has worked here ___ 2018.", options: ["since", "for", "during", "I don't know"], category: "Grammaire" },
  { id: 33, text: "I'm not used to ___ so early.", options: ["wake up", "waking up", "woke up", "I don't know"], category: "Conjugaison" },
  { id: 34, text: "This report ___ by the manager.", options: ["wrote", "was written", "has write", "I don't know"], category: "Conjugaison" },
  { id: 35, text: "He speaks English very ___.", options: ["good", "well", "better", "I don't know"], category: "Grammaire" },
  { id: 36, text: "I didn't have ___ time to finish.", options: ["enough", "too", "very", "I don't know"], category: "Conjugaison" },
  { id: 37, text: "She asked me where I ___ from.", options: ["am", "was", "were", "I don't know"], category: "Conjugaison" },
  { id: 38, text: "What does 'to improve' mean?", options: ["to get worse", "to get better", "to stop", "I don't know"], category: "Vocabulaire" },
  { id: 39, text: "He failed the exam ___ he didn't study.", options: ["but", "because", "although", "I don't know"], category: "Grammaire" },
  { id: 40, text: "I wish I ___ more confident.", options: ["am", "was", "were", "I don't know"], category: "Conjugaison" },
  { id: 41, text: "Hardly ___ finished when the phone rang.", options: ["I had", "had I", "did I", "I don't know"], category: "Conjugaison" },
  { id: 42, text: "This is the ___ proposal we've received.", options: ["more interesting", "most interesting", "very interesting", "I don't know"], category: "Grammaire" },
  { id: 43, text: "He apologized ___ the delay.", options: ["for", "about", "to", "I don't know"], category: "Grammaire" },
  { id: 44, text: "She wouldn't have succeeded if she ___ harder.", options: ["didn't work", "hadn't worked", "wouldn't work", "I don't know"], category: "Conjugaison" },
  { id: 45, text: "I'm in charge ___ the project.", options: ["of", "for", "with", "I don't know"], category: "Grammaire" },
  { id: 46, text: "The company aims ___ expand internationally.", options: ["to", "at", "for", "I don't know"], category: "Grammaire" },
  { id: 47, text: "His explanation was clear, ___?", options: ["wasn't it", "didn't he", "isn't it", "I don't know"], category: "Grammaire" },
  { id: 48, text: "She tends to speak ___ meetings.", options: ["during", "while", "since", "I don't know"], category: "Grammaire" },
  { id: 49, text: "What does 'deadline' mean?", options: ["meeting", "due date", "goal", "I don't know"], category: "Vocabulaire" },
  { id: 50, text: "He handled the situation ___ professionalism.", options: ["by", "with", "in", "I don't know"], category: "Grammaire" }
];

export default function TestPositionnementModern() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    prenom: '', nom: '', email: '', telephone: '', dateTest: new Date().toISOString().split('T')[0],
    answers: {} 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectOption = (questionId, optionIndex) => {
    const letters = ['A', 'B', 'C', 'D'];
    setFormData(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: letters[optionIndex] }
    }));
  };

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      return formData.prenom && formData.nom && formData.email && formData.telephone;
    }
    const startIdx = (currentStep - 2) * 10;
    const endIdx = startIdx + 10;
    const currentQuestions = questionsData.slice(startIdx, endIdx);
    return currentQuestions.every(q => formData.answers[q.id]);
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      Swal.fire({ icon: 'warning', title: 'Champs manquants', text: 'Veuillez répondre à toutes les questions de cette page.', confirmButtonColor: '#4c1d95' });
      return;
    }
    setStep(prev => Math.min(prev + 1, 6));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    Swal.fire({ title: 'Envoi en cours...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
      // Note: Assurez-vous que votre backend a une route '/api/eleve/test-anglais' pour traiter ces données
      const response = await axios.post('http://localhost:5000/api/test/test-anglais', formData);
      if (response.status === 200) {
        Swal.fire({ title: 'Test Terminé !', text: 'Vos résultats ont été transmis à l\'équipe THDS.', icon: 'success', confirmButtonColor: '#4c1d95' });
      }
    } catch (error) {
      Swal.fire('Erreur', "Échec de l'envoi du test.", 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-purple-900 text-white py-12 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Business English Placement Test</h1>
        <p className="opacity-80 max-w-2xl mx-auto">Évaluation de vos compétences linguistiques sur 50 questions.</p>
      </div>

      <div className="max-w-4xl mx-auto -mt-10 px-4 pb-20">
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex justify-between items-center overflow-x-auto">
          {[1, 2, 3, 4, 5, 6].map(num => (
            <React.Fragment key={num}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= num ? 'bg-purple-900 border-purple-900 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
                {step > num ? <Check size={18}/> : num}
              </div>
              {num < 6 && <div className={`flex-1 h-1 mx-2 rounded ${step > num ? 'bg-purple-900' : 'bg-slate-100'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
          {step === 1 ? (
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex items-center space-x-3 border-b pb-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center font-bold">1</div>
                <h2 className="text-xl font-bold text-slate-800 uppercase">Vos Informations [cite: 2-4]</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-bold mb-2">Prénom *</label><input type="text" name="prenom" onChange={handleChange} className="input-modern" /></div>
                <div><label className="block text-sm font-bold mb-2">Nom *</label><input type="text" name="nom" onChange={handleChange} className="input-modern" /></div>
                <div><label className="block text-sm font-bold mb-2">E-mail *</label><input type="email" name="email" onChange={handleChange} className="input-modern" /></div>
                <div><label className="block text-sm font-bold mb-2">Téléphone *</label><input type="tel" name="telephone" onChange={handleChange} className="input-modern" /></div>
              </div>
            </div>
          ) : (
            <div className="space-y-10 animate-fade-in-up">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-xl font-bold text-purple-900 uppercase">Partie {step - 1} / 5</h2>
                <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Questions {(step - 2) * 10 + 1} à {(step - 1) * 10}</span>
              </div>
              {questionsData.slice((step - 2) * 10, (step - 1) * 10).map((q) => (
                <div key={q.id} className="space-y-4">
                  <p className="text-lg font-semibold text-slate-800">{q.id}. {q.text}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt, idx) => {
                      const letter = ['A', 'B', 'C', 'D'][idx];
                      const isSelected = formData.answers[q.id] === letter;
                      return (
                        <div key={idx} onClick={() => handleSelectOption(q.id, idx)} className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center space-x-3 ${isSelected ? 'border-purple-900 bg-purple-50' : 'border-slate-100 hover:border-purple-200 bg-slate-50/50'}`}>
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${isSelected ? 'bg-purple-900 text-white' : 'bg-white text-slate-400 border'}`}>{letter}</span>
                          <span className={isSelected ? 'text-purple-900 font-bold' : 'text-slate-600'}>{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 pt-8 border-t flex justify-between">
            {step > 1 && <button onClick={() => setStep(step - 1)} className="flex items-center text-slate-500 font-bold hover:text-purple-900"><ChevronLeft className="mr-2"/> Précédent</button>}
            {step < 6 ? (
              <button onClick={handleNext} className="btn-primary ml-auto">Suivant <ChevronRight className="ml-2"/></button>
            ) : (
              <button onClick={handleSubmit} className="btn-success ml-auto">Finaliser <Send className="ml-2"/></button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .input-modern { width: 100%; padding: 12px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; outline: none; transition: 0.2s; }
        .input-modern:focus { border-color: #9333ea; box-shadow: 0 0 0 4px rgba(147, 51, 234, 0.1); }
        .btn-primary { background: #4c1d95; color: white; padding: 14px 32px; border-radius: 12px; font-weight: bold; display: flex; align-items: center; transition: 0.2s; }
        .btn-success { background: #10B981; color: white; padding: 14px 32px; border-radius: 12px; font-weight: bold; display: flex; align-items: center; }
        .btn-primary:hover, .btn-success:hover { transform: translateY(-2px); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}