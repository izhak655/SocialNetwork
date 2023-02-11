const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
cookieParser()
const verifyToken = "password"

exports.authToken = (req, res, next) => {
    // req.header("x-api-key")
    let token = req.cookies

    if (Object.keys(token).length == 0) {
        res.exists
        = false
        next()
    } else {
        try {
            res.exists = true
            let decodeToken = jwt.verify(token.token, verifyToken)
            req.tokenData = decodeToken
            next()
        }
        catch (err) {
            console.log(err);
            next()
        }
    }

}