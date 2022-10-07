const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { Auth, LoginCredentials } = require("two-step-auth");
const nodemailer=require('nodemailer');

//REGISTER
router.post("/register", [
  body('username', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 digits').isLength({ min: 5 }),
], async (req, res) => {

  // Check for errors after validating
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: 'Sorry, an user with this email already exists' })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    user = await newUser.save();
    res.status(200).json(user);
    
    


  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")
  }
});

//LOGIN
router.post("/login", [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

  // Check for errors after validating
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
    
    

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error");
  }
});
// Sending otp

router.post("/sendOtp",async (req,res) => {
  const emailId = req.body.email;
  const otp = req.body.Otp;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: 'avonbrunton@gmail.com',
      pass: 'glmfkdbvrudpkpnh',
    }
    
});
 


  var mailOptions={
    to: emailId,
   subject: "Otp for registration is: ",
   html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" 
 };
 
 transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.status(200).json(otp);
});
})

module.exports = router;
