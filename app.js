'use strict'
const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const index = require('./routes/index');
const register = require('./routes/register');
const login = require('./routes/login');
const dashboard = require('./routes/dashboard');
const logout = require('./routes/logout');
const verify = require('./routes/verification_email')


app.set('view engine', 'ejs');
app.set("trust proxy", 1);

app.use(morgan("dev"))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())
app.use(session({
  key: "email_sid",
  secret: "test",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000,
  }
}))

app.use((req, res, next) => {
  if (req.cookies.email_sid && !req.session.email) {
    res.clearCookie("email_sid")
  }
  next();
});

app.use("/dashboard", dashboard)

var sessionChecker = ((req, res, next) => {
  console.log("sessionChecker1 processing....");
  if (req.session.email && req.cookies.email_sid && !req.session.user_type) {
    res.redirect("/");
  } else {
    next();
  }
})


app.use('/', index)
app.use('/register', sessionChecker, register)
app.use('/login', sessionChecker, login)
app.use('/logout', sessionChecker, logout)
app.use('/verify', verify)


app.listen(3000, console.log('connecting to localhost'))
