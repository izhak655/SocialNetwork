const nodemailer = require('nodemailer')
// const conDataBase = require('../../db/sql')
const users = require('../../db/userDB')
require('dotenv')


class SignUp {

    constructor(name, email, pass) {

        this.name = name
        this.email = email
        this.pass = pass

    }

    creatUser(res, checkIt,checkExist) {

        if (checkExist == true && checkIt == true) {

            this.number = Math.random();
            const create = users.create({
                 firstName: this.name,
                 email: this.email,
                 password: this.pass,
                 randoms: this.number
                });
                res.send(JSON.stringify({code: 200, mess: "succsefull"}))
                this.sendEmail(this.number)
            
        } else {
            res.send(JSON.stringify({code: 404, mess: "not succsefull"}))
        }
    }

    sendEmail(number) {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'izhakisak770@gmail.com',
                pass: 'bfhodpublahcqadp'
            }
        });

        let html = `<h1>Welcome to the future!!</h1><p>To complete the registration, please click on the following link:</p><a href='http://localhost:3000/users/active/${number}'>click here</a>`

        const mailOptions = {
            from: 'izhakisak770@gmail.com',
            to: this.email,
            subject: 'Sending Email using Node.js',
            html: html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = SignUp;