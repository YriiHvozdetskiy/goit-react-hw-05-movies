import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3'
const API_KEY = '69b1ed32153c6251070dbd74f0e15c4e'

export const fetchMovies = async () => {
    try {
        const response = await axios.get(`/trending/movie/day?api_key=${API_KEY}`)
        return response.data.results
    } catch (error) {
        // кастомне повідомлення при помилці з беку
        return Promise.reject(new Error('Ой щось пішло не так :('))
    }
}

export const fetchMovieById = async (id) => {
    try {
        const response = await axios.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`)
        return response.data;
    } catch (error) {
        return Promise.reject(new Error('Ой-йо-йой щось пішло не так :('))
    }
}

export const fetchMovieCast= async (id) => {
    try {
        const response = await axios.get(`/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
        return response.data;
    } catch (error) {
        return Promise.reject(new Error('Опа щось пішло не так :('))
    }
}

export const fetchMovieReviews= async (id) => {
    try {
        const response = await axios.get(`/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
        return response.data;
    } catch (error) {
        return Promise.reject(new Error('Опа-опача  щось пішло не так :('))
    }
}

export const fetchMovieSearch= async (search) => {
    try {
        const response = await axios.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`)
        return response.data.results; //??????????????
    } catch (error) {
        return Promise.reject(new Error('Опана, щось пішло не так :('))
    }
}


