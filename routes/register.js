const register = require('express').Router();
const models = require('../models');
const ejs = require('ejs');


register.get("/", (req, res) => {
  // console.log(req.session);
  res.render("register-page", {
    error_message: null,
  })
})

register.post("/", (req, res) => {
  let input = req.body;
  models.user.create({
      full_name: input.full_name,
      user_type: input.role,
      email: input.email,
      password: input.password,
      salt: null,
      pahala_credit: null,
    }).then(() => {
      res.redirect("../")
    })
    .catch((err) => {
      // console.log(err);
      res.render("register-page", {
        error_message: err.message,
      })
    })
})

module.exports = register;
