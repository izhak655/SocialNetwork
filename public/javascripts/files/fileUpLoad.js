import { titles } from "../titlesAndCookie.js"
import { notification } from "../notifications.js"
import { ReferenceFile } from "./fileReferences.js";
import { myProfile } from "../users/profile/myProfile.js";
import { startPlugin } from "../index.js";
import { removeIt, thinking } from "../viewThinker.js";

export class file extends titles {
    constructor() {
        super()
        this.classReference = new ReferenceFile()
    }

    async upLoad_btn() {

        this.newTitle("Files", "&#9776", `<i class="fa fa-file-text logo" aria-hidden="true" class="logo"></i>`, `<i class="fa fa-times" aria-hidden="true"></i>`)
        this.counteiner = document.querySelector('.counteiner')
        this.counteiner.style.display = "none"


        this.counteiner_fluid = document.querySelector('.counteiner_fluid')
        this.counteiner_fluid.style.background = "white"
        this.exit = document.querySelector('.exit')
        this.exit.style.display = "none"
        this.counteiner_fluid.innerHTML = this.title

        this.btn = document.createElement('div')
        this.btn.className = "btn_viewFileUpload"
        this.btn.innerHTML = `<i class="fa fa-upload logo" aria-hidden="true"></i>`

        this.btn.addEventListener('click', async () => {
            this.res = this.checkCookiesUser()

            if (this.res) {
                await notification(`<i class="fa fa-smile-o" aria-hidden="true"></i>`, "ברוך הבא", "")
                this.file_upLoad()
            } else {
                notification(`<i class="fa fa-sign-in" aria-hidden="true"></i>`, "אינך מחובר ", "יש להתחבר או להירשם")
            }
        })

        this.menu = document.querySelector('.menu')
        this.menu.addEventListener('click', () => {

            this.backMenu()
        })

        let exit = document.querySelector('.exitButton')
        exit.addEventListener('click',()=>{
            startPlugin(false)
        })
        thinking()
        let get = await this.classReference.getAllFiles()
        this.viewsFlies(get)
        removeIt()
    }

    async viewsFlies(get) {


        for (let key in get) {

            let linkDownload = document.createElement('a')
            // linkDownload.innerText = get[key]['fileTitle']
            linkDownload.href = `https://bit-socialnetwork.herokuapp.com/${get[key]['fileName']}` 
            linkDownload.download = get[key]['fileTitle']
            let download = document.createElement('div')
            download.innerHTML = `<i class="fa fa-download logo2 logo" aria-hidden="true"></i>
            `
            this.counteiner_file = document.createElement('div')
            this.counteiner_file.className = "counteiner_file"
            let main_file = document.createElement('div')
            main_file.className = "main_file"
            let id = get[key]['userId']
            let child_main1 = document.createElement('div')
            child_main1.className = "child_main1"
            child_main1.innerHTML = `<i class="fa fa-address-card-o logo" aria-hidden="true"></i>`

            child_main1.innerHTML += `<span id="nameUploadFile" 
            class="linkForProfile">${get[key]['User']['firstName']}</span>`

            let child_main2 = document.createElement('div')
            child_main2.className = "child_main2"
            child_main2.innerHTML += get[key]['fileTitle']
            child_main2.append(linkDownload)

            let foot = document.createElement('div')

            foot.className = "foot"
            foot.innerHTML += `<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>`
            foot.innerHTML += `<i class="fa fa-thumbs-o-down" aria-hidden="true"></i>`
            foot.innerHTML += `<span> דווח</span>`


            let del = document.createElement('span')
            del.innerText = 'מחק'
            foot.append(del)

            linkDownload.append(download)
            main_file.append(child_main1, child_main2)

            this.counteiner_file.append(main_file, foot)

            this.counteiner_fluid.append(this.counteiner_file)
            child_main1.addEventListener('click', async (e) => {
                // let getName = e.target
                let user_exist = this.checkCookiesUser()
                if (user_exist) {

                    this.addFriendOrFollow(id)
                } else {
                    await notification(`<i class="fa fa-smile-o" aria-hidden="true"></i>`, " יש להתחבר! ", "")
                }

            })

            del.addEventListener('click', async () => {

                let exist = this.checkCookiesUser()
                if (exist) {
                    thinking()
                    let res = await this.classReference.deleteFile(get[key]['fileName'])
                    removeIt()
                    await notification(`<i class="fa fa-smile-o" aria-hidden="true"></i>`, "  הקובץ נמחק בהצלחה", "")
                    this.backMenu()

                } else {
                    await notification(`<i class="fa fa-smile-o" aria-hidden="true"></i>`, " יש להתחבר! ", "")
                }
            })
        }

        this.counteiner_fluid.append(this.btn)


    }

    addFriendOrFollow(getName) {
        let myPro = new myProfile()
        myPro.profileInfo(this.counteiner, getName, this.exit)
    }

    checkCookiesUser() {
        this.cookie = this.checkCookies()
        if (this.cookie) {
            return true

        } else {
            return false
        }
    }

    async file_upLoad() {

        this.btn.style.display = "none"
        let checkSomeThinck = document.querySelectorAll('.counteiner_file')
        for (let d of checkSomeThinck) {
            d.style.display = "none"
        }

        let form = document.createElement('form')
        form.setAttribute('id', 'uploadForm')
        form.className = "formFiles"

        let label = document.createElement('label')
        label.setAttribute('for', 'input_upload')
        label.className = "btn_label"

        let name = document.createElement('input')
        name.setAttribute('type', 'text')
        name.setAttribute('id', 'name')
        name.setAttribute('placeholder', "title-file")
        name.className = "submitFile"

        let title = document.createElement('h1')
        title.innerText = "העלאת קובץ"

        let btn = document.createElement('div')
        btn.className = "btn-div"
        btn.innerText = "בחר קובץ"

        let input = document.createElement('input')
        input.setAttribute('type', "file")
        input.setAttribute('name', 'sampleFile')
        input.setAttribute('id', 'input_upload')
        input.setAttribute('accept', "img/*")
        input.style.display = "none"

        let img = document.createElement('img')
        img.setAttribute('src', "#")
        img.className = "btn_label"
        img.style.display = "none"

        let submit = document.createElement('input')
        submit.setAttribute('type', 'submit')
        submit.setAttribute('value', 'Upload')
        submit.className = "submitFile"

        label.append(btn)
        form.append(title, name, img, label, input, submit)

        this.counteiner_fluid.appendChild(form)

        submit.onclick = async (e) => {

            e.preventDefault();
            let name = document.getElementById('name')
            const files = document.getElementById("input_upload").files[0];
            const formData = new FormData();

            if (files && name.value) {
                formData.append("file", files);
                formData.append("name", name.value);
                let requestOptions = {
                    headers: {
                        'authorization': this.cookie,
                    },
                    method: 'POST',
                    body: formData,
                    // redirect: 'follow',
                  
                };
                thinking()
                let result = await this.classReference.sendFile(requestOptions)
                removeIt()
                if (result.code == 200) {
                    await notification(`<i class="fa fa-smile-o" aria-hidden="true"></i>`, "הקובץ עלה בהצלחה", "")
                    this.backMenu()
                } else {

                    await notification(`<i class="fa fa-smile-o" aria-hidden="true"></i>`, "הקובץ לא עלה", "")
                }
            } else {
                notification(`<i class="fa fa-smile-o" aria-hidden="true"></i>`, "  השדות אולי רקים", " תן שם והעלה קובץ")
            }
        };

        input_upload.onchange = evt => {
            const [file] = input_upload.files
            if (file) {
                img.style.display = "block"
                img.src = URL.createObjectURL(file)
                btn.style.display = "none"
                label.style.display = "none"
            }
        }

    }
}

let file_btn = document.querySelector('.file')
file_btn.addEventListener('click', () => {

    let class_file = new file()
    class_file.upLoad_btn()

})



