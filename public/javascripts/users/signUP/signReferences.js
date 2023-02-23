import { userSignUp } from "./userSignUp.js"

export class SignUp {

    constructor() {
    }

    async sendSingUp(nameText, email, password) {

        let values = {
            name: nameText,
            email: email,
            pass: password
        }

        let options = {
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                'authorization': 'undefiend',
            },
            method: "POST",
            body: JSON.stringify(values)
        }

        let res = await fetch(`https://bit-socialnetwork.herokuapp.com/users/signUp`, options)
        let data = await res.json()

        return data

    }


}

