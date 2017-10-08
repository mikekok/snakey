// Dependencies
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('dotenv').config()

// Database
mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise

// App
const app = express()

// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Public
app.use(express.static('public'))

// View Engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Routes
app.use(require('./routes/main'))

// Server
app.listen(process.env.PORT)