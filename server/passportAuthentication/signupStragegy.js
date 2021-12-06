const Strategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendEmail=require('../controllers/sendEmail')
const localStrategy = new Strategy({ passReqToCallback: true }, function (req, username, password, cb) {
    // Search user by email in DB
    if (password.length < 4) {
        let message = 'Mot de passe trop court';
        return cb({ message, statusCode: 400 }, null);

    }
    User.findOne({
        where: {
            username: req.body.username 
        }
    }).then( (user)=> {
     
        if (user) {
            let message = `l'utilisateur ${username} existe deja`;
            return cb({ message, statusCode: 400 }, null);
                    }

        const salt = bcrypt.genSaltSync(10);
             let newUser = {
                username: req.body.username,
                 password: bcrypt.hashSync(password, salt),
                 email: req.body.email,
                createdAt: new Date
             };
        User.create(newUser)
            .then((data)=> {
            newUser.id = data.insertId;
                const from = 'thiernoibrahimalo@esp.sn'
                const to = newUser.email
                const subject = "Test vocale matinale"
                const message = `Bonjour  ${newUser.username} a ete cree 
                et que nous esperons que vous allez bien merci`
                sendEmail(to,from,subject,message )
            cb(null, data);
            }).catch(() => {
     return cb({ message: 'Internal server rror', statusCode: 500 }, null)
        })
        
    })


});

module.exports = localStrategy;