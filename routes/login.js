const login = require('express').Router();
const models = require('../models');
const ejs = require('ejs');
const bcrypt = require('bcrypt');
const saltRounds = 8;


login.get("/", (req, res) => {
  res.render("login");
})

login.post("/", (req, res, next) => {
  let input = req.body;
  models.user.findOne({
      where: {
        email: input.email
      },
      attributes: ["password"]
    })
    .then((result) => {
      let passCheck = bcrypt.compareSync(input.password, result.password)
      if (passCheck === true) {
        next()
      } else {
        res.send("wrong password/email")
      }
    })
}, (req, res) => {
  res.send("success");
})

module.exports = login;
