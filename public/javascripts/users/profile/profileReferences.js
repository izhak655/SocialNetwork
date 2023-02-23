

export class getProfile {
    constructor() { }

    async information(idUpload,token) {
        
        let value = {
            idUpload: idUpload
        }
        let options = {
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                'authorization':  token,
            },
            method: "POST",
            body: JSON.stringify(value)
        }
        try {
            let getInformtion = await fetch(`https://bit-socialnetwork.herokuapp.com/users/informtionProfile`, options)
            let res = await getInformtion.json()
            return res
        } catch {
            return ({ code: 404, mese: "A call to the server failed" })
        }

    }
    
    async profileImg(requestOptions){
        let files = await  fetch(`https://bit-socialnetwork.herokuapp.com/files/uploadImgProfile`, requestOptions)
        let res = await files.json()
        return res   
    }

}