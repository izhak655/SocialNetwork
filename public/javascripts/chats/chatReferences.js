export class ReferenceChat {

    async getAllMess(token) {
        
        let files = await fetch(`https://bit-socialnetwork.herokuapp.com/chats/sendAllMess`,{
            method:'GET',
            headers: {
                'authorization': token,
              },
            })
        let res =  await files.json()
        return res
    }

    async NewMess(mess,token){

        let value = {
            mess:mess
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

        let newM = await fetch(`https://bit-socialnetwork.herokuapp.com/chats/getNewMess`,options)
        // let res = await newM.json()
        // return res
    }

}