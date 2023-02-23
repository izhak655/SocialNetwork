const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()



const { authToken } = require("../auth/authToken")
const Uploads = require('../classSystem/fileSystem/upLoadSystem')
const multer = require('../auth/middelMulter');
const deleteFile = require('../classSystem/fileSystem/deleteFiles');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(authToken)

router.get('/getFiles', async (req, res) => {

    var host = req.get('host');
    let get = new Uploads(null, host)
    let result = await get.getFiles()
    res.send(JSON.stringify(result))

})

router.post('/upload', authToken, multer.single('file'), async (req, res) => {


    var host = req.get('host');
    let upF = new Uploads(req.tokenData.id, host, req.file.originalname, req.body.name)
    let result = await upF.upFile()
    if(result == 200)
    {
        res.send(JSON.stringify({code:200,mess:"file  uploaded"}))
    }else{
        res.send(JSON.stringify({code:404,mess:"file didn't upload"}))
    }
})

router.post('/uploadImgProfile', multer.single('file'), async (req, res) => {

  
    let upF = new Uploads(req.tokenData.id, null, req.file.originalname, null)
    let result = await upF.uploadImg()
    if(result == 200)
    {
        res.send(JSON.stringify({code:200,mess:"file  uploaded"}))
    }else{
        res.send(JSON.stringify({code:404,mess:"file didn't upload"}))
    }
})


router.post('/deleteFile',jsonParser,async(req,res)=>{
    let fileDeleteClass = new deleteFile(req.body.name)
    let result = await fileDeleteClass.deleteFileByNameFile()
    if(result == 404){
        res.send(JSON.stringify({code:404,mess:"Something's wrong"}))
    }else{
        var host = req.get('host');
        let get = new Uploads(null, host)
        let result = await get.getFiles()

        res.send(JSON.stringify({code:200,mess:"Deleted successfully"}))
    }
})
module.exports = router;

