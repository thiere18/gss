const Strategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User=require('../models/User')
const loginStrategy = new Strategy({ usernameField: 'username' },  function(username, password, cb) {
    User.findOne({
        where: {
            username: username
        }
    }).then( (result)=> {

        if (!result) {
            return cb({ message: 'No user found!!', statusCode: 400 }, null);
        }

        const userPassword = result.password;
        const isPasswordValid = bcrypt.compareSync(password, userPassword);

        // Validate user password
        if (!isPasswordValid) {
            return cb({ message: 'Email or Password is incorrect', statusCode: 400 }, null);
        }
        const currentUser = result;
        cb(null, currentUser);
    }).catch(function (err) {
        return cb({ message: 'Internal Server error', statusCode: 500 }, null);

    })

     });
module.exports = loginStrategy;