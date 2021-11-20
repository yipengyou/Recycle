const express = require('express')
const passport = require('passport')
const router = express.router()

router.get('/login', function(req, res, next) {
    res.render('login')
})

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('/logout', function(req, res, next) {
    req.logout()
    res.redirect('/')
})

router.get('/auth/google/redirect',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/dashboard')
        res.json({ redicrect: '/dashboard' })
    })

module.exports = router