import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as serverApi from '../../../services/movies-api'
import s from './HomePage.module.scss'

export default function HomePage() {
  const [value, setValue] = useState([])
  const [error, setError] = useState('')
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
	{/*{!error && <h1>Trending today</h1>}*/}
	{value &&
	<ul className={s.list}>
	  {value.map(({id, title, poster_path,release_date,vote_average,genre}) => {
		return (
		  <li key={id} className={s.item}>
			<Link to={
			  {
				pathname: `movies/${id}`,
				state: {from: '/'},
			  }} className={s.link}>
			  {<img className={s.poster} src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title}/>}
			  <div className={s.box}>
				<h2 className={s.title}>{title}</h2>
				<span className={s.vote}>{vote_average}</span>
			  </div>
				<p className={s.release}>{release_date}</p>
			</Link>
		  </li>)
	  })}
	</ul>
	}
  </>)
}


