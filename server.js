// Required Modules
require('dotenv').config()
const express = require('express')
const rowdy = require('rowdy-logger')
const morgan = require('morgan')
const passport = require('passport')

// Variables
const app = express()
const PORT = process.env.PORT || 8000
const rowdyResults = rowdy.begin(app)

// Middleware
app.use(morgan('dev'))
// grabs forms data and puts it in req.body
app.use(express.urlencoded({ extended: false }))
// grabs json data, and puts it in the req.body
app.use(express.json()) 
// initialize passport
app.use(passport.initialize())

// Controllers


// Routes
app.get('/', (req, res) => {
    res.json({ msg: 'Hello world!' })
})

// Listen!
app.listen(PORT, () => {
    rowdyResults.print()
    console.log('Server is now listening on port', PORT, '🌊')
})