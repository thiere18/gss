const passport = require('passport');
const User = require('../models/User')
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(  function(id, done) {
    User.findOne({
        where: {
            id,
        }
    }).then(function (user) {
        return done(null, user);
    }).catch(function (err) {
        return done(err, null);

    })

    
});

// Import all our strategies
const loginStrategy = require('./loginStrategy');
const signupStrategy = require('./signupStragegy');


// Configure our strategies
passport.use('local-signup', signupStrategy);
passport.use('local-signin', loginStrategy);


module.exports = passport;