const express = require('express')
const morgan = require('morgan')
const app = express()
const http = require('http').Server(app)
const router = require('./src/router')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')

// DB Setup
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:auth/auth')

// App Setup
app.use(morgan('combined'))
app.use(cors())

app.use(passport.initialize())
app.use(passport.session())
router(app)

// Server Setup
const port = process.env.PORT || 3080
http.listen(port, '127.0.0.1', () => {
  console.log('Listening on *:3080')
})
