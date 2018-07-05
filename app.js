'use strict'
const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const app = express();
const index = require('./routes/index');
const register = require('./routes/register');
const login = require('./routes/login');


app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())

app.use('/', index)
app.use('/register', register)
app.use('/login', login)

app.listen("3000", console.log('connecting to localhost:3000'))
