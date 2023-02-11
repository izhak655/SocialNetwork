const conDataBase = require('../../db/sql')

class Active {

    constructor(random) {
 
        this.random = random
    }

    doActive() {
        
        conDataBase.query(`UPDATE users SET active='1' WHERE randoms=${this.random}`, (err, result, fields) => {
            if (err) throw err
            console.log(result);
        })
      

    }
}


module.exports = Active;