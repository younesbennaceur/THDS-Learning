import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Presentation, FileText, TrendingUp, Building2, PencilLine } from 'lucide-react'

const formulairesData = {
  eleve: {
    title: "ÉLÈVE",
    icon: GraduationCap,
    items: [
      { id: 1, text: "1/ Fiche analyse des besoins et attentes clients [ présentiel ]", link: "/formulaires/eleve/Fiche-analyse-des-besoins-et-attentes-clients" },
     
      { id: 5, text: "2/ Enquête de satisfaction en fin de formation (à chaud) ", link: "/formulaires/eleve/ENQUÊTE-DE-SATISFACTION-EN-FIN-DE-FORMATION" },
      { id: 6, text: "3/ Enquête de satisfaction à froid (1 mois après)", link: "/formulaires/eleve/ENQUÊTE-DE-SATISFACTION-À-FROID-(1-MOIS-APRÈS)" },
      { id: 9, text: "4/ Test de positionnement Business English - 4 skills",link: "/formulaires/test-de-positionnement-BUSINESS-ENGLISH-4-SKILLS" },
      { id: 10, text: "5/ Test de positionnement : Français professionnel", },
      { id: 11, text: "6/ Test de positionnement : Intelligence artificielle",  },
      { id: 12, text: "7/Test de positionnementFormation : Création de contenus rédactionnels et visuels par l'usage responsable de l'IA",link: "/formulaires/eleve/TestPositionnementIA" }
    ]
  },
  formateur: {
    title: "FORMATEUR",
    icon: Presentation,
    items: [
      { id: 1, text: "1/ Fiche formateur", link: "/formulaires/formateur/Fiche-Formateur" },
      { id: 2, text: "2/ Évaluation annuelle des compétences", link: "/formulaires/formateur/Évaluation-annuelle-des-compétences" },
      { id: 3, text: "3/ Questionnaire formateur fin de formation", link: "/formulaires/formateur/Questionnaire-formateur-fin-de-formations" },
      { id: 4, text: "4/ Grille d'évaluation des besoins Stagiaires", link: "/formulaires/formateur/test-anglais" },
      { id: 5, text: "5/ Feuille d'émargement",  }
    ]
  },
  reclamation: {
    title: "RÉCLAMATION",
    icon: FileText,
    items: [
      { id: 1, text: "Formulaire de réclamation",link: "/formulaires/reclamation-form" }
    ]
  },
  appreciationsFinanceurs: {
    title: "RECUEIL DES APPRÉCIATIONS POUR FINANCEURS",
    icon: TrendingUp,
    items: [
      { id: 1, text: "Recueil des appréciations pour financeurs",  }
    ]
  },
  appreciationsEntreprises: {
    title: "RECUEIL DES APPRÉCIATIONS POUR ENTREPRISES",
    icon: Building2,
    items: [
      { id: 1, text: "Recueil des appréciations pour entreprises",  }
    ]
  },
  TESTPOSITIONNEMENT: {
    title: "TEST DE POSITIONNEMENT",
    icon: PencilLine,
    items: [
      { id: 1, text: "TEST DE POSITIONNEMENT BUSINESS ENGLISH-4 SKILLS", link: "/formulaires/test-de-positionnement-BUSINESS-ENGLISH-4-SKILLS" }
    ]
  }
}

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
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Listing questionnaires</h1>
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
                  {item.link ? (
                    <Link to={item.link} className="text-sm hover:text-purple-600 hover:underline flex items-start">
                      <span className="mr-2">•</span><span>{item.text}</span>
                    </Link>
                  ) : (
                    <span className="text-sm flex items-start opacity-50"><span className="mr-2">•</span>{item.text}</span>
                  )}
                </li>
                
              ))}
              <li className='mt-3 space-y-3' >
                  <a
                    href='REGLEMENTINTERIEUR.pdf'
                    className="text-sm hover:text-purple-600 hover:underline flex items-start"
                  >
               
                    <span>• 8/ Règlement intérieur</span>
                  </a>
                </li>
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
                  {item.link ? (
                    <Link to={item.link} className="text-sm hover:text-purple-600 hover:underline flex items-start">
                      <span className="mr-2">•</span><span>{item.text}</span>
                    </Link>
                  ) : (
                    <span className="text-sm flex items-start opacity-50"><span className="mr-2">•</span>{item.text}</span>
                  )}
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
                  {item.link ? (
                    <Link to={item.link} className="text-sm hover:text-purple-600 hover:underline flex items-start">
                      <span className="mr-2">•</span><span>{item.text}</span>
                    </Link>
                  ) : (
                    <span className="text-sm flex items-start opacity-50"><span className="mr-2">•</span>{item.text}</span>
                  )}
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
              <h2 className="text-2xl font-bold text-gray-800 text-center">{formulairesData.appreciationsFinanceurs.title}</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {formulairesData.appreciationsFinanceurs.items.map((item) => (
                <li key={item.id}>
                  {item.link ? (
                    <Link to={item.link} className="text-sm hover:text-purple-600 hover:underline flex items-start">
                      <span className="mr-2">•</span><span>{item.text}</span>
                    </Link>
                  ) : (
                    <span className="text-sm flex items-start opacity-50"><span className="mr-2">•</span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Appréciations Entreprises Card */}
          <div className="bg-white rounded-lg shadow-md p-8 md:col-span-2">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-purple-100 p-6 rounded-full mb-4">
                <Building2 className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center">{formulairesData.appreciationsEntreprises.title}</h2>
            </div>
            <ul className="space-y-3 text-gray-600 max-w-2xl mx-auto">
              {formulairesData.appreciationsEntreprises.items.map((item) => (
                <li key={item.id} className="text-center">
                   {item.link ? (
                    <Link to={item.link} className="text-sm hover:text-purple-600 hover:underline">
                      {item.text}
                    </Link>
                  ) : (
                    <span className="text-sm opacity-50">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Test de Positionnement Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-purple-100 p-6 rounded-full mb-4">
                <PencilLine className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{formulairesData.TESTPOSITIONNEMENT.title}</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {formulairesData.TESTPOSITIONNEMENT.items.map((item) => (
                <li key={item.id}>
                   {item.link ? (
                    <Link to={item.link} className="text-sm hover:text-purple-600 hover:underline flex items-start">
                      <span className="mr-2">•</span><span>{item.text}</span>
                    </Link>
                  ) : (
                    <span className="text-sm flex items-start opacity-50"><span className="mr-2">•</span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div> {/* Fermeture de la grid */}
      </div> {/* Fermeture du container max-w-7xl */}
    </div>
  )
}