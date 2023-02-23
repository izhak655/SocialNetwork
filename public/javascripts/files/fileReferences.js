

export class ReferenceFile {

    async getAllFiles() {
        let files = await fetch(`https://bit-socialnetwork.herokuapp.com/files/getFiles`,{
            method:'GET',
            headers: {
                'authorization': 'undefiend',
              },
        })

        let res = await files.json()
        return res
    }

    async sendFile(requestOptions) {

        let files = await  fetch(`https://bit-socialnetwork.herokuapp.com/files/upload`, requestOptions)
        let res = await files.json()
        return res   
        
    }

    async deleteFile (name){
        let value = {
            name:name
        }

        let option = {
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                'authorization': 'undefiend',
            },
            method: "POST",
            body: JSON.stringify(value)
        }
        try{
            let res = await fetch(`https://bit-socialnetwork.herokuapp.com/files/deleteFile`,option)
            let data = await res.json()
            return data    
        }catch{
            console.log("There is a communication problem");
        }

    }  
}