// backend/app.js
require('dotenv').config();
require('./utils/cron');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express(); 
const { sequelize } = require('./db/models');
const db = require('./db/models');
const cors = require('cors');
const createFirstAdminUser = require('./utils/createFirstAdminUser');

const formationRoutes = require('./routes/formationRoutes');
const userRoute = require('./routes/userRoute'); 
const docRoute = require('./routes/docRoute'); 
const otpRoutes = require('./routes/otpRoutes');
const certificationRoutes = require('./routes/certifRoutes');
const dailyStreakRoutes = require('./routes/dailyStreakRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const noteDigitaleRoutes = require('./routes/noteDigitaleRoutes');
const questionRoutes = require('./routes/questionRoutes');
const quizRoutes = require('./routes/quizRoutes');
const quizProgRoutes = require('./routes/quizProgRoutes');
const recompenseRoutes = require('./routes/recompenseRoutes'); 
const reponseRoutes = require('./routes/reponseRoutes'); 
const videoRoutes = require('./routes/videoRoutes');
const helpRoutes = require('./routes/helpRoutes');
const helpTranslationRoutes = require('./routes/helpTranslationRoutes');

app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:5173', // my frontend URL
    credentials: true,
}));
app.use(cookieParser());
//app.use('/otp', otpRoutes);


// ******************* middelware *******************
app.use((req, res, next) => {
    req.lang = req.query.lang || req.headers['accept-language']?.split(',')[0].split('-')[0] || 'fr';
    next();
  });

// Error handler for multer (upload img)
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message.includes('Seuls les fichiers')) {
      return res.status(400).json({ error: err.message });
    }
    next(err);
});
// Serve static files from 'assets/uploads' directory
app.use('/assets/uploads', express.static(path.join(__dirname, 'assets', 'uploads')));


// ******************* HEAD ROUTES *******************
app.use('/users', userRoute);
app.use('/otp', otpRoutes);
app.use('/formations', formationRoutes);
app.use('/documents', docRoute );
app.use('/certifications', certificationRoutes);
app.use('/streak', dailyStreakRoutes);
app.use('/evaluations', evaluationRoutes);
app.use('/notedigitales', noteDigitaleRoutes);
app.use('/questions', questionRoutes);
app.use('/quizzes', quizRoutes);
app.use('/quizprogs', quizProgRoutes);
app.use('/recompenses', recompenseRoutes);
app.use('/reponses', reponseRoutes);
app.use('/videos', videoRoutes);
app.use('/helps', helpRoutes);
app.use('/help-translations', helpTranslationRoutes);  

app.use('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Page not found',
    });
});


const PORT = process.env.APP_PORT || 4000;
app.listen(PORT, () => {
    console.log('Server up & running on port', PORT);
    // Redirect to /signin after server starts
    app.get('/', (req, res) => {
        res.redirect('/signin');
    });
    createFirstAdminUser(); 
});