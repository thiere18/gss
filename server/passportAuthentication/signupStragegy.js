const Strategy = require('passport-local');
const db = require('../db');
const bcrypt = require('bcryptjs');

const localStrategy = new Strategy({ passReqToCallback: true }, function (req, username, password, cb) {
    // Search user by email in DB
    if (password.length < 4) {
        let message = 'Mot de passe trop court';
        return cb({ message, statusCode: 400 }, null);

    }
    db.query('SELECT * FROM users WHERE username = ? ', [req.body.username], function(err, result) {
        let message = 'Internal server error';
        if (err) {
            return cb({ message, statusCode: 500 }, null);
        }
        const user = result[0];
        // Check user exist
        if (user) {
            message = 'User already exist';
            return cb({ message, statusCode: 400 }, null);
        }
        
        const salt = bcrypt.genSaltSync(10);
        let newUser = {
            username: req.body.username,
            password: bcrypt.hashSync(password, salt),
        };

        // Create a new User
        db.query('INSERT INTO users SET ?', newUser, (err, data) => {
            if (err) {
                return cb({ message: 'Internal server error', statusCode: 500 }, null)
            }
            newUser.id = data.insertId;
            return cb(null, newUser);
        });
    });
});

module.exports = localStrategy;