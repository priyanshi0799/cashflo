const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const requireLogin = require('../middleware/requireLogin');

const User = mongoose.model('User');



router.post('/signup',(req,res)=>{
    const {name, email, password} = req.body;
    const pic = req.body.pic;
    if(!email || !name || !password){
        res.status(422).json({error:'Please fill all the fields'})
    }
    User.findOne({email})
    .then((savedUser)=>{
        if(savedUser){
            res.status(422).json({error:'Email already in use'})
        }
        //Password is being stored in Encrypted Format
        bcrypt.hash(password,17)
        .then((hashedPass)=>{
            const user = new User({
                email,
                name,
                password:hashedPass,
                pic
            })
            user.save()
            .then(user=>{
                res.json({message:'Saved Successfully'})
            }).catch(err=>{
                res.json(err)
            })
        })
        
    }).catch(err=>{
        res.json(err)
    })
})

router.post('/signin',(req,res)=>{
    const {email, password} = req.body
    if(!email || !password){
        res.status(422).json({error:'Please fill all the fields'})
    }
    User.findOne({email})
    .then(savedUser => {
        if(!savedUser){
            res.status(422).json({error:'Invalid email or password'})
        }
        bcrypt.compare(password, savedUser.password)
        .then(matched=>{
            if(matched){
                //Sending the jwt token
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,pic} = savedUser;
                res.json({token,user:{_id,name,email,pic}})
            }else{
                res.status(422).json({error:'Invalid email or password'})
            }
        }).catch(err=>{
            res.status(422).json({error:err})
        })
    }).catch(err=>{
        res.status(422).json({error:err})
    })
})



module.exports = router