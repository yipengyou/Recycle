const express = require('express');
const router = express.Router()

let temp = ''

router.get('/', function(req, res, next) {
    res.render('landing', { title: 'Re:cyK1e' })
})

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/google')
    } else {
        next()
    }
}

router.get('/dashboard', authCheck, function(req, res, next) {
    console.log(req.user)
    res.render('dashboard', { title: 'User Dashboard', user: req.user })
})

router.get('/form', authCheck, function(req, res, next) {
    res.render('form', { title: 'this is the form thing????? idk', user: req.user, otherVar: 'notSureWhatgoesHere, the original code had temp for a variable named drug' })
})

router.post('/pass', function(req, res, next) {
    console.log('temp went this way ' + temp)
    res.json({ redirect: '/form' })
})

router.post('/ads', function(req, res, next) {
    ///this is for ads or whatever card/links u have on the home page?
})

router.post('/profile', function(req, res, next) {
    ///profile page stuff? including user pic and points? have a placehodler for the pic
    ///also have a point history thing idk how to implment it so just do place holder?
})

module.exports = router