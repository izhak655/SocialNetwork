import {appNavigation, creating} from "./createPulgin.js"

async function initHtml(){

    const body = document.querySelector('body'); 
    const head = document.querySelector('head');

    //Adds a socket
    await initSocket(head);
   

    //adds all information to head tag
    await initHeadApp(head,body);

    //adds main file and panel to dom
    await addAppDom(body)
  
    await initCookies(head)
  
}
export default initHtml();




//function of init html

function initHeadApp(head,body){
    
    //adds viewport
    return new Promise((resolve, reject) => {
        
        // const viewPortTag = document.createElement('meta');
        // // viewPortTag.id = "viewport";
        // viewPortTag.name = "viewport";
        // viewPortTag.content = "width=device-width, initial-scale=1";
        // document.querySelector('head').appendChild(viewPortTag);

        //adds fontawesome

        const fontawesome = document.createElement("script"); 
        fontawesome.src = "https://kit.fontawesome.com/fe7c245d79.js";
        fontawesome.crossorigin ='anonymous';
        
        head.appendChild(fontawesome); 

             //adds fonts
        const font = document.createElement('link');
        font.href = "https://fonts.googleapis.com/css2?family=Catamaran&display=swap";
        font.rel  = 'stylesheet';
        head.appendChild(font);

        //adds enrollment css file
        let arrCss = ['generalStyle.css','user.css','files.css','friendsAndFollow.css','profile.css','chat.css','forum.css','notifications.css','viewThinker.css']
        for(let key in arrCss){

            const enrollment  = document.createElement('link');
            enrollment.rel  = 'stylesheet';
            enrollment.type = 'text/css';
            enrollment.href = `https://bit-socialnetwork.herokuapp.com/stylesheets/${arrCss[key]}`;
            
            head.appendChild(enrollment);
        }

        //add modules 
        let arrModules = ['/titlesAndCookie.js','/users/signUP/signReferences.js','/users/profile/myProfile.js','/users/login/loginReferences.js','/users/login/userLogin.js','/friends/userAut.js','/follow/viewFollow.js','/files/fileUpLoad.js','/chats/clientChat.js','/forum/clientFurom.js','/index.js']
        // let checkBpdy = document.querySelector('body')
        for(let i in arrModules){

            let scrip  = document.createElement('script');
            scrip.src = `https://bit-socialnetwork.herokuapp.com/javascripts${arrModules[i]}`;
            scrip.type = 'module';
      
            head.appendChild(scrip);
        }
        resolve();
    });
    
}



function initSocket(head){
    return new Promise((resolve, reject) => {
        // const siofu = document.createElement("script"); 
        // siofu.src = "https://testchatplugin.herokuapp.com/siofuclient.js"; 
        // body.appendChild(siofu); 

            
        const io = document.createElement("script"); 

        io.src = `https://bit-socialnetwork.herokuapp.com/socket.io/socket.io.js`; 
        // io.type = "module"
        head.appendChild(io); 

        resolve();
    });
}

function addAppDom(){ 
    return new Promise((resolve, reject) => {


        const main = creating()
        const app = appNavigation()
        let body = document.querySelector('body')
        body.innerHTML += app
        body.innerHTML += main


    resolve();

    });

}

function initCookies(head){   
    const cookies = document.createElement("script"); 
    cookies.src = "https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js"; 
    head.appendChild(cookies);


    return new Promise((resolve, reject) => {
    cookies.onload = (() => {
            
            resolve();
        })
      });
   
}

// function initLocalStorage(){
//     const rate = localStorage.getItem("rate");
//     if(!rate){
//         localStorage.setItem("rate", JSON.stringify([]));
//     }
//     const offensive = localStorage.getItem("offensive");
//     if(!offensive){
//         localStorage.setItem("offensive", JSON.stringify([]));
//     }
// }