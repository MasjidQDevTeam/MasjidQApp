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
const sedekah_online = require('./routes/e_sedekah')
const dashboard = require('./routes/dashboard');


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
  if (req.session.email && req.cookies.email_sid) {
    res.redirect("/dashboard");
  } else {
    next();
  }
})


app.use('/', sessionChecker, index)
app.use('/register', sessionChecker, register)
app.use('/login', sessionChecker, login)
app.use('/sedekah_online', sessionChecker, sedekah_online)

app.listen(3000, console.log('connecting to localhost'))
