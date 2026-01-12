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
          <p style="margin: 5px 0 0 0; font-size: 14px;">Fiche Analyse des Besoins (Visio / E-Learning)</p>
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
    const raisonsPart = data.raisonsParticipation?.join(', ') || 'Non précisé';

    // 1. HTML ADMIN
    const adminMailContent = `
      <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #059669, #047857); color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">Enquête Satisfaction (À Chaud)</h2>
        </div>
        <div style="padding: 20px;">
          <h3>👤 Stagiaire</h3>
          <p>${data.civilite} ${data.prenom} ${data.nom} (${data.nomEntreprise})</p>
          <p>Formation : <strong>${data.intituleFormation}</strong></p>
          
          <h3>📊 Résultats</h3>
          <p>Niveau : <strong>${data.niveauFormation}</strong></p>
          <p>Note Globale : <strong style="color: #059669; font-size: 1.2em;">${data.globalSatisfaction}</strong></p>
          <p>Recommandation : ${data.recommandation}</p>
          
          <h3>📝 Commentaires</h3>
          <p>Utile : ${data.partieUtile || '-'}</p>
          <p>À développer : ${data.partieADevelopper || '-'}</p>
        </div>
      </div>
    `;

    // 2. HTML CLIENT (Remerciement)
    const clientMailContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #059669; padding: 20px; text-align: center;">
          <h2 style="color: white; margin: 0;">Merci pour votre avis !</h2>
        </div>
        <div style="padding: 20px;">
          <p>Bonjour <strong>${data.prenom}</strong>,</p>
          <p>Nous vous remercions d'avoir pris le temps de répondre à notre enquête de satisfaction concernant la formation :</p>
          <p style="text-align: center; font-weight: bold;">${data.intituleFormation}</p>
          <p>Votre avis est précieux et nous aide à améliorer continuellement nos services.</p>
          <br>
          <p>Excellente continuation,</p>
          <p><strong>L'équipe Qualité</strong></p>
        </div>
      </div>
    `;

    // --- ENVOI DES DEUX EMAILS ---

    // A) Admin
    await transporter.sendMail({
      from: `"Enquête Qualité" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      replyTo: data.email, 
      subject: `Enquête Satisfaction : ${data.nom} ${data.prenom}`,
      html: adminMailContent,
    });

    // B) Client (Ajouté ici aussi)
    await transporter.sendMail({
      from: `"THDS FORMATION" <${process.env.EMAIL_USER}>`,
      to: data.email, // <--- Envoi au client
      subject: `Nous avons bien reçu votre avis`,
      html: clientMailContent,
    });

    console.log(`📩 Double email envoyé (Admin + Client ${data.email})`);
    res.status(200).json({ message: 'Enquête reçue avec succès !' });

  } catch (error) {
    console.error('❌ Erreur envoi email :', error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'enquête." });
  }
});
// ============================================================
// ROUTE 3 : ENQUÊTE À FROID (1 MOIS APRÈS)
// ============================================================
router.post('/satisfaction-froid', async (req, res) => {
  try {
    const data = req.body;

    // 1. HTML ADMIN (Thème Bleu "Froid")
    const adminMailContent = `
      <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        
        <div style="background: linear-gradient(135deg, #0ea5e9, #0369a1); color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">Enquête Satisfaction (À Froid)</h2>
          <p style="margin: 5px 0 0 0; font-size: 14px;">1 mois après la formation</p>
        </div>

        <div style="padding: 20px;">
          
          <h3 style="color: #0369a1; border-bottom: 2px solid #e0f2fe; padding-bottom: 5px;">👤 Participant & Formation</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Nom :</strong> ${data.prenom} ${data.nom}</li>
            <li><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></li>
            <li style="margin-top:10px;"><strong>Formation :</strong> ${data.intituleFormation}</li>
            <li><strong>Formateur :</strong> ${data.nomFormateur || 'Non précisé'}</li>
            <li><strong>Dates :</strong> Du ${data.dateDebut} au ${data.dateFin}</li>
          </ul>

          <h3 style="color: #0369a1; border-bottom: 2px solid #e0f2fe; padding-bottom: 5px; margin-top:25px;">📉 Retour sur la formation</h3>
          <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
            <tr style="background:#f9fafb;"><td style="padding:5px;">Réponse aux besoins :</td><td><strong>${data.reponseBesoins}</strong></td></tr>
            <tr><td style="padding:5px;">Application des acquis :</td><td><strong>${data.applicationAcquis}</strong></td></tr>
            <tr style="background:#f9fafb;"><td style="padding:5px;">Difficultés rencontrées :</td><td><strong>${data.difficultesMiseEnOeuvre}</strong></td></tr>
            <tr><td style="padding:5px;">Amélioration pro. :</td><td><strong>${data.amelioration}</strong></td></tr>
            <tr style="background:#f9fafb;"><td style="padding:5px;">Attentes initiales :</td><td><strong>${data.attentesInitiales}</strong></td></tr>
            <tr><td style="padding:5px;">Objectifs atteints :</td><td><strong>${data.objectifsAtteints}</strong></td></tr>
          </table>

          <h3 style="color: #0369a1; border-bottom: 2px solid #e0f2fe; padding-bottom: 5px; margin-top:25px;">🏆 Avis Général</h3>
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; text-align: center;">
            <p style="margin:0; font-size: 16px;">Note Globale : <strong style="color: #0284c7;">${data.avisGlobal}</strong></p>
            <p style="margin:5px 0 0 0;">Recommandation : <strong>${data.recommandation}</strong></p>
          </div>

          ${data.commentaires ? `
            <h3 style="color: #0369a1; border-bottom: 2px solid #e0f2fe; padding-bottom: 5px; margin-top:25px;">📝 Commentaires</h3>
            <p style="background: #f8fafc; padding: 10px; font-style: italic;">"${data.commentaires}"</p>
          ` : ''}

        </div>
        <div style="background-color: #f0f9ff; padding: 15px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #bae6fd;">
          Enquête à froid reçue via le site web THDS.
        </div>
      </div>
    `;

    // 2. HTML CLIENT (Remerciement simple)
    const clientMailContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0284c7; padding: 20px; text-align: center;">
          <h2 style="color: white; margin: 0;">Merci pour votre retour !</h2>
        </div>
        <div style="padding: 20px;">
          <p>Bonjour <strong>${data.prenom}</strong>,</p>
          <p>Nous vous remercions d'avoir pris le temps de répondre à notre enquête à froid concernant la formation <strong>${data.intituleFormation}</strong>.</p>
          <p>Ce retour d'expérience à distance est essentiel pour nous permettre d'ajuster nos programmes sur le long terme.</p>
          <br>
          <p>Bien cordialement,</p>
          <p><strong>L'équipe Qualité</strong></p>
        </div>
      </div>
    `;

    // --- ENVOI EMAILS ---
    await transporter.sendMail({
      from: `"Suivi Qualité" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      replyTo: data.email,
      subject: `Enquête à Froid : ${data.nom} ${data.prenom}`,
      html: adminMailContent,
    });

    await transporter.sendMail({
      from: `"THDS FORMATION" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `Merci pour votre retour d'expérience`,
      html: clientMailContent,
    });

    console.log(`📩 [FROID] Email envoyé pour ${data.prenom} ${data.nom}`);
    res.status(200).json({ message: 'Enquête à froid reçue !' });

  } catch (error) {
    console.error('❌ Erreur envoi email :', error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});


export default router;