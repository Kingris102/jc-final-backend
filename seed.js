const mongoose = require('mongoose');
const Game = require('./models/game.js');
require('dotenv').config();

async function seed(uri = process.env.MONGO_URI) {
  const resolvedUri = (uri || process.env.MONGODB_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017').trim();
  const dbName = process.env.DB_NAME || 'juegosDB';
  const allowInsecure = String(process.env.ALLOW_INSECURE_TLS || '').toLowerCase() === 'true';
  await mongoose.connect(resolvedUri, {
    dbName,
    tlsAllowInvalidCertificates: allowInsecure,
    serverSelectionTimeoutMS: 10000,
    family: 4,
  });
  console.log("Conectado. Insertando juegos...");

  await Game.insertMany([
    { title: "The Witcher 3", genre: "RPG", releaseYear: 2015, platform: "PC, PS4, Xbox" },
    { title: "World of Warcraft", genre: "MMORPG", releaseYear: 2004, platform: "PC" },
    { title: "Delta Force", genre: "Shooter táctico", releaseYear: 1998, platform: "PC" },
    { title: "Marvel Rivals", genre: "Shooter hero", releaseYear: 2024, platform: "PC" },
    { title: "God of War", genre: "Acción / Aventura", releaseYear: 2018, platform: "PS4" },
    { title: "Dispatch", genre: "Indie", releaseYear: 2021, platform: "PC" }
  ]);

  console.log("Datos insertados.");
  await mongoose.connection.close();
}

module.exports = seed;

// Permite ejecutar el seed directamente: `node seed.js`
if (require.main === module) {
  seed();
}