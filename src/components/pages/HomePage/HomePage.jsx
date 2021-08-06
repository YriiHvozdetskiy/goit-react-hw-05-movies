import {useEffect, useState} from "react";
import * as serverApi from '../../services/movies-api'
import {Link} from "react-router-dom";

export default function HomePage() {
    const [value, setValue] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await serverApi.fetchMovies()
                await setValue(data)
            } catch (error) {
                // приходе кастомне повідомлення error і записується в стейт
                setError(error.message)
            }
        }

        fetchData()
    }, [])

    return (<>
        {error && <h1>{error}</h1>}
        {/*TODO рендирити тіки коли є список*/}
        {!error && <h1>Trending today</h1>}
        {value &&
        <ul>
            {value.map(movie => {
                return (
                    <li key={movie.id}>
                        <Link to={`movies/${movie.id}`}>
                            {movie.title}
                        </Link>
                    </li>)
            })}
        </ul>
        }
    </>)
}


