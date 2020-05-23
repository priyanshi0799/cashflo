const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req,res,next)=>{
    const { authorization } = req.headers
    if(!authorization){
       return res.send(401).json({error:'You must be Logged In'})
    }
    const token = authorization.replace('Bearer ','')
    jwt.verify(token,JWT_SECRET,(err, payload)=>{
        if(err){
            return res.send(401).json({error:'You must be Logged In'})
        }

        const {_id} = payload
        User.findById(_id)
        .then(savedUser=>{
            req.user = savedUser
        })
        next()
    })
}