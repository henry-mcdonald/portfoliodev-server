// Required Modules
require('dotenv').config()
const express = require('express')
const rowdy = require('rowdy-logger')
const morgan = require('morgan')
const passport = require('passport')
const cors = require('cors')
require('./models') // connect to mongoDB

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

app.use(cors())

// Controllers
app.use('/auth', require('./controllers/authController'))
app.use('/exampleResource', require('./controllers/exampleResource'))
app.use('/users',require('./controllers/userController'))
app.use('/pages', require('./controllers/pageController'))


// Routes
app.get('/', (req, res) => {
    res.json({ msg: 'This is backend for portfolio.dev' })
})

// Listen!
app.listen(PORT, () => {
    rowdyResults.print()
    console.log('Server is now listening on port', PORT, '🌊')
})