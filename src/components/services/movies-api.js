import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3'
const KEY_API = '69b1ed32153c6251070dbd74f0e15c4e'

export const fetchMovies = async () => {
    try {
        const response = await axios.get(`/trending/movie/day?api_key=${KEY_API}`)
        return response.data.results
    } catch (error) {
        // кастомне повідомлення при помилці з беку
        return Promise.reject(new Error('Ой щось пішло не так :('))
    }
}

export const fetchMovieById = async (id) => {
    try {
        const response = await axios.get(`/movie/${id}?api_key=${KEY_API}&language=en-US`)
        return response.data;
    } catch (error) {
        return Promise.reject(new Error('Ой-йо-йой щось пішло не так :('))
    }
}


export const fetchMovieCast= async (id) => {
    try {
        const response = await axios.get(`/movie/${id}/credits?api_key=${KEY_API}&language=en-US`)
        return response.data;
    } catch (error) {
        return Promise.reject(new Error('Опа щось пішло не так :('))
    }
}


