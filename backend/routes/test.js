import express from 'express';
import transporter from '../config/mailer.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/test-anglais', async (req, res) => {
    try {
        const { nom, prenom, email, answers, telephone } = req.body;

        if (!answers) return res.status(400).json({ error: "Données manquantes." });

        // --- 1. CALCULS DES SCORES (Inchangé) ---
        const correctKeys = {
            1: 'B', 2: 'B', 3: 'B', 4: 'B', 5: 'B', 6: 'B', 7: 'B', 8: 'B', 9: 'B', 10: 'C',
            11: 'B', 12: 'B', 13: 'C', 14: 'C', 15: 'A', 16: 'B', 17: 'B', 18: 'B', 19: 'B', 20: 'B',
            21: 'B', 22: 'A', 23: 'B', 24: 'B', 25: 'B', 26: 'B', 27: 'B', 28: 'B', 29: 'B', 30: 'B',
            31: 'B', 32: 'A', 33: 'B', 34: 'B', 35: 'B', 36: 'A', 37: 'B', 38: 'B', 39: 'B', 40: 'C',
            41: 'B', 42: 'B', 43: 'A', 44: 'B', 45: 'A', 46: 'A', 47: 'A', 48: 'A', 49: 'B', 50: 'B'
        };

        const cats = {
            vocabulaire: [4, 6, 8, 9, 10, 18, 24, 26, 30, 38, 49],
            conjugaison: [3, 5, 11, 16, 22, 27, 28, 31, 33, 34, 36, 37, 40, 41, 44],
            grammaire: [1, 2, 7, 12, 13, 14, 15, 17, 19, 20, 21, 23, 25, 29, 32, 35, 39, 42, 43, 45, 46, 47, 48, 50]
        };

        let scores = { vocab: 0, conj: 0, gram: 0, total: 0 };

        Object.keys(correctKeys).forEach(id => {
            if (answers[id] === correctKeys[id]) {
                scores.total++;
                const qId = parseInt(id);
                if (cats.vocabulaire.includes(qId)) scores.vocab++;
                if (cats.conjugaison.includes(qId)) scores.conj++;
                if (cats.grammaire.includes(qId)) scores.gram++;
            }
        });

        // Barème (Textes en Français)
        const baremes = [
            { min: 0, max: 15, niveau: "A1", label: "Débutant", color: "#ef4444", desc: "Compréhension très basique de l’anglais. Utilisation de phrases simples et vocabulaire élémentaire." },
            { min: 16, max: 27, niveau: "A2", label: "Élémentaire", color: "#f97316", desc: "Compréhension de situations courantes. Utilisation du présent et du passé simple." },
            { min: 28, max: 39, niveau: "B1", label: "Intermédiaire", color: "#3b82f6", desc: "Bonne maîtrise des bases grammaticales. Capacité à travailler en anglais avec un accompagnement." },
            { min: 40, max: 50, niveau: "B2", label: "Avancé", color: "#10b981", desc: "Très bonne maîtrise grammaticale et lexicale. Autonomie en contexte professionnel." }
        ];

        const result = baremes.find(b => scores.total >= b.min && scores.total <= b.max) || baremes[0];

        // --- 2. GÉNÉRATION DU PDF (Alignement Corrigé) ---
        const generateProfessionalPDF = () => {
            return new Promise((resolve) => {
                // Création du document A4 (Largeur ~595 points)
                const doc = new PDFDocument({ size: 'A4', margin: 40 });
                let buffers = [];
                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', () => resolve(Buffer.concat(buffers)));

                // -- CADRE DE PAGE --
                doc.lineWidth(2).rect(20, 20, 555, 800).stroke('#333'); 
                doc.lineWidth(0.5).rect(25, 25, 545, 790).stroke('#999'); 

                // -- HEADER (CORRIGÉ) --
                
                // 1. Logo (Position gauche fixe)
                const logoPath = path.join(process.cwd(), 'Logo.png'); 
                if (fs.existsSync(logoPath)) {
                    doc.image(logoPath, 45, 45, { width: 60 });
                }

                // 2. Titres (Centrés sur toute la page)
                // On met X=0 et width=595 (largeur A4) pour que le centre soit bien calculé
                doc.fillColor('#111').font('Helvetica-Bold').fontSize(20);
                doc.text('RAPPORT DE POSITIONNEMENT ANGLAIS', 0, 55, { 
                    align: 'center', 
                    width: 595 
                });
                
                doc.font('Helvetica').fontSize(12).fillColor('#666');
                doc.text('THDS FORMATION', 0, 80, { 
                    align: 'center', 
                    width: 595,
                    characterSpacing: 2 
                });
                
                // Ligne de séparation
                doc.moveTo(40, 110).lineTo(555, 110).lineWidth(1).strokeColor('#333').stroke();

                // -- SECTION 1 : INFO CANDIDAT --
                doc.rect(40, 130, 515, 80).fill('#f3f4f6');
                
                doc.fillColor('#333').font('Helvetica-Bold').fontSize(11);
                
                // Labels
                doc.text('Candidat :', 60, 145);
                doc.text('Email :', 60, 165);
                doc.text('Date :', 60, 185);

                // Valeurs
                doc.font('Helvetica').fontSize(11).fillColor('#000');
                doc.text(`${prenom} ${nom}`, 150, 145);
                doc.text(email, 150, 165);
                doc.text(new Date().toLocaleDateString('fr-FR'), 150, 185);

                // -- SECTION 2 : RÉSULTATS --
                doc.moveDown(5); // Espace
                doc.font('Helvetica-Bold').fontSize(14).text('RÉSULTATS DU TEST', 40, 240);
                doc.lineWidth(2).moveTo(40, 255).lineTo(180, 255).strokeColor(result.color).stroke();

                // Carré de Couleur (Niveau)
                doc.rect(40, 270, 150, 120).fillAndStroke(result.color, '#333');
                doc.fillColor('#FFF').fontSize(50).text(result.niveau, 40, 290, { width: 150, align: 'center' });
                doc.fontSize(12).text(result.label, 40, 350, { width: 150, align: 'center' });

                // Texte Score & Description
                doc.fillColor('#000');
                doc.fontSize(18).font('Helvetica-Bold').text(`SCORE TOTAL : ${scores.total} / 50`, 210, 280);
                doc.fontSize(11).font('Helvetica-Oblique').fillColor('#555')
                   .text(result.desc, 210, 310, { width: 330 });

                // -- SECTION 3 : BARRES DE PROGRESSION --
                const drawBar = (label, score, max, y) => {
                    const width = 300;
                    const percent = score / max;
                    
                    doc.fillColor('#000').font('Helvetica-Bold').fontSize(10).text(label, 210, y);
                    doc.font('Helvetica').text(`${score}/${max}`, 520, y);
                    
                    // Fond gris
                    doc.rect(210, y + 15, width, 8).fill('#e5e7eb');
                    // Barre couleur
                    doc.rect(210, y + 15, width * percent, 8).fill('#4b5563');
                };

                drawBar('GRAMMAIRE', scores.gram, 24, 350);
                drawBar('VOCABULAIRE', scores.vocab, 11, 385);
                drawBar('CONJUGAISON', scores.conj, 15, 420);

                // -- SECTION 4 : FOOTER --
                doc.moveTo(40, 470).lineTo(555, 470).lineWidth(1).strokeColor('#ccc').stroke();

                doc.fontSize(8).font('Helvetica').fillColor('#999')
                   .text(`Ce rapport est généré automatiquement par le système THDS Formation.`, 0, 780, { align: 'center', width: 595 });

                doc.end();
            });
        };

        const pdfBuffer = await generateProfessionalPDF();

        // --- 3. ENVOI DES EMAILS ---
        const mailOptionsClient = {
            from: `"THDS Formation" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Votre résultat : Test d'Anglais - ${nom} ${prenom}`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd;">
                    <div style="background-color: #3b0764; padding: 20px; text-align: center;">
                        <h2 style="color: #fff; margin: 0;">RÉSULTAT DU TEST</h2>
                    </div>
                    <div style="padding: 30px;">
                        <p>Bonjour <strong>${prenom} ${nom}</strong>,</p>
                        <p>Voici votre rapport de positionnement d'anglais.</p>
                        
                        <div style="background: #f8fafc; border-left: 5px solid ${result.color}; padding: 15px; margin: 20px 0;">
                            <p style="margin: 0; font-size: 18px;"><strong>Score Total : ${scores.total} / 50</strong></p>
                            <p style="margin: 5px 0 0 0; color: #666;">Niveau estimé : ${result.niveau} (${result.label})</p>
                        </div>

                        <p>Vous trouverez le rapport détaillé format PDF en pièce jointe.</p>
                        <br>
                        <p style="font-size: 12px; color: #999;">L'équipe THDS Formation</p>
                    </div>
                </div>
            `,
            attachments: [{ filename: `Rapport_THDS_${nom}.pdf`, content: pdfBuffer }]
        };

        // --- EMAIL ADMINISTRATEUR (Format "Fiche Prospect") ---
        const mailOptionsAdmin = {
            from: `"Système THDS" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_ADMIN,
            subject: `[NOUVEAU TEST] ${prenom} ${nom} - Niveau ${result.niveau} (${scores.total}/50)`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; background-color: #f9fafb;">
                    
                    <div style="background-color: #1e293b; padding: 15px; text-align: center;">
                        <h2 style="color: #fff; margin: 0; font-size: 18px; text-transform: uppercase;">Nouveau Lead Qualifié</h2>
                    </div>

                    <div style="padding: 20px;">
                        
                        <div style="background: #fff; padding: 15px; border-radius: 5px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
                            <h3 style="margin-top: 0; color: #3b0764; border-bottom: 2px solid #3b0764; padding-bottom: 5px;">👤 Informations Candidat</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 5px 0; color: #666;">Nom complet :</td>
                                    <td style="padding: 5px 0; font-weight: bold;">${prenom} ${nom}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #666;">Email :</td>
                                    <td style="padding: 5px 0;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #666;">Téléphone :</td>
                                    <td style="padding: 5px 0;">${telephone || 'Non renseigné'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #666;">Date :</td>
                                    <td style="padding: 5px 0;">${new Date().toLocaleDateString('fr-FR')}</td>
                                </tr>
                            </table>
                        </div>

                        <div style="background: #fff; padding: 15px; border-radius: 5px; border: 1px solid #e5e7eb;">
                            <h3 style="margin-top: 0; color: #3b0764; border-bottom: 2px solid #3b0764; padding-bottom: 5px;">📊 Résultats & Analyse</h3>
                            
                            <div style="text-align: center; margin: 15px 0;">
                                <span style="background-color: ${result.color}; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; font-size: 16px;">
                                    Niveau ${result.niveau}
                                </span>
                                <p style="font-size: 20px; font-weight: bold; margin: 10px 0 5px 0;">Score : ${scores.total} / 50</p>
                                <p style="font-style: italic; color: #666; font-size: 13px; margin: 0;">${result.label}</p>
                            </div>

                            <table style="width: 100%; background-color: #f3f4f6; border-radius: 5px; margin-top: 15px;">
                                <tr>
                                    <td style="padding: 10px; text-align: center; border-right: 1px solid #ddd;">
                                        <div style="font-size: 11px; color: #666;">GRAMMAIRE</div>
                                        <div style="font-weight: bold; color: #333;">${scores.gram}/24</div>
                                    </td>
                                    <td style="padding: 10px; text-align: center; border-right: 1px solid #ddd;">
                                        <div style="font-size: 11px; color: #666;">VOCABULAIRE</div>
                                        <div style="font-weight: bold; color: #333;">${scores.vocab}/11</div>
                                    </td>
                                    <td style="padding: 10px; text-align: center;">
                                        <div style="font-size: 11px; color: #666;">CONJUGAISON</div>
                                        <div style="font-weight: bold; color: #333;">${scores.conj}/15</div>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div style="margin-top: 20px; text-align: center;">
                            <p style="font-size: 12px; color: #888;">Le rapport PDF complet est joint à cet email.</p>
                            <a href="mailto:${email}" style="background-color: #3b0764; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 14px;">Contacter le candidat</a>
                        </div>
                    </div>
                </div>
            `,
            attachments: [{ filename: `Rapport_${nom}.pdf`, content: pdfBuffer }]
        };

        await Promise.all([
            transporter.sendMail(mailOptionsClient),
            transporter.sendMail(mailOptionsAdmin)
        ]);

        res.status(200).json({ message: 'Succès', niveau: result.niveau });

    } catch (error) {
        console.error('Erreur Backend:', error);
        res.status(500).json({ error: "Erreur lors du traitement du test." });
    }
});

export default router;