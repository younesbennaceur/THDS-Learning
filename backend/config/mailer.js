import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // Port sécurisé standard pour Gmail
  secure: true, // Utilise SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // --- OPTIONS POUR EVITER LE TIMEOUT SUR RENDER ---
  // Force l'utilisation de l'IPv4 (souvent la cause des ETIMEDOUT)
  family: 4, 
  // Augmente les délais d'attente
  connectionTimeout: 10000, // 10 secondes
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Vérification au démarrage
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Erreur configuration Nodemailer :", error);
  } else {
    console.log("✅ Nodemailer est prêt et connecté à Gmail !");
  }
});

export default transporter;