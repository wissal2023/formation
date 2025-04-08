// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./db/models');
const db = require('./db/models');
const cors = require('cors');

const formationRoutes = require('./routes/formationRoutes');
const userRoute = require('./routes/userRoute'); 
const docRoute = require('./routes/docRoute'); 
const otpRoutes = require('./routes/otpRoutes');

app.use(express.json()); 
app.use(cors());

/*
db.sequelize.sync()
  .then(() => console.log("Database schema updated"))
  .catch(err => console.error("Error updating database:", err));
*/


// ******************* ALL ROUTES *******************
app.get('/', (req,res)=> {
    res.status(200).json({
        status:'success',
        message:'welcome to our api',
    })
})

// ******************* HEAD ROUTES *******************
app.use('/formations', formationRoutes);
app.use('/users', userRoutes);
app.use('/api/otp', otpRoutes);
app.use('/documents', docRoute );

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
