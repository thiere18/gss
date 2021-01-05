const express = require('express')
const dotenv = require('dotenv')
const db = require('./db')
const cors = require('cors')
const passport = require('./passportAuthentication');
const authenticationRoute = require('./routes/authentication');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const cookieSession = require('cookie-session');
dotenv.config({ path: './.env' })
const app = express();
app.use(express.urlencoded({
    extended: false
}));
app.use(cors())
app.use(express.json());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // one day in miliseconds
    name: 'session',
    keys: ['key1', 'key2']
}));


db.authenticate()
.then(() => console.log('Mysql Connected...'))
.catch(err => console.log('Error: ' + err))


app.use(passport.initialize());
app.use(passport.session());

app.use('/', authenticationRoute);
app.use('/', apiRoutes);
app.use('/', htmlRoutes);
app.listen(process.env.PORT,()=>console.log(`Listening on port ${process.env.PORT}`))