import {useEffect, useState} from "react";
import * as serverApi from '../../services/movies-api'
import {Link, useHistory, useLocation, useRouteMatch} from "react-router-dom";

export default function HomePage() {
	const [value, setValue] = useState([])
	const [error, setError] = useState('')
	const {url} = useRouteMatch()
	const location = useLocation()

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
						<Link to={
							{
								pathname: `movies/${movie.id}`,
								state: {from: '/'},
							}}>
							<h2>{movie.title}</h2>
							{<img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}/>}
						</Link>
					</li>)
			})}
		</ul>
		}
	</>)
}


