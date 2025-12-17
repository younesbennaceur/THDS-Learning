import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // Change si tu utilises OVH, Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Vérification silencieuse au démarrage
transporter.verify((error) => {
  if (error) console.error("❌ Erreur Mailer :", error);
  else console.log("✅ Service Email prêt !");
});

export default transporter;