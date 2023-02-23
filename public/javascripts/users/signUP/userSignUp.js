import { titles } from "../../titlesAndCookie.js"
import { checkNEP } from "../test/checkNEP.js"
import { SignUp } from "./signReferences.js"
import { notification } from "../../notifications.js"
import { startPlugin } from "../../index.js"

export class userSignUp extends titles {

    constructor() {
        super()

    }

    signUpUser = async() => {


        this.newTitle("Registration", "&#9776", `<i class="fa fa-sign-in logo" aria-hidden="true"></i>`, `<i class="fa fa-times" aria-hidden="true"></i>`)

        this.counteiner = document.querySelector('.counteiner')
        this.counteiner.style.display = "none"
        this.exit = document.querySelector('.exit')
        this.exit.style.display = "none"
        let typesInpurt = ['name', 'email', 'password']
        this.signForm = document.createElement('div')

        for (let i of typesInpurt) {

            this.inputs = document.createElement('input')
            this.inputs.setAttribute('id', i)
            this.inputs.setAttribute('type', i)
            this.inputs.required
            this.inputs.placeholder = i
            this.inputs.className = "inputL_S"
            this.signForm.appendChild(this.inputs)
        }

        let submit = document.createElement('input')
        submit.setAttribute('type', 'submit')
        submit.className = "inputL_S"
        submit.addEventListener('click', async () => {

            let nameText = document.getElementById('name').value
            let email = document.getElementById('email').value
            let password = document.getElementById('password').value

            let checks = new checkNEP()
            let result = checks.checkNameEmailPass(nameText, email, password)

            if (result) {
          
                this.res = new SignUp()
                let data = await this.res.sendSingUp(nameText, email, password)
               
                if (data.code == 200) {
                    await notification(`<i class="fa fa-smile-o" aria-hidden="true"></i>`, "ההרשמה בוצעה בהצלחה","נשלח לך לאיימל אישור הרשמה")
                    this.backMenu()
                } else {
                    await notification(`<i class="fa fa-smile-o" aria-hidden="true"></i>`, "בחר שם משתמש או איימל אמר")
                }

            }

        })

        this.signForm.appendChild(submit)
        this.signForm.className = "form"

        this.counteiner_fluid = document.querySelector('.counteiner_fluid')
        this.counteiner_fluid.style.background = "white"
        this.counteiner_fluid.innerHTML += this.title
        this.counteiner_fluid.append(this.signForm)

        let menu = document.querySelector('.menu')

        menu.addEventListener('click', () => {
            this.my()
            this.backMenu()
        })

        let exit = document.querySelector('.exitButton')
        exit.addEventListener('click',()=>{
          startPlugin(false)
        })

    }



}


let btn = document.getElementById('signUp')
btn.addEventListener('click', () => {
    let user = new userSignUp()
    user.signUpUser()
})




