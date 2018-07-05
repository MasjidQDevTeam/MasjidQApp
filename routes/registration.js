const registration = require('express').Router();
const models = require('../models');
const ejs = require('ejs');


registration.get("/", (req, res) => {
  res.render("registration-page")
})

registration.post("/", (req, res) => {
  // console.log(req.body);
  let input = req.body;
  models.user.create({
    full_name: input.full_name,
    user_type: "Jamaah",
    email: input.email,
    password: input.password,
    salt: null,
    pahala_credit: null,
  })
})

module.exports = registration;
