require ('dotenv').config({path: `${process.cwd()}/.env`})
const express = require ('express')
const app = express();
const authRouter = require('./routes/authRoute');

app.use(express.json()); //converts data to json 

app.get('/', (req,res)=> {
    res.status(200).json({
        status:'success',
        message:'welcome to our api',
    })
})

// ✅ Sync Sequelize Models Before Starting Server
sequelize.sync({ alter: true })  // `alter: true` will update the schema without dropping data
  .then(() => {
      console.log('Database synced successfully.');
      const PORT = process.env.APP_PORT || 5000;
      app.listen(PORT, () => {
          console.log(`Server up & running on port ${PORT}`);
      });
  })
  .catch(err => {
      console.error('Error syncing database:', err);
  });
  
//all routes:
app.use('/auth', authRouter);

app.use('*', (req, res, next)=> {
    res.status(404).json({
        status:'fail',
        message:'page not Found',
    })
});


const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, ()=>{
    console.log('server up & running', PORT)
})