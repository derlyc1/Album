const express = require('express');
const router = express.Router();
const passport = require('passport');

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

router.get('/index', (req, res) => {
    res.render('index.html');
});
router.get('/', (req, res) => {
    res.render('login.html', {
        message: req.flash('loginMessage')
    });
});
router.post('/', passport.authenticate('local-login', {
    successRedirect: '/index',
    failureRedirect: '/',
    failureFlash: true
}));

router.get('/signup', (req, res) => {
    res.render('signup.html', {
        message: req.flash('signupMessage')
    });
});
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/index',
    failureRedirect: '/signup',
    failureFlash: true
}));
router.get('/index', isLoggedIn, (req, res) => {
    res.render('index.html', {
        user: req.user
    });
});
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;