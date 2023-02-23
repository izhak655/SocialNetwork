

export class ReferenceFourom {
    constructor() {

    }

    async getAllThread(token) {

        let get = await fetch(`https://bit-socialnetwork.herokuapp.com/forums/allThread`,{
            method:'GET',
            headers: {
                'authorization': token,
              },
            })
        let res = await get.json()
        return res
    }

    async createThread(title, text,token) {
        
        let values = {
            title: title,
            text: text
        }

        let options = {
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                'authorization': token,
            },
            method: "POST",
            body: JSON.stringify(values)
        }

        let newThears = await fetch(`https://bit-socialnetwork.herokuapp.com/forums/creatNewThread`, options)
        let res = await newThears.json()
        return res
       
    }

    async commentList(id){

        let values = {
            idParent: id,
        }

        let options = {
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                'authorization': 'undefined',
            },
            method: "POST",
            body: JSON.stringify(values)
        }

        let allList = await fetch(`https://bit-socialnetwork.herokuapp.com/forums/commentList`, options)
        let res = await allList.json()
        return res
       
    }

    async newComment(idParent,textReplay,token){

        let values = {
            idParent: idParent,
            textReplay:textReplay
        }

        let options = {
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                'authorization': token,
            },
            method: "POST",
            body: JSON.stringify(values)
        }

        let Comment = await fetch(`https://bit-socialnetwork.herokuapp.com/forums/newComment`, options)
        let res = await Comment.json()
        return res
       
    }
}