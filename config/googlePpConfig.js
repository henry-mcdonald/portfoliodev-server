// From the passport.js documentation for express-4.x-facebook-example
// https://github.com/passport/express-4.x-facebook-example/blob/master/server.js

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    async function(accessToken, refreshToken, profile, cb) {
        // console.log('This is the user from Google', profile)

        // We need to look in our database for the user - see if it already exists
        const user = await User.findOne({
            provider: profile.provider,
            provider_id: profile.id
        })
        // If it doesn't, we want to create it
        // and save to DB
        if(user) {
            // We found the user in the database, just send that
            return cb(null, user)
        } else {
            // We didn't find a user, let's make one
            const newUser = await User.create({
                provider: profile.provider,
                provider_id: profile.id,
                displayName: profile.displayName,
                name: {
                    familyName: profile.name.familyName,
                    givenName: profile.name.givenName,
                    middleName: profile.name.middleName
                },
                photos: profile.photos
            })
            return cb(null, newUser)
        }
    }
));

module.exports = passport
