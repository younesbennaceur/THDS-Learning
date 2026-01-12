import express from 'express';
import transporter from '../config/mailer.js';
import PDFDocument from 'pdfkit'; // Pour le PDF professionnel

const router = express.Router();

router.post('/test-anglais', async (req, res) => {
    try {
        const { nom, prenom, email, answers, telephone } = req.body;

        // 1. Clé de réponse officielle [cite: 317-438]
        const correctKeys = {
            1: 'B', 2: 'B', 3: 'B', 4: 'B', 5: 'B', 6: 'B', 7: 'B', 8: 'B', 9: 'B', 10: 'C',
            11: 'B', 12: 'B', 13: 'C', 14: 'C', 15: 'A', 16: 'B', 17: 'B', 18: 'B', 19: 'B', 20: 'B',
            21: 'B', 22: 'A', 23: 'B', 24: 'B', 25: 'B', 26: 'B', 27: 'B', 28: 'B', 29: 'B', 30: 'B',
            31: 'B', 32: 'A', 33: 'B', 34: 'B', 35: 'B', 36: 'A', 37: 'B', 38: 'B', 39: 'B', 40: 'C',
            41: 'B', 42: 'B', 43: 'A', 44: 'B', 45: 'A', 46: 'A', 47: 'A', 48: 'A', 49: 'B', 50: 'B'
        };

        // 2. Catégories par compétence [cite: 315, 344, 381]
        const cats = {
            vocabulaire: [4, 6, 8, 9, 10, 18, 24, 26, 30, 38, 49],
            conjugaison: [3, 5, 11, 16, 22, 27, 28, 31, 33, 34, 36, 37, 40, 41, 44],
            grammaire: [1, 2, 7, 12, 13, 14, 15, 17, 19, 20, 21, 23, 25, 29, 32, 35, 39, 42, 43, 45, 46, 47, 48, 50]
        };

        let scores = { vocab: 0, conj: 0, gram: 0, total: 0 };

        // Calcul des scores [cite: 6]
        Object.keys(correctKeys).forEach(id => {
            if (answers[id] === correctKeys[id]) {
                scores.total++;
                if (cats.vocabulaire.includes(parseInt(id))) scores.vocab++;
                if (cats.conjugaison.includes(parseInt(id))) scores.conj++;
                if (cats.grammaire.includes(parseInt(id))) scores.gram++;
            }
        });

        // 3. Interprétation CECRL 
        let niveau = "A1 (Débutant)";
        if (scores.total > 15) niveau = "A2 (Élémentaire)";
        if (scores.total > 25) niveau = "B1 (Indépendant)";
        if (scores.total > 35) niveau = "B2 (Avancé)";
        if (scores.total > 45) niveau = "C1 (Expert)";

        // 4. GÉNÉRATION DU PDF PROFESSIONNEL
        const generatePDF = () => {
            return new Promise((resolve) => {
                const doc = new PDFDocument({ margin: 50 });
                let buffers = [];
                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', () => resolve(Buffer.concat(buffers)));

                // Design Header
                doc.fillColor('#3b0764').fontSize(22).text('RAPPORT DE POSITIONNEMENT ANGLAIS', { align: 'center' });
                doc.fontSize(12).fillColor('#666').text('THDS ', { align: 'center' }).moveDown();
                
                doc.strokeColor('#eee').moveTo(50, 110).lineTo(550, 110).stroke();

                // Infos Candidat
                doc.fillColor('#000').fontSize(14).text(`Candidat : ${prenom} ${nom}`, 50, 130);
                doc.text(`Email : ${email}`);
                doc.text(`Date : ${new Date().toLocaleDateString()}`).moveDown(2);

                // Score Box
                doc.rect(50, 200, 500, 100).fill('#f8fafc').stroke('#e2e8f0');
                doc.fillColor('#3b0764').fontSize(18).text(`SCORE TOTAL : ${scores.total} / 50`, 70, 220);
                doc.fontSize(16).fillColor('#10b981').text(`NIVEAU CECRL ESTIMÉ : ${niveau}`, 70, 255);

                // Détails par compétence [cite: 10-14]
                doc.fillColor('#000').moveDown(4);
                doc.fontSize(14).text('Détails des compétences :', { underline: true }).moveDown();
                doc.fontSize(12).text(`• Vocabulaire : ${scores.vocab} / 11`);
                doc.text(`• Conjugaison : ${scores.conj} / 15`);
                doc.text(`• Grammaire : ${scores.gram} / 24`).moveDown(2);

                // Footer
                doc.fontSize(10).fillColor('#999').text('Ce test est un outil d\'évaluation initiale pour personnaliser votre parcours de formation.', 50, 700, { align: 'center' });

                doc.end();
            });
        };

        const pdfBuffer = await generatePDF();

        // 5. ENVOI DE L'EMAIL À L'ÉQUIPE THDS (Admin)
        await transporter.sendMail({
            from: `"Système Test THDS" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_ADMIN,
            subject: `[Nouveau Test] ${prenom} ${nom} - Score: ${scores.total}/50`,
            html: `
                <div style="font-family: Arial; color: #333;">
                    <h2 style="color: #3b0764;">Nouveau Test de Positionnement</h2>
                    <p><strong>Candidat :</strong> ${prenom} ${nom}</p>
                    <p><strong>Score Global :</strong> ${scores.total}/50</p>
                    <p><strong>Niveau :</strong> ${niveau}</p>
                    <p>Retrouvez le rapport détaillé en pièce jointe.</p>
                </div>
            `,
            attachments: [{ filename: `Resultat_${nom}_Anglais.pdf`, content: pdfBuffer }]
        });

        // 6. ENVOI DE L'EMAIL AU CLIENT (Étudiant)
        await transporter.sendMail({
            from: `"THDS Formation" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Vos résultats du test de positionnement d'Anglais`,
            html: `
                <div style="font-family: Arial; color: #333; max-width: 600px; margin: auto;">
                    <div style="background: #3b0764; color: white; padding: 20px; text-align: center;">
                        <h1>Bravo ${prenom} !</h1>
                    </div>
                    <div style="padding: 20px; border: 1px solid #eee;">
                        <p>Bonjour ${prenom},</p>
                        <p>Merci d'avoir complété votre test de positionnement Business English.</p>
                        <p>Votre score est de <strong>${scores.total} / 50</strong>, ce qui correspond à un niveau <strong>${niveau}</strong>.</p>
                        <p>Nos conseillers vont étudier votre profil pour vous proposer le parcours le plus adapté.</p>
                        <p><i>Veuillez trouver votre rapport complet en pièce jointe.</i></p>
                        <br>
                        <p>Cordialement,<br><strong>L'équipe THDS</strong></p>
                    </div>
                </div>
            `,
            attachments: [{ filename: `Votre_Resultat_Anglais.pdf`, content: pdfBuffer }]
        });

        res.status(200).json({ message: 'Résultats calculés et rapports envoyés avec succès.' });

    } catch (error) {
        console.error('Erreur Backend:', error);
        res.status(500).json({ error: "Erreur lors du traitement du test." });
    }
});

export default router;