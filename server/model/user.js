const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    pic:{
        type: String,
        default: 'https://res.cloudinary.com/priyanshi/image/upload/v1589637957/noimg_mmobp9.jpg'
    }
})

mongoose.model('User',userSchema)