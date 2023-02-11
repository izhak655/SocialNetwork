const users = require('../../db/userDB')
const { getToken } = require('../../models/token')

class login {
    constructor(name, pass) {
        this.name = name
        this.pass = pass
    }

    async checkPassName() {

        const findUser = await users.findOne({
            where: {
                firstName: this.name,
                password: this.pass,
                active: 1
            }
        });
        if (findUser === null) {
            console.log('Not found!');
        } else {
            console.log(findUser instanceof users); // true
            console.log(findUser.id); // 'My Title'
        }

        if (findUser) {

            let token = this.createToken(findUser.id)
            return token
        }
    }

    createToken(id) {

        let token = getToken(id)
        return token
    }

    createCookie() {

        let options = {
            maxAge: 1000 * 60 * 1000,
            // domain: 'http://localhost:',
            // path: '/4001/',
            SameSite: 'none',
            // secure: true,
            // httpOnly: true,
        }

        return options
    }
}

module.exports = login