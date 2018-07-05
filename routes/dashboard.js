const dashboard = require("express").Router();
const ejs = require('ejs');

dashboard.get("/", (req, res) => {
  if (req.session.email && req.cookies.email_sid) {
    res.send("dashboard")
    console.log(req.session);
    console.log("------");
    console.log(req.cookies);
  } else {
    res.send("failed")
  }
})

module.exports = dashboard;
