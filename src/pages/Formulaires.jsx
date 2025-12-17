import React from 'react'
import { Link } from 'react-router-dom' // ✅ Importer Link
import { GraduationCap, Presentation, FileText, TrendingUp, Building2 } from 'lucide-react'

const formulairesData = {
  eleve: {
    title: "ÉLÈVE",
    icon: GraduationCap,
    items: [
      { id: 1, text: "1/ Fiche analyse des besoins et attentes clients [ VISIO ]", link: "/formulaires/eleve/Fiche-analyse-des-besoins-et-attentes-clients" },
      { id: 2, text: "2/ Fiche analyse des besoins et attentes clients [ E-LEARNING ]", link: "/formulaires/eleve" },
      { id: 3, text: "3/ Fiche analyse des besoins et attentes Bilan de compétences", link: "/formulaires/eleve" },
      { id: 4, text: "4/ Enquête de satisfaction en fin de formation (à chaud) [ E-LEARNING ]", link: "/formulaires/eleve" },
      { id: 5, text: "5/ Enquête de satisfaction en fin de formation (à chaud) [ VISIO ]", link: "/formulaires/eleve" },
      { id: 6, text: "6/ Enquête de satisfaction à froid (1 mois après)", link: "/formulaires/eleve" },
      { id: 7, text: "7/ Questionnaire bilan de compétences", link: "/formulaires/eleve" },
      { id: 8, text: "8/ Questionnaire bilan de compétences à 6 mois", link: "/formulaires/eleve" },
      { id: 9, text: "9/ Test de connaissances : Manager des politiques publiques", link: "/formulaires/eleve" },
      { id: 10, text: "10/ Test de fin : Manager des politiques publiques", link: "/formulaires/eleve" },
      { id: 11, text: "11/ Test de connaissances : Création d'entreprise", link: "/formulaires/eleve" },
      { id: 12, text: "12/ Règlement intérieur", link: "/formulaires/eleve" }
    ]
  },
  formateur: {
    title: "FORMATEUR",
    icon: Presentation,
    items: [
      { id: 1, text: "1/ Fiche formateur", link: "/formulaires/formateur" },
      { id: 2, text: "2/ Évaluation annuelle des compétences", link: "/formulaires/formateur" },
      { id: 3, text: "3/ Questionnaire formateur fin de formation", link: "/formulaires/formateur" },
      { id: 4, text: "4/ Grille d'évaluation des besoins Stagiaires", link: "/formulaires/formateur" },
      { id: 5, text: "5/ Feuille d'émargement", link: "/formulaires/formateur" }
    ]
  },
  reclamation: {
    title: "RÉCLAMATION",
    icon: FileText,
    items: [
      { id: 1, text: "Formulaire de réclamation", link: "/formulaires/reclamation" }
    ]
  },
  appreciationsFinanceurs: {
    title: "RECUEIL DES APPRÉCIATIONS POUR FINANCEURS",
    icon: TrendingUp,
    items: [
      { id: 1, text: "Recueil des appréciations pour financeurs", link: "/formulaires/financeurs" }
    ]
  },
  appreciationsEntreprises: {
    title: "RECUEIL DES APPRÉCIATIONS POUR ENTREPRISES",
    icon: Building2,
    items: [
      { id: 1, text: "Recueil des appréciations pour entreprises", link: "/formulaires/entreprises" }
    ]
  }}


export default function Formulaires() {
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
              Listing questionnaires
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Élève Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-purple-100 p-6 rounded-full mb-4">
                <GraduationCap className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{formulairesData.eleve.title}</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {formulairesData.eleve.items.map((item) => (
                <li key={item.id}>
                  <Link  // ✅ Utilise Link au lieu de <a>
                    to={item.link}
                    className="text-sm leading-relaxed hover:text-purple-600 hover:underline transition-colors cursor-pointer flex items-start"
                  >
                    <span className="mr-2">•</span>
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 {/* Formateur Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-purple-100 p-6 rounded-full mb-4">
                <Presentation className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{formulairesData.formateur.title}</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {formulairesData.formateur.items.map((item) => (
                 <li key={item.id}>
                  <Link  // ✅ Utilise Link au lieu de <a>
                    to={item.link}
                    className="text-sm leading-relaxed hover:text-purple-600 hover:underline transition-colors cursor-pointer flex items-start"
                  >
                    <span className="mr-2">•</span>
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Réclamation Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-purple-100 p-6 rounded-full mb-4">
                <FileText className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{formulairesData.reclamation.title}</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {formulairesData.reclamation.items.map((item) => (
                 <li key={item.id}>
                  <Link  // ✅ Utilise Link au lieu de <a>
                    to={item.link}
                    className="text-sm leading-relaxed hover:text-purple-600 hover:underline transition-colors cursor-pointer flex items-start"
                  >
                    <span className="mr-2">•</span>
                    <span>{item.text}</span>
                  </Link>
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
              {formulairesData.appreciationsFinanceurs.items.map((item) => (
                <li key={item.id}>
                  <Link  // ✅ Utilise Link au lieu de <a>
                    to={item.link}
                    className="text-sm leading-relaxed hover:text-purple-600 hover:underline transition-colors cursor-pointer flex items-start"
                  >
                    <span className="mr-2">•</span>
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Appréciations Entreprises Card - Full Width */}
          <div className="bg-white rounded-lg shadow-md p-8 md:col-span-2">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-purple-100 p-6 rounded-full mb-4">
                <Building2 className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                {formulairesData.appreciationsEntreprises.title}
              </h2>
            </div>
            <ul className="space-y-3 text-gray-600 max-w-2xl mx-auto">
              {formulairesData.appreciationsEntreprises.items.map((item) => (
                <li 
                  key={item.id}
                  onClick={() => handleItemClick(item.link, item.text)}
                  className="text-sm leading-relaxed hover:text-purple-600 hover:underline transition-colors cursor-pointer text-center"
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          {/* Fais pareil pour les autres cartes... */}
        </div>
      </div>
    </div>
  )
}