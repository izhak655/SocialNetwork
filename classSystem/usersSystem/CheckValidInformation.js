// const conDataBase = require('../../db/sql')
const users = require('../../db/userDB')
const { Op } = require("sequelize");
class CheckValidInformation {

    constructor(name, email, pass) {

        this.name = name
        this.email = email
        this.pass = pass

    }

    checkNameEmailPass(res) {

        this.objectvalid = {}

        this.objectvalid.name = /['a-z']/.test(this.name) == true ? true : false;

        this.objectvalid.email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email) == true ? true : false;

        this.objectvalid.pass = this.pass.length >= 4 == true ? true : false;

        let init = 0
        for (let key in this.objectvalid) {

            if (this.objectvalid[key] == true) {
                init++
            }

        }
        let result = init == 3 ? true : false;
        return result

    }

    async cheackInDb() {

        const findUser = await users.findOne({
            where: {
                [Op.or]: [
                    { firstName: this.name, },
                    { email: this.email, },
                    { password: this.pass, }
                ]
            }
        });

        if (findUser === null) {
         
            console.log('Not found!');
            return true
        } else {
            
            console.log(findUser instanceof users); // true
            console.log(findUser); // 'My Title'
            return false
        }
        // conDataBase.query(`SELECT * FROM users WHERE name='${this.name}' OR email='${this.email}'`, (err, result, fields) => {

        //     if (err) throw err
        //     if (result.length == 0) {
        //         callback(true)
        //     }
        //     else {
        //         callback(false)
        //     }
        // })

    }

}

module.exports = CheckValidInformation


    // noName(res) {
    //     res.send(JSON.stringify("Name is not courect"))
    // else if(this.objectvalid.name == false) this.noName(res)
    // else if(this.objectvalid.email == false) this.noEmail(res)
    // else if(this.objectvalid.pass == false) this.noPass(res)
    // }
    // noEmail(res) {
    //     res.send(JSON.stringify("Email is not courect"))
    // }
    // noPass(res) {
    //     res.send(JSON.stringify("pass is not courect"))
    // }