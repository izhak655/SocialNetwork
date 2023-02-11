const friends = require("../../db/friendsDB")
const users = require('../../db/userDB')
const { Op } = require("sequelize");
class autenUser {

    constructor(id) {

        this.idUser = id
    }

    async checkInDb() {

            const checkIdInDb = await users.findAll({
                include: [{
                    model: friends,
                    attributes: ['friendTwo'],
                    where: { friendOne: this.idUser },
                    required: true,
                   }],
                   attributes: ['firstName','img'],
                //    where: { id: this.idUser },
            });
            if (checkIdInDb === null) {
                
                res.send(JSON.stringify({code:404,mess:"erorr"}))
            } else {
                console.log(checkIdInDb.every(user => user instanceof users)); // true
                console.log("All users:", JSON.stringify(checkIdInDb, null, 2));
         
                return checkIdInDb
            
            }
      
    }

    async deleteFriend(idFriend,idUser)
    {
        let deleteFromDb
        try{
            deleteFromDb = await friends.destroy({
                where: { friendOne: idUser , friendTwo: idFriend }
            });
            return deleteFromDb
        }catch{
            return false
        }
     
    
    }

    async addIt(id)
    {
        try {
            let addFrined = await friends.create({
                friendOne: this.idUser,
                friendTwo: id

            })
            console.log(addFrined.toJSON()); // This is good!
            console.log(JSON.stringify(addFrined, null, 4)); // This is also good!
            return 200
        } catch {
            return 404
        }
    }
}

module.exports = autenUser