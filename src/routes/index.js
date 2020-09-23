const express = require('express');
const router= express.Router();

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}
router.get('/index', isLoggedIn, (req, res) =>{
 res.render('index.html', {
        user: req.user
    });
});

router.get('/manuela', isLoggedIn, (req, res) =>{
    res.render('manuela.html', {
        user: req.user
    });
});

router.get('/Luciana', isLoggedIn, (req, res) =>{
    res.render('Luciana.html',{
        user: req.user
    });
});

router.get('/Julieta', isLoggedIn, (req, res) =>{
    res.render('Julieta.html', {
        user: req.user
    });
});

router.get('/navidad', isLoggedIn, (req, res) =>{
    res.render('navidad.html', {
        user: req.user
    });
});
router.get('/paseos', isLoggedIn, (req, res) =>{
    res.render('paseos.html', {
        user: req.user
    });
});
router.get('/mas', isLoggedIn, (req, res) =>{
    res.render('mas.html', {
        user: req.user
    });
});
router.get('/meetus', isLoggedIn, (req, res) =>{
    res.render('meetus.html', {
        user: req.user
    });
});


module.exports = router;