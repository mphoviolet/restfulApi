const express = require("express");
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register user
router.post("/register", async (req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        const user = await new User({
        username:   req.body.username,
        email:      req.body.email,
        password:   hashedPassword,
        contact:    req.body.contact,
        address:    req.body.address,
    });
    const newUser = await user.save();
    res.status(200).json(newUser);
    }catch(err){
        console.log(err);
    }
});

//login

router.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
           return res.status(500).json('user not found');
        }

        const  validPassword =  await  bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(404).json('Password is wrong');
        }else{
            return res.status(200).json(user);
        }
    }catch(err){
        res.status(500).json(err)
    }
    res.status(200).json({
        message:'login page'
    })

});
module.exports = router;
