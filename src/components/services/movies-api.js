import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3'
const KEY_API = '69b1ed32153c6251070dbd74f0e15c4e'

export const fetchMovies = async () => {
    try {
        const response = await axios.get(`/trending/movie/day?api_key=${KEY_API}`)
        return response.data
    } catch (error) {
        // кастомне повідомлення при помилці з беку
        return Promise.reject(new Error('Ой щось пішло не так :('))
    }
}

