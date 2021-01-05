const db = require('../db');
const express = require('express');
const router = express.Router();
const User=require('../models/User')

function checkAuthentication(req, res, next) {
    const isAuthenticate = req.isAuthenticated();
    if (isAuthenticate) {
        return next();
    }

    res.status(401).json({
        message: 'Not authorized',
        statusCode: 401
    });
}

router.get('/user', checkAuthentication, (req, res) => {

        User.findOne({
            where: {
                id:req.user.id
            }
        }).then(function (data) {
            const user = data;
            delete user.password;
            return res.status(200).json(user);
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Internal Error',
                statusCode: 500
            });    
        })
      
});




module.exports = router;