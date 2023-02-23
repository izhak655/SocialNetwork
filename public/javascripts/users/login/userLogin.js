import { myProfile } from "../profile/myProfile.js"
import { notification } from "../../notifications.js"
import { titles } from "../../titlesAndCookie.js"
import { checkNEP } from "../test/checkNEP.js"
import { Login } from "./loginReferences.js"
import { startPlugin } from "../../index.js"
import { removeIt, thinking } from "../../viewThinker.js"

export class UserLogin extends titles {

    constructor() {
        super()
    }

    connectUser = () => {
        this.newTitle("Login", "&#9776", `<i class="fa fa-sign-in logo" aria-hidden="true"></i>`, `<i class="fa fa-times" aria-hidden="true"></i>`)

        this.counteiner = document.querySelector('.counteiner')
        this.counteiner.style.display = "none"
        this.exit = document.querySelector('.exit')
        this.exit.style.display = "none"
        let typesInpurt = ['name', 'password']
        this.loginForm = document.createElement('div')

        for (let i of typesInpurt) {

            let inputs = document.createElement('input')
            inputs.setAttribute('id', i)
            inputs.setAttribute('type', i)
            inputs.placeholder = i
            inputs.className = "inputL_S"
            this.loginForm.appendChild(inputs)
        }

        let submit = document.createElement('input')
        submit.setAttribute('type', 'submit')
        submit.className = "inputL_S"
        submit.addEventListener('click', async () => {

            let nameText = document.getElementById('name').value
            let password = document.getElementById('password').value

            let checks = new checkNEP()
            let result = checks.checkNameEmailPass(nameText, null, password)

            if (result) {
                this.res = new Login()
                thinking()
                let result = await this.res.sendLogin(nameText, password)
                removeIt()
                if(result.code == 200){
                    this.checkIfHaveCoockie(result.mess)
                }
                let resultFromNotice = await this.approveUser(result)
                if(resultFromNotice){
                    this.goBack()
                }
            }
        })

        this.loginForm.appendChild(submit)
        this.loginForm.className = "form"
        this.counteiner_fluid = document.querySelector('.counteiner_fluid')
        this.counteiner_fluid.style.background = "white"
        this.counteiner_fluid.innerHTML += this.title
        this.counteiner_fluid.append(this.loginForm)

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

    checkIfHaveCoockie(token){
        
       let res  = this.checkCookies()
       if(token == res) return
       else{
            this.setCookie('token',token)
       }
    }

    async approveUser(data) {

        if (data.code == 200) {
            // this.setCookie('token',data.mess,10)
           await notification(`<i class="fa fa-smile-o" aria-hidden="true"></i>`, " התחברת בהצלחה", "תוכל להכנס ולהגיב בצאט ובפורום")
           
            return true
        
        }else{
           await notification(`<i class="fa fa-frown-o" aria-hidden="true"></i>`, "בעית התחברות", data.mess)
           return false
        }
    }

    goBack() {
        this.backMenu()
        this.viewSignLogin(true)
        let profile = new myProfile(true)
        profile.viewSL()
    }
}

if (document.getElementById('connect')) {
    let btnLogin = document.getElementById('connect')
    btnLogin.addEventListener('click', () => {
        let user = new UserLogin()
        user.connectUser()
    })
}










