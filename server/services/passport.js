const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id); // use mongo id
});

// turn an id into a mongoDB instance
passport.deserializeUser((id, done) => {
    User.findById(id).then( user => {
        done(null, user);
    });
});


passport.use(
    //The redirect URI in the request should match the ones authorized for the OAuth client. 
        new GoogleStrategy(
            {
                clientID: keys.googleClientID,
                clientSecret: keys.googleClientSecret,
                callbackURL: '/auth/google/callback'
            }, 
            // after accessToken is retrieved, the callback arrow function will be called
            // ** access token: the permission to read user's profile, modify user's email list, etc.
            // ** refresh token: refresh the access token, which automatically expires after a specific time
            (accessToken, refreshToken, profile, done) => {
                User.findOne({ googleId: profile.id })
                    .then((existingUser) => {
                        if (existingUser) {
                            // already have a record with the given profile ID
                            // done() to resume the auth process
                            // ** 1st argument: error
                            // ** 2nd argument: user record
                            done(null, existingUser);
                        } else {
                            new User({googleId: profile.id}).save()
                                .then( user => done(null, user));
                        }
                    })            
                }
        )
    );