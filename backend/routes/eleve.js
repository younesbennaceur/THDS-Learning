import express from 'express';
import transporter from '../config/mailer.js';

const router = express.Router();

// ============================================================
// ROUTE 1 : ANALYSE DES BESOINS
// ============================================================
router.post('/analyse-besoins', async (req, res) => {
  try {
    const data = req.body;
    // ... préparation des variables ...
    const raisons = data.raisonsFormation?.join(', ') || 'Non précisé';
    const attentes = data.attentesPrioritaires?.join(', ') || 'Non précisé';
    const criteres = data.criteresImportants?.join(', ') || 'Non précisé';
    const connaissances = data.besoinConnaissances?.join(', ') || 'Non précisé';
    const financements = data.priseEnCharge?.join(', ') || 'Non précisé';

    // 1. HTML POUR L'ADMIN (Récapitulatif)
    const adminMailContent = `
      <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #3b0764; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">Nouveau Dossier Élève</h2>
          <p style="margin: 5px 0 0 0; font-size: 14px;">Fiche Analyse des Besoins</p>
        </div>
        <div style="padding: 20px;">
          <h3 style="color: #6b21a8; border-bottom: 2px solid #f3e8ff; padding-bottom: 5px;">👤 1. Informations de Contact</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Nom complet :</strong> ${data.civilite} ${data.prenom} ${data.nom}</li>
            <li><strong>Email :</strong> <a href="mailto:${data.email}" style="color: #3b0764;">${data.email}</a></li>
            <li><strong>Téléphone :</strong> ${data.telephone}</li>
            <li><strong>Date Entretien :</strong> ${data.dateEntretien}</li>
          </ul>
          <h3 style="color: #6b21a8; border-bottom: 2px solid #f3e8ff; padding-bottom: 5px; margin-top: 25px;">🎯 2. Projet & Attentes</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>Formation visée :</strong><br>${data.formationVisee}</li>
            <li style="margin-bottom: 10px;"><strong>Raisons :</strong><br>${raisons}</li>
            <li style="margin-bottom: 10px;"><strong>Attentes prioritaires :</strong><br>${attentes}</li>
            <li style="margin-bottom: 10px;"><strong>Critères importants :</strong><br>${criteres}</li>
            <li style="margin-bottom: 10px;"><strong>Adéquation objectifs :</strong> ${data.objectifsRepondent}</li>
            <li style="margin-bottom: 10px;"><strong>Besoin de connaissances :</strong><br>${connaissances}</li>
            ${data.commentairesAttentes ? `<li style="margin-top: 10px; background: #f8fafc; padding: 10px; border-left: 3px solid #6b21a8;"><em>" ${data.commentairesAttentes} "</em></li>` : ''}
          </ul>
          <h3 style="color: #6b21a8; border-bottom: 2px solid #f3e8ff; padding-bottom: 5px; margin-top: 25px;">⚙️ 3. Analyse & Logistique</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Déjà formé sur ce thème ? :</strong> ${data.dejaParticipe}</li>
            <li style="margin-top: 10px;"><strong>Situation d'origine :</strong><br>${data.situationOrigine || 'Non renseigné'}</li>
            <li style="margin-top: 10px;"><strong>Modalités / Contraintes :</strong><br>${data.modalitesContraintes || 'Non renseigné'}</li>
            <li style="margin-top: 10px;"><strong>Financement :</strong><br>${financements}</li>
            <li><strong>Lieu :</strong> ${data.lieuRealisation}</li>
            <li><strong>Date démarrage :</strong> ${data.dateDemarrage}</li>
            ${data.remarquesFinales ? `<li style="margin-top: 15px;"><strong>Remarques :</strong><br><em>${data.remarquesFinales}</em></li>` : ''}
          </ul>
          ${data.handicap === 'Oui' ? `<div style="background-color: #fef2f2; padding: 15px; margin-top: 20px;"><strong style="color: #b91c1c;">⚠️ Handicap :</strong> ${data.contraintesHandicap}</div>` : ''}
        </div>
      </div>
    `;

    // 2. HTML POUR LE CLIENT (Remerciement)
    const clientMailContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #4c1d95; padding: 20px; text-align: center;">
          <h2 style="color: white; margin: 0;">Merci, ${data.prenom} !</h2>
        </div>
        <div style="padding: 20px;">
          <p>Bonjour <strong>${data.civilite} ${data.nom}</strong>,</p>
          <p>Nous avons bien reçu votre fiche d'analyse des besoins pour la formation :</p>
          <p style="background-color: #f3f4f6; padding: 10px; border-radius: 5px; text-align: center;"><strong>${data.formationVisee}</strong></p>
          <p>Nos équipes vont étudier votre dossier. Nous reviendrons vers vous très rapidement pour la suite.</p>
          <br>
          <p>Cordialement,</p>
          <p><strong>L'équipe THDS / THDS FORMATION</strong></p>
        </div>
      </div>
    `;

    // --- ENVOI DES DEUX EMAILS ---
    
    // A) Envoi à l'Admin
    await transporter.sendMail({
      from: `"Site Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      replyTo: data.email, 
      subject: `Analyse Besoins : ${data.nom} ${data.prenom}`,
      html: adminMailContent,
    });

    // B) Envoi au Client (C'est ça qui manquait !)
    await transporter.sendMail({
      from: `"THDS FORMATION" <${process.env.EMAIL_USER}>`,
      to: data.email, // <--- Envoi au client
      subject: `Confirmation de réception de votre dossier`,
      html: clientMailContent,
    });

    console.log(`📩 Double email envoyé (Admin + Client ${data.email})`);
    res.status(200).json({ message: 'Dossier transmis avec succès !' });

  } catch (error) {
    console.error('❌ Erreur envoi email :', error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email." });
  }
});


// ============================================================
// ROUTE 2 : ENQUÊTE DE SATISFACTION
// ============================================================
router.post('/satisfaction-chaud', async (req, res) => {
  try {
    const data = req.body;

    // Transformation des listes (tableaux) en chaînes lisibles
    const raisons = data.raisonsParticipation?.join(', ') || 'Non précisé';

    // 1. HTML POUR L'ADMIN (Récapitulatif complet)
    const adminMailContent = `
      <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 700px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <div style="background: linear-gradient(135deg, #4c1d95, #1e1b4b); color: white; padding: 25px; text-align: center;">
          <h2 style="margin: 0; font-size: 22px;">Nouvelle Enquête de Satisfaction</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.8;">Bilan à chaud - Fin de formation</p>
        </div>

        <div style="padding: 30px;">
          
          <h3 style="color: #4c1d95; border-bottom: 2px solid #f3e8ff; padding-bottom: 5px;">👤 Informations Stagiaire</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 5px 0;"><strong>Nom :</strong> ${data.civilite} ${data.prenom} ${data.nom}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Entreprise :</strong> ${data.nomEntreprise || 'N/A'} (${data.fonction || 'N/A'})</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Contact :</strong> ${data.email} | ${data.telephone}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Formation :</strong> ${data.intituleFormation}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Période :</strong> Du ${data.dateDebut} au ${data.dateFin}</td></tr>
          </table>

          <h3 style="color: #4c1d95; border-bottom: 2px solid #f3e8ff; padding-bottom: 5px; margin-top: 25px;">🎯 Raisons & Niveau</h3>
          <p><strong>Raisons de participation :</strong> ${raisons}</p>
          <p><strong>Niveau de la formation :</strong> ${data.niveauFormation}</p>
          <p><strong>Langage du formateur :</strong> ${data.langageFormateur}</p>

          <h3 style="color: #4c1d95; border-bottom: 2px solid #f3e8ff; padding-bottom: 5px; margin-top: 25px;">🚩 Objectifs Pédagogiques</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Objectifs définis au début :</strong> ${data.objectifsDefinis}</li>
            <li><strong>Objectifs atteints :</strong> ${data.objectifsAtteints}</li>
            <li><strong>Lacunes comblées :</strong> ${data.lacunesComblees}</li>
            <li><strong>Objectifs personnels atteints :</strong> ${data.objectifsPersonnelsAtteints}</li>
            <li><strong>Équilibre Théorie/Pratique :</strong> ${data.equilibreTheoriePratique}</li>
          </ul>

          <h3 style="color: #4c1d95; border-bottom: 2px solid #f3e8ff; padding-bottom: 5px; margin-top: 25px;">📊 Satisfaction Détaillée</h3>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px;">
            <table style="width: 100%; font-size: 14px;">
              <tr><td style="padding: 4px 0;">Accueil :</td><td style="text-align: right;"><strong>${data.accueil}</strong></td></tr>
              <tr><td style="padding: 4px 0;">Méthodes :</td><td style="text-align: right;"><strong>${data.methodes}</strong></td></tr>
              <tr><td style="padding: 4px 0;">Rythme :</td><td style="text-align: right;"><strong>${data.rythme}</strong></td></tr>
              <tr><td style="padding: 4px 0;">Moyens pédagogiques :</td><td style="text-align: right;"><strong>${data.moyensPedagogiques}</strong></td></tr>
              <tr><td style="padding: 4px 0;">Animation :</td><td style="text-align: right;"><strong>${data.animation}</strong></td></tr>
              <tr><td style="padding: 4px 0;">Organisation matérielle :</td><td style="text-align: right;"><strong>${data.organisationMaterielle}</strong></td></tr>
              <tr><td style="padding: 4px 0;">Échanges groupe :</td><td style="text-align: right;"><strong>${data.echangesGroupe}</strong></td></tr>
              <tr><td style="padding: 4px 0;">Aide reçue :</td><td style="text-align: right;"><strong>${data.aideRecue}</strong></td></tr>
              <tr><td style="padding: 4px 0;">Disponibilité formateur :</td><td style="text-align: right;"><strong>${data.disponibiliteFormateur}</strong></td></tr>
            </table>
          </div>

          <h3 style="color: #4c1d95; border-bottom: 2px solid #f3e8ff; padding-bottom: 5px; margin-top: 25px;">⭐ Bilan Global</h3>
          <p style="font-size: 16px;">Satisfaction générale : <strong style="color: #10b981;">${data.globalSatisfaction}</strong></p>
          <p>Recommandation : <strong>${data.recommandation}</strong></p>

          <h3 style="color: #4c1d95; border-bottom: 2px solid #f3e8ff; padding-bottom: 5px; margin-top: 25px;">📝 Commentaires</h3>
          <p><strong>Partie la plus utile :</strong><br>${data.partieUtile || 'N/A'}</p>
          <p><strong>Moins indispensable :</strong><br>${data.partieMoinsUtile || 'N/A'}</p>
          <p><strong>À développer :</strong><br>${data.partieADevelopper || 'N/A'}</p>
          <p><strong>Autre commentaire :</strong><br>${data.autreCommentaire || 'N/A'}</p>

        </div>
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
          Ceci est un message automatique envoyé depuis le formulaire de satisfaction THDS.
        </div>
      </div>
    `;

    // 2. HTML POUR LE CLIENT (Remerciement)
    const clientMailContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #4c1d95; padding: 20px; text-align: center;">
          <h2 style="color: white; margin: 0;">Merci pour votre retour !</h2>
        </div>
        <div style="padding: 20px;">
          <p>Bonjour <strong>${data.prenom}</strong>,</p>
          <p>Nous vous remercions sincèrement d'avoir pris le temps de répondre à notre enquête de satisfaction concernant votre formation :</p>
          <p style="text-align: center; font-weight: bold; background: #f3f4f6; padding: 10px; border-radius: 5px;">${data.intituleFormation}</p>
          <p>Vos réponses nous sont précieuses pour maintenir la qualité de nos formations et répondre au mieux à vos attentes.</p>
          <br>
          <p>Excellente continuation professionnelle,</p>
          <p><strong>L'équipe Qualité THDS</strong></p>
        </div>
      </div>
    `;

    // --- ENVOI DES EMAILS ---

    // A) Envoi à l'Admin
    await transporter.sendMail({
      from: `"Plateforme Qualité" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      replyTo: data.email, 
      subject: `Enquête Satisfaction (À Chaud) : ${data.nom} ${data.prenom}`,
      html: adminMailContent,
    });

    // B) Envoi au Client
    await transporter.sendMail({
      from: `"THDS FORMATION" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `Confirmation de réception de votre avis`,
      html: clientMailContent,
    });

    console.log(`📩 Double email envoyé (Admin + Client ${data.email})`);
    res.status(200).json({ message: 'Enquête transmise avec succès !' });

  } catch (error) {
    console.error('❌ Erreur envoi enquête :', error);
    res.status(500).json({ message: "Erreur lors du traitement de l'enquête." });
  }
});
// ============================================================
// ROUTE 3 : ENQUÊTE À FROID (1 MOIS APRÈS)
// ============================================================
router.post('/satisfaction-froid', async (req, res) => {
  try {
    const data = req.body;

    // 1. HTML POUR L'ADMIN (Rapport d'impact à 1 mois)
    const adminMailContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; max-width: 700px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
        
        <div style="background: linear-gradient(135deg, #0ea5e9, #0369a1); color: white; padding: 30px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px; letter-spacing: 1px;">ENQUÊTE À FROID (J+30)</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px; text-transform: uppercase;">Évaluation de l'impact des acquis</p>
        </div>

        <div style="padding: 30px; background-color: #ffffff;">
          
          <h3 style="color: #0369a1; border-bottom: 2px solid #e0f2fe; padding-bottom: 8px; margin-bottom: 15px;">👤 Participant & Session</h3>
          <table style="width: 100%; margin-bottom: 25px;">
            <tr><td style="padding: 4px 0;"><strong>Stagiaire :</strong> ${data.prenom} ${data.nom}</td></tr>
            <tr><td style="padding: 4px 0;"><strong>Email :</strong> <a href="mailto:${data.email}" style="color: #0ea5e9;">${data.email}</a></td></tr>
            <tr><td style="padding: 4px 0;"><strong>Formation :</strong> ${data.intituleFormation}</td></tr>
            <tr><td style="padding: 4px 0;"><strong>Formateur :</strong> ${data.nomFormateur || 'Non précisé'}</td></tr>
            <tr><td style="padding: 4px 0;"><strong>Dates :</strong> Du ${data.dateDebut} au ${data.dateFin}</td></tr>
          </table>

          <h3 style="color: #0369a1; border-bottom: 2px solid #e0f2fe; padding-bottom: 8px; margin-top: 30px;">📉 Retour sur l'application des acquis</h3>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 10px; border: 1px solid #f1f5f9;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0;">Réponse aux besoins :</td>
                <td style="text-align: right; color: #0369a1;"><strong>${data.reponseBesoins}</strong></td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0;">Application des acquis :</td>
                <td style="text-align: right;"><strong>${data.applicationAcquis}</strong></td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0;">Difficultés rencontrées :</td>
                <td style="text-align: right;"><strong>${data.difficultesMiseEnOeuvre}</strong></td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0;">Amélioration professionnelle :</td>
                <td style="text-align: right; color: #0369a1;"><strong>${data.amelioration}</strong></td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0;">Respect attentes initiales :</td>
                <td style="text-align: right; color: #0369a1;"><strong>${data.attentesInitiales}</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px 0;">Objectifs pédagogiques atteints :</td>
                <td style="text-align: right; color: #0369a1;"><strong>${data.objectifsAtteints}</strong></td>
              </tr>
            </table>
          </div>

          <h3 style="color: #0369a1; border-bottom: 2px solid #e0f2fe; padding-bottom: 8px; margin-top: 30px;">⭐ Avis Général & Fidélité</h3>
          <div style="display: flex; gap: 20px; margin-top: 15px;">
            <div style="flex: 1; background: #f0f9ff; padding: 15px; border-radius: 8px; text-align: center;">
              <span style="font-size: 12px; color: #64748b; text-transform: uppercase;">Note Globale</span><br>
              <strong style="font-size: 16px; color: #0369a1;">${data.avisGlobal}</strong>
            </div>
            <div style="flex: 1; background: #f0f9ff; padding: 15px; border-radius: 8px; text-align: center;">
              <span style="font-size: 12px; color: #64748b; text-transform: uppercase;">Recommandation</span><br>
              <strong style="font-size: 16px; color: #0369a1;">${data.recommandation}</strong>
            </div>
          </div>

          <h3 style="color: #0369a1; border-bottom: 2px solid #e0f2fe; padding-bottom: 8px; margin-top: 30px;">💬 Remarques libres</h3>
          <div style="background: #fdfdfd; padding: 15px; border: 1px dashed #cbd5e1; border-radius: 8px; font-style: italic; color: #475569;">
            ${data.commentaires ? `"${data.commentaires}"` : "Aucun commentaire supplémentaire laissé."}
          </div>

        </div>
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9;">
          Document généré par la plateforme de suivi THDS FORMATION.
        </div>
      </div>
    `;

    // 2. HTML POUR LE CLIENT (Remerciement différé)
    const clientMailContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0f2fe; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0ea5e9; padding: 25px; text-align: center;">
          <h2 style="color: white; margin: 0;">Un mois après... merci !</h2>
        </div>
        <div style="padding: 25px;">
          <p>Bonjour <strong>${data.prenom}</strong>,</p>
          <p>Nous vous remercions d'avoir pris quelques minutes pour répondre à notre enquête de satisfaction à froid concernant la formation :</p>
          <p style="text-align: center; font-weight: bold; background: #f0f9ff; padding: 12px; border-radius: 6px; color: #0369a1; border: 1px solid #bae6fd;">
            ${data.intituleFormation}
          </p>
          <p>Votre retour d'expérience avec un mois de recul est crucial pour nous. Il nous permet de mesurer l'efficacité réelle de nos programmes sur votre quotidien professionnel.</p>
          <p>Nous restons à votre entière disposition pour vos futurs besoins de montée en compétences.</p>
          <br>
          <p>Bien cordialement,</p>
          <p><strong>Le Responsable Pédagogique THDS</strong></p>
        </div>
        <div style="background: #f8fafc; padding: 15px; text-align: center; font-size: 11px; color: #94a3b8;">
          THDS - 5 RUE PLEYEL 93200 SAINT-DENIS
        </div>
      </div>
    `;

    // --- ENVOI DES EMAILS ---

    // A) Envoi à l'Admin
    await transporter.sendMail({
      from: `"Suivi Long Terme" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      replyTo: data.email, 
      subject: `Enquête J+30 : ${data.nom.toUpperCase()} ${data.prenom}`,
      html: adminMailContent,
    });

    // B) Envoi au Client
    await transporter.sendMail({
      from: `"THDS FORMATION" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `Merci pour votre retour d'expérience`,
      html: clientMailContent,
    });

    console.log(`📩 [SUIVI FROID] Email envoyé pour ${data.prenom} ${data.nom}`);
    res.status(200).json({ message: 'Rapport à froid transmis avec succès !' });

  } catch (error) {
    console.error('❌ Erreur envoi enquête à froid :', error);
    res.status(500).json({ message: "Erreur lors de la soumission de l'enquête." });
  }
});


export default router;