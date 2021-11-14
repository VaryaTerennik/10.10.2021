import axios from 'axios'

export const apiURL = process.env.REACT_APP_API_URL

const api = axios.create({
    baseURL: apiURL,
    headers: {
        'Accept': 'application/json',
    }
})

export default api