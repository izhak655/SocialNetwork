const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
// const path = require("path")
const cookieParser = require('cookie-parser')

const { authToken } = require("../auth/authToken")
const mainFollow  = require('../classSystem/followSystem/mainFollowSystem')
router.use(cookieParser())
router.use(authToken)


router.get("/getFollowers", authToken, async (req, res) => {

    if(res.exists == false)
    {
        res.send(JSON.stringify({code:404,mess:"You must log in"}))
    }else{
        let userAut = new mainFollow(req.tokenData.id)
        let joinFollowTable = await userAut.checkInDb()
        res.send(JSON.stringify(joinFollowTable))
    }
})

router.post('/delete', jsonParser, async (req, res) => {


    let deleteIt = new mainFollow(req.tokenData.id)
    let result =  await deleteIt.deleteFromFollow(req.body.idFollower,req.tokenData.id)
    let refreshFriends = await deleteIt.checkInDb()

    res.send(JSON.stringify(refreshFriends))

})

router.post('/addFollower',jsonParser, async (req,res)=>{
    let addFollow = new mainFollow(req.tokenData.id)
    let result  = await addFollow.addIt(req.body.idFollower)
    if(result == 200){
        res.send(JSON.stringify({code:200,mess:"sucssefull"}))
    }else{
        res.send(JSON.stringify({code:404,mess:"not sucssefull"}))
    }
})
module.exports = router