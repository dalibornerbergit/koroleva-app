import axios from "axios";

const baseUrl = process.env.VUE_APP_KOROLEVA_API_URL;

const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // Check cross-site Access-Control
    headers: {
        Accept: 'application/json'
    },
});

export default instance;