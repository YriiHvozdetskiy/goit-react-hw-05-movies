import {useEffect, useState} from "react";
import * as serverApi from '../../services/movies-api'
import {Link} from "react-router-dom";

export default function HomePage() {
  const [value, setValue] = useState([])
  const [error, setError] = useState('')
//TODO нормально стилізувати HomePage
//TODO дод loader spiner
//TODO дод пагінацію
//TODO прописати propTypes

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
	  {value.map(({id, title, poster_path}) => {
		return (
		  <li key={id}>
			<Link to={
			  {
				pathname: `movies/${id}`,
				state: {from: '/'},
			  }}>
			  <h2>{title}</h2>
			  {<img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title}/>}
			</Link>
		  </li>)
	  })}
	</ul>
	}
  </>)
}


