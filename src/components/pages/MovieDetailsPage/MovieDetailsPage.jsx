import {useState, useEffect} from 'react';
import * as serverApi from '../../services/movies-api'
import {useParams} from "react-router-dom";

export default function MovieDetailsPage() {
    const [movie, setMovie] = useState(null)
    const [error, setError] = useState('')
    const {movieId} = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const info = await serverApi.fetchMovieById(movieId)
                await setMovie(info)
            } catch (error) {
                // приходе кастомне повідомлення error і записується в стейт
                setError(error.message)
            }
        }
        fetchData()
    }, [])

    return (<div>
        {error && <h1>{error}</h1>}
        {movie && <h2>{movie.title}</h2>}
        {movie && <p>Vote {movie.vote_average}</p>}
        {movie && <p>Relese {movie.release_date}</p>}
        {movie && <p>Budget {movie.budget} $</p>}
        {movie && <p>{movie.overview}</p>}
        {/*{movie && <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>}*/}
    </div>)
}

