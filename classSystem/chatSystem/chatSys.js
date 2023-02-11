const chatDb = require("../../db/chatsDB")
const Users = require("../../db/userDB")
class menuChat {
    constructor(id,domain){
        this.id = id
        this.domain = domain
    }

    async getMess(){
        let result = await chatDb.findAll({
            include: [{
                model: Users,
                attributes: ['firstName','img']
                // where: { id: fileDb.userId },
                // // required: false,
            }],
            attributes: ['message', 'userId','createdAt'],
            where: { domain: this.domain },
        });
        
        if(this.id){
            for(let i in result)
            {
                if(result[i]['userId'] == this.id)
                {
                    result[i]['dataValues']['myMess'] = true
                }
            }
        }

        return result
    }

    async newMess(mess){
        
        let createMess = await chatDb.create({
            message:mess,
            userId: this.id,
            domain: this.domain
        })

        return createMess
    }

    async lastMess(){
        let result = await chatDb.findOne({
            include: [{
                model: Users,
                attributes: ['firstName','img']
                // where: { id: fileDb.userId },
                // // required: false,
            }],
            order: [ [ 'id', 'DESC' ]],
            attributes: ['message', 'userId','createdAt'],
            where: { domain: this.domain },
        });

        return result
    }
}

module.exports = menuChat