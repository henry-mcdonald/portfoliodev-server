const router = require('express').Router()
const authLockedRoute = require('../middleware/authenticateJWT')
require('../models')
const User = require('../models/User')
//get all pages for a user


router.get('getAllPages/:userId',authLockedRoute, async(req,res) => {
    console.log("get user pages route is hit")
    try{
    const reqUserId = req.params.userId
    const localUserId = res.locals.user.id
    if(reqUserId !== localUserId){
        throw new Exception("Ids don't match");
    }

    const pageData = await User.findById(
        {_id : reqUserId}
    ).select('pages').populate()
    
    res.json({pageData:pageData})

    } catch (err){
        console.log(err)
        res.json({msg:"user ID doesn't match userId of request"})
    }
})

router.get('/:userId/:newPageName/new', authLockedRoute, async(req,res) =>{
    console.log("post new page route is hit")
    try{

        const reqUserId = req.params.userId
        const newPageName = req.params.newPageName
        const localUserId = res.locals.user.id
    if(reqUserId !== localUserId){
        throw "UNDEREXPECTED EXCEPTION";
    }
    const pageData = await User.findById(
        {_id : reqUserId}
    ).select('pages').populate()
    console.log(pageData.pages.length)
    for(let i=0;i<pageData.pages.length;i++){
        
        if(pageData.pages[i].name === newPageName){
            throw 'This Page Already Exist'
        }
    }

    pageData.pages.push({name:newPageName,css:"",html:""})
    await pageData.save()
    //console.log(pageData)
    res.json({pageData:pageData})


    } catch(err){
        console.log(err)
        res.status(500).json({msg:"This page already exist!!"})

    }
})



module.exports = router