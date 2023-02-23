import { startPlugin } from "./index.js"


export class titles {

    constructor() {

    }

    newTitle(text, menu, image, exit) {

        this.valueText = text
        this.valueMenu = menu
        this.valueImg = image
        this.valueExit = exit

        this.title = `<div class="title">
                        <div class="imgAndText">
                            <div> ${this.valueImg}</div>
                            <div class="textTitle">
                                ${this.valueText}
                            </div>
                        </div>
                        <div class="mx">
                            <div class="menu">
                                ${this.valueMenu}
                            </div>
                            <div class="exitButton">
                                ${this.valueExit}
                            </div>
                        </div>     
                      </div>`

        // let exit_btn = document.querySelector('.exitButton')
        // exit_btn.addEventListener('click',()=>{
        //     startPlugin(false)
        // })
    }

    deleteCookie() {

        function setCookie(cname, cvalue, exdays) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
        setCookie("token", "", 0);
    }

    checkCookies() {

        let getCookie = (cname) => {
            let name = cname + "=";
            let ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        let checkCookie = () => {

            let user = getCookie('token');
            if (user !== "") {
                return user
            } else {
                return false
            }
        }
   
        let res = checkCookie()
        
        return res
    }

    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    viewSignLogin() {

        this.my(false)
        this.account_btn = document.getElementById('account_id')
        this.account_btn.style.display = "none"

        this.signUp = document.getElementById('signUp')
        this.signUp.style.display = "block"

        this.connect = document.getElementById('connect')
        this.connect.style.display = "block"
    }


    my(changeIt = false) {
        this.userConnect = changeIt

    }

    backMenu = (back, exit) => {
     
        this.counteiner_fluid = document.querySelector('.counteiner_fluid')
        while (this.counteiner_fluid.hasChildNodes()) {

            this.counteiner_fluid.removeChild(this.counteiner_fluid.firstChild);
        }

        if (back) {
            exit.style.display = "block"
            back.style.display = "flex"

            this.counteiner_fluid.append(exit, back)
        } else {

            this.counteiner.style.display = "flex"
            this.exit.style.display = "block"
            this.counteiner_fluid.append(this.exit, this.counteiner)
        }
        this.counteiner_fluid.style.background = "black"
        // this.counteiner_file.style = "flex-direction: column;"
        if (this.userConnect == false) {

            this.signUp = document.getElementById('signUp')
            this.signUp.style.display = "none"
            this.connect = document.getElementById('connect')
            this.connect.style.display = "none"
            this.account_btn = document.getElementById('account_id')
            this.account_btn.style.display = "block"
        }

    }

}

let classSign = document.getElementById('account_id')
classSign.addEventListener('click', () => {
    let classa = new titles()
    classa.viewSignLogin()
})


