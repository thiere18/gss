// import express from 'express'
const express = require('express')
const dotenv = require('dotenv')
const db = require('./db')
const cors = require('cors')
const cookieParser = require('cookie-parser')

dotenv.config({ path: './.env' })

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

db.connect((error) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log('MySQL Connected ...');
    }

})

//Route
app.use('/',require('./routes/page'))
app.use('/api', require('./routes/auth'));

app.listen(5000,()=>console.log('listening on port 5000'))