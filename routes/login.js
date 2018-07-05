const login = require('express').Router();
const models = require('../models');
const ejs = require('ejs');
const bcrypt = require('bcrypt');


login.get("/", (req, res) => {
  res.render("login", {
    error_message: null,
  });
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
        res.render("login", {
          error_message: "wrong email/password",
        });
      }
    })
    .catch(() => {
      res.render("login", {
        error_message: "wrong email/password",
      });
    })
}, (req, res) => {
  let input = req.body;
  req.session.email = input.email;
  console.log(req.session);
  res.redirect("/dashboard");
})

// login.post("/", (req, res) => {
//   res.send("boom")
// })

module.exports = login;
