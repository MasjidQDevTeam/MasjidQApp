const index = require('express').Router();
const ejs = require('ejs');

index.get("/", (req, res) => {
  res.render("homepage.ejs")
})

module.exports = index;
