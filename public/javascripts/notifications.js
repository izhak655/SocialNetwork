
export async function notification(logo, title, texts) {

    let popup = document.createElement('div')
    popup.className = "popupNotice"
    let newLogo = document.createElement('div')
    newLogo.className += "newLogo"
    let newTitle = document.createElement('p')
    let newText = document.createElement('p')
    let newBtn = document.createElement('button')
    newBtn.id = "removeMessage"

    newLogo.innerHTML = logo
    newTitle.innerText = title
    newText.innerText = texts
    newBtn.innerHTML = "oK"
    popup.append(newLogo, newTitle, newText, newBtn)

    let counteiner_fluid = document.querySelector('.counteiner_fluid')
    counteiner_fluid.append(popup)
    // const myTimeout = setTimeout(myGreeting, 2000);
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(myGreeting())
        }, 2000)})

    return myPromise
}

function myGreeting() {
    let boxNotice = document.querySelector('.popupNotice')
    boxNotice.remove()
    return true

}