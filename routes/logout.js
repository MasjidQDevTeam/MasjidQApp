const logout = require('express').Router();
const models = require('../models');
const ejs = require('ejs');


logout.get("/", (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  res.redirect('/');
})

module.exports = logout;
