const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()

const menuForum = require('../classSystem/forumsSystem/fourumsSys')
const { authToken } = require("../auth/authToken");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(authToken)

router.get('/allThread', async (req, res) => {

    let host = req.get('host');
    let get = new menuForum(null, host)
    let result = await get.getMess()

    res.send(JSON.stringify(result))

})

router.post('/creatNewThread', jsonParser, async (req, res) => {

    let io = require('../app').io;
    let host = req.get('host');
    let get = new menuForum(req.tokenData.id, host)
    let result = await get.CreateNewTheard(req.body.title, req.body.text)


    if (result) {
        let last = await get.lastTheard()
        if (last !== 404) {
            io.emit('getNewTheard', last)
            res.send(JSON.stringify({ code: 200, mess: "successful" }))
        } else {
            res.send(JSON.stringify({ code: 404, mess: "erorr" }))
        }
    } else {
        res.send(JSON.stringify({ code: 404, mess: "erorr" }))
    }
})

router.post('/commentList', jsonParser, async (req, res) => {

    // let io = require('../app').io;
    let host = req.get('host');
    let get = new menuForum(null, host)
    let result = await get.commentList(req.body.idParent)

    res.send(JSON.stringify({ code: 200, mess: result }))


})


router.post('/newComment', jsonParser, async (req, res) => {

    let io = require('../app').io;
    let host = req.get('host');
    let get = new menuForum(req.tokenData.id, host)
    await get.CreateComment(req.body.idParent, req.body.textReplay)
    let last = await get.lastComment(req.body.idParent)
    if (last !== 404) {
        io.emit('getNewReplay', last)
        res.send(JSON.stringify({ code: 200, mess: "good" }))
    } else {
        res.send(JSON.stringify({ code: 404, mess: "erorr" }))
    }

})




module.exports = router