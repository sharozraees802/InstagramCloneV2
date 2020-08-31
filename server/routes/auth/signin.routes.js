const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config/key');


//make sigiin routes

router.post('/signin',(req,res)=>{

    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:'Please Provided Email or Password'})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:'Invalid Email or Password'})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if (doMatch) {
               // res.json({message:'successfully sigined in'})
    
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id,name,email,followers,following} = savedUser
               res.json({token,user:{_id,name,email,followers,following}})
    
            }
            else{
                return res.status(422).json({error:'Invalid Email or Password'})
            }
        })
        .catch(err=>console.log(err))
    
    
    })
    .catch(err=>console.log(err))
    
    
    })
    module.exports = router
