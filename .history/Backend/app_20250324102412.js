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