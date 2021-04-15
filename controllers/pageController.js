const router = require('express').Router()
const authLockedRoute = require('../middleware/authenticateJWT')
require('../models')
const User = require('../models/User')
//get all pages for a user

//get all of the pages of the user stored in our db
router.get('/getAllPages/:userId',authLockedRoute, async(req,res) => {
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


//create a new blank page and store it in our db
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

router.post('/:userId/:PageName', authLockedRoute, async(req,res) => {
    console.log("edit page route is hit")
    try{
        const reqUserId = req.params.userId
        const PageName = req.params.PageName
        const localUserId = res.locals.user.id

    if(reqUserId !== localUserId){
        throw "UNEREXCEPTED EXCPECTATION";
    }
    // console.log(req.body)
    const pageData = await User.findById(
        {_id : reqUserId}
    ).select('pages').populate()
    let editIndex
    for(let i=0;i<pageData.pages.length;i++){
        console.log(pageData.pages[i].name)
        if(pageData.pages[i].name === PageName){
            editIndex = i
        }
    }
    console.log(pageData.pages[editIndex])
    // console.log(editIndex)
    pageData.pages[editIndex].html = req.body.content.html
    pageData.pages[editIndex].css = req.body.content.css
    await pageData.save()
    console.log(pageData)
    res.json({pageData:pageData})


    } catch(err){
        console.log(err)
        res.status(500).json({msg:'error with edit route'})
    }
})

module.exports = router