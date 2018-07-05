const login = require('express').Router();
const models = require('../models');
const ejs = require('ejs');
const bcrypt = require('bcrypt');


login.get("/", (req, res) => {
  res.render("login");
})

// login.post("/", (req, res, next) => {
//   let input = req.body;
//   models.user.findOne({
//       where: {
//         email: input.email
//       },
//       attributes: ["password"]
//   )}
//
//
// }, (req, res) => {
//   res.send("success");
// })

module.exports = login;
