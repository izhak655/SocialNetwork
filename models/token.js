const jwt = require('jsonwebtoken')

exports.getToken = (userId) =>{
    let token = jwt.sign({id:userId},"password")
    return token
}