require('dotenv').config()
const express = require('express')
const path = require('path')
const logger = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const passportSetup = require('setPassport')
const cookieSession = require('cookie-session')
const passport = require('passport')
const indexRouter = require('./routes/index')
const authRouter = require('./routes/authentication')

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['abcdefghijklmnopqrstuvwxyz']
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/', authRouter)

app.use(function(req, res, next) {
    next(createError(404))
})

app.use(function(err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('error')
})

const dbURI = process.env.DBURI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to mongoDB')
        app.listen(3000, () => {
            console.log('listening to 3000')
        })
    })

app.get('/', function(req, res) {
    res.send('hello world')
})

app.listen(3000, function() {
    console.log('server started on port 3000...')
})

module.exports = app