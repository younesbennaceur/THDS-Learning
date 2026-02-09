import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import des routes
import eleveRoutes from './routes/eleve.js'; 
import formateurRoutes from './routes/formateur.js';
import testRoutes from './routes/test.js';
import contactRoutes from './routes/contact.js';
import reclamationRoutes from './routes/reclamations.js';

dotenv.config();

const app = express();

// --- CORRECTION ICI : CORS DOIT ÊTRE EN PREMIER ---
app.use(cors({
  origin: '*', // Autorise tout le monde (Vercel, Localhost, Ngrok)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Ajoute OPTIONS pour les preflights
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'], // Autorise le header spécial Ngrok
  credentials: false
}));

app.use(express.json()); 

// --- ROUTES ---
app.use('/api/eleve', eleveRoutes);
app.use('/api/formateur', formateurRoutes); 
app.use('/api/test', testRoutes); 
app.use('/api/contact', contactRoutes);
app.use('/api/reclamation', reclamationRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Serveur Blue Formation Backend est en ligne !');
});

// ✅ Pour local
const PORT = process.env.PORT || 5000;
// Note : J'ai enlevé la condition NODE_ENV pour être sûr qu'il démarre toujours en local pour tes tests
app.listen(PORT, () => {
    console.log(`✅ SERVEUR DÉMARRÉ SUR : http://localhost:${PORT}`);
});

// ✅ Pour Vercel (serverless)
export default app;