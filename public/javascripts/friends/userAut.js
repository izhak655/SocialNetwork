import { friends } from "./getFriends.js"
import { titles } from "../titlesAndCookie.js"
import { notification } from "../notifications.js"
import { startPlugin } from "../index.js"
import { removeIt, thinking } from "../viewThinker.js"



class useAut extends titles {
    constructor() {
        super()
        this.getFriend = new friends()
    }

    async checkCookie() {


        this.res = this.checkCookies()
        this.valid
        if (this.res) {
        
            this.valid = await this.getFriend.vaildUserToken(this.res)
           

        } else {
          
            this.valid = await this.getFriend.vaildUserToken('undefined')
          
        }

        if (this.valid == "false") {

            notification(`<i class="fa fa-sign-in" aria-hidden="true"></i>`, "אינך מחובר ", "יש להתחבר או להירשם")
        } else {
            let listsFriends = this.valid
            this.newTitle("Friends", "&#9776", `<i class="fa fa-users logo" aria-hidden="true"></i>
            ` , `<i class="fa fa-times" aria-hidden="true"></i>`)

            this.counteiner = document.querySelector('.counteiner')
            this.counteiner.style.display = "none"
            this.exit = document.querySelector('.exit')
            this.exit.style.display = "none"
            this.friends(listsFriends, 'friend')

        }

    }

    friends(userName) {

        this.counteiner_fluid = document.querySelector('.counteiner_fluid')
        this.counteiner_fluid.style.background = "white"
        this.counteiner_fluid.innerHTML = this.title
        let number = 0
        let kind = 'Friends'
        let idKind = 'friendTwo'
        for (let key in userName) {


            this.list = document.createElement('div')
            this.list.className = "lists"
            let value = userName[key]['firstName']
            let id = userName[key][kind][number][idKind]

            let boxNameAndImgFriend = document.createElement('div')
            boxNameAndImgFriend.className = "boxNameAndImgFriend"
            let imgFriend = document.createElement('div')
            imgFriend.className = "imgFriend"

            let defaultImg = "https://testchatplugin.herokuapp.com/usersImages/user23454644322456765545.jpg"

            let img = document.createElement('img')
            img.className = "imgFriend"
            if (userName[key].img) {
                img.src = `https://bit-socialnetwork.herokuapp.com/${userName[key].img}`
                imgFriend.append(img)
            } else {
                img.src = defaultImg
                imgFriend.append(img)
            }

            let nameFriend = document.createElement('div')
            nameFriend.className = "nameFriend"
            nameFriend.innerHTML = value

            boxNameAndImgFriend.append(nameFriend, imgFriend)

            let deleteFriend = document.createElement('div')
            deleteFriend.className = "deleteFriend"
            deleteFriend.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`



            deleteFriend.addEventListener('click', () => {

                this.deleteFromFriend(id)
            })
            this.list.append(deleteFriend, boxNameAndImgFriend)

            this.counteiner_fluid.append(this.list)
        };

        let menu = document.querySelector('.menu')
        menu.addEventListener('click', () => {

            this.backMenu()
        })
        let exit = document.querySelector('.exitButton')
        exit.addEventListener('click', () => {
            startPlugin(false)
        })

    }

    async deleteFromFriend(idFriend) {

        let deleteFriend = await this.getFriend.deleteIt(idFriend, this.res)
        if (deleteFriend.code == 200) {
            await notification(`<i class="fa fa-sign-in" aria-hidden="true"></i>`, "נמחק בהצלחה", "")
            this.friends(deleteFriend.mess)
        } else {
            notification(`<i class="fa fa-sign-in" aria-hidden="true"></i>`, "לא נמחק", "כנראה קרתה תקלה בהתחברות")
        }

    }
}


let friends_btn = document.querySelector('.friends')
friends_btn.addEventListener('click', () => {

    let class_friend = new useAut()
    class_friend.checkCookie()

})