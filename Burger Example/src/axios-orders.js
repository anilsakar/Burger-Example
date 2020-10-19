import axios from "axios"

const instance = axios.create({
    baseURL: 'https://burger-app-fed85.firebaseio.com/'
})

export default instance