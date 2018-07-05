const express = require('express');
const router = express.Router()
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');
const Model = require('../models/')

router.get('/', (req, res) => {
    res.render('e_sedekah')
})

router.post('/', function (req, res) {
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'y.andresudi@gmail.com',
            pass: '989nelson'
        } 
    })

    let mailOptions = {
        from: '"E-Sedekah" <y.andresudi@gmail.com>', 
        to: req.body.to, 
        subject: req.body.nominal, 
        html: '<b>Terimakasih Sudah Sedekah di MasjidQ</b>' 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            res.redirect('/sedekah_online')
        });

  
        Model.user.findOne({where: {full_name: req.body.full_name}, attributes: ["id"]}) 
        .then(dataUser => {
            let obj = {
                nominal: req.body.nominal,
                userId: dataUser.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            }   
            Model.e_sedekah.create(obj)
            .then(data => {
                res.render('e_sedekah', {dataUser: dataUser, data:data})
            })
        })

});



module.exports = router