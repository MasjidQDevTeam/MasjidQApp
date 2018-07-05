'use strict'
const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const app = express();
const session = require('express-session');
const index = require('./routes/index');
const register = require('./routes/register');
const login = require('./routes/login');


app.set('view engine', 'ejs');
app.set("trust proxy", 1);

app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: "test",
  resave: false,
  saveUninitialized: false,
}))


app.use('/', index)
app.use('/register', register)
app.use('/login', login)

app.listen("3000", console.log('connecting to localhost:3000'))
