export function startPlugin(x){
    let app = document.querySelector('.appNavigation')
    let start = document.querySelector('.startPlugin')
    let counteiner_fluid = document.querySelector('.counteiner_fluid')

    if(x){
       
        app.style.display = "none"
    
        start.style.display = "none"
        counteiner_fluid.style.display = "block"
    }else{
        app.style.display = "block"
    
        start.style.display = "flex"
        counteiner_fluid.style.display = "none"
    }

}


let btn_plugin = document.querySelector('.startPlugin')
btn_plugin.addEventListener('click',()=>{
    startPlugin(true)
})

let exit_counteiner = document.querySelector('.exit')
exit_counteiner.addEventListener('click',()=>{
    startPlugin(false)
})

