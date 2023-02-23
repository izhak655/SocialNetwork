import { titles } from "../titlesAndCookie.js"
import { notification } from "../notifications.js"
import { ReferenceChat } from "./chatReferences.js"
import { myProfile } from "../users/profile/myProfile.js"
import { startPlugin } from "../index.js"
// import { authToken } from "../../../auth/authToken.js"

export class chatClient extends titles {
    constructor() {
        super()
        this.profile = new myProfile()
        this.sendRequsetDb = new ReferenceChat()
    }

    checkCookieInClient() {
        this.token
        this.res = this.checkCookies()

        if (!this.res) {
            notification(`<i class="fa fa-sign-in" aria-hidden="true"></i>`, "אינך מחובר ", "יש להתחבר או להירשם")

            return false
        } else {

            return true
        }

    }

    async getAllMess() {

        this.newTitle("Chat", "&#9776", `<i class="fa fa-comments-o logo" aria-hidden="true"></i>`, `<i class="fa fa-times" aria-hidden="true"></i>`)
        this.counteiner = document.querySelector('.counteiner')
        this.counteiner.style.display = "none"

        this.counteiner_fluid = document.querySelector('.counteiner_fluid')

        this.counteiner_fluid.style.background = "white"
        this.exit = document.querySelector('.exit')
        this.exit.style.display = "none"
        this.counteiner_fluid.innerHTML = this.title


        this.cookie = this.checkCookies()
        let res
        if (this.cookie) {
            res = await this.sendRequsetDb.getAllMess(this.cookie)
        } else {
            res = await this.sendRequsetDb.getAllMess('undefined')
        }

        this.viewAllMess(res)
    }

    viewAllMess(res) {

        // this.socket = io()

        this.socket = io("https://bit-socialnetwork.herokuapp.com/", {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd"
            }
        })

        this.socket.on('lastMess', (e) => {
            this.viewNewMess(e)
        })

        let boxCount = document.createElement('div')
        boxCount.className = "boxCount"
        this.boxChat = document.createElement('div')
        this.boxChat.className = "boxChat"

        let writing = document.createElement('div')
        writing.className = "writing"
        let input = document.createElement('input')
        input.className = "inputChat"
        input.placeholder = "כתוב הודעה..."
        input.type = "text"
        let btn_send = document.createElement('div')
        btn_send.className = "btn_mess"
        btn_send.innerHTML = `<i class="fa fa-paper-plane-o" aria-hidden="true"></i>`
        // let ul = document.createElement('ul')


        this.viewNewMess(res)

        writing.append(input, btn_send)
        boxCount.append(this.boxChat, writing)
        this.counteiner_fluid.append(boxCount)

        document.addEventListener('keydown', (e) => {

            if (e.key == "Enter") {
                let existsCookie = this.checkCookieInClient()
                if (existsCookie) {
                    if (input.value) {

                        this.sendNewMess(input.value)
                        input.value = '';
                    }
                }
            }

        })
        btn_send.addEventListener('click', (e) => {

            let existsCookie = this.checkCookieInClient()
            if (existsCookie) {
                e.preventDefault();
                if (input.value) {
                    this.sendNewMess(input.value)
                    input.value = '';
                }
            }
        })
        let menu = document.querySelector('.menu')
        menu.addEventListener('click', () => {

            this.backMenu()
        })

        let exit = document.querySelector('.exitButton')
        exit.addEventListener('click', () => {
            startPlugin(false)
        })

    }

    viewNewMess(res) {
        // let = authToken(req)

        for (let key in res) {

            if (this.token) {

                if (res[key]['userId'] == this.token.id) {
                    res[key]['myMess'] = true
                }
            }
            const getDate = new Date(res[key]['createdAt']);
            const hoursAndMinutes = this.padTo2Digits(getDate.getHours()) + ':' + this.padTo2Digits(getDate.getMinutes());
            let box_mess = document.createElement('div')
            box_mess.className = "box_mess"

            let defaultImg = "https://testchatplugin.herokuapp.com/usersImages/user23454644322456765545.jpg"

            let messAndName = document.createElement('div')
            messAndName.className = "messAndName"

            let img = document.createElement('img')
            img.className = "imgFace"
            if (res[key]['User']['img']) {
         
                img.src = `https://bit-socialnetwork.herokuapp.com/${res[key]['User']['img']}`
            } else {
                img.src = defaultImg
            }

            let name = document.createElement('div')
            name.className = "name"
            name.innerText = res[key]['User']['firstName']
            let mess = document.createElement('div')
            mess.className = "message"
            mess.innerText = res[key]['message']
            let date = document.createElement('div')
            date.className = "date"
            date.innerText = hoursAndMinutes

            name.addEventListener('click', () => {

                this.goToProfile(this.counteiner, res[key]['userId'])

            })
            messAndName.append(name, mess, date)
            box_mess.append(messAndName, img)

            if (res[key]['myMess']) {
                box_mess.style = "align-self: flex-start;flex-direction: row-reverse"
                name.style = "direction: ltr;"
                messAndName.style = "background-color: #9fe690;"

            }

            this.boxChat.append(box_mess)

        }
    }

    padTo2Digits(num) {
        return String(num).padStart(2, '0');
    }

    async sendNewMess(mess) {

        let res = this.sendRequsetDb.NewMess(mess, this.res)
        this.token = this.parseJwt(this.res)
        // this.viewNewMess(res)
    }
    goToProfile(counteiner, id) {
        this.profile.profileInfo(counteiner, id, this.exit)
    }

    parseJwt(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

}

let chat_btn = document.querySelector('.chat')
chat_btn.addEventListener('click', () => {

    let class_chat = new chatClient()
    class_chat.getAllMess()

})