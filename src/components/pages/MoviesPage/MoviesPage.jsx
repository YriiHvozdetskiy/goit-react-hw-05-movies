import {useEffect, useState} from 'react'
import * as serverApi from '../../services/movies-api'
import s from './MoviesPage.module.scss'

export default function MoviesPage() {
	const [searchValue, setSearchValue] = useState(null	)
	const [data,setData] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		if (!searchValue) return


		async function fetchData() {
			try {
				const searchData = await serverApi.fetchMovieSearch(searchValue)
				await setData(searchData)

			} catch (error) {
// приходе кастомне повідомлення error і записується в стейт
				setError(error.message)
			}
		}

		fetchData()
	}, [searchValue])

	const handleSubmit = (e) => {
		e.preventDefault()
		const {value} = e.target.value
		setSearchValue(value)
	}

	return (<>
		{error && <h1>{error}</h1>}
		{/*TODO не рендирити форму при error */}
		{data && <ul className={s.list}>
			{data.map(({id,overview,budget,release_date,vote_average,title})=> {
				return(
					<li key={id} className={s.item}>
						<h2>{title}</h2>
						<p>{vote_average}</p>
						<p>{release_date}</p>
						<p>{budget}</p>
						<p>{overview}</p>
					</li>
				)})}
		</ul>}
		<form onSubmit={(e) => handleSubmit(e)}>
			<input type="text" name='value'/>
			<button type='submit'>Search</button>
		</form>
	</>)
}
