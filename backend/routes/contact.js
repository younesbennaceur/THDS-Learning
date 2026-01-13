import express from 'express';
import transporter from '../config/mailer.js';

const router = express.Router();

router.post('/contact-complet', async (req, res) => {
  try {
    const { prenom, nom, email, telephone, periodeContact, urgence, message } = req.body;

    // Email détaillé pour l'équipe THDS
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
        <div style="background: #3b0764; color: white; padding: 20px;">
          <h2 style="margin: 0;">📞 Demande de Rappel Client</h2>
        </div>
        <div style="padding: 20px; line-height: 1.6;">
          <p><strong>Candidat :</strong> ${prenom} ${nom}</p>
          <p><strong>Téléphone :</strong> <span style="font-size: 1.2em; color: #3b0764; font-weight: bold;">${telephone}</span></p>
          <p><strong>Email :</strong> ${email}</p>
          
          <div style="margin: 20px 0; padding: 15px; background: #f3f0ff; border-left: 4px solid #6b21a8; border-radius: 4px;">
            <p style="margin: 0;"><strong>⚡ Urgence :</strong> ${urgence}</p>
            <p style="margin: 5px 0 0 0;"><strong>📅 Disponibilité :</strong> ${periodeContact}</p>
          </div>

          <p><strong>Note du client :</strong></p>
          <p style="background: #f8fafc; padding: 15px; border-radius: 8px; font-style: italic;">"${message || 'Pas de commentaire particulier.'}"</p>
        </div>
      </div>
    `;

    // Envoi à THDS
    await transporter.sendMail({
      from: `"Contact THDS" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      replyTo: email,
      subject: `[${urgence.toUpperCase()}] Rappel : ${nom.toUpperCase()} (${periodeContact})`,
      html: adminHtml
    });

    // Envoi d'un accusé de réception professionnel au client
    await transporter.sendMail({
      from: `"THDS Formation" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Votre demande de rappel a été prise en compte`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <p>Bonjour ${prenom},</p>
          <p>Nous avons bien reçu votre demande de contact.</p>
          <p>Notre équipe va vous recontacter <strong>${urgence.toLowerCase()}</strong> pendant la période suivante : <strong>${periodeContact.toLowerCase()}</strong>.</p>
          <p>À très bientôt,<br>L'équipe THDS</p>
        </div>`
    });

    res.status(200).json({ message: 'Demande enregistrée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;