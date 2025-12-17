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

    // 1. Préparation des pièces jointes pour Nodemailer
    const attachments = [];
    Object.keys(files).forEach(key => {
      if (files[key] && files[key][0]) {
        attachments.push({
          filename: files[key][0].originalname,
          path: files[key][0].path
        });
      }
    });

    // 2. HTML de l'email
    const mailContent = `
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

    // 3. Envoi de l'email
    await transporter.sendMail({
      from: `"Candidature" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      subject: `Nouveau Formateur : ${data.nom} ${data.prenom}`,
      html: mailContent,
      attachments: attachments // On joint les fichiers
    });

    // 4. Nettoyage (Suppression des fichiers temporaires du serveur)
    attachments.forEach(file => {
      fs.unlink(file.path, (err) => {
        if (err) console.error("Erreur suppression fichier temp:", err);
      });
    });

    res.status(200).json({ message: 'Candidature envoyée avec succès !' });

  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
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
router.post('/fin-formation', upload.none(), async (req, res) => {
  try {
    const data = req.body;

    // 1. HTML ADMIN
    const adminMailContent = `
      <div style="font-family: Arial, sans-serif; color: #1e293b;">
        <div style="background-color: #4c1d95; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">Bilan Fin de Formation</h2>
          <p style="margin: 5px 0 0 0;">Formateur : ${data.prenom} ${data.nom}</p>
        </div>
        <div style="padding: 20px;">
          
          <h3 style="color: #4c1d95; border-bottom: 2px solid #e9d5ff;">1. La Formation</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Intitulé :</strong> ${data.intituleFormation}</li>
            <li><strong>Dates :</strong> Du ${data.dateDebut} au ${data.dateFin}</li>
            <li><strong>Type :</strong> ${data.typeFormation}</li>
            <li><strong>Lieu :</strong> ${data.lieuFormation}</li>
            <li><strong>Stagiaires :</strong> Inscrits (${data.nbInscrits}) / Présents (${data.nbPresents})</li>
            <li><strong>Email Formateur :</strong> ${data.email}</li>
          </ul>

          <h3 style="color: #4c1d95; border-bottom: 2px solid #e9d5ff; margin-top:20px;">2. Conditions & Coordination</h3>
          <p>Matériel : <strong>${data.conditionsMaterielles}</strong></p>
          <p>Groupe adapté : <strong>${data.groupeAdapte}</strong></p>
          <p>Coordination THDSFormation : <strong>${data.coordination}</strong></p>
          <p>Salle : <strong>${data.salleAdaptee}</strong></p>
          <p>Adaptations en cours : <strong>${data.adaptations}</strong></p>
          ${data.remarquesEtape2 ? `<p><em>Remarques : ${data.remarquesEtape2}</em></p>` : ''}

          <h3 style="color: #4c1d95; border-bottom: 2px solid #e9d5ff; margin-top:20px;">3. Pédagogie</h3>
          <p>Séquence péda : <strong>${data.sequencePedagogique}</strong></p>
          <p>Animation : <strong>${data.animation}</strong></p>
          <p>Échanges : <strong>${data.echangesGroupe}</strong></p>
          <p>Satisfaction stagiaires : <strong>${data.satisfactionAttentes}</strong></p>
          ${data.remarquesEtape3 ? `<p><em>Remarques : ${data.remarquesEtape3}</em></p>` : ''}

          <h3 style="color: #4c1d95; border-bottom: 2px solid #e9d5ff; margin-top:20px;">4. Bilan Général</h3>
          <p>Stagiaires à l'aise : <strong>${data.stagiairesAise}</strong></p>
          <p>Note Globale : <strong>${data.globalFormation}</strong></p>
          
          <div style="margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 10px;">
            <p><strong>Incident signalé :</strong> ${data.incident} ${data.incident === 'Oui' ? `<br><span style="color:red;">Détail : ${data.incidentDetails}</span>` : ''}</p>
            <p><strong>Situation Handicap :</strong> ${data.handicap} ${data.handicap === 'Oui' ? `<br><span style="color:red;">Actions proposées : ${data.handicapActions}</span>` : ''}</p>
          </div>
          
          ${data.remarquesEtape4 ? `<p style="margin-top:10px;"><em>Autres remarques : ${data.remarquesEtape4}</em></p>` : ''}

        </div>
      </div>
    `;

    // 2. HTML FORMATEUR (Confirmation)
    const clientMailContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="background-color: #4c1d95; padding: 20px; text-align: center; color: white;">
          <h2>Bilan Transmis</h2>
        </div>
        <div style="padding: 20px;">
          <p>Bonjour <strong>${data.prenom}</strong>,</p>
          <p>Nous avons bien reçu votre questionnaire de fin de formation pour : <strong>${data.intituleFormation}</strong>.</p>
          <p>Merci pour votre collaboration et la qualité de votre suivi.</p>
          <br>
          <p>L'équipe THDS Formation</p>
        </div>
      </div>
    `;

    // Envoi Admin
    await transporter.sendMail({
      from: `"Bilan Formateur" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      replyTo: data.email,
      subject: `Bilan Fin Formation : ${data.intituleFormation} (${data.nom})`,
      html: adminMailContent,
    });

    // Envoi Formateur
    await transporter.sendMail({
      from: `"THDS Formation" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `Confirmation réception bilan pédagogique`,
      html: clientMailContent,
    });

    res.status(200).json({ message: 'Questionnaire envoyé !' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
// ============================================================
// ROUTE : GRILLE ÉVALUATION (TEST ANGLAIS)
// ============================================================
router.post('/evaluation-sous-traitants', upload.none(), async (req, res) => {
  try {
    const data = req.body;

    // 1. HTML ADMIN (Résultats du test)
    const adminMailContent = `
      <div style="font-family: Arial, sans-serif; color: #1e293b;">
        <div style="background-color: #4c1d95; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">Résultat Test Anglais</h2>
          <p style="margin: 5px 0 0 0;">Candidat : ${data.prenom} ${data.nom}</p>
        </div>
        <div style="padding: 20px;">
          
          <h3 style="color: #4c1d95; border-bottom: 2px solid #ddd;">👤 Candidat</h3>
          <p><strong>Nom :</strong> ${data.nom} ${data.prenom}</p>
          <p><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Téléphone :</strong> ${data.telephone}</p>

          <h3 style="color: #4c1d95; border-bottom: 2px solid #ddd; margin-top: 20px;">📊 Auto-évaluation</h3>
          <p>Niveau déclaré : <strong>${data.niveauAnglais}</strong></p>

          <h3 style="color: #4c1d95; border-bottom: 2px solid #ddd; margin-top: 20px;">📝 Réponses au Quiz</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="background:#f3f4f6; padding:8px; margin-bottom:5px;"><strong>Where do you come from?</strong> <br>➡️ ${data.q2}</li>
            <li style="padding:8px; margin-bottom:5px;"><strong>How old are you?</strong> <br>➡️ ${data.q3}</li>
            <li style="background:#f3f4f6; padding:8px; margin-bottom:5px;"><strong>What is your profession?</strong> <br>➡️ ${data.q4}</li>
            <li style="padding:8px; margin-bottom:5px;"><strong>I usually ___ the news...</strong> <br>➡️ ${data.q6}</li>
            <li style="background:#f3f4f6; padding:8px; margin-bottom:5px;"><strong>Managers usually have to ___ hard decisions.</strong> <br>➡️ ${data.q7}</li>
            <li style="padding:8px; margin-bottom:5px;"><strong>The luggage was ___ heavy...</strong> <br>➡️ ${data.q8}</li>
          </ul>
        </div>
      </div>
    `;

    // 2. HTML CANDIDAT (Confirmation)
    const clientMailContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="background-color: #4c1d95; padding: 20px; text-align: center; color: white;">
          <h2>Test enregistré !</h2>
        </div>
        <div style="padding: 20px;">
          <p>Bonjour <strong>${data.prenom}</strong>,</p>
          <p>Nous avons bien reçu vos réponses au test d'évaluation.</p>
          <p>Nos équipes vont analyser vos résultats pour vous orienter vers la formation la plus adaptée.</p>
          <br>
          <p>L'équipe THDS Formation</p>
        </div>
      </div>
    `;

    // Envoi Admin
    await transporter.sendMail({
      from: `"Test Anglais" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      replyTo: data.email,
      subject: `Résultat Test Anglais : ${data.nom} ${data.prenom}`,
      html: adminMailContent,
    });

    // Envoi Candidat
    await transporter.sendMail({
      from: `"THDS Formation" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `Confirmation réception test d'évaluation`,
      html: clientMailContent,
    });

    res.status(200).json({ message: 'Test envoyé !' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;