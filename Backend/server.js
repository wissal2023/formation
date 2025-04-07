const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes'); // Assure-toi que le chemin est correct
const otpRoutes = require('./Routes/otpRoutes');

app.use(cors());
app.use(express.json());

// Utiliser les routes pour /api/users
app.use('/api/users', userRoutes);
app.use('/api/otp', otpRoutes);

// Lancer le serveur
app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000');
});