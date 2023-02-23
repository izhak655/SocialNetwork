

export class Login {

    async sendLogin(nameText, password) {
        let values = {
            name: nameText,
            pass: password
        }

        let options = {

            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                'authorization': 'undefiend',
            },
            method: "POST",
            // credentials: 'include',
            body: JSON.stringify(values)
        }

        let login = await fetch(`https://bit-socialnetwork.herokuapp.com/users/login`, options)
      
        let res = await login.json()
        return res

    }
}
