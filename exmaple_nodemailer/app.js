'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const Test = require('./routes/test123.js')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', Test)

app.listen(3000, console.log('connecting to localhost:3000'))