const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()

const path = require("path")
const cookieParser = require('cookie-parser')

const { authToken } = require("../auth/authToken")

const SignUp = require('../classSystem/usersSystem/singUpSystem')

let CheckValidInformation = require('../classSystem/usersSystem/CheckValidInformation');
const { getToken } = require('../models/token');
const Active = require('../classSystem/usersSystem/activeSystem');
const login = require('../classSystem/usersSystem/loginSystem');
const proSys = require('../classSystem/profileSystem/proSystem');

router.use(cookieParser())
// router.use(authToken)




router.post('/signUp',authToken, jsonParser, async (req, res) => {

  let classIt = new CheckValidInformation(req.body.name, req.body.email, req.body.pass)

  let checkIt = classIt.checkNameEmailPass()
  let checkExist = await classIt.cheackInDb()
  let signUps = new SignUp(req.body.name, req.body.email, req.body.pass)
  signUps.creatUser(res, checkIt, checkExist)

})

router.get("/active/:random",  (req, res) => {

  let active = new Active(req.params.random)
  active.doActive()
  res.sendFile(path.join(__dirname, '../public/completeRegister.html'));

})

router.post('/login',authToken, jsonParser, async (req, res,next) => {

 
  let classLogin = new login(req.body.name, req.body.pass)
  let checkPassAndGetToken = await classLogin.checkPassName()

  if (checkPassAndGetToken) {
    let cookieOption = classLogin.createCookie()
   

    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Expose-Headers','*')
    res.cookie('token', checkPassAndGetToken, cookieOption)

    res.send(JSON.stringify({ code: 200, mess: checkPassAndGetToken }));

  } else {
    res.send(JSON.stringify({ code: 404, mess: "שם משתמש או סיסמא אינם נכונים" }));
  }
})


router.post('/informtionProfile',authToken, jsonParser, async (req, res) => {

  let proSystem;
  let result;
try{
  if (res.exists == true) {

    if (req.tokenData.id && req.body.idUpload) {
      proSystem = new proSys()
      result = await proSystem.getInfor(req.body.idUpload)
      res.send(JSON.stringify(result))
    } else {
      proSystem = new proSys(req.tokenData.id)
      result = await proSystem.getInfor()
      res.send(JSON.stringify(result))
    }
  } else {
    res.send(JSON.stringify({ code: 404, mess: "Login problem" }))
  }
}catch{
  res.send(JSON.stringify({ code: 404, mess: "Login problem" }))
}


})



module.exports = router;
