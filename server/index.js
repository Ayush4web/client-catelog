require('dotenv').config()
require('express-async-errors')

const path = require('path')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const BadRequest = require('./errors/BadRequest')

// middlewares
const customErrorHandler = require('./middleware/customErrorHandler')
const notfound = require('./middleware/Notfound')

// Routers
const authRouter = require('./routes/authRoute')
const quoteRouter = require('./routes/quoteRoute')

app.use(express.json())
app.use(cors())
app.use(cookieParser())

const port = process.env.PORT || 5000

app.use('/api/v1', authRouter)
app.use('/api/v1/quotes', quoteRouter)

// social login
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')

require('./socialLogin/google')
require('./socialLogin/passport')

app.use(
  session({
    secret: 'secr3t',
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())
// for sending msg to UI such as error msg
app.use(flash())

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
)

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    if (!req.user) {
      res.status(401).json({ success: 'false', msg: 'Authentication Failed' })
    }
    const { name, email, profileImg } = req.user
    const token = jwt.sign({ name, email, profileImg }, process.env.JWT_SECRET)

    res.cookie('token', token)
    res.redirect('http://localhost:3000/dashboard')
  }
)

app.use(customErrorHandler)
app.use(notfound)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    app.listen(port, () =>
      console.log(`Server is listening on port: ${port}...`)
    )
  } catch (error) {
    throw new BadRequest('Cannot Connect to db')
  }
}
start()
