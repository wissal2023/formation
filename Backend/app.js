// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./db/models');
const db = require('./db/models');
const cors = require('cors');

const formationRoutes = require('./routes/formationRoutes');
const formationDetailsRoutes = require('./routes/formationDetailsRoutes');
const userRoute = require('./routes/userRoute'); 
const docRoute = require('./routes/docRoute'); 
const otpRoutes = require('./routes/otpRoutes');
const certificationRoutes = require('./routes/certificationRoutes');
const dailyStreakRoutes = require('./routes/dailyStreakRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const noteDigitaleRoutes = require('./routes/noteDigitaleRoutes');
const questionRoutes = require('./routes/questionRoutes');
const quizRoutes = require('./routes/quizRoutes');
const quizProgRoutes = require('./routes/quizProgRoutes');
const recompenseRoutes = require('./routes/recompenseRoutes'); 
const reponseRoutes = require('./routes/reponseRoutes'); 
const videoRoutes = require('./routes/videoRoutes');


app.use(express.json()); 
app.use(cors());

// ******************* ALL ROUTES *******************
app.get('/', (req,res)=> {
    res.status(200).json({
        status:'success',
        message:'welcome to our api',
    })
})

// ******************* HEAD ROUTES *******************
app.use('/users', userRoute);
app.use('/otp', otpRoutes);
app.use('/formations', formationRoutes);
app.use('/formation-details', formationDetailsRoutes);
app.use('/documents', docRoute );
app.use('/certifications', certificationRoutes);
app.use('/streaks', dailyStreakRoutes);
app.use('/evaluations', evaluationRoutes);
app.use('/notedigitales', noteDigitaleRoutes);
app.use('/questions', questionRoutes);
app.use('/quizzes', quizRoutes);
app.use('/quizprogs', quizProgRoutes);
app.use('/api/recompenses', recompenseRoutes);
app.use('/reponses', reponseRoutes);
app.use('/videos', videoRoutes);


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



/*
db.sequelize.sync()
  .then(() => console.log("Database schema updated"))
  .catch(err => console.error("Error updating database:", err));
*/

