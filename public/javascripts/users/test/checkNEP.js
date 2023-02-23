import { notification } from "../../notifications.js";


export class checkNEP {

    constructor(){}

    checkNameEmailPass(nameText,email,password){

        this.objectvalid = {}

        this.objectvalid.name = /['a-z']/.test(nameText) == true ? true : checkNEP.errName();

        if(email){
            this.objectvalid.email  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == true ? true : this.errEmail();
        }
        else if(email == null){
            email = null
        }
        else{
            this.errEmail()
        }

     
        if(password){
            this.objectvalid.pass = password.length >= 4 == true ? true : this.errPass();
        }
        else{
            this.errPass()
        }

        // כדי לבדוק גם את ההרשמה וגם את ההתחברות עשיתי כך
        if(this.objectvalid.name == true && (this.objectvalid.email == true || email == null ) && this.objectvalid.pass == true ){
            return true
        }
        else{
            return false
        }

    }

    static async errName(){
        await notification(`<i class="fa fa-smile-o" aria-hidden="true"></i>`, "שם משתמש צריך להכיל אותיות")
        
    }

    async errEmail(){
        await notification(`<i class="fa fa-smile-o" aria-hidden="true"></i>`, "איימל לא תקין")
    }
    
    async errPass(){
        await notification(`<i class="fa fa-smile-o" aria-hidden="true"></i>`, "הסיסמא צריך להכיל לפחות 4 תוים")
    }
    
}