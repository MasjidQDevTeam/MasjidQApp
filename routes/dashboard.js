const dashboard = require("express").Router();
const ejs = require('ejs');
const models = require('../models');

dashboard.get("/", (req, res) => {
  if (req.session.email && req.cookies.email_sid) {
    models.user.findOne({
        where: {
          email: req.session.email
        },
        attributes: ["user_type", "id", "full_name"]
      })
      .then((loggedInUserData) => {
        req.session.user_type = loggedInUserData.user_type;
        req.session.id = loggedInUserData.id;
        req.session.full_name = loggedInUserData.full_name;
        res.render("dashboard-enter-page", {
          full_name: req.session.full_name,
          user_type: req.session.user_type
        })
      })
  } else {
    res.redirect("/")
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

dashboard.get("/jamaah", (req, res) => {
  res.send("jamaah dashboard")
})

dashboard.get("/admin", (req, res) => {
  res.send("admin dashboard")
})

dashboard.get("/ansor", (req, res) => {
  res.send("ansor dashboard")
})


module.exports = dashboard;
