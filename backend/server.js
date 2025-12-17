import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import des routes
import eleveRoutes from './routes/eleve.js'; 
import formateurRoutes from './routes/formateur.js';


dotenv.config();

const app = express();


app.use(cors()); 
app.use(express.json()); 


app.use('/api/eleve', eleveRoutes);
app.use('/api/formateur', formateurRoutes); 


app.get('/', (req, res) => {
  res.send('🚀 Serveur Blue Formation Backend est en ligne !');
});

// --- Démarrage ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`✅ SERVEUR DÉMARRÉ SUR : http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});