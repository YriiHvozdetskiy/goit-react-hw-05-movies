import {useEffect, useState} from "react";
import {fetchMovies} from '../../services/movies-api'

export default function HomePage() {
    const [value, setValue] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {

        async function fetchData() {
            try {
                await fetchMovies()
            } catch (error) {
                // приходе кастомне повідомлення error і записується в стейт
                setError(error.message)
            }
        }

        fetchData()
    }, [])

    return (<>
        {error && <h1>{error}</h1>}
        <h1>Trending today</h1>

    </>)
}


