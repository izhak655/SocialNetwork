export class follows {
    constructor() { }

    async vaildUserToken(token) {

        let result = await fetch(`https://bit-socialnetwork.herokuapp.com/follow/getFollowers`,{
            method:'GET',
            headers: {
                'authorization': token,
                
              },
        })
        let data = await result.json()
        return data
    }

    async deleteIt(idFollower,token) {

        let values = {
            idFollower:idFollower,
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

        let login = await fetch(`https://bit-socialnetwork.herokuapp.com/follow/delete`,options)
        let res = await login.json()
        return res
    }

}