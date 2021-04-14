// From the passport.js documentation for express-4.x-facebook-example
// https://github.com/passport/express-4.x-facebook-example/blob/master/server.js

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')


const initial_html = '<div>\n\t<div>\n\t\t<h1>Put Some</h1>\n\t</div>\n\t<div>\n\t\t<h2>HTML here! </h2>\n\t</div>\n</div>\n<a href="samplelink">Sample Link</a>'
const initial_css = "h1{color:red;}\nh2{color:blue;}"

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
                photos: profile.photos,
                pages: [{name:"Main",html:initial_html,css:initial_css}]
            })
            console.log(newUser)
            return cb(null, newUser)
        }
    }
));

module.exports = passport
