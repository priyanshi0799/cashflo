const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const requireLogin = require('../middleware/requireLogin');

router.get('/home/:id',requireLogin,(req,res)=>{
    })