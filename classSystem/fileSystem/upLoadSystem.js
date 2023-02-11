
const fileDb = require("../../db/filesDB")
const Users = require("../../db/userDB")

class Upload {
    constructor(userId, origin, orginalName, title) {
        this.userId = userId
        this.origin = origin
        this.orginalName = orginalName
        this.title = title
        console.log(origin);
    }

    async getFiles() {

        let getIt = await fileDb.findAll({
            include: [{
                model: Users,
                attributes: ['firstName','img']
                // where: { id: fileDb.userId },
                // // required: false,
            }],
            attributes: ['fileName', 'fileTitle','createdAt','userId'],
            where: { domain: this.origin },
        });

        if (getIt === null) {

            res.send(JSON.stringify("not found friends"))
        } else {
            console.log(getIt.every(user => user instanceof fileDb)); // true
            console.log("All users:", JSON.stringify(getIt, null, 2));
            return getIt
        }
    }


    async upFile() {
        try {
            let upFile = await fileDb.create({
                userId: this.userId,
                domain: this.origin,
                fileName: this.orginalName,
                fileTitle: this.title

            })
            console.log(upFile.toJSON()); // This is good!
            console.log(JSON.stringify(upFile, null, 4)); // This is also good!
            return 200
        } catch {
            return 404
        }
    }

    async uploadImg(){
        try{
            let imgPro = await Users.update(
                {img: this.orginalName},
            {    
                where:{id: this.userId }
                
            })
            return 200
        }catch{
            return 404
        }
    }
}
module.exports = Upload