const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()

const menuChat = require('../classSystem/chatSystem/chatSys')
const { authToken } = require("../auth/authToken");



router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(authToken)

router.get('/sendAllMess', async (req, res) => {
    let get
    let host = req.get('host');
    if(res.exists){
        if(req.tokenData.id){
            get = new menuChat(req.tokenData.id, host)
        }
    }else{
        get = new menuChat(null, host)
    }


    let result = await get.getMess()
  
    res.send(JSON.stringify(result))
  
})

router.post('/getNewMess',jsonParser,async (req,res)=>{

    let io = require('../app').io;
  
    let host = req.get('host');
    let get = new menuChat(req.tokenData.id, host)
    await get.newMess(req.body.mess)
    let result =  await get.lastMess()
    let arrForThem = []
    arrForThem.push(result)
    io.emit('lastMess',arrForThem)

})


module.exports = router