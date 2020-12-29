const passport = require('passport');
const db = require('../db');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            return done(err, null);
        }
        const user = result[0];
        return done(null, user);
    });
});

// Import all our strategies
const loginStrategy = require('./loginStrategy');
const signupStrategy = require('./signupStragegy');


// Configure our strategies
passport.use('local-signup', signupStrategy);
passport.use('local-signin', loginStrategy);


module.exports = passport;