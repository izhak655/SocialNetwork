import { titles } from "../titlesAndCookie.js"
import { ReferenceFourom } from "./furomReferences.js"
import { notification } from "../notifications.js"
import { startPlugin } from "../index.js"
import { removeIt, thinking } from "../viewThinker.js"
// const io = require("socket.io-client");


class furom extends titles {
    constructor() {
        super()
        this.referece = new ReferenceFourom()
        this.res = this.checkCookies()
    }

    async viewAllTheard() {

        this.newTitle("Forum", "&#9776", `<i class="fa fa-binoculars logo" aria-hidden="true"></i>`, `<i class="fa fa-times" aria-hidden="true"></i>`)

        this.counteiner = document.querySelector('.counteiner')
        this.counteiner.style.display = "none"

        this.exit = document.querySelector('.exit')
        this.exit.style.display = "none"

        this.counteiner_fluid = document.querySelector('.counteiner_fluid')
        this.counteiner_fluid.style.background = "white"
        this.counteiner_fluid.innerHTML = this.title

        this.btnSend = document.createElement('div')
        this.btnSend.className = "btnSend"
        this.btnSend.innerHTML = `<i class="fa fa-commenting-o" aria-hidden="true"></i>`

        this.boxForum = document.createElement('div')
        this.boxForum.className = "boxForum"

        this.counteiner_fluid.append(this.btnSend)
        let result
        
        if(this.res){
            thinking()
            result = await this.referece.getAllThread(this.res)
            removeIt()
        }else{
            thinking()
            result = await this.referece.getAllThread('undefined')
            removeIt()
        }
        
        this.getAllTheard(result)

        this.btnSend.addEventListener('click', () => {

            if (this.res) {
                this.creatNewThread()
            } else {
                notification(`<i class="fa fa-sign-in" aria-hidden="true"></i>`, "אינך מחובר ", "יש להתחבר או להירשם")
            }

        })

        let menu = document.querySelector('.menu')
        menu.addEventListener('click', () => {

            this.backMenu()
        })
        let exit = document.querySelector('.exitButton')
        exit.addEventListener('click',()=>{
            startPlugin(false)
        })

        // this.socket = io()

        this.socket = io("https://bit-socialnetwork.herokuapp.com/", {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd"
            }
        })

        this.socket.on('getNewTheard', (e) => {

            this.getAllTheard(e, true)
        })

    }

    getAllTheard(result, newMess) {


        for (let key in result) {

            this.postBox = document.createElement('div')
            this.postBox.className = "postBox"

            this.post = document.createElement('div')
            this.post.className = "post"

            this.up = document.createElement('div')
            this.up.className = "up"

            this.response = document.createElement('div')
            this.response.className = "response"
            this.response.innerHTML = `<i class="fa fa-angle-double-left" aria-hidden="true"></i>`

            this.titlePost = document.createElement('div')
            this.titlePost.className = "titlePost"
            this.titlePost.innerHTML = result[key]['title']

            this.down = document.createElement('div')
            this.down.className = "down"
            this.down.innerHTML = result[key]['createdAt']
            this.down.innerHTML += `<span class="name">\t\t${result[key]['User']['firstName']}</span>`


            this.boxImg = document.createElement('div')
            this.boxImg.className = "boxImg"

            this.userImg = document.createElement('img')
            this.userImg.className = "userImg"
            if (result[key]['User']['img']) {
                this.userImg.src = `https://bit-socialnetwork.herokuapp.com/${result[key]['User']['img']}`
            } else {
                this.userImg.src = "https://testchatplugin.herokuapp.com/usersImages/user23454644322456765545.jpg"
            }


            this.boxImg.append(this.userImg)
            this.up.append(this.response, this.titlePost)
            this.post.append(this.up, this.down)
            this.postBox.append(this.post, this.boxImg)
            if (newMess) {
                this.boxForum.prepend(this.postBox)

            } else {
                this.boxForum.append(this.postBox)
            }

            this.response.addEventListener('click', () => {
                this.getAllResponse(result[key]['id'], result[key]['title'], result[key]['message'], this.userImg, result[key]['User']['firstName'], result[key]['userId'], result[key]['createdAt'])

            })

        }
        this.counteiner_fluid.append(this.boxForum)
    }
    creatNewThread() {

        this.formPost = document.createElement('div')
        this.formPost.className = "formPost"

        this.exitForm = document.createElement('div')
        this.exitForm.className = "exitForm"
        this.exitForm.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`

        this.input = document.createElement('input')
        this.input.placeholder = "כותרת של הפוסט"

        this.textarea = document.createElement('textarea')
        this.textarea.placeholder = " פוסט חדש"

        this.btn = document.createElement('button')
        this.btn.className = "btnSubmitPost"
        this.btn.innerText = "send"

        this.formPost.append(this.exitForm, this.input, this.textarea, this.btn)
        this.counteiner_fluid.append(this.formPost)

        this.exitForm.addEventListener('click', () => {
            this.formPost.style.display = "none"
        })

        this.btn.addEventListener('click', async () => {

            let res = await this.referece.createThread(this.input.value, this.textarea.value,this.res)

            if (res.code == 404) {
                notification(`<i class="fa fa-sign-in" aria-hidden="true"></i>`, "שגיאה", "נפלה שגיאת התחברות נסה שוב")
            } else {
                this.formPost.style.display = "none"
            }
        })
    }

    async getAllResponse(idParent, title, mess, img, name, userId, date) {
        let res = await this.referece.commentList(idParent)

        this.viewParent(res.mess, title, mess, img, name, userId, date, idParent)

    }

    async viewParent(res, title, mess, img, name, userId, date, idParent) {

        this.btnSend.remove()
        let postTitle = `<div class="titlePostParent">${title}</div>`
        let parentPost = `<div class="commentBoxParent colorParent">
                                <div class="user">
                                    <div class="img">
                                        ${img.outerHTML}
                                    </div>
                                    <div class="date">
                                        ${date}
                                    </div>
                                    <div class="name" id="${idParent}">
                                        ${name}
                                    </div>
                                </div>
                                <div class="textComment">
                                    ${mess}
                                </div>
                                <div class="bottom-data">
                                    <span class="responseParent">
                                    הגב</span>
                                    <span>
                                        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                    </spna>
                                    <span class="number">
                                        0
                                    </span>
                                    <span>
                                        <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
                                    </span>
                                </div>
                          </div>
                          <hr class="space">`

        this.boxForum.innerHTML = postTitle
        this.boxForum.innerHTML += parentPost

        this.viewAllResponse(res)
        let responseParent = document.querySelector('.responseParent')
        responseParent.addEventListener('click', () => {
            if (this.res) {
                this.createNewResponse(idParent, name, mess)
            } else {
                notification(`<i class="fa fa-sign-in" aria-hidden="true"></i>`, "אינך מחובר ", "יש להתחבר או להירשם")
            }

        })
    }

    viewAllResponse(res) {

        for (let key in res) {

            let imgComment = document.createElement('img')
            imgComment.className = "userImg"
            if (res[key]['User']['img']) {
                imgComment.src = `https://bit-socialnetwork.herokuapp.com/${res[key]['User']['img']}`
            } else {
                imgComment.src = 'https://testchatplugin.herokuapp.com/usersImages/user23454644322456765545.jpg'
            }

            let commentPost = `<div class="commentBoxParent">
                                    <div class="user">
                                        <div class="img">
                                            ${imgComment.outerHTML}
                                        </div>
                                        <div class="date">
                                            ${res[key]['createdAt']}
                                        </div>
                                        <div class="name" id="${res[key]['userId']}">
                                            ${res[key]['User']['firstName']}
                                        </div>
                                    </div>
                                    <div class="textComment">
                                        ${res[key]['message']}
                                    </div>
                                    <div class="bottom-data">
                                        <span class="responseParent">הגב</span>
                                        <span>
                                            <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                        </spna>
                                        <span class="number">
                                            0
                                        </span>
                                        <span>
                                            <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>`

            this.boxForum.innerHTML += commentPost

        }
        return
    }



    createNewResponse(idParent, name, text) {

        let replay = `<div class="formPost" id="formPost"> 

                            <div class="exitForm">
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </div>

                            <div class="replay_post">
                                <div class="names">
                                    ${name}
                                </div>
                                <div class="textParent">
                                    ${text} 
                                </div>
                            </div>    

                            <textarea placeholder="Write a comment" class="textarea" id="textReplay">
                            </textarea>
                            
                            <button id="replay"> 
                                send 
                            </button>
                     </div>`
        let initToBox = document.createElement('div')
        initToBox.innerHTML = replay
        this.boxForum.append(initToBox)
        let exitForm = document.querySelector('.exitForm')
        this.textReplay = document.getElementById('textReplay')
        let formPost = document.getElementById('formPost')
        let sendReplay = document.getElementById('replay')

        sendReplay.addEventListener('click', () => {
            this.sendReplays(idParent)
            formPost.style.display = "none"
        })

        exitForm.addEventListener('click',()=>{
            // formPost.style.display = "none"
           
           this.boxForum.removeChild(initToBox) 
        //    this.viewAllResponse()
        })

    }


    async sendReplays(idParent) {
        this.socket.on('getNewReplay', (e) => {

            this.viewAllResponse(e)

        })
        let res = await this.referece.newComment(idParent, this.textReplay.value,this.res)
    }


}

let forum_btn = document.querySelector('.forum')
forum_btn.addEventListener('click', () => {

    let class_forum = new furom()
    class_forum.viewAllTheard()

})