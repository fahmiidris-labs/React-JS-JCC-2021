import Axios from "axios"

const axios = Axios.create({
    baseURL: "https://backendexample.sanbersy.com/api",
    withCredentials: false,
})

export default axios