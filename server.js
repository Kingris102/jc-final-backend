const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const gamesRoutes = require('./routes/games');
const reviewRoutes = require("./routes/reviews");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/games', gamesRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/games/reviews', reviewRoutes);
const PORT = process.env.PORT || 3000;

app.get('/health', (_req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    status: 'ok',
    db: states[mongoose.connection.readyState] || 'unknown'
  });
});

app.listen(PORT, () => console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`));

async function connectWithRetry(retries = 10, delayMs = 5000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const uri = (process.env.MONGODB_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017').trim();
      const dbName = process.env.DB_NAME || 'juegosDB';
      const allowInsecure = String(process.env.ALLOW_INSECURE_TLS || '').toLowerCase() === 'true';
      await mongoose.connect(uri, {
        dbName,
        tlsAllowInvalidCertificates: allowInsecure,
        serverSelectionTimeoutMS: 10000,
        family: 4,
      });
      console.log('✅ Conectado a MongoDB');
      return;
    } catch (err) {
      console.error(`❌ Intento ${attempt} fallido de conexión a MongoDB:`, err && err.message ? err.message : err);
      if (attempt < retries) {
        console.log(`⏳ Reintentando en ${delayMs / 1000}s...`);
        await new Promise(r => setTimeout(r, delayMs));
      } else {
        console.error('⚠️ No se pudo conectar a MongoDB después de múltiples intentos. El servidor seguirá corriendo y reintentará al guardar/leer.');
      }
    }
  }
}

connectWithRetry();