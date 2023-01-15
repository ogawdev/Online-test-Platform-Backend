const express = require('express');
const mongoose =require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();


// app
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:false}));

app.use('/api',require('./routes/server'));

mongoose.connect(process.env.MONGO_URI_C,()=>{
    console.log('DB connected =>', process.env.MONGO_URI_C);
})

const PORT =  process.env.PORT || 5000 
app.listen(PORT,()=>{
    console.log('server started on port '+ PORT );
})