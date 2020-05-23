const express = require('express');
const mongoose = require('mongoose');
const PORT = 5000;
const app = express();
//Connection with MONGODB
const { MONGOURI } = require('./keys');

require('./model/user')
app.use(express.json())
app.use(require('./routes/auth'))

mongoose.connect(MONGOURI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
mongoose.connection.on('connected',()=>{
    console.log('Connected')
})

mongoose.connection.on('error',(err)=>{
    console.log('Error',err)
})

app.listen(PORT,()=>{
    console.log('Server is running on ',PORT)
})