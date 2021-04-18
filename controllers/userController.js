const router = require('express').Router()
const authLockedRoute = require('../middleware/authenticateJWT')
require('../models')
const User = require('../models/User')
const PublicLink = require('../models/PublicLink')

// add username
router.get('/', authLockedRoute, async(req,res) => {
    res.json({msg:"Success!"})
})

router.get('/addUsername/:username',authLockedRoute,async(req,res) => {
    console.log(res.locals)
    try{
        const localUserId = res.locals.user.id
        findUser = await User.findById(
        {_id: localUserId}
    )
    //this would be an invalid request
    if(!findUser){throw 'User not found'}
    const usernameToTry = req.params.username
    
    findUserWithUsername = await User.findOne({username:usernameToTry})
    //console.log(findUserWithUsername)

    // do not allow any CRUD operations if the username is already in use
    if(findUserWithUsername){throw 'User with username already exist'} else{
        if(findUser.username){
            // if they already have a username, then delete that one
            await PublicLink.findOneAndDelete({publiclink:findUser.username})
        }
        // associate it as a public link, and with the user in question as well
        findUser.username = usernameToTry
        await findUser.save()
        await PublicLink.create({
            publiclink:usernameToTry
        })

    }
    res.json({findUser})

    } catch(err){
        console.log(err)
        res.json({msg:"Error with add username route"})
    }
    

})


module.exports = router