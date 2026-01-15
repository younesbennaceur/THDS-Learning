import express from 'express';
import transporter from '../config/mailer.js';


const router = express.Router();
router.post('/reclamationForm', async (req, res) => {
  try {
    const data = req.body;

    // Email Admin THDS (Priorité Haute)
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; border: 2px solid #dc2626; border-radius: 10px; overflow: hidden;">
        <div style="background: #dc2626; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">⚠️ NOUVELLE RÉCLAMATION</h2>
          <p style="margin: 5px 0 0 0;">Urgence : ${data.urgence.toUpperCase()}</p>
        </div>
        <div style="padding: 20px;">
          <p><strong>Candidat :</strong> ${data.prenom} ${data.nom}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Type :</strong> ${data.typeReclamation}</p>
          <hr>
          <p><strong>Description du problème :</strong></p>
          <p style="background: #fef2f2; padding: 15px; border-left: 5px solid #dc2626;">${data.description}</p>
          
          <p><strong>Résolution souhaitée :</strong></p>
          <p style="background: #f8fafc; padding: 15px;">${data.solutionAttendue || 'Non précisé'}</p>
          
          <div style="margin-top: 20px; padding: 10px; border: 1px dashed #ccc;">
            <strong>Préférence de rappel :</strong> ${data.periodeContact}
          </div>
        </div>
      </div>
    `;

    // Email de Confirmation Client
    const clientHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee;">
        <div style="background: #f8fafc; padding: 20px; border-bottom: 3px solid #dc2626;">
          <h2 style="color: #dc2626;">Accusé de réception</h2>
        </div>
        <div style="padding: 20px;">
          <p>Bonjour ${data.prenom},</p>
          <p>Nous avons bien enregistré votre réclamation concernant : <strong>${data.typeReclamation}</strong>.</p>
          <p>Soyez assuré(e) que notre service qualité étudie votre dossier. Un responsable vous recontactera <strong>${data.urgence === 'Immediat' ? 'dans les plus brefs délais' : 'sous 48h'}</strong>.</p>
          <br>
          <p>Cordialement,<br>Le Service Qualité THDS</p>
        </div>
      </div>
    `;

    // Envoi à THDS
    await transporter.sendMail({
      from: `"Qualité THDS" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      replyTo: data.email,
      subject: `🚨 RECLAMATION [${data.typeReclamation}] - ${data.nom}`,
      html: adminHtml,
      priority: 'high'
    });

    // Envoi au Client
    await transporter.sendMail({
      from: `"THDS Formation" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `Réception de votre réclamation`,
      html: clientHtml
    });

    res.status(200).json({ message: 'Réclamation transmise.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;