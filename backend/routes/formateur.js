import express from 'express';
import multer from 'multer';
import transporter from '../config/mailer.js';
import fs from 'fs'; // Pour supprimer les fichiers après envoi

const router = express.Router();

// Configuration de Multer (Stockage temporaire)
const upload = multer({ dest: 'uploads/' });

// Configuration des champs de fichiers attendus
const cpUpload = upload.fields([
  { name: 'justificatifNDA', maxCount: 1 },
  { name: 'declarationActivite', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
  { name: 'kbis', maxCount: 1 },
  { name: 'pieceIdentite', maxCount: 1 }
]);

router.post('/inscription', cpUpload, async (req, res) => {
  try {
    const data = req.body;
    const files = req.files || {};

    // 1. Préparation des pièces jointes pour l'Admin uniquement
    const attachments = [];
    Object.keys(files).forEach(key => {
      if (files[key] && files[key][0]) {
        attachments.push({
          filename: files[key][0].originalname,
          path: files[key][0].path
        });
      }
    });

    // 2. HTML de l'email pour l'ADMIN (Avec les données techniques)
    const adminMailContent = `
      <div style="font-family: Arial, sans-serif; color: #1e293b;">
        <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">Nouvelle Candidature Formateur</h2>
        </div>
        <div style="padding: 20px;">
          <h3>👤 1. État Civil</h3>
          <p><strong>${data.civilite} ${data.prenom} ${data.nom}</strong> (${data.qualite})</p>
          <p>Adresse : ${data.adresse} ${data.adresse2 || ''}, ${data.codePostal} ${data.ville}</p>
          <p>Email : <a href="mailto:${data.email}">${data.email}</a></p>
          <p>Téléphone : ${data.telephone}</p>
          <p>Site/Réseaux : ${data.siteWeb || '-'} | ${data.linkedin || '-'} | ${data.facebook || '-'}</p>

          <h3>🎓 2. Expertise</h3>
          <p><strong>Domaine :</strong> ${data.domaineExpertise}</p>
          <p><strong>Expérience :</strong> ${data.anneesExperience}</p>
          <p><strong>Veille Info :</strong> ${data.veilleInfo} (${data.methodeVeille || 'Aucune'})</p>

          <h3>💼 3. Administratif</h3>
          <p><strong>Tarif Horaire :</strong> ${data.tarifHoraire}€</p>
          <p><strong>Assujetti TVA :</strong> ${data.tva}</p>
          
          <p style="margin-top:20px;"><em>Les justificatifs sont en pièces jointes de cet email.</em></p>
        </div>
      </div>
    `;

    // 3. HTML de l'email pour le CANDIDAT (Remerciement)
    const clientMailContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1e40af; padding: 20px; text-align: center;">
          <h2 style="color: white; margin: 0;">Candidature Reçue</h2>
        </div>
        <div style="padding: 20px;">
          <p>Bonjour <strong>${data.prenom} ${data.nom}</strong>,</p>
          <p>Nous accusons réception de votre dossier de candidature pour rejoindre notre réseau de formateurs.</p>
          <p>Vos documents et informations ont bien été transmis à notre service RH.</p>
          <p>Nous étudierons votre profil avec attention et reviendrons vers vous dans les plus brefs délais.</p>
          <br>
          <p>Cordialement,</p>
          <p><strong>L'équipe THDS Formation</strong></p>
        </div>
        <div style="background-color: #f3f4f6; padding: 10px; text-align: center; font-size: 12px; color: #666;">
          Ceci est un message automatique.
        </div>
      </div>
    `;

    // --- ENVOI DES DEUX EMAILS ---

    // A) Envoi à l'Admin (Avec pièces jointes)
    await transporter.sendMail({
      from: `"Candidature Formateur" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      replyTo: data.email, // Permet à l'admin de répondre directement au formateur
      subject: `Nouveau Formateur : ${data.nom} ${data.prenom}`,
      html: adminMailContent,
      attachments: attachments 
    });

    // B) Envoi au Candidat (Sans pièces jointes, juste confirmation)
    await transporter.sendMail({
      from: `"THDS Formation" <${process.env.EMAIL_USER}>`,
      to: data.email, // Envoi à l'adresse saisie dans le formulaire
      subject: `Confirmation de réception de votre candidature`,
      html: clientMailContent
    });

    // 4. Nettoyage (Suppression des fichiers temporaires du serveur)
    // On le fait après les deux envois pour être sûr
    attachments.forEach(file => {
      fs.unlink(file.path, (err) => {
        if (err) console.error("Erreur suppression fichier temp:", err);
      });
    });

    console.log(`📩 Candidature envoyée pour ${data.nom} ${data.prenom} (Admin + Candidat)`);
    res.status(200).json({ message: 'Candidature envoyée avec succès !' });

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi :', error);
    res.status(500).json({ message: 'Erreur serveur lors du traitement de la candidature.' });
  }
});


// ============================================================
// ROUTE : ÉVALUATION ANNUELLE DES COMPÉTENCES
// ============================================================
router.post('/evaluation-competences', upload.none(), async (req, res) => {
  try {
    const data = req.body;

    // 1. HTML ADMIN (Récapitulatif)
    const adminMailContent = `
      <div style="font-family: Arial, sans-serif; color: #1e293b;">
        <div style="background-color: #4c1d95; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">Évaluation Annuelle des Compétences</h2>
          <p style="margin: 5px 0 0 0;">${data.prenom} ${data.nom}</p>
        </div>
        <div style="padding: 20px;">
          
          <h3 style="color: #4c1d95; border-bottom: 2px solid #ddd; padding-bottom: 5px;">1. Bilan 12 derniers mois</h3>
          <p style="background: #f3f4f6; padding: 10px;">${data.actionsPassees}</p>

          <h3 style="color: #4c1d95; border-bottom: 2px solid #ddd; padding-bottom: 5px;">2. Projet 12 prochains mois</h3>
          <p style="background: #f3f4f6; padding: 10px;">${data.actionsFutures}</p>

          <h3 style="color: #4c1d95; border-bottom: 2px solid #ddd; padding-bottom: 5px;">3. Mise à jour compétences</h3>
          <p style="background: #f3f4f6; padding: 10px;">${data.miseAJour}</p>

          <h3 style="color: #4c1d95; border-bottom: 2px solid #ddd; padding-bottom: 5px;">4. Accompagnement THDS Formation</h3>
          <p style="background: #f3f4f6; padding: 10px;">${data.accompagnement}</p>

          <h3 style="color: #4c1d95; border-bottom: 2px solid #ddd; padding-bottom: 5px;">5. Fréquence Veille</h3>
          <p style="background: #f3f4f6; padding: 10px;">${data.frequenceVeille}</p>

          ${data.commentaires ? `
            <h3 style="color: #4c1d95; border-bottom: 2px solid #ddd; padding-bottom: 5px;">6. Commentaires</h3>
            <p style="background: #f3f4f6; padding: 10px;">${data.commentaires}</p>
          ` : ''}
        </div>
      </div>
    `;

    // 2. HTML COLLABORATEUR (Accusé de réception)
    const clientMailContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="background-color: #4c1d95; padding: 20px; text-align: center; color: white;">
          <h2>Bien reçu !</h2>
        </div>
        <div style="padding: 20px;">
          <p>Bonjour <strong>${data.prenom}</strong>,</p>
          <p>Nous avons bien enregistré votre évaluation annuelle des compétences.</p>
          <p>Elle sera étudiée prochainement par l'équipe pédagogique/RH.</p>
          <br>
          <p>Cordialement,</p>
          <p><strong>L'équipe THDS Formation</strong></p>
        </div>
      </div>
    `;

    // Envoi Admin
    await transporter.sendMail({
      from: `"RH Compétences" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      subject: `Évaluation Compétences : ${data.nom} ${data.prenom}`,
      html: adminMailContent,
    });

    // Envoi Collaborateur (si email fourni)
    if (data.email) {
      await transporter.sendMail({
        from: `"THDS Formation" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: `Confirmation de réception - Évaluation annuelle`,
        html: clientMailContent,
      });
    }

    res.status(200).json({ message: 'Évaluation envoyée !' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
// ============================================================
// ROUTE : QUESTIONNAIRE FIN DE FORMATION (FORMATEUR)
// ============================================================
router.post('/fin-formation', async (req, res) => {
  try {
    const data = req.body;

    // 1. HTML POUR L'ADMINISTRATEUR (Rapport exhaustif)
    const adminMailContent = `
      <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 800px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        
        <div style="background-color: #3b0764; color: white; padding: 25px; text-align: center;">
          <h2 style="margin: 0; font-size: 22px; text-transform: uppercase;">Rapport de Fin de Formation</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.8;">Action : ${data.intituleFormation}</p>
        </div>

        <div style="padding: 30px; background-color: #ffffff;">
          
          <h3 style="color: #3b0764; border-bottom: 2px solid #f3e8ff; padding-bottom: 5px;">👤 1. Informations Générales</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 6px 0;"><strong>Formateur :</strong> ${data.prenom} ${data.nom}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 6px 0;"><strong>Période :</strong> Du ${data.dateDebut} au ${data.dateFin}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Modalité :</strong> ${data.typeFormation} (${data.lieuFormation})</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Participants :</strong> ${data.nbPresents} présents / ${data.nbInscrits} inscrits</td></tr>
          </table>

          <h3 style="color: #3b0764; border-bottom: 2px solid #f3e8ff; padding-bottom: 5px; margin-top: 30px;">⚙️ 2. Conditions & Coordination</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 8px;"><strong>Conditions matérielles :</strong> ${data.conditionsMaterielles}</li>
            <li style="margin-bottom: 8px;"><strong>Groupe adapté :</strong> ${data.groupeAdapte}</li>
            <li style="margin-bottom: 8px;"><strong>Coordination THDS :</strong> ${data.coordination}</li>
            <li style="margin-bottom: 8px;"><strong>Salle adaptée :</strong> ${data.salleAdaptee}</li>
            <li style="margin-bottom: 8px;"><strong>Adaptations réalisées :</strong> ${data.adaptations}</li>
          </ul>
          ${data.remarquesEtape2 ? `<div style="background: #f8fafc; padding: 10px; border-radius: 6px; font-style: italic;">Note : ${data.remarquesEtape2}</div>` : ''}

          <h3 style="color: #3b0764; border-bottom: 2px solid #f3e8ff; padding-bottom: 5px; margin-top: 30px;">📚 3. Séquence Pédagogique</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 8px;"><strong>Séquence pédagogique :</strong> ${data.sequencePedagogique}</li>
            <li style="margin-bottom: 8px;"><strong>Animation :</strong> ${data.animation}</li>
            <li style="margin-bottom: 8px;"><strong>Échanges groupe :</strong> ${data.echangesGroupe}</li>
            <li style="margin-bottom: 8px;"><strong>Réponse aux attentes :</strong> ${data.satisfactionAttentes}</li>
          </ul>
          ${data.remarquesEtape3 ? `<div style="background: #f8fafc; padding: 10px; border-radius: 6px; font-style: italic;">Note : ${data.remarquesEtape3}</div>` : ''}

          <h3 style="color: #3b0764; border-bottom: 2px solid #f3e8ff; padding-bottom: 5px; margin-top: 30px;">🏁 4. Bilan Global & Incidents</h3>
          <p><strong>Aisances des stagiaires :</strong> ${data.stagiairesAise}</p>
          <p style="font-size: 16px;"><strong>Note globale formation :</strong> <span style="color: #10b981;">${data.globalFormation}</span></p>
          
          <div style="margin-top: 20px; padding: 15px; border-radius: 8px; background-color: ${data.incident === 'Oui' ? '#fef2f2' : '#f0fdf4'};">
             <p style="margin: 0;"><strong>Incident :</strong> ${data.incident}</p>
             ${data.incident === 'Oui' ? `<p style="margin: 5px 0 0 0; color: #b91c1c;"><strong>Détail :</strong> ${data.incidentDetails}</p>` : ''}
          </div>

          <div style="margin-top: 15px; padding: 15px; border-radius: 8px; background-color: ${data.handicap === 'Oui' ? '#eff6ff' : '#f9fafb'};">
             <p style="margin: 0;"><strong>Situation Handicap :</strong> ${data.handicap}</p>
             ${data.handicap === 'Oui' ? `<p style="margin: 5px 0 0 0; color: #1e40af;"><strong>Actions :</strong> ${data.handicapActions}</p>` : ''}
          </div>

          ${data.remarquesEtape4 ? `
            <h4 style="margin-top: 25px; color: #3b0764;">📝 Remarques finales :</h4>
            <p style="background: #f1f5f9; padding: 15px; border-radius: 8px; font-style: italic;">"${data.remarquesEtape4}"</p>
          ` : ''}

        </div>
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
          Formulaire de bilan formateur - THDS Formation
        </div>
      </div>
    `;

    // 2. HTML POUR LE FORMATEUR (Accusé de réception)
    const clientMailContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #3b0764; padding: 20px; text-align: center; color: white;">
          <h2 style="margin: 0;">Bilan bien reçu</h2>
        </div>
        <div style="padding: 20px;">
          <p>Bonjour <strong>${data.prenom}</strong>,</p>
          <p>Nous vous confirmons la bonne réception de votre bilan de fin de formation pour l'action suivante :</p>
          <p style="text-align: center; font-weight: bold; background: #f3f4f6; padding: 10px; border-radius: 6px;">
            ${data.intituleFormation}
          </p>
          <p>Ces informations sont essentielles pour notre suivi qualité Qualiopi. Merci pour votre professionnalisme et votre contribution.</p>
          <br>
          <p>Cordialement,</p>
          <p><strong>L'équipe THDS Formation</strong></p>
        </div>
      </div>
    `;

    // --- ENVOI DES EMAILS ---

    // A) Envoi à l'Admin
    await transporter.sendMail({
      from: `"Bilan Pédagogique" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      replyTo: data.email, 
      subject: `[BILAN] ${data.intituleFormation} - ${data.nom.toUpperCase()}`,
      html: adminMailContent,
    });

    // B) Envoi au Formateur
    await transporter.sendMail({
      from: `"THDS FORMATION" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `Accusé de réception : Bilan de formation - ${data.intituleFormation}`,
      html: clientMailContent,
    });

    console.log(`📩 Bilan de fin de formation envoyé pour ${data.intituleFormation}`);
    res.status(200).json({ message: 'Bilan transmis avec succès !' });

  } catch (error) {
    console.error('❌ Erreur envoi bilan fin formation :', error);
    res.status(500).json({ message: "Erreur lors de l'envoi du bilan." });
  }
});
// ============================================================
// ROUTE : GRILLE ÉVALUATION (TEST ANGLAIS)
// ============================================================
router.post('/evaluation-sous-traitants', upload.none(), async (req, res) => {
  try {
    const data = req.body;

    // 1. DÉFINITION DES BONNES RÉPONSES (Quiz Technique)
    const answersKey = {
      q2: "I'm from Lille",
      q3: "I am 35 years old",
      q4: "I’m an engineer.",
      q6: "watch",
      q7: "make",
      q8: "too"
    };

    // 2. CALCUL DU SCORE
    let score = 0;
    const detailsQuiz = Object.keys(answersKey).map(key => {
      const isCorrect = data[key] === answersKey[key];
      if (isCorrect) score++;
      return {
        question: key,
        reponseUser: data[key],
        reponseAttendue: answersKey[key],
        status: isCorrect ? '✅' : '❌'
      };
    });

    // 3. HTML POUR L'ADMIN (Rapport de test détaillé)
    const adminMailContent = `
      <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 700px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <div style="background-color: #3b0764; color: white; padding: 25px; text-align: center;">
          <h2 style="margin: 0; font-size: 22px;">Rapport d'Évaluation : Anglais</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.8;">Candidat : ${data.prenom} ${data.nom}</p>
        </div>

        <div style="padding: 30px; background-color: #ffffff;">
          
          <h3 style="color: #3b0764; border-bottom: 2px solid #f3e8ff; padding-bottom: 5px;">👤 Informations du Candidat</h3>
          <p><strong>Nom complet :</strong> ${data.prenom} ${data.nom}</p>
          <p><strong>Email :</strong> <a href="mailto:${data.email}" style="color: #6b21a8;">${data.email}</a></p>
          <p><strong>Téléphone :</strong> ${data.telephone || 'Non renseigné'}</p>
          <p><strong>Auto-évaluation (Niveau déclaré) :</strong> <span style="background: #fef9c3; padding: 2px 6px; border-radius: 4px; font-weight: bold;">${data.niveauAnglais}</span></p>

          <h3 style="color: #3b0764; border-bottom: 2px solid #f3e8ff; padding-bottom: 5px; margin-top: 30px;">📊 Résultats du Quiz (Score : ${score}/6)</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
            <thead>
              <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                <th style="padding: 10px; text-align: left;">Question</th>
                <th style="padding: 10px; text-align: left;">Réponse Candidat</th>
                <th style="padding: 10px; text-align: center;">Résultat</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">2. Where do you come from?</td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${data.q2}</td><td style="padding: 10px; text-align: center; border-bottom: 1px solid #f1f5f9;">${data.q2 === answersKey.q2 ? '✅' : '❌'}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">3. How old are you?</td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${data.q3}</td><td style="padding: 10px; text-align: center; border-bottom: 1px solid #f1f5f9;">${data.q3 === answersKey.q3 ? '✅' : '❌'}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">4. Profession</td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${data.q4}</td><td style="padding: 10px; text-align: center; border-bottom: 1px solid #f1f5f9;">${data.q4 === answersKey.q4 ? '✅' : '❌'}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">6. The news (watch/see)</td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${data.q6}</td><td style="padding: 10px; text-align: center; border-bottom: 1px solid #f1f5f9;">${data.q6 === answersKey.q6 ? '✅' : '❌'}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">7. Decisions (make/do)</td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${data.q7}</td><td style="padding: 10px; text-align: center; border-bottom: 1px solid #f1f5f9;">${data.q7 === answersKey.q7 ? '✅' : '❌'}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">8. Luggage (too/to)</td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${data.q8}</td><td style="padding: 10px; text-align: center; border-bottom: 1px solid #f1f5f9;">${data.q8 === answersKey.q8 ? '✅' : '❌'}</td></tr>
            </tbody>
          </table>

        </div>
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 11px; color: #64748b;">
          Évaluation envoyée depuis THDSFORMATION.FR - 5 RUE PLEYEL 93200 SAINT-DENIS
        </div>
      </div>
    `;

    // 4. HTML POUR LE CANDIDAT (Confirmation professionnelle)
    const clientMailContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #4c1d95; padding: 25px; text-align: center; color: white;">
          <h2 style="margin: 0;">Test d'évaluation reçu</h2>
        </div>
        <div style="padding: 25px;">
          <p>Bonjour <strong>${data.prenom}</strong>,</p>
          <p>Nous vous remercions d'avoir pris le temps de réaliser notre test d'évaluation en anglais.</p>
          <p>Nos équipes pédagogiques vont maintenant analyser vos réponses techniques (Score : <strong>${score}/6</strong>) en corrélation avec votre auto-évaluation (Niveau : <strong>${data.niveauAnglais}</strong>).</p>
          <p>Nous reviendrons vers vous très prochainement pour vous proposer le parcours de formation le plus adapté à votre profil.</p>
          <br>
          <p>Cordialement,</p>
          <p><strong>L'équipe THDS Formation</strong></p>
        </div>
        <div style="background: #f8fafc; padding: 15px; text-align: center; font-size: 11px; color: #94a3b8;">
          THDS - 5 RUE PLEYEL 93200 SAINT-DENIS
        </div>
      </div>
    `;

    // --- ENVOI DES EMAILS ---

    // A) Envoi à l'Admin
    await transporter.sendMail({
      from: `"Correction Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      replyTo: data.email, 
      subject: `[TEST ANGLAIS] ${score}/6 - ${data.nom.toUpperCase()} ${data.prenom}`,
      html: adminMailContent,
    });

    // B) Envoi au Candidat
    await transporter.sendMail({
      from: `"THDS FORMATION" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `Confirmation de votre test d'évaluation d'Anglais`,
      html: clientMailContent,
    });

    console.log(`📩 Test d'anglais traité : ${data.prenom} ${data.nom} (Score: ${score}/6)`);
    res.status(200).json({ message: 'Évaluation traitée avec succès !' });

  } catch (error) {
    console.error('❌ Erreur envoi évaluation sous-traitants :', error);
    res.status(500).json({ message: "Erreur lors du traitement du test." });
  }
});

export default router;