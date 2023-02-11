const fileDb = require("../../db/filesDB")


class deleteFile {
    constructor(nameFile){
        this.nameFile = nameFile
    }

    async deleteFileByNameFile(){
        let deleteFromDb
        try{
            deleteFromDb = await fileDb.destroy({
                where: { fileName:   this.nameFile }
            });
            return deleteFromDb
        }catch{
            return 404
        }
    }
}

module.exports = deleteFile