
import { startPlugin } from "../../index.js"
import { notification } from "../../notifications.js"
import { titles } from "../../titlesAndCookie.js"
import { removeIt, thinking } from "../../viewThinker.js"
import { UserLogin } from "../login/userLogin.js"
import { userSignUp } from "../signUP/userSignUp.js"
import { addFriend, back, follow } from "./myImgORaddFriend.js"
import { getProfile } from "./profileReferences.js"

export class myProfile extends titles {
    constructor(id) {
        super()
        this.id = id
        if (this.id) { this.viewSL() }
    }

    viewSL() {
        let res = this.checkCookies()

        if (res) {
            let new_btn = `<button class=" view" id="new_account"><i class="fa fa-sign-in" aria-hidden="true"></i>
            <p class="text">חשבון</p>
            </button>
            <button class="smallButton" id="logout">התנתקות</button>
            <button class="smallButton" id="profile">פרופיל</button>`
            this.account = document.querySelector(".account")

            this.account.innerHTML = new_btn
            document.getElementById('new_account').addEventListener("click", () => {
                this.viewProfileLogout()
            })
            this.my(true)
        }
    }

    viewProfileLogout() {

        new_account.style.display = "none"

        this.logout = document.getElementById('logout')
        this.logout.style.display = "block"

        this.profile = document.getElementById('profile')
        this.profile.style.display = "block"

        this.logout.onclick = this.deleteToken
        this.profile.addEventListener("click", () => {
            this.profileInfo(true)
        })
    }

    deleteToken = () => {

        this.deleteCookie()
        this.my(false)
        let firts_btn = `<button class=" view" id="account_id"><i class="fa fa-sign-in" aria-hidden="true"></i>
        <p class="text">חשבון</p>
        </button>
        <button class="smallButton" id="signUp">הרשמה</button>
        <button class="smallButton" id="connect">התחברות</button>`
        this.account.innerHTML = firts_btn
        this.counteiner = document.querySelector('.counteiner')
        this.counteiner.style.display = "none"
        this.exit = document.querySelector('.exit')
        this.exit.style.display = "none"
        this.backMenu()

        let classSignAndLogin = document.getElementById('account_id')
        classSignAndLogin.addEventListener('click', () => {
            this.viewSignLogin()
        })

        let btn_login = document.querySelector('#connect').addEventListener('click', () => {
            let userL = new UserLogin()
            userL.connectUser()
        })
        let btn_signUp = document.querySelector('#signUp').addEventListener('click', () => {
            let userS = new userSignUp()
            userS.signUpUser()
        })

    }

    profileInfo = async (newContiener, idFileUpload = null,newExit) => {
        this.cookie = this.checkCookies()
        this.referenceProfile = new getProfile()
        let res = await this.referenceProfile.information(idFileUpload,this.cookie)
        let img
        let style
        let styleLabel
        let styleLogo

        this.my(true)

        if (idFileUpload == null) {
            
            if (res.img) {
                img = res.img
                style = "block"
                styleLabel = "block"
                styleLogo = "none"
            } else {
                style = "none"
                img = '#'
                styleLabel = "block"
                styleLogo = "block"
            }
        } else {
            styleLabel = "none"
            if (res.img) {
                img = res.img
                styleLogo = "none"
            } else {
                styleLogo = "block"
                img = '#'
            }

        }

        let profile = `<div class="profile">
                            <div class="title_pro">
                                <div class="left">
                                    <div class="name">
                                        ${res.name}
                                    </div>
                                    <input type="checkbox" id="addFOrF" name="fav_language" value="HTML"  class="checkbox">
                                   <label for="addFOrF" > 
                                        <i class="fa   fa-user-plus " aria-hidden="true" > הוסף</i>
                                    </label>
                                    <div class="selectionBox">
                                        <div class="addFriend">
                                            הוסף כחבר
                                        </div>
                                        <div class="follow">
                                            עקוב אחריו
                                        </div>
                                    </div>
                                </div>
                                <div class="middel">
         
                                    <img src='https://testchatplugin.herokuapp.com/usersImages/user23454644322456765545.jpg' style="display:${styleLogo}" class="table_logo" id="styleLogo">
                                    
                                    <div class="btn_img" style="display:none" id="submitFile">
                                            שלח
                                    </div>
                                    <div class="btn_cancelation" style="display:none" id="cancelation">
                                    ביטול
                                   </div>
                                    <label for="inputImg" id="label_id" style="display:${styleLabel}" > 
                                        <div class="btn_img" id="logoCamera">
                                            <i class="fa fa-camera " aria-hidden="true"></i>
                                        </div>
                                    </label> 

                                    <input type="file" name="imgProfile" id="inputImg" accept="img/*" style="display:none">

                                    <img src='https://bit-socialnetwork.herokuapp.com/${img}' style="display:${style}" id="img_id" class="table_logo">
                                    
                                </div>
                                <div class="rigth">
                                    <i class="fa fa-undo logo" aria-hidden="true" id="backMnue"></i>
                                    <i class="fa fa-times logo" aria-hidden="true" id="exitIt"></i>
                                </div>
                            </div>
                            <div class="main-pro">
                                <div class="friend_pro">
                                    <div>
                                        Files
                                    </div>
                                    <div>
                                        ${res.AmountFiles}
                                    </div>
                                    <div>
                                        <i class="fa fa-user-secret" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="followers_pro">
                                    <div>
                                        Followers
                                    </div>
                                    <div>
                                        ${res.AmountFollowers}
                                    </div>
                                    <div>
                                        <i class="fa fa-binoculars" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="posts_pro">
                                    <div>
                                        Posts
                                    </div>
                                    <div>
                                    ${res.AmountPosts}
                                    </div>
                                    <div>
                                        <i class="fa fa-clipboard" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>`
  
        if (this.id) {
            this.exit = document.querySelector('.exit')
            this.exit.style.display = "none"
            this.counteiner = document.querySelector('.counteiner')
            this.counteiner.style.display = "none"

        }

        let counteiner_fluid = document.querySelector('.counteiner_fluid')

        counteiner_fluid.style.background = "white"
        counteiner_fluid.innerHTML = profile

        document.querySelector('#backMnue').addEventListener('click', () => {

            if (this.counteiner) {
                back(this.counteiner, this.exit)
            } else {
           
                back(newContiener, newExit)
            }

        })

        let exit = document.querySelector('#exitIt')
        exit.addEventListener('click',()=>{
            startPlugin(false)
        })
   
        let myFriend = document.querySelector('.addFriend')
        myFriend.addEventListener('click', async () => {
            if (idFileUpload !== null) {
                let result = await addFriend(idFileUpload,this.cookie)
                notification(`<i class="fa fa-sign-in" aria-hidden="true"></i>`,`${result.mess}`,"")
            } else {
                notification(`<i class="fa fa-sign-in" aria-hidden="true"></i>`,"אינך יכול להוסיף את עצמך","")
            }
        })

        let addFollow = document.querySelector('.follow')
        addFollow.addEventListener('click', async () => {

            if (idFileUpload !== null) {
                let result = await follow(idFileUpload,this.cookie)
                notification(`<i class="fa fa-sign-in" aria-hidden="true"></i>`,`${result.mess}`,"")
            } else {
                notification(`<i class="fa fa-sign-in" aria-hidden="true"></i>`,"אינך יכול להוסיף את עצמך","")
            }
        })
        let file = document.getElementById('inputImg')

        let img_id = document.getElementById('img_id')
        let label = document.getElementById('label_id')
        let id_style = document.querySelector('#styleLogo')
        let submit = document.querySelector('#submitFile')
        let logoCamera = document.querySelector('#logoCamera')
        let cancelation = document.querySelector('#cancelation')

        inputImg.onchange = evt => {

            const [file] = inputImg.files
            if (file) {
                img_id.style.display = "block"
                img_id.src = URL.createObjectURL(file)
                label.style.display = "none"
                id_style.style.display = "none"
                submit.style.display = "block"
                cancelation.style.display = "block"
                logoCamera.style.display = "none"
            }

        }
        cancelation.addEventListener('click',()=>{

            img_id.style.display = "none"
            // img_id.src = URL.createObjectURL()
            label.style.display = "block"
            id_style.style.display = "block"
            submit.style.display = "none"
            cancelation.style.display = "none"
            logoCamera.style.display = "block"
        })
        submit.addEventListener('click', async (e) => {
            e.preventDefault();
            submit.style.display = "none"
            cancelation.style.display = "none"
            label.style.display = "block"
            logoCamera.style.display = "block"
            let result
            const formData = new FormData();

            const [file] = inputImg.files
            if (file) {
                formData.append("file", file);
                // formData.append("name", name.value);
                let requestOptions = {
                    method: 'POST',
                    body: formData,
                    // redirect: 'follow',
                    headers: {
                        'authorization':this.cookie,
                    },
                };
                thinking()
                result = await this.referenceProfile.profileImg(requestOptions)
                removeIt()
                notification(`<i class="fa fa-sign-in" aria-hidden="true"></i>`,result.mess,"")
            }

        })
    }
}

new myProfile(true)


{/* <i class="fa fa-bars logo" aria-hidden="true"></i> */ }

// <i class="fa fa-user-circle middelUser table_logo" aria-hidden="true" style="display:${styleLogo}" >
//                                     </i>