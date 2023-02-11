const Users = require("../../db/userDB")
const Follows = require('../../db/followDB')
const Files = require("../../db/filesDB")





class proSys {
    constructor(id) {
        this.id = id
    }

    async getInfor(idFileUpload) {
        let informtion;
        let follow;
        try{
            if(this.id){
                informtion = await Users.findAll({
                           
                    attributes: ['firstName','img'],
                    where: { id: this.id },
        
                    include: [{
                        model: Files,
                        attributes: ['userId']
                    }],
        
                })

                follow = await Follows.findAll({
                    attributes:['followers'],
                    where: {followers:this.id}
                })
                .catch((e) => {
                    return e
                })
            }else {
                informtion = await Users.findAll({
                           
                    attributes: ['firstName','img'],
                    where: { id: idFileUpload },
        
                    include: [{
                        model: Files,
                        attributes: ['userId']
                    }],
        
                })
                follow = await Follows.findAll({
                    attributes:['followers'],
                    where: {followers: idFileUpload}
                })
                .catch((e) => {
                    return e
                })
            }
        }catch{

            return 404
        }


        let result
        if(informtion[0].File == null)
        {
            result = {
                img: informtion[0].img,
                name:informtion[0].firstName,
                AmountFiles: 0,
                AmountFollowers: follow.length
    
            }
        }else{
            result = {
                img: informtion[0].img,
                name:informtion[0].firstName,
                AmountFiles: informtion.length,
                AmountFollowers: follow.length
    
            }
        }
        
        return (result)
    }
    
}

module.exports = proSys