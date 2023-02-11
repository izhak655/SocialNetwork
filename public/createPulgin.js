

export function creating()
{
    let counteiner = ` <div class="counteiner_fluid">
                            <div class="exit">
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </div>
                            <div class="counteiner">
                                <div class="view">
                                    <button class="chat "><i class="fa fa-comments-o" aria-hidden="true"></i>
                                        <p class="text">צ'אט</p>
                                    </button>
                                </div>
                                <div class="view">
                                    <button class="file "> <i class="fa fa-files-o" aria-hidden="true"></i>
                                        <p class="text">קבצים</p>
                                    </button>
                                </div>
                                <div class="view"> 
                                    <button class="friends "><i class="fa fa-users" aria-hidden="true"></i>
                                        <p class="text">חברים</p>
                                    </button>
                                </div>
                                <div class="view">
                                    <button class="forum "><i class="fa fa-commenting-o" aria-hidden="true"></i>
                                        <p class="text">פורום</p>
                                    </button>
                                </div>
                                <div class="account view">
                                    <button  id="account_id"><i class="fa fa-sign-in" aria-hidden="true"></i>
                                        <p class="text">חשבון</p>
                                    </button>
                                    <button class="smallButton" id="signUp">הרשמה</button>
                                    <button class="smallButton" id="connect">התחברות</button>
                                </div>
                                <div class="view">
                                    <button class="follow ">
                                        <i class="fa fa-binoculars" aria-hidden="true"></i>
                                        <p class="text">לעקוב</p>
                                    </button>
                                </div>
                            </div>
                        </div>`

    return counteiner
}


export function appNavigation (){
    let app = ` <div class="appNavigation">
                    <div class="icon">
                        <i class="fa fa-arrow-down" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="startPlugin">
                    <i class="fa fa-comments-o" aria-hidden="true"></i>
                </div>`

                return app
}