const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function (passport){
    passport.serializeUser(function (user, done){
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done){
        User.findById(id, function(err, user){
            done(err,user);
        });
    });
    // signup
    passport.use('local-signup',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        User.findOne({'email': email}, function(err,user){
            if (err) {return done(err);}          
            if (user) {
                return done(null, false, req.flash('signupMessage', 'the email is already taken'));
            } else {
                var newUser = new User();
                newUser.email = email;
                newUser.password = newUser.generateHash(password);
                newUser.save(function(err){
                    if (err) {throw err;}
                    return done(null, newUser, req.flash('success_msg', 'You are registred'));
                });
             }
        })
    }));

     // login
     passport.use('local-login',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        User.findOne({'email': email}, function(err,user){
            if (err) {return done(err);}
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            } 
            if (!user.validatePassword(password)){
                return done(null, false, req.flash('loginMessage', 'wrong password'));
            }
            return done (null, user);
        })
    }));
} 