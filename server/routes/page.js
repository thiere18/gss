const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        path: "mon debut",
        cool : "mon nom"
    })
})

module.exports =router