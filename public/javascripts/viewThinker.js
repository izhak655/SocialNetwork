

export function thinking(){
    let divCount = document.createElement('div')
    divCount.className = "divThinker"

    let btn = document.createElement('button')
    btn.className = "buttonload"

    btn.innerHTML = `<i class="fa fa-spinner" aria-hidden="true"></i>Loading`

    let counteiner_fluid = document.querySelector('.counteiner_fluid')

    counteiner_fluid.prepend(divCount,btn)

}

export function removeIt(){

    let divTHinking = document.querySelector('.divThinker')
    let btn = document.querySelector('.buttonload')
    divTHinking.remove()
    btn.remove()
}