import React from 'react'
import { GraduationCap, Presentation, FileText, TrendingUp, Building2 } from 'lucide-react'

const formulairesData = {
  eleve: {
    title: "ÉLÈVE",
    icon: GraduationCap,
    items: [
      "1/ Fiche analyse des besoins et attentes clients [ VISIO ]",
      "2/ Fiche analyse des besoins et attentes clients [ E-LEARNING ]",
      "3/ Fiche analyse des besoins et attentes Bilan de compétences",
      "4/ Enquête de satisfaction en fin de formation (à chaud) [ E-LEARNING ]",
      "5/ Enquête de satisfaction en fin de formation (à chaud) [ VISIO ]",
      "6/ Enquête de satisfaction à froid (1 mois après)",
      "7/ Questionnaire bilan de compétences",
      "8/ Questionnaire bilan de compétences à 6 mois",
      "9/ Test de connaissances : Manager des politiques publiques",
      "10/ Test de fin : Manager des politiques publiques",
      "11/ Test de connaissances : Création d'entreprise",
      "12/ Règlement intérieur"
    ]
  },
  formateur: {
    title: "FORMATEUR",
    icon: Presentation,
    items: [
      "1/ Fiche formateur",
      "2/ Évaluation annuelle des compétences",
      "3/ Questionnaire formateur fin de formation",
      "4/ Grille d'évaluation des beso-Stagiants",
      "5/ Feuille d'émargement"
    ]
  },
  reclamation: {
    title: "RÉCLAMATION",
    icon: FileText,
    items: [
      "Formulaire de réclamation"
    ]
  },
  appreciationsFinanceurs: {
    title: "RECUEIL DES APPRÉCIATIONS POUR FINANCEURS",
    icon: TrendingUp,
    items: [
      "Recueil des appréciations pour financeurs"
    ]
  },
  appreciationsEntreprises: {
    title: "RECUEIL DES APPRÉCIATIONS POUR ENTREPRISES",
    icon: Building2,
    items: [
      "Recueil des appréciations pour entreprises"
    ]
  }
}

export default function Formulaires() {
  return (
    <div className="relative ">
      {/* Hero Section */}
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
              Listing questionnaires
            </h1>
           
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Élève Card */}
          <div className="bg-white rounded-lg shadow-md p-8  ">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-purple-100 p-6 rounded-full mb-4">
                <GraduationCap className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{formulairesData.eleve.title}</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {formulairesData.eleve.items.map((item, index) => (
                <li key={index} className="text-sm leading-relaxed hover:text-purple-600 transition-colors cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Formateur Card */}
          <div className="bg-white rounded-lg shadow-md p-8 ">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-purple-100 p-6 rounded-full mb-4">
                <Presentation className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{formulairesData.formateur.title}</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {formulairesData.formateur.items.map((item, index) => (
                <li key={index} className="text-sm leading-relaxed hover:text-purple-600 transition-colors cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Réclamation Card */}
          <div className="bg-white rounded-lg shadow-md p-8 ">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-purple-100 p-6 rounded-full mb-4">
                <FileText className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{formulairesData.reclamation.title}</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {formulairesData.reclamation.items.map((item, index) => (
                <li key={index} className="text-sm leading-relaxed hover:text-purple-600 transition-colors cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Appréciations Financeurs Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-purple-100 p-6 rounded-full mb-4">
                <TrendingUp className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                {formulairesData.appreciationsFinanceurs.title}
              </h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {formulairesData.appreciationsFinanceurs.items.map((item, index) => (
                <li key={index} className="text-sm leading-relaxed hover:text-purple-600 transition-colors cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Appréciations Entreprises Card - Full Width */}
          <div className="bg-white rounded-lg shadow-md p-8  md:col-span-2">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-purple-100 p-6 rounded-full mb-4">
                <Building2 className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                {formulairesData.appreciationsEntreprises.title}
              </h2>
            </div>
            <ul className="space-y-3 text-gray-600 max-w-2xl mx-auto">
              {formulairesData.appreciationsEntreprises.items.map((item, index) => (
                <li key={index} className="text-sm leading-relaxed hover:text-purple-600 transition-colors cursor-pointer text-center">
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

       
      </div>
    </div>
  )
}