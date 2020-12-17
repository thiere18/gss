const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {

    const { username, password } = req.body
    // const post = [username, password]
    const sql = "SELECT * from users WHERE username=? ";
    db.query(sql, [username], async (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send("cet utilisateur existe deja")
        }
        let hashedPassword = await bcrypt.hash(password, 8)
        db.query("INSERT INTO users SET ? ", { username: username, password: hashedPassword }, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log(result)
                res.send("success")
            }
        })
        

    }
        
    )
};
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(400).send({ message:' Please enter a username and password '})
        }
        db.query("SELECT * FROM users WHERE username=?", [username], async (error, result) => {
            if (!result || !(await bcrypt.compare(password, result[0].password))) {
                res.status(401).send({ message: "Nom d'utilisateur ou mot de passe incorrecte " })
                console.log(result)
            } else {
                const id = result[0].id
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })
                console.log(`the token is ${token}`)
                const cookieOptions = {
                    expires: new Date(
                        Date.now() +process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60
                    ),
                    httpOnly: true
                }
                res.cookie('gss', token, cookieOptions);
                res.status(200).send("fin de la partie connexion");
            }
        })
    } catch(error) {
        
    }
}
