const dashboard = require("express").Router();
const ejs = require('ejs');
const models = require('../models');
const nodeMailer = require('nodemailer');

dashboard.get("/", (req, res) => {
  if (req.session.email && req.cookies.email_sid) {
    models.user.findOne({
        where: {
          email: req.session.email
        },
      })
      .then((loggedInUserData) => {
        req.session.user_type = loggedInUserData.user_type;
        req.session.userId = loggedInUserData.id;
        req.session.full_name = loggedInUserData.full_name;
        // console.log(req.session);
        res.render("dashboard-enter-page", {
          full_name: req.session.full_name,
          user_type: req.session.user_type
        })
      })
  } else {
    res.redirect("/")
  }
})

var sessionChecker = ((req, res, next) => {
  console.log("sessionChecker2 processing....");
  if (!req.session.email) {
    res.redirect("../");
  } else {
    next();
  }
})

var sessionChecker4 = ((req, res, next) => {
  console.log("sessionChecker4 processing....");
  if (req.session.user_type !== "Admin") {
    res.redirect("/dashboard");
  } else {
    next();
  }
})

var sessionChecker5 = ((req, res, next) => {
  console.log("sessionChecker5 processing....");
  if (req.session.user_type !== "Jamaah") {
    res.redirect("/dashboard");
  } else {
    next();
  }
})

var sessionChecker6 = ((req, res, next) => {
  console.log("sessionChecker6 processing....");
  if (req.session.user_type !== "Ansor") {
    res.redirect("/dashboard");
  } else {
    next();
  }
})

dashboard.post("/", (req, res) => {
  // console.log(req.cookies);
  // console.log(req.session);
  if (req.session.user_type === "Admin") {
    res.redirect("/dashboard/admin")
  } else if (req.session.user_type === "Ansor") {
    res.redirect("/dashboard/ansor")
  } else if (req.session.user_type === "Jamaah") {
    res.redirect("/dashboard/jamaah")
  } else {
    res.send("woops")
  }
})

dashboard.get("/jamaah", sessionChecker, sessionChecker5, (req, res) => {
  res.render("jamaahPage")
})

dashboard.post("/jamaah", sessionChecker, (req, res) => {
  let transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'hacktiv8andresudi@gmail.com',
      pass: 'hacktiv8Super'
    }
  })

  let mailOptions = {
    from: '"MasjidQ" <hacktiv8andresudi@gmail.com>',
    to: req.session.email,
    subject: "E-Sedekah Thank You Note",
    // text: `Assalamualaikum ${req.session.full_name}\n with nominal ${req.body.nominal}`
    text: `Assalamualaikum ${req.session.full_name},\nThank you for your E-Sedekah with nominal:\nRp. ${req.body.nominal}\nWassalamualaikum`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  })

  console.log(req.session);

  models.e_sedekah.create({
      nominal: req.body.nominal,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: req.session.userId,
    })
    .then(() => {
      res.render('jamaahPage')
    })
    .catch((err) => {
      console.log(err.message);
    })


})

dashboard.get("/admin", sessionChecker, sessionChecker4, (req, res) => {
  models.prayer.findAll({
      order: [
        ["id", "ASC"]
      ],
      include: [models.user],
    })
    .then((userPrayerData) => {
      res.render("adminPage", {
        userPrayerData: userPrayerData,
      })
    })
})

dashboard.get("/ansor", sessionChecker, sessionChecker6, (req, res) => {
  res.send("ansor dashboard")
})


module.exports = dashboard;
