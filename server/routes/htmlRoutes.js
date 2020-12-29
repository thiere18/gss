const express = require('express');
const router = express.Router();

function checkAuthentication(req, res, next) {
    const isAuthenticate = req.isAuthenticated();
    if (isAuthenticate) {
        if (req.url === '/') {
            return res.send({"msg": "profile page"})
        }
        return next();
    }

    if (!isAuthenticate && req.url === '/') {
        return next();
    }

    return res.send({"msg": "Not found "})
}

// Secure Routes
router.get('/', checkAuthentication, function (req, res) {
    return res.send({"msg": "home page"})
});

router.get('/profile', checkAuthentication, function (req, res) {
    return res.send({"msg": "profile page"})
});

// Public Routes
router.get('/login', function (req, res) {
    return res.send({"msg": "login  page"})
});

router.get('/signup', function (req, res) {
    return res.send({"msg": "signup page"})
});

router.get('/notauthorized', function (req, res) {
    return res.send({"msg": "not authorized page"})
});



module.exports = router;