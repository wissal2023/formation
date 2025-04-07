require('dotenv').config();
const express = require('express');
const app = express();
const formationRoutes = require('./routes/formationRoutes');

const sequelize = require('./config/database');
const db = require('./db/models');

app.use(express.json()); // Pour parser le JSON

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to our API',
    });
});

/*
db.sequelize.sync()
  .then(() => console.log("Database schema updated"))
  .catch(err => console.error("Error updating database:", err));
*/

// ✅ Use the correct variable
app.use('/formations', formationRoutes);



app.use('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Page not found',
    });
});

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
    console.log('Server up & running on port', PORT);
});
