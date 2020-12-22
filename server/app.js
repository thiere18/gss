// import express from 'express'
const express = require('express')
const dotenv = require('dotenv')
const db = require('./db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
dotenv.config({ path: './.env' })

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST'],
    credentials:true
}))
// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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
app.use('/', require('./routes/page'));
app.use('/api', require('./routes/auth'));
app.use('/api/depot',require('./routes/depot'))

app.listen(process.env.PORT,()=>console.log(`Listening on port ${process.env.PORT}`))