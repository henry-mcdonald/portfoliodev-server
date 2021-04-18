const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticateJWT = async (req, res, next) => {
    console.log("auth lock is hit")
    try {
        // Find the attached jwt
        const authHeader = req.headers.authorization

        // Try to decode jwt -- if it fails, will throw an error in catch block
        const decodedJwt = jwt.verify(authHeader, process.env.JWT_SECRET)

        // console.log('This is the user', decodedJwt)
        console.log(decodedJwt)

        const foundUser = await User.findById(decodedJwt._id)
        // Add the user to res.locals.user
        res.locals.user = foundUser
        console.log(res.locals.user)
        next()
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ msg: 'Failed to authenticate' })
    }
}

module.exports = authenticateJWT