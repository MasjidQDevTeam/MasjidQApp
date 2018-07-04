'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const test = require('./routes/test123.js')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', index)

app.listen(3000, console.log('connecting to localhost:3000'))
