var express = require('express');
var router = express.Router();

/* GET home page. */
const path = require("path")


router.get('/', (req,res)=>{

    res.sendFile(path.join(__dirname, '../public/initToHtml.js'));  
})
module.exports = router;

// var origin = req.get('origin');
// console.log(origin)