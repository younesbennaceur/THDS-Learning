import React from 'react'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Quality() {
const [openSections, setOpenSections] = useState([])

  const toggleSection = (sectionId) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }
    const qltData = {
 sections: [
    {
      id: 1,
      title: "La relation de partenariat avec nos clients",
      content: [
        {
          subtitle: "Article 1",
          text: "THDS s’engage à :",
          list: [
            "Comprendre et refléter sa compréhension de la demande du client dans les cadres suivants :",
            "La réglementation en vigueur concernant la formation professionnelle ;",
            "Les engagements RSE et d’amélioration continue des compétences en ce qui concerne les méthodes, les contenus, les techniques et les moyens utilisés dans l’exercice de son activité ;",
            "Les engagements contractuels lors des différentes étapes de l’action de formation ;",
            "Les intérêts des différents acteurs (stagiaires, donneur d’ordre en entreprise, entreprise, formateurs) et de leurs valeurs ;",
            "Un accord financier excluant toute rémunération illicite."
          ]
        },
        {
          subtitle: "Article 2",
          text: "Mettre tout en œuvre pour établir une relation « gagnant gagnant » :",
          list: [
            "En étant transparent sur le choix des offres de formation ;",
            "En reconnaissant les contraintes commerciales ;",
            "En assurant un dialogue continu avec les stagiaires."
          ]
        }
      ]
    },
    {
      id: 2,
      title: "L’analyse des besoins et l’offre de formation",
      content: [
        {
          subtitle: "Article 3",
          text: "Lors de l’analyse des besoins du client, et de l’offre de formation, THDS s’engage à aider le client à formaliser sa demande et ses objectifs, en :",
          list: [
            "Proposant un dispositif de formation qui réponde aux stricts besoins et objectifs du client ;",
            "Fournissant une information précise et exhaustive des différentes formations ;",
            "Informant le client des possibilités de financement de l’action de formation ;",
            "Établissant une offre (devis) qui transcrit les exigences, conditions de réussite de l’action de formation et formalise les aspects techniques et financiers de l’intervention ;",
            "Désignant la ou les personnes intervenant dans la réalisation du dispositif de formation ;",
            "Informant le client de tout changement d’intervenant et en validant son accord."
          ]
        },
        {
          subtitle: "Article 4",
          text: "Établir un contrat ou une convention liant les parties et préalablement à toute action de formation, en :",
          list: [
            "Décrivant les exigences, conditions et modalités de l’action de formation, ainsi que les clauses relatives à la résiliation, l’annulation et le report des prestations ;",
            "Notifiant les modalités de l’action de formation : les objectifs et le programme de l’action de formation, les moyens pédagogiques, techniques et d’encadrement mis en œuvre, les prérequis et le nombre de personnes à former, les moyens permettant de suivre l’exécution de l’action et d’en apprécier les résultats (les évaluations) ;",
            "Précisant les clauses relatives à la résiliation, l’annulation et le report des prestations (Conditions Générales de Vente) ;",
            "Informant le client du règlement intérieur qui s’applique à l’action de formation de THDS ;",
            "Établissant le juste rapport qualité prix de sa prestation ;",
            "Fournissant au client les documents permettant un financement de la formation professionnelle continue."
          ]
        }
      ]
    },
    {
      id: 3,
      title: "La réalisation de l'action de formation",
      content: [
        {
          subtitle: "Article 5",
          text: "Lors de la mise en œuvre de l’action de formation, THDS s’engage à exercer sa mission pédagogique dans un cadre professionnel, en :",
          list: [
            "Informant le stagiaire du déroulement de la formation (règles du groupe, objectifs, étapes, exercices, rôles attendus, modalités d’évaluation, intervenants, e-learning, suivi de l’action…) ;",
            "Centrant la formation sur la sphère professionnelle, en se positionnant à l’articulation des champs sociaux, économiques, psychologiques ;",
            "Exerçant son action dans l’intérêt commun du client et des bénéficiaires des actions, en mettant en œuvre les moyens nécessaires pour atteindre les objectifs contractualisés ;",
            "Mettant en œuvre toutes ses compétences quels que soient l’action, le client, les bénéficiaires et le prix ;",
            "Donnant un feedback au client sur sa progression dans l’évaluation des compétences (exercices en salle, en ligne ou e-learning) ;",
            "Informant rapidement les stagiaires et commanditaires de tout élément risquant de nuire à l’atteinte des objectifs ou au bon déroulement des actions."
          ]
        },
        {
          subtitle: "Article 6",
          text: "Maintenir et développer ses compétences professionnelles, en :",
          list: [
            "Entretenant sa veille professionnelle par un perfectionnement continu et une auto-formation ;",
            "Mettant à jour ses méthodes, ses outils, et sa connaissance de l’environnement socio-économique ;",
            "S’engageant si besoin en supervision, en échanges de pratiques, …"
          ]
        },
        {
          subtitle: "Article 7",
          text: "Intervenir dans un cadre respectant leur indépendance, en :",
          list: [
            "Se donnant la possibilité de refuser des missions qui porteraient atteinte à son indépendance professionnelle, que ce soit pour des raisons de compétence ou d’éthique ;",
            "Ayant conscience des limites de son champ d’intervention ;",
            "N’acceptant aucune rémunération illicite."
          ]
        },
        {
          subtitle: "Article 8",
          text: "Respecter les parties prenantes (commanditaire, autres formateurs, stagiaires, concurrents), en :",
          list: [
            "Prenant en compte les enjeux des organisations concernées par la formation ;",
            "Se gardant de tout propos désobligeant envers un confrère auprès des stagiaires ;",
            "Étant neutre par rapport aux jeux d’influence chez le commanditaire et en n’exprimant aucun jugement ou critique sur le commanditaire auprès des stagiaires aux sessions de formation ;",
            "Observant les règles d’une concurrence loyale à l’égard de THDS, et de ses confrères et concurrents."
          ]
        }
      ]
    },
    {
      id: 4,
      title: "La sécurité physique des personnes et la sécurité des données",
      content: [
        {
          subtitle: "Article 9",
          text: "Respecter la confidentialité des données, en :",
          list: [
            "S’assurant de la confidentialité de toute information ou donnée à caractère privé ou professionnel relative au client, employés ou fournisseurs du client ainsi qu’au savoir-faire, auxquels il aurait eu accès expressément ou accidentellement dans le cadre de sa mission de formation ;",
            "N’exploitant pas à titre personnel les informations confidentielles, en ne divulguant aucune information sans l´autorisation préalable du client, du stagiaire ou de THDS. De ce fait, les résultats des évaluations individuelles des stagiaires ne peuvent être transmis à l’employeur, sans l’accord de la personne concernée. Seuls les résultats reflétant les moyennes des évaluations peuvent être transmis à l’employeur."
          ]
        },
        {
          subtitle: "Article 10",
          text: "Respecter la propriété intellectuelle, en :",
          list: [
            "Ne faisant pas un usage personnel ou professionnel des informations auxquelles il aurait recours dans l’exercice de la mission ;",
            "Citant les sources des documents remis, de façon à assurer une transparence absolue tant vis-à-vis de leurs auteurs, des clients et stagiaires."
          ]
        },
        {
          subtitle: "Article 11",
          text: "Respecter la sécurité physique des personnes, en :",
          list: [
            "Respectant les consignes en matière de sécurité physique ou informatique mises en place sur le site du stagiaire/client, afin de garantir sa propre sécurité ainsi que celle des employés, du matériel, des installations et de tous les supports physiques ou électroniques ;",
            "Informant immédiatement la direction de THDS de tout incident pouvant avoir un impact sur la sécurité des stagiaires."
          ]
        }
      ]
    },
    {
      id: 5,
      title: "Le respect de l’apprenant en tant que personne",
      content: [
        {
          subtitle: "",
          text: "Du fait de sa position de pouvoir et d’influence, le formateur a la responsabilité de la qualité de l’environnement dans lequel se déroulent les actions de formations qu’il conduit. Il se doit donc d’établir avec les stagiaires, d’une part un contrat moral reposant sur un rapport de confiance, d’équité et de justice, d’autre part des règles implicites et explicites de la dynamique de groupe qui aient l’adhésion de tous. Le formateur se doit surtout d’être à l’image de ses enseignements et des règles qu’il fixe. Les formateurs s’engagent donc sur le respect des points suivants :"
        },
        {
          subtitle: "Article 12",
          text: "Promouvoir l’égalité des chances, en :",
          list: [
            "Reconnaissant chaque stagiaire dans sa singularité, son histoire, ses représentations, ses valeurs, ses stratégies d’apprentissage, ses acquis et ses projets ;",
            "Reconnaissant chacun dans sa capacité à explorer, découvrir, s’engager dans d’autres possibles et dépasser une identité perçue comme limitante ;",
            "Pariant sur l’éducabilité de tous sans assigner quiconque à l’échec ;",
            "Rendant possible, identifiant et valorisant les apprentissages de chacun ; aidant chacun, à travers les tâches réalisées, à repérer les objectifs atteints et les progrès effectués ;",
            "Facilitant l’expression de chacun et en évitant toute forme d’humiliation, d’agression ou d’exclusion ; en garantissant à chacun le droit à l’erreur."
          ]
        },
        {
          subtitle: "Article 13",
          text: "Défendre la dignité personnelle et le respect des sphères professionnelle et privée, en :",
          list: [
            "Permettant au stagiaire d’échapper aux relations d’emprise et de séduction ;",
            "Organisant une réflexion sur les situations d’apprentissage ;",
            "Veillant à ne pas outrepasser son rôle et en se gardant de toute dérive à prétention thérapeutique ;",
            "Liant en permanence, à travers tous ses comportements, bienveillance et exigence à l’égard de tous ;",
            "Respectant et faisant respecter l’intégrité morale et physique de toute personne à chaque instant ;",
            "Assurant une prestation exempte de toute discrimination de genre, d’origine ou de croyance ;",
            "Assurant sa prestation sans finalité commerciale, politique, philosophique ou religieuse ;",
            "S’interdisant tout prosélytisme, approche sectaire et manipulation mentale."
          ]
        }
      ]
    },
    {
      id: 6,
      title: "Le Respect de la certification et du décret qualité",
      content: [
        {
          subtitle: "Article 14",
          text: "Respecter la certification en :",
          list: [
            "Informant les publics sur les prestations, les délais d’accès et les résultats obtenus ;",
            "Identifiant précisément des objectifs des prestations proposées et leur adaptation aux publics bénéficiaires lors de la conception des actions ;",
            "Adaptant les prestations et des modalités d’accueil, d’accompagnement, de suivi et d’évaluation aux publics bénéficiaires lors de la mise en œuvre des actions ;",
            "Restant en adéquation avec les moyens pédagogiques, techniques et d’encadrement aux prestations mises en œuvre ;",
            "Respectant la qualification et le développement des connaissances et des compétences des personnels chargés de mettre en œuvre les prestations ;",
            "Respectant l’inscription et l’investissement du prestataire dans son environnement professionnel (nouveau critère qui ne figurait pas dans le décret Qualité du 30/06/2015) ;",
            "Le recueil et la prise en compte des appréciations et des réclamations formulées par les parties prenantes aux prestations délivrées (art. R. 6316-1 du Code du Travail)."
          ]
        }
      ]
    },
    {
      id: 7,
      title: "En cas de non-respect du code de déontologie",
      content: [
        {
          subtitle: "",
          text: "En cas de différend ou de non-respect du code de déontologie, les parties s’efforceront de trouver une solution à l’amiable avant de faire appel aux tribunaux compétents. Ils demanderont si besoin l’intervention d’un médiateur."
        },
        {
          subtitle: "Contact",
          text: "Pour toute question ou réclamation concernant ce code de déontologie, veuillez contacter THDS :",
          list: [
            "Adresse : 5 Rue Pleyel 93200 SAINT DENIS",
            "Téléphone : 06 09 96 85 95",
            "Email : contact@thds.fr",
            "SIRET : 832 774 087 00023",
            "NDA : 11931056093"
          ]
        }
      ]
    }
  ]
}
  return (
    <div className=' relative'>
        <div className="relative h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=600&fit=crop"
          alt="Conditions Générales de Vente"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/85"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ENGAGEMENT QUALITE
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
               Le code de déontologie ci-dessous vise à protéger le stagiaire/client contre toutes applications abusives par BLUE FORMATION . Ce code définit les engagements de BLUE FORMATION envers son public et ses clients ; et ce code sert de règles de conduite à ses membres et de référence en cas de non-respect et de plainte.
              </p>
              
            </div>

      </div>
            <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {qltData.sections.map((section) => (
            <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-xl font-bold text-purple-900 text-left">
                  {section.title}
                </h2>
                {openSections.includes(section.id) ? (
                  <ChevronUp className="w-6 h-6 text-purple-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-purple-600 flex-shrink-0" />
                )}
              </button>
              
              {openSections.includes(section.id) && (
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  {section.subsections ? (
                    section.subsections.map((subsection, subIdx) => (
                      <div key={subIdx} className="mb-8 last:mb-0">
                        <h3 className="text-lg font-semibold text-purple-800 mb-4">
                          {subsection.subtitle}
                        </h3>
                        {subsection.content.map((item, itemIdx) => (
                          <div key={itemIdx} className="mb-4 text-gray-700 leading-relaxed">
                            <p className="mb-2">
                              <span className="font-semibold">{item.subtitle}</span> {item.text}
                            </p>
                            {item.list && (
                              <ul className="ml-6 space-y-1 mt-2">
                                {item.list.map((listItem, listIdx) => (
                                  <li key={listIdx} className="text-gray-600">• {listItem}</li>
                                ))}
                              </ul>
                            )}
                            {item.paragraphs && (
                              <div className="ml-6 space-y-2 mt-2">
                                {item.paragraphs.map((para, paraIdx) => (
                                  <p key={paraIdx} className="text-gray-600">{para}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    section.content.map((item, itemIdx) => (
                      <div key={itemIdx} className="mb-4 text-gray-700 leading-relaxed">
                        <p className="mb-2">
                          <span className="font-semibold">{item.subtitle}</span> {item.text}
                        </p>
                        {item.list && (
                          <ul className="ml-6 space-y-1 mt-2">
                            {item.list.map((listItem, listIdx) => (
                              <li key={listIdx} className="text-gray-600">• {listItem}</li>
                            ))}
                          </ul>
                        )}
                        {item.paragraphs && (
                          <div className="ml-6 space-y-2 mt-2">
                            {item.paragraphs.map((para, paraIdx) => (
                              <p key={paraIdx} className="text-gray-600">{para}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

       


    </div>
  )
}
