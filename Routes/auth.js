const express = require('express');
const User = require('../Models/Users');
const nodemailer = require('nodemailer');

const router = express.Router();

//Transporter for Email Sender
const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'joshiom822@gmail.com',
        pass:'pcobshwhmhjcvfda'
    }
    
});

router.post('/register/user',
    async(req,res)=>{
        const {usernm,email,pass} = req.body;

        try {
            
            const newUser = new User({

                usernm,
                email,
                password: pass,
                role:'user'
            });

            await newUser.save();
            res.status(201).json({message:"User Registered!!"});

        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Registration Error"})
        }
    }
);

let otpStore = {};

router.post('/sendotp',async(req,res)=>{

    const {email}=req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email]=otp;

    const mailOptions = {
        from: 'joshiom822@gmail.com',
        to: email,
        subject: 'Your OTP for Registration',
        text: `Your OTP is ${otp}`
    }

    await transporter.sendMail(mailOptions,async(err,info)=>{
        if(err)
        {
            console.log("Error otp sending")
            return res.status(500).json({message:'Otp sending Error!!!'});
        }
        else
        {
            console.log("otp send Success");
            return res.status(200).json({message:'Otp Send Successfull'});
        }
    });

});

router.post('/verifyotp',async(req,res)=>{

    const {email,otp} = req.body;

    if (otpStore[email]==otp) {
        console.log("OTP Verified");
        return res.status(200).json({msg:'Verify OTP'})
    } else {
        console.log("OTP Not Verified");
        return res.status(500).json({msg:'Please Enter Right OTP!'});
    }

});

router.post('/login',async(req,res)=>{
    const { email, pass } = req.body;
    console.log("user pass = ",pass);

    const result = await User.findOne({email});

    console.log(result);

    if (!result) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (result.password !== pass) {
        return res.status(401).json({ message: 'Incorrect password' });
    }

    const userdata = { id: result._id, email: result.email, role: result.role };

    return res.status(200).json({
        role: result.role,
        userdata
    });
    
});

module.exports = router;