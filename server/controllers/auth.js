const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {

    const { username, passwordReg } = req.body
    // const post = [username, password]
    const sql = "SELECT * from users WHERE username=? ";
    db.query(sql, [username], async (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.status(401).send({message:`l'utilisateur ${result[0].username} existe deja`})
        } else if (passwordReg.length < 4) {
            res.status(400).send({ message:"le mot de passe doit contenir au moins 4 caracteres"})
        }
        let hashedPassword = await bcrypt.hash(passwordReg, 8)
        db.query("INSERT INTO users SET ? ", { username: username, password: hashedPassword }, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log(result)
                res.status(200).send({message:`l'utilisateur ${username} a ete cree`})
            }
        })
        

    }
        
    )
};
exports.login = async (req, res) => {
    try {
        const { username, passwordReg } = req.body
        if (!username || !passwordReg) {
            res.status(400).send({ message: "veuillez saisir un nom d'utilisateur et un mot de passe vslide" })
        }
        db.query("SELECT * FROM users WHERE username=?", [username], async (error, result) => {
            if (!result || !(await bcrypt.compare(passwordReg, result[0].password))) {
                res.status(400).send({ message: "Nom d'utilisateur ou mot de passe incorrecte " })
            } else {
                const id = result[0].id
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })
                console.log(`the token is ${token}`)
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60
                    ),
                    httpOnly: true
                }
                res.cookie('gss', token, cookieOptions);
                res.status(201).send({ message: `bonjour ${username}` });
                console.log(result[0])
            }
        })
    } catch (error) {
        
    }
};

exports.reset = async (req, res) => {
    const { username, passwordReg } = req.body
    // const post = [username, password]
    const sql = "SELECT id from users WHERE username=? ";
    db.query(sql, [username], async (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length < 0) {
            res.status(401).send({message:`l'utilisateur ${result[0].username}  n'existe pas`})
        } else if (passwordReg.length < 4) {
            res.status(400).send({ message:"le mot de passe doit contenir au moins 4 caracteres"})
        }
        let hashedPassword = await bcrypt.hash(passwordReg, 8)
        db.query("UPDATE users SET ? ", { password: hashedPassword }, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log(result)
                res.status(200).send({message:`le mot de passe a ete modifie`})
            }
        })
        

    }
        
    )
};