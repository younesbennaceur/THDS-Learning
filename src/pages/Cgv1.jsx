import React from 'react'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Cgv1() {

const [openSections, setOpenSections] = useState([])

  const toggleSection = (sectionId) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

// Données JSON des CGV
const cgvData = {
 sections: [
    {
      id: 1,
      title: "1. Généralités",
      content: [
        {
          subtitle: "1.1.",
          text: "Les présentes conditions générales de vente définissent les règles applicables à la vente des actions de formation organisées par THDS dans le cadre de la formation professionnelle continue."
        },
        {
          subtitle: "1.2.",
          text: "THDS est un organisme de formation dont la déclaration d'activité est enregistrée sous le numéro 11931056093 auprès du préfet de région d'Ile-de-France, son siège est situé au 5 Rue Pleyel 93200 SAINT DENIS, SIRET : 832 774 087 00023 immatriculée au registre du commerce et des sociétés d'Evry."
        },
        {
          subtitle: "1.3.",
          text: "THDS se réserve le droit de modifier les présentes conditions générales de vente sans avis préalable auprès du client ou des tiers."
        },
        {
          subtitle: "1.4.",
          text: "Les termes ci-dessous seront utilisés dans le document, dont les définitions sont les suivantes :",
          list: [
            "Organisme de formation : vendeur de l'action de formation, ci-dessus désigné 'THDS'.",
            "Client : groupe de personnes ou individu qui s'inscrivent ou passe commande auprès de l'Organisme de formation et co-contractant de THDS.",
            "Tiers : toute entité ne faisant pas partie du contrat.",
            "Stagiaire : personne physique qui participe à une action de formation.",
            "Formations inter-entreprises : les formations inscrites au catalogue de l'Organisme de formation et qui regroupent des stagiaires issus de différentes structures.",
            "Formations intra-entreprises : les formations conçues sur mesure par l'Organisme de formation pour le compte d'un client ou d'un groupe de clients.",
            "Formation à distance : formation dispensée par un formateur via Zoom.",
            "CGV : conditions générales de vente, détaillées ci-dessous.",
            "OPCO : les Opérateurs de Compétences.",
            "CPF : Compte Personnel de Formation."
          ]
        }
      ]
    },
    {
      id: 2,
      title: "2. Objet et Champ d'Application",
      content: [
        {
          subtitle: "2.1.",
          text: "Les présentes CGV, en tant que document pré-contractuel, s'appliquent exclusivement à toutes les prestations de formation engagées par THDS pour le compte de son Client."
        },
        {
          subtitle: "2.2.",
          text: "Le présent document prévaut sur tout autre document ou acte émanant du client, en l'occurrence les conditions d'achat, sauf dérogation expresse et écrite de THDS."
        },
        {
          subtitle: "2.3.",
          text: "Toute inscription aux actions de formation, organisées par THDS, implique l'acceptation entière et sans réserve dudit document."
        },
        {
          subtitle: "2.4.",
          text: "Ainsi, le Client est invité à consulter et à prendre connaissance des présentes CGV ainsi que de ses éventuelles mises à jour sur le site de THDS."
        }
      ]
    },
    {
      id: 3,
      title: "3. Conditions d'Inscription",
      subsections: [
        {
          subtitle: "L'établissement de devis",
          content: [
            {
              subtitle: "3.1.",
              text: "Avant toute décision d'inscription, le Client peut demander un devis gratuit adressé à THDS selon les moyens suivants :",
              list: [
                "par téléphone au numéro : 06 09 96 85 95",
                "par l'envoi d'un email à l'adresse : contact@thds.fr",
                "par le remplissage et l'envoi du formulaire sur le site de THDS."
              ]
            },
            {
              subtitle: "3.2.",
              text: "La proposition commerciale ou le devis comprendra :",
              list: [
                "la date d'établissement et la durée de validité du devis",
                "les informations légales sur THDS",
                "l'identité du client",
                "l'action de formation, objet de la demande de devis",
                "les pré-requis pour accéder à l'action de formation, le cas échéant",
                "les dates de formation définies conjointement par le bénéficiaire et THDS ou par le bénéficiaire seulement",
                "la durée totale de la formation (inscrite dans le bulletin d'inscription ou bon de commande)",
                "le prix total de la prestation de formation",
                "les modalités d'échelonnement de paiement"
              ]
            },
            {
              subtitle: "3.3.",
              text: "L'envoi du devis signé à THDS par le Client, avec accusé de réception, suppose que ce dernier a eu la possibilité de vérifier les détails de la prestation et son prix total, de corriger les éventuelles erreurs, puis d'accepter son contenu. Cela implique également la prise de connaissance et l'acceptation des présentes CGV par le Client."
            }
          ]
        },
        {
          subtitle: "La convention de formation professionnelle",
          content: [
            {
              subtitle: "3.4.",
              text: "Formations inter-entreprise et intra-entreprise :",
              paragraphs: [
                "Sous condition de la réception du devis signé, pour la formation en inter-entreprise, THDS établit, dans un délai de 2 jours ouvrés après sa réception, un contrat de formation professionnelle conformément aux articles L.6353-1 du Code du travail et le Décret N° 2018-1341 du 28 décembre 2018.",
                "La signature du contrat de formation professionnelle par le Client, personne physique et bénéficiaire de l'action de formation demandée, vaudra inscription effective.",
                "Pour la formation en intra-entreprise, THDS établit une convention de formation professionnelle dans un délai de 2 jours ouvrés. La signature de la convention par le Client, personne morale, vaudra inscription effective des bénéficiaires.",
                "Le Client est tenu de retourner le contrat ou la convention dans un délai butoir de 15 jours au plus tard, avant le début de la formation. Dans le cas contraire, THDS se réserve le droit de ne pas considérer les documents signés.",
                "Chaque convention est produite en 2 exemplaires dont l'un est gardé par THDS, et l'autre remis au Client."
              ]
            }
          ]
        },
        {
          subtitle: "La formation prise en charge par un organisme tiers",
          content: [
            {
              subtitle: "3.5.",
              text: "Il est à rappeler que préalablement à toutes catégories d'inscription, le Client est tenu de respecter les articles 3.1 et 3.3 des présentes CGV."
            },
            {
              subtitle: "3.6.",
              text: "Dans le cadre d'une formation avec prise en charge CPF, le bénéficiaire s'inscrit directement sur le site https://www.moncompteformation.gouv.fr/espace-prive/html/#/."
            },
            {
              subtitle: "3.7.",
              text: "Le démarrage de la formation ne pourra se faire qu'après acceptation des conditions générales d'utilisation (CGU) de la plateforme par l'utilisateur."
            },
            {
              subtitle: "3.8.",
              text: "Il appartient au Client de :",
              list: [
                "faire une demande de prise en charge un mois avant le début de la formation et de s'assurer de la bonne fin de cette demande",
                "l'indiquer explicitement sur son bulletin d'inscription en y mentionnant les coordonnées complètes de l'organisme collecteur",
                "transmettre l'accord de prise en charge 15 jours avant la date de formation",
                "s'assurer de la bonne fin du paiement par l'organisme qu'il aura désigné"
              ]
            },
            {
              subtitle: "3.9.",
              text: "Une fois les conditions des articles 3.5, 3.6 et 3.7 remplies, l'article 3.4 s'applique au Client selon la catégorie de formation correspondante."
            }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "4. Modalités d'Accès dans le Cas de Formations Sans Pré-Requis",
      subsections: [
        {
          subtitle: "Dans le cas où l'organisme de formation est autorisé à utiliser des fonds mutualisés",
          content: [
            {
              subtitle: "4.1.",
              text: "Le titulaire du compte effectue une demande sur la plateforme, une notification nous est transmise. Nous nous engageons à répondre à toute demande d'inscription dans un délai de 2 jours ouvrés. À défaut de réponse, le titulaire du compte pourra annuler sa demande."
            },
            {
              subtitle: "4.2.",
              text: "Afin de garantir au mieux vos droits, nous devons respecter un délai obligatoire de 11 jours ouvrés (15 jours calendaires) entre la date d'envoi de notre proposition de formation et la date de début de la formation."
            },
            {
              subtitle: "4.3.",
              text: "Après validation de la demande par THDS, vous recevez une proposition de formation. Vous bénéficiez d'un délai de 4 jours ouvrés pour confirmer votre commande. En cas de confirmation, vous recevez une validation définitive par mail. En l'absence de retour dans le délai de 4 jours, votre place réservée n'est plus garantie."
            }
          ]
        },
        {
          subtitle: "Dans le cas de formations avec pré-requis",
          content: [
            {
              subtitle: "4.4.",
              text: "Lorsque vous effectuez une demande, THDS accuse réception dans un délai de 2 jours ouvrés."
            },
            {
              subtitle: "4.5.",
              text: "Afin de vérifier que le stagiaire dispose des pré-requis exigés, nous disposons d'un délai de 30 jours ouvrés pour instruire la demande. L'absence de réponse entraîne l'annulation de la demande d'inscription."
            },
            {
              subtitle: "4.6.",
              text: "THDS dispose d'un droit d'accès au profil du titulaire du compte, mentionnant notamment son niveau de qualification."
            },
            {
              subtitle: "4.7.",
              text: "THDS peut également demander au stagiaire de réaliser un entretien ou un test de niveau."
            },
            {
              subtitle: "4.8.",
              text: "THDS s'engage à ne pas utiliser les données contenues dans la demande d'inscription ou transmises lors de l'évaluation des pré-requis à des fins commerciales."
            },
            {
              subtitle: "4.9.",
              text: "À l'issue de l'étude et après validation des pré-requis, nous vous adressons une proposition de commande. Nous devons respecter un délai de 11 jours ouvrés (15 jours calendaires) entre l'envoi de la proposition et le début de la formation."
            },
            {
              subtitle: "4.10.",
              text: "Vous bénéficiez d'un délai de 4 jours ouvrés pour confirmer votre commande. En l'absence de retour, la place réservée ne vous est plus garantie et THDS n'est plus tenu par sa proposition."
            },
            {
              subtitle: "4.11.",
              text: "En cas de refus d'inscription, nous nous engageons à motiver notre décision par mail."
            }
          ]
        }
      ]
    },
    {
      id: 5,
      title: "5. Délais d'Accès aux Formations",
      content: [
        {
          subtitle: "5.1.",
          text: "Le client peut accéder aux formations à un délai estimé de 1 mois."
        },
        {
          subtitle: "5.2.",
          text: "Le candidat peut s'inscrire :",
          list: [
            "Au plus tôt 6 mois avant le début de la formation",
            "Au plus tard 15 jours avant le début de la formation"
          ]
        }
      ]
    },
    {
      id: 6,
      title: "6. Prix et Modalités de Règlement",
      content: [
        {
          subtitle: "6.1.",
          text: "Le prix de la formation est défini dans les documents suivants : programme de formation, bulletin d'inscription et la convention de formation professionnelle."
        },
        {
          subtitle: "6.2.",
          text: "Il est calculé en fonction de la nature et de la durée de la formation sur la base de la grille tarifaire de THDS en vigueur au moment de la signature du bulletin d'inscription."
        },
        {
          subtitle: "6.3.",
          text: "THDS se réserve la possibilité de modifier à tout moment ses grilles tarifaires pour tenir compte de l'évolution générale des prix et de la concurrence."
        },
        {
          subtitle: "6.4.",
          text: "Les prix s'entendent en euros toutes taxes comprises, ils sont fermes et non révisables."
        },
        {
          subtitle: "6.5.",
          text: "Le règlement du prix doit être réalisé, selon le calendrier de paiement attribué au Client, par virement sur le compte bancaire de THDS."
        },
        {
          subtitle: "6.6.",
          text: "En cas de non-paiement d'une facture à son échéance, le Client sera redevable de plein droit de pénalités de retard correspondant à trois (3) fois le taux d'intérêt légal en vigueur au jour de l'émission de la facture."
        },
        {
          subtitle: "6.7.",
          text: "Le Client sera redevable du paiement d'une indemnité forfaitaire d'un montant de quarante (40) euros pour frais de recouvrement. Si les frais réellement engagés sont supérieurs, une indemnisation complémentaire sur justification peut être demandée."
        },
        {
          subtitle: "6.8.",
          text: "THDS se réserve le droit de disposer librement des places retenues par le Client tant que l'intégralité du prix de la formation n'est pas totalement acquittée."
        },
        {
          subtitle: "6.9.",
          text: "En cas de prise en charge du paiement par les OPCO, si THDS n'a pas reçu la prise en charge au premier jour de la formation, le Client sera facturé de l'intégralité du prix."
        },
        {
          subtitle: "6.10.",
          text: "En cas de non-paiement par l'organisme collecteur, le Client sera redevable de l'intégralité du prix et sera facturé du montant correspondant éventuellement majoré de pénalités de retard."
        },
        {
          subtitle: "6.11.",
          text: "Si l'organisme collecteur ne prend en charge que partiellement le prix de la formation, le reliquat sera facturé au Client."
        }
      ]
    },
    {
      id: 7,
      title: "7. Droit de Rétractation - Annulation - Report par le Client",
      subsections: [
        {
          subtitle: "Droit de rétractation",
          content: [
            {
              subtitle: "7.1.",
              text: "Toutes les actions de formation organisées par THDS se font à distance par Zoom ou outil équivalent."
            },
            {
              subtitle: "7.2.",
              text: "À compter de la date de signature de la convention de formation professionnelle, le Client personne physique ou personne morale dispose d'un délai de 10 jours ouvrés pour se rétracter."
            },
            {
              subtitle: "7.3.",
              text: "Le délai de rétractation est porté à 14 jours (article L.121-16 du Code de la consommation) pour les contrats conclus « à distance » et les contrats conclus « hors établissement »."
            },
            {
              subtitle: "7.4.",
              text: "Le Client en informe THDS par lettre recommandée avec accusé de réception."
            },
            {
              subtitle: "7.5.",
              text: "Dans ce cas, aucune somme ne peut être exigée du stagiaire."
            }
          ]
        },
        {
          subtitle: "Annulation - Cessation par le Client",
          content: [
            {
              subtitle: "7.6.",
              text: "Pour être effective, toute cessation ou annulation en cours de formation par le client doit faire l'objet d'une demande écrite : une lettre recommandée avec accusé de réception ou un email adressé à THDS."
            },
            {
              subtitle: "7.7.",
              text: "Toute annulation en cours de formation ou absence du bénéficiaire, personne morale, donnera lieu à une facturation de 100% du coût total de l'action de formation à titre d'indemnité forfaitaire, pour couvrir les frais engagés par THDS."
            },
            {
              subtitle: "7.8.",
              text: "Le Client, personne morale, peut demander le remplacement du stagiaire initialement inscrit par un autre stagiaire de l'entreprise en informant préalablement THDS par email, téléphone ou lettre recommandée avec accusé de réception."
            },
            {
              subtitle: "7.9.",
              text: "La demande de remplacement sera sans frais. Toutefois, le nouveau stagiaire doit remplir les mêmes conditions que celui qu'il remplace, notamment les pré-requis de l'action de formation le cas échéant."
            },
            {
              subtitle: "7.10.",
              text: "Toute annulation après l'expiration du délai de rétractation ou absence du bénéficiaire, personne physique, donnera lieu à une facturation de 50% du coût total de l'action de formation à titre d'indemnité forfaitaire."
            },
            {
              subtitle: "7.11.",
              text: "Le montant dû par le Client à titre d'indemnisation fera l'objet d'une mention sur la facture."
            }
          ]
        },
        {
          subtitle: "Report par le Client",
          content: [
            {
              subtitle: "7.12.",
              text: "Sauf cas de force majeure, tout report à l'action de formation à l'initiative du Client ne sera pas possible."
            }
          ]
        }
      ]
    },
    {
      id: 8,
      title: "8. Annulation et Report par l’Organisme de Formation",
      content: [
        {
          subtitle: "8.1.",
          text: "THDS se réserve le droit d’annuler ou de reporter une action de formation en inter-entreprise s’il s’avère que le nombre minimal de participants n’est pas atteint sans possibilité de dédommagement à l’entreprise Cliente."
        },
        {
          subtitle: "8.2.",
          text: "Il en est de même en inter ou intra-entreprise en cas de force majeure."
        },
        {
          subtitle: "8.3.",
          text: "À cet effet, de nouvelles dates seront proposées au Client ou THDS effectuera le remboursement au prorata temporis des sommes versées par le Client."
        },
        {
          subtitle: "8.4.",
          text: "THDS se réserve le droit de changer de formateur dans des circonstances particulières."
        },
        {
          subtitle: "8.5.",
          text: "Si THDS se voit dans l’obligation de ne pas réaliser l’action de formation, l’article L.6354-1 du Code du travail lui sera applicable : “Il est convenu entre les signataires de la présente convention, que faute de réalisation totale ou partielle de la prestation de formation, l’organisme prestataire doit rembourser au cocontractant les sommes indûment perçues de ce fait.”"
        }
      ]
    },
    {
      id: 9,
      title: "9. Responsabilités des Parties",
      subsections: [
        {
          subtitle: "Responsabilités de THDS",
          content: [
            {
              subtitle: "9.1.",
              text: "Avant toute inscription définitive des stagiaires à une action de formation, THDS est dans l’obligation de transmettre les documents et informations suivantes :",
              list: [
                "le règlement intérieur de l’Organisme de formation ;",
                "la convention ou contrat de formation professionnelle à signer par le stagiaire ;",
                "le programme de l’action de formation ;",
                "les dates, les horaires et la durée de l’action de formation ;",
                "les modalités de suivi et évaluation de l’action de formation ;",
                "la liste des formateurs, avec mention de leurs titres et qualités ;",
                "les coordonnées de la personne chargée des relations avec les stagiaires dans l’entité commanditaire de la formation (employeur, Opco, financeur public), le cas échéant."
              ]
            },
            {
              text: "Après que les étapes de l’inscription ont été réalisées, il convient à l’Organisme de formation d’adresser la convocation et les liens de connexion nécessaires aux participants pour rejoindre la session, au plus tard, une semaine avant la formation. Ces informations personnalisées sont confidentielles et ne peuvent être partagées ou transmises à un autre participant."
            },
            {
              text: "THDS ne peut être tenue responsable de la non-réception de la convocation par les destinataires, notamment en cas d’absence du stagiaire à la formation."
            },
            {
              text: "Une attestation de présence, établie en conformité avec les feuilles d’émargement, est adressée au stagiaire après chaque formation."
            },
            {
              text: "THDS est tenue de remettre une attestation de fin de formation à tout stagiaire ayant obtenu le score minimum attendu pour chaque action de formation."
            },
            {
              text: "THDS s’engage également à fournir une formation avec diligence et en respectant les méthodes pédagogiques sachant qu’il s’agit d’une prestation intellectuelle."
            },
            {
              text: "Étant tenue d’une obligation de moyens et non de résultats, THDS sera responsable uniquement des dommages directs résultant d’une mauvaise exécution de ses prestations de formation, à l’exclusion de tout dommage immatériel ou indirect consécutifs ou non."
            },
            {
              text: "Ainsi, la responsabilité de THDS, au titre ou à l’occasion de la formation, sera limitée au prix total de la formation."
            }
          ]
        },
        {
          subtitle: "Responsabilités du Client/ Stagiaire/ Participant",
          content: [
            {
              subtitle: "9.2.",
              text: "Le Client s’engage à payer le prix de la formation selon le calendrier THDS établit."
            },
            {
              text: "Le Client s’engage à ne pas enregistrer sous aucune forme toutes les sessions réalisées au titre d’une action de formation sauf accord préalable de THDS."
            },
            {
              text: "Toute inscription à une formation implique le respect par le stagiaire du règlement intérieur applicable, lequel est, au préalable, porté à sa connaissance."
            },
            {
              text: "Il appartient au stagiaire de vérifier que son assurance personnelle et/ou professionnelle le couvre tout le long de l’action de formation."
            }
          ]
        },
        {
          subtitle: "Manquement aux obligations",
          content: [
            {
              subtitle: "9.3.",
              text: "En cas de manquement par l’une des parties à ses obligations, non réparé dans un délai de trente (30) jours à compter de la réception d’une lettre recommandée avec accusé de réception notifiant ledit manquement et déclarant l’intention de la partie lésée d’user du bénéfice de la présente clause résolutoire, l’autre partie pourra résilier de plein droit son engagement sans préjudice des dommages et intérêts auxquels elle pourrait prétendre."
            },
            {
              text: "Le non-paiement du prix convenu entraîne également la résiliation de plein droit de tout accord contractuel conclu entre le Client et THDS, trente (30) jours après mise en demeure de payer par lettre recommandée avec avis de réception, restée infructueuse, sans préjudice des pénalités de retard qui sont dues de plein droit dès le premier jour de retard."
            }
          ]
        }
      ]
    },
    {
      id: 10,
      title: "10. Propriété Intellectuelle et Droit à l’Image",
      content: [
        {
          subtitle: "10.1.",
          text: "THDS peut citer le Client à titre de référence en indiquant de manière générique le champ d’intervention, sans pour autant préciser l’étendue des prestations demandées, dans le but de promouvoir ses produits et services."
        },
        {
          subtitle: "10.2.",
          text: "La réalisation des formations ne confère ni ne peut conférer au Client un quelconque droit de propriété intellectuelle sur le savoir-faire, les marques, les logos et autres signes distinctifs, ainsi que, sur tous les autres droits de propriété intellectuelle ou des droits connexes, notamment sur les contenus pédagogiques et les supports des formations (textes, graphismes, photographies, etc.) sur tout format (papier, numérique) dont est titulaire ou qu’utilise et exploite THDS."
        },
        {
          subtitle: "10.3.",
          text: "Toute reproduction, représentation, imitation, exploitation ou utilisation, de quelque nature que ce soit, totale ou partielle, des formations proposées par THDS et/ou des éléments le composant par quelque procédé que ce soit, sur quelque support que ce soit et à quelque finalité que ce soit, non expressément et préalablement autorisée par THDS, est interdite et constituerait une contrefaçon exposant son auteur à des condamnations pénales et civiles et notamment aux sanctions prévues par les articles L. 335-2 et suivants du Code de la propriété intellectuelle."
        }
      ]
    },
    {
      id: 11,
      title: "11. Confidentialité",
      content: [
        {
          subtitle: "11.1.",
          text: "Il est interdit à chaque partie de partager, de transmettre ou de communiquer tous documents ou informations dont elle a pris connaissance durant l’exécution des prestations, quelles que soient leur forme et leur nature (économique, technique, juridique, commerciale, etc.)"
        },
        {
          subtitle: "11.2.",
          text: "THDS s’engage à ne pas communiquer à des tiers autres que les partenaires avec lesquels sont organisées les actions de formations et aux OPCO, les informations concernant et transmises par le Client et/ou stagiaire."
        }
      ]
    },
    {
      id: 12,
      title: "12. Protection des Données à Caractère Personnel",
      content: [
        {
          subtitle: "12.1.",
          text: "Toute participation à une formation fera l’objet d’un traitement de données ayant pour finalité la gestion et le suivi des demandes de formation du Client. Ces informations sont à destination du service commercial de THDS, d’opérateurs de compétences et avec le consentement préalable du Client."
        },
        {
          subtitle: "12.2.",
          text: "Sauf opposition de la part du Client, des informations relatives à l’organisation d’autres sessions de formation peuvent lui être adressées. Dans le cadre de la gestion de l’inscription du Client à une formation, les données sont archivées pendant cinq (5) ans à l’issue de la prestation."
        },
        {
          subtitle: "12.3.",
          text: "Les données traitées dans le cadre d’opérations commerciales seront conservées pendant la durée des relations contractuelles, augmentée de trois (3) ans à des fins d’animation et de prospection, sans préjudice des obligations de conservation ou des délais de prescription."
        }
      ]
    },
    {
      id: 13,
      title: "13. Sous-Traitance",
      content: [
        {
          subtitle: "13.1.",
          text: "THDS est autorisée à sous-traiter pour partie ou totalement l’exécution des prestations objets des présentes CGV."
        },
        {
          subtitle: "13.2.",
          text: "THDS demeure dans ce cas responsable à l’égard du Client et/ou stagiaire de toutes les obligations résultant du présent document."
        }
      ]
    },
    {
      id: 14,
      title: "14. Cas de Force Majeure",
      content: [
        {
          subtitle: "14.1.",
          text: "En cas de force majeure telle que définie par la jurisprudence française et par l’article 1218 du Code civil, rendant impossible l’exécution par l’une ou l’autre partie de ses obligations, la formation ou l’accès à la plateforme e-learning sera suspendue pour une durée maximale de trente (30) jours, à compter de la notification de la survenance de l’événement de force majeure par la partie empêchée d’exécuter ses obligations contractuelles."
        },
        {
          subtitle: "14.2.",
          text: "L’exécution de la prestation ou l’accès à la plateforme en ligne reprendra lors de la disparition de la cause de suspension."
        },
        {
          subtitle: "14.3.",
          text: "Passé le délai de trente (30) jours, à défaut de reprise, la formation sera considérée comme définitivement éteinte."
        }
      ]
    },
    {
      id: 15,
      title: "15. Nullité",
      content: [
        {
          subtitle: "15.1.",
          text: "L’annulation d’une des stipulations des CGV n’entraînera pas l’annulation des CGV dans son ensemble que pour autant que la stipulation litigieuse puisse être considérée comme substantielle et déterminante, et que son annulation remette en cause l’équilibre général des CGV."
        },
        {
          subtitle: "15.2.",
          text: "En cas d’annulation d’une des stipulations des CGV, considérée comme non substantielle, THDS et le Client s’efforceront de négocier une clause économiquement et juridiquement équivalente."
        }
      ]
    },
    {
      id: 16,
      title: "16. Non-Renonciation",
      content: [
        {
          subtitle: "16.1.",
          text: "Le silence du Client ou de THDS, négligence ou retard à exercer un droit ou un recours qui leur est consenti en vertu des CGV ne doit jamais être interprété comme une renonciation à leurs droits et recours, tant et aussi longtemps que la prescription légale prévue pour l’exercice d’un tel droit ou recours n’est pas expirée."
        }
      ]
    },
    {
      id: 17,
      title: "17. Médiation",
      content: [
        {
          subtitle: "17.1.",
          text: "Conformément à l’article L. 612-1 du Code de la consommation, le consommateur, sous réserve de l’article L.612.2 du code de la consommation, a la faculté d’introduire une demande de résolution amiable par voie de médiation, dans un délai inférieur à un an à compter de sa réclamation écrite auprès du professionnel."
        },
        {
          subtitle: "17.2.",
          text: "THDS a désigné, par adhésion enregistrée sous le numéro XXXXXXXXX la SAS Médiation Solution comme entité de médiation de la consommation."
        },
        {
          subtitle: "17.3.",
          text: "Pour saisir le médiateur, le consommateur doit formuler sa demande :",
          list: [
            "Soit par écrit à : Sas Médiation Solution 222 chemin de la bergerie 01800 Saint Jean de Niost Tel. 04 82 53 93 06",
            "Soit par mail à : contact@sasmediationsolution-conso.fr",
            "Soit en remplissant le formulaire en ligne intitulé « Saisir le médiateur » sur le site https://www.sasmediationsolution-conso.fr"
          ]
        },
        {
          subtitle: "17.4.",
          text: "Quel que soit le moyen de saisine utilisé, la demande doit impérativement contenir :",
          list: [
            "Les coordonnées postales, téléphoniques et électroniques du demandeur ;",
            "Le nom et l’adresse et le numéro d’enregistrement chez Sas Médiation Solution, du professionnel concerné ;",
            "Un exposé succinct des faits. Le consommateur précisera au médiateur ce qu’il attend de cette médiation et pourquoi ;",
            "Une copie de la réclamation préalable ;",
            "Tous documents permettant l’instruction de la demande (bon de commande, facture, justificatif de paiement, etc.)."
          ]
        }
      ]
    },
    {
      id: 18,
      title: "18. Réclamation",
      content: [
        {
          subtitle: "18.1.",
          text: "Les réclamations ou contestations seront toujours reçues avec bienveillance, la bonne foi étant toujours présumée chez celui qui prend la peine d’exposer sa situation."
        },
        {
          subtitle: "18.2.",
          text: "Pour toute réclamation ou question, le Client est invité à écrire un email à : contact@thds.fr ou par téléphone au 06 09 96 85 95 ou à adresser un courrier à l’adresse : 5 Rue Pleyel 93200 SAINT DENIS."
        }
      ]
    },
    {
      id: 19,
      title: "19. Droit Applicable et Juridiction",
      content: [
        {
          subtitle: "19.1.",
          text: "Les présentes CGV sont régies par la loi française interne."
        },
        {
          subtitle: "19.2.",
          text: "Toute contestation qui n’aurait pas été réglée à l’amiable sera portée devant les tribunaux de Paris compétents selon les règles de droit commun."
        }
      ]
    }
  ]
}


  
  return (
    <div className='relative'>
      <div className="relative h-80 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=600&fit=crop"
          alt="Conditions Générales d'Utilisation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/85"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CONDITIONS GÉNÉRALES D'UTILISATION DE THDS
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          
          <div className="mb-12 bg-purple-50 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              Nous vous remercions de votre inscription à un parcours de formation chez THDS (ci-après la "Plateforme").
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              L'utilisation de la plateforme est soumise aux présentes conditions générales d'utilisation (ci-après les "CGU") et ce, même si vous ne procédez pas à la création d'un compte Utilisateur.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Il est donc particulièrement conseillé de lire attentivement l'ensemble de ce qui suit. Les stipulations des CGU sont en effet opposables à tout utilisateur (ci-après un "Utilisateur" ou "Vous") de la plateforme, du simple fait de la connexion à cette dernière. Si Vous n'acceptez pas ces CGU, veuillez ne pas utiliser la plateforme.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Si vous naviguez sur le Site sans créer de compte pour vous inscrire, vous reconnaissez avoir pris connaissance et accepter l'intégralité des présentes CGU ainsi que de notre Charte de protection des données personnelles.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Mentions Légales</h2>
            <div className="bg-white border-l-4 border-purple-600 p-6 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-3">
                La plateforme est utilisée par <span className="font-semibold">THDS</span>, enregistrée en SASU sous le numéro <span className="font-semibold">832 774 087 00023</span> au RCS du greffe de Tribunal de commerce d'Evry, et dont le siège social est situé au <span className="font-semibold">5 Rue Pleyel 93200 SAINT DENIS</span>.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                La dénomination commerciale est THDS et son numéro de déclaration d'activité est <span className="font-semibold">11931056093</span>.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Téléphone :</span> 06 09 96 85 95
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email :</span> <a href="mailto:contact@thds.fr" className="text-purple-600 hover:text-purple-800">contact@thds.fr</a>
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Présentation du Site</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                La plateforme a été imaginée, conçue et développée dans le but de proposer une offre de formation professionnelle de qualité, à travers des modules et des parcours créés par des experts pour chaque thématique.
              </p>
              <p>
                L'offre se compose de parcours 100% créés et dont l'ensemble de la propriété appartient à THDS.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Validation des CGU</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Les présentes CGU sont validées au moment de votre achat. Elles peuvent être consultées à tout moment dans l'onglet "Conditions Générales d'Utilisation" du Site.
              </p>
              <p>
                THDS se réserve le droit de modifier à tout moment les présentes CGU, sous réserve d'en informer préalablement les Utilisateurs. La poursuite de la navigation sur le Site après la publication des CGU modifiées implique l'adhésion pleine et entière aux nouvelles CGU. Si Vous n'acceptez pas les CGU modifiées, alors vous n'êtes plus autorisés à naviguer ou à utiliser la plateforme.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Conditions d'Utilisation de la Plateforme</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-900">
                Tout Utilisateur de la plateforme doit être un individu majeur.
              </p>
              <p>
                L'utilisation de la plateforme est conditionnée au respect scrupuleux des présentes CGU, ainsi que les lois et règlements applicables.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Propriété Intellectuelle</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                La plateforme est protégée par le droit d'auteur, en France et dans le monde entier selon les conventions internationales relatives au droit d'auteur.
              </p>
              <p>
                Tout le contenu présent ou rendu disponible à travers la plateforme, tels que les textes, les cours, les graphiques, les logos, les boutons, les images, et toutes données, est la propriété de THDS, ou de ses sous-traitants.
              </p>
              <p className="font-semibold text-gray-900">
                Les Utilisateurs ne doivent pas extraire et/ou réutiliser tout ou partie du contenu du Site sans l'autorisation expresse et écrite de THDS.
              </p>
              <p>
                En particulier, il est interdit d'utiliser un robot d'aspiration de données, ou tout autre outil similaire de collecte ou d'extraction de données pour extraire (en une ou plusieurs fois), pour réutiliser une partie substantielle d'un quelconque élément de la plateforme, sans accord express et écrit de THDS. Les Utilisateurs ne peuvent pas non plus créer et/ou publier leurs propres bases de données qui comporteraient des parties substantielles du contenu de la plateforme sans accord express et écrit de THDS.
              </p>
              <p>
                Sous réserve des droits prévus lors de l'inscription et de la création d'un compte utilisateur ainsi que prévu aux conditions générales de services (ci-après « CGS ») figurant au II des présentes, tous les droits sur la plateforme et son contenu appartiennent à THDS ou ses prestataires, et l'utilisateur ne peut en faire une quelconque exploitation.
              </p>
              <p>
                La navigation sur la plateforme doit, en toutes circonstances, respecter les droits de THDS et les droits des tiers, en particulier en matière de propriété intellectuelle.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Conditions Générales de Services</h2>
            
            <h3 className="text-2xl font-semibold text-purple-800 mb-4 mt-8">Restrictions d'Usage – Propriété Intellectuelle</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                L'utilisation de la plateforme doit être conforme aux lois et aux règlements applicables, quel que soit le pays dans lequel l'Utilisateur se situe. Il est interdit de faire un usage de la plateforme qui se révélerait contraire aux lois et aux règlements, notamment aux règles applicables en matière de propriété intellectuelle (droit d'auteur, droit des marques, droit des dessins et modèles).
              </p>
              <p>
                Par conséquent, l'Utilisateur s'interdit irrévocablement tout usage de la plateforme qui serait susceptible de porter atteinte aux droits légitimes des tiers. De même, l'Utilisateur s'interdit tout usage du Site qui serait susceptible de porter atteinte aux droits de THDS ou qui serait susceptible de causer un dommage à THDS.
              </p>
              <p>
                L'Utilisateur s'interdit tout usage de la plateforme qui serait de nature à porter atteinte à l'intégrité de l'infrastructure technique de THDS, notamment ses serveurs informatiques.
              </p>
              <p className="font-semibold text-gray-900">
                Dès lors, l'Utilisateur ne peut pas reproduire sur tout support et à quelques fins que ce soit, tout ou partie du contenu de la plateforme et plus particulièrement, des cours et/ou formations dispensés par les intervenants.
              </p>
              <p className="text-red-700 font-semibold">
                THDS engagera la responsabilité civile et/ou pénale de tout Utilisateur qui contreviendrait aux dispositions des présentes.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Garantie et Responsabilité de THDS</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                THDS s'attelle à mettre la plateforme à la disposition des Utilisateurs en l'état, sans aucune reconnaissance de responsabilité quelle qu'elle soit.
              </p>
              <p>
                Dans la mesure autorisée par la loi et sous les réserves ci-après, THDS ne voit peser sur elle aucune obligation de garantie que ce soit en ce qui concerne la plateforme, en particulier aucune garantie de bon fonctionnement ni l'absence d'erreurs ou de bugs, pas plus qu'une garantie d'adaptation à un usage particulier. THDS ne voit peser sur elle aucune obligation de mettre la plateforme à jour et/ou corriger le contenu du Site en cas d'apparition d'un dysfonctionnement, que THDS ait été informée dudit fonctionnement ou non.
              </p>
              <p>
                THDS ne saurait en aucun cas être tenue de réparer d'éventuels dommages directs ou indirects subis à l'occasion de l'utilisation de la plateforme.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Protection des Données à Caractère Personnel – Confidentialité</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                THDS place au rang de ses priorités la protection des données à caractère personnel des Utilisateurs. THDS a mis en œuvre des mesures techniques adaptées, permettant de s'assurer de la confidentialité des données fournies par un Utilisateur.
              </p>
              <p>
                Ces données ne seront jamais transmises à des tiers, en particulier à des fins promotionnelles ou publicitaires. En revanche, ces données pourront, le cas échéant, être transmises aux autorités judiciaires dans l'hypothèse où THDS serait contrainte de le faire. Dans ce cas, cette transmission sera effectuée de manière confidentielle par THDS.
              </p>
              <p>
                Pour préserver la confidentialité des données à caractère personnel, chaque Utilisateur devra s'assurer de ne pas transmettre ces informations à un tiers.
              </p>
              <p>
                Pour plus d'informations concernant la manière dont vos données à caractère personnel sont collectées et utilisées par THDS, l'Utilisateur doit se reporter à la Charte de Protection des données personnelles qu'il a validée au moment de son inscription et qui reste disponible dans l'onglet "Politique de protection des données personnelles" du Site.
              </p>
            </div>
          </section>

          <section className="">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Contact</h2>
            <div className="bg-purple-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                Tout Utilisateur est invité à faire part de ses commentaires sur le Site en envoyant un message à l'adresse suivante :
              </p>
              <div className="text-center">
                <a href="mailto:contact@thds.fr" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  contact@thds.fr
                </a>
              </div>
              <div className="mt-6 text-center text-gray-600">
                <p>Ou par téléphone au :</p>
                <p className="font-semibold text-purple-900 text-lg mt-1">06 09 96 85 95</p>
              </div>
            </div>
          </section>

        </div>
      </div>
       <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {cgvData.sections.map((section) => (
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