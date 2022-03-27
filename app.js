const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const Router = require('./route/router')
const globalErrorHanddler = require('./middlewares/errorHanddler')
const notFound = require('./route/notFound')
const AppError = require('./utils/AppError')
const CatchAsync = require('./utils/CatchAsync')

const app = express();
app.use(express.json())
app.use(Router);




app.use(notFound)



app.use(globalErrorHanddler)

const start = CatchAsync( async(uri, port)=>{
    await mongoose.connect(uri).then(console.log('Database connected Succesfully!'));
    app.listen(port, console.log(`server running on port: ${port}`));
})

start(process.env.MONGO, process.env.PORT);
