import axios from 'axios'

// This is not being used!

const url = 'http://127.0.0.1:8000/api/v1/user/'

class AuthServices {
    static login(email, password) {
        return axios.post(`${url}login`, {
            email: email,
            password: password
        })
            .then(response => {
                console.log("Login: ", response);
                localStorage.setItem("accessToken", response.data.accessToken)
                // this.$store.dispatch('user', response.data.user)
                // this.$router.push({ name: "home" })
            })
    }

    static getUser() {
        return axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then(response => {
                console.log("User: ", response)
            })
    }
}

export default AuthServices