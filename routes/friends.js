const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
// const path = require("path")
const cookieParser = require('cookie-parser')

const { authToken } = require("../auth/authToken")
const autenUser  = require('../classSystem/friendsSystem/userAutenticate')
router.use(cookieParser())
router.use(authToken)


router.get("/get", async (req, res) => {

    if(res.exists == false)
    {
        res.send(JSON.stringify("false"))
    }else{
        let userAut = new autenUser(req.tokenData.id)
        let joinFriendTable = await userAut.checkInDb()
        res.send(JSON.stringify(joinFriendTable))
    }
})

router.post('/delete', jsonParser, async (req, res) =>{

   
    let deleteIt = new autenUser(req.tokenData.id)
    let result =  await deleteIt.deleteFriend(req.body.idFriend,req.tokenData.id)
    let refreshFriends = await deleteIt.checkInDb()
    if(refreshFriends){
        res.send(JSON.stringify({code:200,mess:refreshFriends}))
    }else{
        res.send(JSON.stringify({code:404,mess:"not succesful"}))
    }
  

})

router.post('/addFriend',jsonParser, async (req,res)=>{
    let addFriend = new autenUser(req.tokenData.id)
    let result  = await addFriend.addIt(req.body.idFriend)
    if(result == 200){
        res.send(JSON.stringify({code:200,mess:"sucssefull"}))
    }else{
        res.send(JSON.stringify({code:404,mess:"not sucssefull"}))
    }
})

module.exports = router