const router = require('express').Router()
const googlePassport = require('../config/googlePpConfig')

// This is the route the client hits to get redirected to Google
// And over at the Google website, they will log in with their
// Google account credentials
router.get('/google', googlePassport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback', 
    googlePassport.authenticate('google', { failureRedirect: '/login', session: false }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
)