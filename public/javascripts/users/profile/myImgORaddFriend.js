import { titles } from "../../titlesAndCookie.js"



export function back(newCon,exit){
    let newTitle = new titles()
 
    newTitle.backMenu(newCon,exit)
}


export async function addFriend(idFriend,token){
    let value = {
        idFriend: idFriend
    }
    let options = {
        headers: {
            "accept": "application/json",
            "content-type": "application/json",
            'authorization': token,
        },
        method: "POST",
        body: JSON.stringify(value)
    }
        try{
            let res = await fetch(`https://bit-socialnetwork.herokuapp.com/friends/addFriend`, options)
            let data = res.json()
            return data
        }catch{
            return ({code:404,mese:"The call to the server failed"})
        }     
    
}

export async function follow(idFollower,token){
    let value = {
        idFollower: idFollower
    }
    let options = {
        headers: {
            "accept": "application/json",
            "content-type": "application/json",
            'authorization': token,
        },
        method: "POST",
        body: JSON.stringify(value)
    }
        try{
            let res = await fetch(`https://bit-socialnetwork.herokuapp.com/follow/addFollower`, options)
            let data = res.json()
            return data
        }catch{
            return ({code:404,mese:"The call to the server failed"})
        }     
    
}