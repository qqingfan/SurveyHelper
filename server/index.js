// commonJS modules for nodeJS
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require ('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/Users')
require('./services/passport.js') // this does not return anything

mongoose.connect(keys.mongoUri, { useNewUrlParser: true} );


// generate a running Express application
const app = express(); 

// app.use(): wire up middlewares inside the application
// middlewars are small functions that can be used to modify incoming requests to our app
// before they are sent off to the route handlers

// cookieSession: extracts cookie data
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
// passport: pulls user id out of cookie data
app.use(passport.initialize());
app.use(passport.session());

// difference between 'require' and 'import'
require('./routes/authRoute')(app);

// if no environment variable PORT (development environment), use default port 5000
// in production environment, use the dynamic port injected
const PORT = process.env.PORT || 5000;
app.listen(PORT);


