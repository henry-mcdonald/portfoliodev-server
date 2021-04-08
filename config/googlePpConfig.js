// From the passport.js documentation for express-4.x-facebook-example
// https://github.com/passport/express-4.x-facebook-example/blob/master/server.js

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    function(accessToken, refreshToken, profile, cb) {
        // Here is where we should save the user to the database.
        // We'll get to that later.
        // For now though..
        console.log('This is the user from Google', profile)
        return cb(null, profile)
    }
));

module.exports = passport
