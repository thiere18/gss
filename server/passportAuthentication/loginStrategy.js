const Strategy = require('passport-local');
const db = require('../db');
const bcrypt = require('bcryptjs');

const loginStrategy = new Strategy({ usernameField: 'username' }, function(username, password, cb) {
    // Search user by email in DB
    db.query('SELECT * FROM users WHERE username = ? ', username, function(err, result) {
        if (err) {
            return cb({ message: 'Internal Server error', statusCode: 500 }, null);
        }
        const user = result[0];
        if (!user) {
            return cb({ message: 'No user found!!', statusCode: 400 }, null);
        }

        const userPassword = result[0].password;
        const isPasswordValid = bcrypt.compareSync(password, userPassword);

        // Validate user password
        if (!isPasswordValid) {
            return cb({ message: 'Email or Password is incorrect', statusCode: 400 }, null);
        }
        const currentUser = result[0];
        cb(null, currentUser);
    });
});

module.exports = loginStrategy;