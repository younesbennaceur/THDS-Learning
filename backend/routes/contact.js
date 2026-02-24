import express from 'express';
import transporter from '../config/mailer.js';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/contact-complet', async (req, res) => {
  let browser;
  try {
    const { 
      prenom, nom, email, telephone, periodeContact, 
      urgence, message, accordDemarchage, adresse, dateNaissance 
    } = req.body;

    if (!accordDemarchage) {
      return res.status(400).json({ error: "Le consentement est obligatoire." });
    }

    const dateSignature = new Date().toLocaleDateString('fr-FR');
    
    // --- CONVERSION DU LOGO EN BASE64 ---
    // On suppose que le logo est dans votre dossier public/Logo.png
    const logoPath = path.resolve('../public/Logo.png');
    const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });
    const logoDataUri = `data:image/png;base64,${logoBase64}`;

    // --- GÉNÉRATION HTML DU PDF ---
    const attestationHtml = `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica', 'Arial', sans-serif; color: #1f2937; line-height: 1.5; margin: 0; padding: 0; }
            .container { padding: 40px; border: 1px solid #e5e7eb; margin: 20px; position: relative; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #3b0764; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { height: 60px; }
            .company-info { text-align: right; font-size: 10px; color: #6b7280; }
            h1 { color: #3b0764; font-size: 18px; text-transform: uppercase; text-align: center; margin: 30px 0; letter-spacing: 1px; }
            .content { font-size: 13px; text-align: justify; }
            .field-box { background: #f9fafb; border: 1px solid #f3f4f6; padding: 15px; margin: 20px 0; border-radius: 4px; }
            .field-row { margin-bottom: 8px; }
            .label { font-weight: bold; color: #4b5563; }
            .signature-section { margin-top: 50px; display: flex; justify-content: flex-end; }
            .signature-box { border: 1px solid #3b0764; padding: 20px; width: 250px; text-align: center; border-radius: 8px; background: #fff; }
            .signature-title { font-size: 11px; color: #6b21a8; font-weight: bold; margin-bottom: 10px; text-decoration: underline; }
            .footer { position: absolute; left: 40px; right: 40px; border-top: 1px solid #e5e7eb; padding-top: 15px; font-size: 9px; color: #9ca3af; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="${logoDataUri}" class="logo" alt="Logo THDS">
              <div class="company-info">
                <strong>THDS FORMATION</strong><br>
                5 RUE PLEYEL, 93200 SAINT DENIS<br>
                SIRET: 832 774 087 00023
              </div>
            </div>

            <h1>Attestation de Consentement et d'Autorisation</h1>

            <div class="content">
              <p>Je soussigné(e),</p>
              
              <div class="field-box">
                <div class="field-row"><span class="label">Nom & Prénom :</span> ${prenom} ${nom}</div>
                <div class="field-row"><span class="label">Date de naissance :</span> ${dateNaissance || 'Non renseignée'}</div>
                <div class="field-row"><span class="label">Adresse :</span> ${adresse || 'Non renseignée'}</div>
                <div class="field-row"><span class="label">Coordonnées :</span> ${telephone} | ${email}</div>
              </div>

              <p>Déclare expressément autoriser la société <strong>THDS</strong> à me recontacter dans le cadre de ma demande d'information pour mon projet de formation.</p>
              
              <p>Cette autorisation de contact est accordée conformément aux dispositions du Règlement Général sur la Protection des Données (RGPD). Elle permet à un conseiller de me joindre par téléphone ou par voie électronique selon les préférences indiquées lors de ma demande.</p>
              
              <p><strong>Détails de la demande :</strong><br>
              Urgence souhaitée : ${urgence}<br>
              Créneau de contact : ${periodeContact}</p>

              <p>Fait à Saint Denis, le <strong>${dateSignature}</strong></p>
            </div>

            <div class="signature-section">
              <div class="signature-box">
                <div class="signature-title">SIGNATURE NUMÉRIQUE</div>
                <p style="font-size: 14px; margin: 10px 0;"><strong>${prenom} ${nom}</strong></p>
                <p style="font-size: 9px; color: #9ca3af;">Document validé via formulaire en ligne</p>
              </div>
            </div>

            <div class="footer">
              THDS - Organisme de formation enregistré sous le n° 11931056093 auprès du préfet de région d'Ile-de-France.<br>
              Ce document fait office de preuve de consentement libre et éclairé.
            </div>
          </div>
        </body>
      </html>
    `;

    // --- PUPPETEER ---
    browser = await puppeteer.launch({ 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    await page.setContent(attestationHtml, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ 
        format: 'A4', 
        printBackground: true,
        margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });
    await browser.close();

    // ... (Le reste de votre code d'envoi d'email reste identique)
    // --- EMAIL ADMIN ---
   // --- EMAIL ADMIN (Récapitulatif complet) ---
    await transporter.sendMail({
      from: `"Système THDS" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      subject: `🚨 NOUVELLE DEMANDE : ${nom.toUpperCase()} (${urgence})`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #3b0764; padding: 20px; color: white;">
            <h2 style="margin: 0; font-size: 18px;">Fiche Contact - Nouveau Candidat</h2>
          </div>
          <div style="padding: 20px;">
            <p>Un nouveau formulaire vient d'être soumis. Voici le récapitulatif des informations :</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Candidat :</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${prenom} ${nom.toUpperCase()}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Téléphone :</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${telephone}</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email :</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Urgence :</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><span style="color: #d946ef; font-weight: bold;">${urgence}</span></td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Disponibilité :</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${periodeContact}</td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <strong>Message du candidat :</strong><br>
              <p style="background: #f3f4f6; padding: 15px; border-radius: 5px; font-style: italic;">
                "${message || 'Aucun message supplémentaire.'}"
              </p>
            </div>

            <p style="font-size: 12px; color: #6b21a8; font-weight: bold; margin-top: 20px;">
              ✅ L'attestation de consentement RGPD est jointe à cet e-mail.
            </p>
          </div>
          <div style="background: #f9fafb; padding: 10px; text-align: center; font-size: 11px; color: #999;">
            Envoyé depuis le portail web THDS 
          </div>
        </div>`,
      attachments: [{ filename: `Autorisation_THDS_${nom}.pdf`, content: pdfBuffer }]
    });

    // --- EMAIL CLIENT (Remerciement et Confirmation) ---
    await transporter.sendMail({
      from: `"THDS Formation" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Confirmation de réception - THDS Formation`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto;">
          <div style="text-align: center; padding: 20px;">
            <h2 style="color: #3b0764;">Bonjour ${prenom},</h2>
            <p style="font-size: 16px;">Merci de nous avoir contactés pour votre projet de formation !</p>
          </div>
          
          <div style="line-height: 1.6;">
            <p>Nous avons bien reçu votre demande d'accompagnement. Un conseiller pédagogique va analyser votre profil avec attention.</p>
            
            <p>Comme vous l'avez souhaité, nous vous recontacterons <strong>${urgence.toLowerCase()}</strong> durant votre créneau de disponibilité : <strong>${periodeContact.toLowerCase()}</strong>.</p>
            
            <div style="background: #f3e8ff; padding: 20px; border-radius: 8px; border-left: 5px solid #3b0764; margin: 25px 0;">
              <p style="margin: 0;"><strong>Note importante :</strong> Vous trouverez en pièce jointe la copie de votre autorisation de contact (RGPD). Ce document confirme votre demande explicite d'être rappelé par nos services.</p>
            </div>

            <p>À très bientôt,</p>
            <p><strong>L'équipe THDS Formation</strong></p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <div style="text-align: center; font-size: 12px; color: #999;">
            <p>THDS Formation - 5 Rue Pleyel, 93200 Saint Denis</p>
            <p><em>VOTRE AVENIR, NOTRE PRIORITÉ</em></p>
          </div>
        </div>`,
      attachments: [{ filename: `Votre_Autorisation_THDS.pdf`, content: pdfBuffer }]
    });

    res.status(200).json({ success: true });
  } catch (error) {
    if (browser) await browser.close();
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;