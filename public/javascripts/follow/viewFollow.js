import { follows } from "./followReferences.js"
import { titles } from "../titlesAndCookie.js"
import { notification } from "../notifications.js"
import { startPlugin } from "../index.js"
import { removeIt, thinking } from "../viewThinker.js"


class main extends titles {
    constructor() { super() }

    async checkCookie() {

        this.getFollowers = new follows()
        this.res = this.checkCookies()
        this.value
        if(this.res){
            this.value = await this.getFollowers.vaildUserToken(this.res)
        }else{
            this.value = await this.getFollowers.vaildUserToken('undefined')
        }
  
        if (this.value.code == 404) {
            notification(`<i class="fa fa-sign-in" aria-hidden="true"></i>`," אינך מחובר","יש להתחבר או להירשם")
        } else {
            let listsFollowers = this.value
            this.newTitle("Follow", "&#9776", `<i class="fa fa-binoculars logo" aria-hidden="true"></i>`, `<i class="fa fa-times" aria-hidden="true"></i>`)
            this.counteiner = document.querySelector('.counteiner')
            this.counteiner.style.display = "none"
            this.exit = document.querySelector('.exit')
            this.exit.style.display = "none"
            this.followers(listsFollowers, 'followers')

        }

    }

    followers(userName) {

        this.counteiner_fluid = document.querySelector('.counteiner_fluid')
        this.counteiner_fluid.style.background = "white"
        this.counteiner_fluid.innerHTML = this.title
        let number = 0
        let kind = 'follow'
        let idKind = 'followers'
        for (let key in userName) {

         
            this.list = document.createElement('div')
            this.list.className = "lists"
            let value = userName[key]['firstName']
            let id = userName[key][kind][idKind]

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

                this.deleteFromFollow(id)

            })
            this.list.append(deleteFriend, boxNameAndImgFriend)

            this.counteiner_fluid.append(this.list)
        };

        let menu = document.querySelector('.menu')
        menu.addEventListener('click', () => {

            this.backMenu()
        })

        let exit = document.querySelector('.exitButton')
        exit.addEventListener('click',()=>{
            startPlugin(false)
        })

    }

    async deleteFromFollow(idFollower) {
        thinking()
        let deleteFollower = await this.getFollowers.deleteIt(idFollower,this.res)
        removeIt()
        this.followers(deleteFollower, 'followers')
    }
}


let follow_btn = document.querySelector('.follow')
follow_btn.addEventListener('click', () => {

    let class_followers = new main()
    class_followers.checkCookie()

})