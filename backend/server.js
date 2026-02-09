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

app.use(express.json()); 
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: false
}));

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
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ SERVEUR DÉMARRÉ SUR : http://localhost:${PORT}`);
  });
}

// ✅ Pour Vercel (serverless)
export default app;