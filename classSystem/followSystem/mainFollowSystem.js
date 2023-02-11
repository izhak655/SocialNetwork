const users = require('../../db/userDB')
const followDB = require('../../db/followDB')

class follow {

    constructor(id) {

        this.idUser = id
    }

    async checkInDb() {

        const checkIdInDb = await users.findAll({
            include: [{
                model: followDB,
                attributes: ['followers'],
                where: { userId: this.idUser },
                required: true,
               }],
               attributes: ['firstName','img']
            //    where: { id: this.idUser },
        });
        if (checkIdInDb === null) {
            
            res.send(JSON.stringify("not found friends"))
        } else {
            console.log(checkIdInDb.every(user => user instanceof followDB)); // true
            console.log("All users:", JSON.stringify(checkIdInDb, null, 2));
            // let ChangeAttribute = {friendTwo:checkIdInDb.}
            return checkIdInDb
        
        }
    }

    async deleteFromFollow(idFollower,idUser)
    {
        let deleteFromDb = await followDB.destroy({
            where: { userId: idUser , followers: idFollower }
        });
        return deleteFromDb
    }

    async addIt(idFollower){

        let checkExitFollower = await followDB.findOne({
            where: {userId:this.idUser, followers:idFollower}
        })
        if(checkExitFollower == null)
        {
            try {
                let addFollowers = await followDB.create({
                    userId: this.idUser,
                    followers: idFollower
    
                })
                console.log(addFollowers.toJSON()); // This is good!
                console.log(JSON.stringify(addFollowers, null, 4)); // This is also good!
                return 200
            } catch {
                return 404
            }
        }else {
            return 404
        }        

    }
}

module.exports = follow