const router = require('express').Router()

router.get('/', require('../middleware/authenticateJWT'), (req, res) => {
    console.log("You've successfully hit the example resource")
    res.json({ 
        msg: "You've successfully accessed the auth locked resource",
    })
})

module.exports = router