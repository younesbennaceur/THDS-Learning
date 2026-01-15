import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Send, ChevronRight, ChevronLeft, User, Briefcase, FileText, Check, UploadCloud, File } from 'lucide-react';

export default function FicheFormateur() {
  const [step, setStep] = useState(1);
  
  // Données Texte
  const [formData, setFormData] = useState({
    civilite: '', qualite: '', prenom: '', nom: '', telephone: '',
    adresse: '', adresse2: '', ville: '', codePostal: '',
    email: '', siteWeb: '', linkedin: '', facebook: '',
    
    domaineExpertise: '', anneesExperience: '',
    veilleInfo: '', methodeVeille: [], 
    
    tarifHoraire: '', tva: ''
  });

  // Données Fichiers
  const [files, setFiles] = useState({
    justificatifNDA: null,
    declarationActivite: null,
    cv: null,
    kbis: null,
    pieceIdentite: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    if (uploadedFiles.length > 0) {
      setFiles(prev => ({ ...prev, [name]: uploadedFiles[0] }));
    }
  };

  const setSelection = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleVeilleMethode = (value) => {
    setFormData(prev => {
      const list = prev.methodeVeille.includes(value)
        ? prev.methodeVeille.filter(item => item !== value)
        : [...prev.methodeVeille, value];
      return { ...prev, methodeVeille: list };
    });
  };

  // --- VALIDATION STRICTE ---
  const validateStep = (currentStep) => {
    const errors = [];

    if (currentStep === 1) {
      if (!formData.nom) errors.push("Nom");
      // Note: Prénom n'était pas marqué (Nécessaire) dans ton texte, mais c'est mieux de l'avoir.
      // Je mets obligatoire ce qui avait (Nécessaire)
      if (!formData.telephone) errors.push("Téléphone");
      if (!formData.email) errors.push("E-mail");
    }

    if (currentStep === 2) {
      if (!formData.domaineExpertise) errors.push("Domaines d'expertise");
      if (!formData.anneesExperience) errors.push("Années d'expérience");
      if (!formData.veilleInfo) errors.push("Veille informationnelle (Oui/Non)");
      
      // Si Veille = Oui, alors Méthode est obligatoire
      if (formData.veilleInfo === 'Oui' && formData.methodeVeille.length === 0) {
        errors.push("Méthode de veille");
      }
    }

    if (currentStep === 3) {
        // Validation finale avant envoi (Tarif, TVA, Fichiers)
        // Cette validation se fera dans handleSubmit pour bloquer l'envoi
    }

    return errors;
  };

  // Navigation
  const handleNext = (e) => {
    e.preventDefault();
    
    const errors = validateStep(step);
    if (errors.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Champs manquants',
        html: `Veuillez remplir :<br/><ul style="text-align:left; margin-top:10px;">${errors.map(e => `<li>- ${e}</li>`).join('')}</ul>`,
        confirmButtonColor: '#3b0764' // Purple-950
      });
      return;
    }

    setStep(prev => Math.min(prev + 1, 3));
    window.scrollTo(0, 0);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  // Soumission Finale
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation Étape 3 (Fichiers & Admin)
    const errors = [];
    if (!formData.tarifHoraire) errors.push("Tarif horaire");
    if (!formData.tva) errors.push("Assujetti TVA");
    
    // Fichiers Obligatoires
    if (!files.justificatifNDA) errors.push("Justificatif NDA (Fichier)");
    if (!files.cv) errors.push("CV (Fichier)");
    if (!files.kbis) errors.push("Kbis (Fichier)");
    if (!files.pieceIdentite) errors.push("Pièce d'identité (Fichier)");

    if (errors.length > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Documents manquants',
          html: `Veuillez fournir :<br/><ul style="text-align:left; margin-top:10px;">${errors.map(e => `<li>- ${e}</li>`).join('')}</ul>`,
          confirmButtonColor: '#3b0764'
        });
        return;
    }

    // Préparation FormData
    const dataToSend = new FormData();
    Object.keys(formData).forEach(key => dataToSend.append(key, formData[key]));
    if (files.justificatifNDA) dataToSend.append('justificatifNDA', files.justificatifNDA);
    if (files.declarationActivite) dataToSend.append('declarationActivite', files.declarationActivite);
    if (files.cv) dataToSend.append('cv', files.cv);
    if (files.kbis) dataToSend.append('kbis', files.kbis);
    if (files.pieceIdentite) dataToSend.append('pieceIdentite', files.pieceIdentite);

    Swal.fire({ 
        title: 'Envoi des documents...', 
        text: 'Cela peut prendre quelques secondes selon la taille des fichiers.',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading() 
    });

    try {
      const response = await axios.post('http://localhost:5000/api/formateur/inscription', dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        Swal.fire({ 
            title: 'Candidature envoyée !', 
            text: 'Nous avons bien reçu votre dossier complet.',
            icon: 'success', 
            confirmButtonColor: '#3b0764' 
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ 
          title: 'Erreur', 
          text: "Erreur lors de l'envoi. Vérifiez que le serveur tourne et que vos fichiers ne sont pas trop volumineux.", 
          icon: 'error',
          confirmButtonColor: '#d33'
      });
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') e.preventDefault(); };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="relative h-64 bg-purple-950 flex items-center justify-center overflow-hidden">
        {/* Background Overlay effect */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="text-center text-white px-4 relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">FICHE FORMATEUR</h1>
          <p className="opacity-90">Rejoignez notre réseau d'experts</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-10 mb-16">
        
        {/* Stepper */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex justify-between items-center">
           <StepIcon num={1} curr={step} icon={<User size={18}/>} />
           <Line step={step} target={2} />
           <StepIcon num={2} curr={step} icon={<Briefcase size={18}/>} />
           <Line step={step} target={3} />
           <StepIcon num={3} curr={step} icon={<FileText size={18}/>} />
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <form className="p-8" onKeyDown={handleKeyDown}>
            
            {/* === ETAPE 1 : IDENTITÉ === */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in-up">
                <h2 className="text-xl font-bold text-purple-950 border-b pb-2 uppercase">1. Identité & Coordonnées</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Civilité</Label>
                    <select name="civilite" value={formData.civilite} onChange={handleChange} className="input-modern">
                      <option value="">-</option>
                      <option value="M.">M.</option>
                      <option value="Mme">Mme</option>
                      <option value="Mlle">Mlle</option>
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <Label>Qualité</Label>
                    <input type="text" name="qualite" value={formData.qualite} onChange={handleChange} className="input-modern" placeholder="Ex: Consultant Senior"/>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Prénom</Label><input name="prenom" value={formData.prenom} onChange={handleChange} className="input-modern"/></div>
                  <div><Label req>Nom</Label><input name="nom" value={formData.nom} onChange={handleChange} className="input-modern"/></div>
                </div>

                <div>
                    <Label>Adresse</Label>
                    <input name="adresse" value={formData.adresse} onChange={handleChange} className="input-modern mb-2" placeholder="Rue..."/>
                    <input name="adresse2" value={formData.adresse2} onChange={handleChange} className="input-modern mb-2" placeholder="Complément (facultatif)"/>
                    <div className="grid grid-cols-2 gap-4">
                        <input name="codePostal" value={formData.codePostal} onChange={handleChange} className="input-modern" placeholder="Code Postal"/>
                        <input name="ville" value={formData.ville} onChange={handleChange} className="input-modern" placeholder="Ville"/>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label req>Téléphone</Label><input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} className="input-modern"/></div>
                  <div><Label req>E-mail</Label><input type="email" name="email" value={formData.email} onChange={handleChange} className="input-modern"/></div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                    <Label>Présence en ligne</Label>
                    <input name="siteWeb" value={formData.siteWeb} onChange={handleChange} className="input-modern" placeholder="Site Web"/>
                    <input name="linkedin" value={formData.linkedin} onChange={handleChange} className="input-modern" placeholder="Lien LinkedIn"/>
                    <input name="facebook" value={formData.facebook} onChange={handleChange} className="input-modern" placeholder="Lien Facebook"/>
                </div>
              </div>
            )}

            {/* === ETAPE 2 : EXPERTISE === */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in-up">
                <h2 className="text-xl font-bold text-purple-950 border-b pb-2 uppercase">2. Expertise & Veille</h2>

                <div>
                    <Label req>Domaine(s) d'expertise(s)</Label>
                    <textarea name="domaineExpertise" rows="3" value={formData.domaineExpertise} onChange={handleChange} className="input-modern" placeholder="Détaillez vos domaines..."/>
                </div>

                <div>
                    <Label req>Nombre d'années d'expérience</Label>
                    <input type="text" name="anneesExperience" value={formData.anneesExperience} onChange={handleChange} className="input-modern"/>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                    <Label req>Avez-vous mis en place une veille informationnelle ?</Label>
                    <p className="text-xs text-purple-800 mb-3">La veille sert à rester informé des nouvelles publications dans un domaine précis.</p>
                    <div className="flex gap-6">
                        <RadioCard label="Oui" selected={formData.veilleInfo === 'Oui'} onClick={() => setSelection('veilleInfo', 'Oui')} />
                        <RadioCard label="Non" selected={formData.veilleInfo === 'Non'} onClick={() => setSelection('veilleInfo', 'Non')} />
                    </div>

                    {formData.veilleInfo === 'Oui' && (
                        <div className="mt-4 pt-4 border-t border-purple-200">
                            <Label req>Si oui, quelle(s) méthode(s) utilisez-vous ?</Label>
                            <div className="flex flex-col gap-2 mt-2">
                                {['Manuelle (pull) : se rendre sur plusieurs sites', 'Automatisée (push) : alertes, logiciels', 'Autres'].map(m => (
                                    <CheckboxRow key={m} label={m} selected={formData.methodeVeille.includes(m)} onClick={() => toggleVeilleMethode(m)} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
              </div>
            )}

            {/* === ETAPE 3 : ADMIN & FICHIERS === */}
            {step === 3 && (
              <div className="space-y-8 animate-fade-in-up">
                <h2 className="text-xl font-bold text-purple-950 border-b pb-2 uppercase">3. Administratif & Documents</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label req>Tarif horaire (€)</Label>
                        <input type="number" name="tarifHoraire" value={formData.tarifHoraire} onChange={handleChange} className="input-modern" placeholder="0.00"/>
                    </div>
                    <div>
                        <Label req>Assujetti à la TVA ?</Label>
                        <div className="flex gap-4 mt-2">
                            <RadioCard label="Oui" selected={formData.tva === 'Oui'} onClick={() => setSelection('tva', 'Oui')} />
                            <RadioCard label="Non" selected={formData.tva === 'Non'} onClick={() => setSelection('tva', 'Non')} />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="font-bold text-purple-900 mb-4 flex items-center bg-purple-50 p-3 rounded-lg"><UploadCloud className="mr-2"/> Documents à transmettre</h3>
                    <p className="text-xs text-slate-500 mb-4 ml-1">Formats acceptés : PDF, JPG, PNG. Taille max : 10 Mo par fichier.</p>
                    
                    <div className="space-y-4">
                        <FileInput label="Justificatif NDA" req name="justificatifNDA" file={files.justificatifNDA} onChange={handleFileChange} />
                        <FileInput label="Justificatif déclaration d'activité" name="declarationActivite" file={files.declarationActivite} onChange={handleFileChange} />
                        <FileInput label="CV" req name="cv" file={files.cv} onChange={handleFileChange} />
                        <FileInput label="Kbis ou Extrait Insee" req name="kbis" file={files.kbis} onChange={handleFileChange} />
                        <FileInput label="Pièce d'identité (Recto/Verso)" req name="pieceIdentite" file={files.pieceIdentite} onChange={handleFileChange} />
                    </div>
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

              {step < 3 ? (
                <button type="button" onClick={handleNext} className="bg-purple-950 text-white px-6 py-3 rounded-lg font-bold flex items-center hover:bg-purple-900 transition shadow-lg shadow-purple-200">
                  Suivant <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold flex items-center hover:bg-green-700 transition shadow-lg shadow-green-100">
                  Envoyer Candidature <Send className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>

          </form>
        </div>
      </div>

      <style>{`
        .input-modern { width: 100%; padding: 12px 16px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; color: #1E293B; outline: none; transition: all 0.2s; }
        .input-modern:focus { background: white; border-color: #3b0764; box-shadow: 0 0 0 4px rgba(59, 7, 100, 0.1); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}

// --- SOUS-COMPOSANTS ---
const Label = ({ children, req }) => (
    <label className="block text-sm font-bold text-slate-800 mb-1">
        {children} {req && <span className="text-red-600">*</span>}
    </label>
);

const StepIcon = ({ num, curr, icon }) => {
  const active = curr >= num;
  return (<div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${active ? 'bg-purple-950 border-purple-950 text-white' : 'bg-white border-slate-300 text-slate-400'}`}>{icon}</div>);
};

const Line = ({ step, target }) => (<div className={`h-1 flex-1 mx-2 rounded transition-colors duration-500 ${step >= target ? 'bg-purple-950' : 'bg-slate-200'}`} />);

const RadioCard = ({ label, selected, onClick }) => (
  <div onClick={onClick} className={`cursor-pointer px-6 py-2 rounded-lg border text-center min-w-[80px] transition-all font-medium ${selected ? 'bg-purple-950 text-white border-purple-950' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{label}</div>
);

const CheckboxRow = ({ label, selected, onClick }) => (
    <div onClick={onClick} className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg transition-colors border ${selected ? 'bg-purple-50 border-purple-200' : 'bg-white border-transparent hover:bg-slate-50'}`}>
        <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${selected ? 'bg-purple-950 border-purple-950' : 'bg-white border-slate-300'}`}>
            {selected && <Check size={14} className="text-white" />}
        </div>
        <span className={`text-sm ${selected ? 'text-purple-950 font-bold' : 'text-slate-600'}`}>{label}</span>
    </div>
);

const FileInput = ({ label, name, file, onChange, req }) => (
    <div className={`border-2 border-dashed rounded-xl p-4 transition flex flex-col justify-center items-center text-center group ${file ? 'border-green-500 bg-green-50' : 'border-slate-300 hover:border-purple-400 hover:bg-purple-50'}`}>
        <div className="w-full text-left mb-2">
            <Label req={req}>{label}</Label>
        </div>
        <input type="file" id={name} name={name} onChange={onChange} className="hidden" />
        <label htmlFor={name} className="cursor-pointer w-full flex flex-col items-center">
            {file ? (
                <div className="flex items-center text-green-700 font-semibold">
                    <FileText className="mr-2" /> {file.name}
                </div>
            ) : (
                <div className="text-slate-500 group-hover:text-purple-700">
                    <UploadCloud className="mx-auto mb-2 h-8 w-8 text-slate-400 group-hover:text-purple-500" />
                    <span className="text-sm">Cliquez pour déposer un fichier</span>
                </div>
            )}
        </label>
    </div>
);