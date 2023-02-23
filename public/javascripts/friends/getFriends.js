// export {userAut} from "./userAut.js"

export class friends {
    constructor() { }

    async vaildUserToken(token) {


        let result = await fetch(`https://bit-socialnetwork.herokuapp.com/friends/get`,{
            method:'GET',
            headers: {
                'authorization': token,
                
              },
        })

        let data = await result.json()
        return data
    }

    async deleteIt(idFriend,token) {

        let values = {
            idFriend:idFriend,
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

        let login = await fetch(`https://bit-socialnetwork.herokuapp.com/friends/delete`,options)
        let res = await login.json()
 
        return res
    }

}