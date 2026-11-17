const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

dotenv.config();

const app = express();

// ===== Middlewares globaux =====
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== Connexion MongoDB =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch((err) => console.error('❌ Erreur MongoDB :', err.message));

// ===== Configuration Multer (upload d'images) =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ===== Route de test =====
app.get('/', (req, res) => {
  res.json({ message: '🚀 API ImmoFinder fonctionne !' });
});

// ===== Route upload d'images =====
app.post('/api/upload', upload.array('images', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Aucune image uploadée' });
  }
  const filePaths = req.files.map((file) => `/uploads/${file.filename}`);
  res.json({ images: filePaths });
});

// ===== Routes =====
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

// ===== Gestion des erreurs 404 =====
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// ===== Démarrage du serveur =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});