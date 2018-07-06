const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()
const ejs = require('ejs')

router.get('/', (req, res) => {
    res.render('verification_email')
})

router.get('/send', (req, res) => {
    rand=Math.floor((Math.random() * 100) + 54)
    host = req.get('host')
    link="http://"+req.get('host')+"/verify?id="+rand
    mailOptions={
        to: req.body.email,
        subject: "Please confirm bro",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    console.log(mailOptions)
    smtpTransport.sendMail(mailOptions, (error, respons => {
        if (error) {
            console.log(error)
            res.end("error")
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    })) 
})

router.get('/verify', (req, res) => {
    console.log(req.protocol+":/"+req.get('host'))
    
    if((req.protocol+"://"+req.get('host'))==("http://"+host)) {
        console.log("Domain is matched. Information is from Authentic email")

        if(req.query.id==rand) {
            console.log('email is verified')
            res.emd("<h1> Email "+mailOptions.to+" is been Successfully verified")
        } else {
            console.log("email is not verified")
            res.end("<h1>Bad Request</h1>")
        }
    }  else {
        res.end("<h1>Request is from unknown ")
    }
})

module.exports = router