require ('dotenv').config({path: `${process.cwd()}/.env`})
const express = require ('express')
const app = express();
const { sequelize } = require('./db/models');


app.use(express.json()); //converts data to json 

app.get('/', (req,res)=> {
    res.status(200).json({
        status:'success',
        message:'welcome to our api',
    })
})
//Automatically updates your database tables to match Sequelize models.
sequelize.sync({ alter: true })  // Update tables without dropping data
  .then(() => console.log("Database schema updated"))
  .catch(err => console.error("Error updating database:", err));




const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, ()=>{
    console.log('server up & running', PORT)
})