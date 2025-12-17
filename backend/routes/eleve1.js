import express from 'express';
import transporter from '../config/mailer.js';

const router = express.Router();

router.post('/analyse-besoins', async (req, res) => {
  try {
    const data = req.body;

    // --- 1. EMAIL POUR L'ADMIN (Le récapitulatif complet) ---
    // (Je garde ton HTML existant ici, version raccourcie pour la lisibilité)
    const adminMailContent = `
      <div style="font-family: Arial, sans-serif; color: #1e293b;">
        <h2 style="color: #4c1d95;">Nouveau Dossier Reçu</h2>
        <p><strong>De :</strong> ${data.civilite} ${data.prenom} ${data.nom}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Téléphone :</strong> ${data.telephone}</p>
        <hr>
        <p>Consultez le reste des détails dans votre interface ou le mail précédent.</p>
      </div>
    `;

    // --- 2. EMAIL POUR LE CLIENT (Remerciement) ---
    // C'est ici que c'est DYNAMIQUE : "to: data.email"
    const clientMailContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #4c1d95; padding: 20px; text-align: center;">
          <h2 style="color: white; margin: 0;">Merci, ${data.prenom} !</h2>
        </div>
        <div style="padding: 20px;">
          <p>Bonjour <strong>${data.civilite} ${data.nom}</strong>,</p>
          <p>Nous avons bien reçu votre fiche d'analyse des besoins pour la formation <strong>${data.formationVisee}</strong>.</p>
          <p>Nos équipes pédagogiques vont étudier votre dossier et nous reviendrons vers vous très rapidement pour la suite du processus.</p>
          <br>
          <p>Cordialement,</p>
          <p><strong>L'équipe Blue Formation</strong></p>
        </div>
        <div style="background-color: #f3f4f6; padding: 10px; text-align: center; font-size: 12px; color: #666;">
          Ceci est un message automatique, merci de ne pas y répondre directement.
        </div>
      </div>
    `;

    // --- ENVOI DES DEUX EMAILS ---
    
    // 1. Envoi à l'Admin
    await transporter.sendMail({
      from: `"Site Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      replyTo: data.email,
      subject: `Nouveau Dossier : ${data.nom} ${data.prenom}`,
      html: adminMailContent,
    });

    // 2. Envoi au Client (DYNAMIQUE)
    await transporter.sendMail({
      from: `"Blue Formation" <${process.env.EMAIL_USER}>`,
      to: data.email, // <--- C'est ici que la magie opère !
      subject: `Confirmation de réception de votre dossier`,
      html: clientMailContent,
    });

    console.log(`✅ Double email envoyé (Admin + Client ${data.email})`);
    res.status(200).json({ message: 'Dossier transmis et confirmation envoyée !' });

  } catch (error) {
    console.error('❌ Erreur envoi email :', error);
    res.status(500).json({ message: "Erreur serveur lors de l'envoi." });
  }
});

export default router;