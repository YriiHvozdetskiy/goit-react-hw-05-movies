import {useEffect, useState} from 'react'
import * as serverApi from '../../services/movies-api'
import s from './MoviesPage.module.scss'
import {useHistory, useLocation} from "react-router-dom";

export default function MoviesPage() {
	const [searchValue, setSearchValue] = useState(null)
	const [data, setData] = useState([])
	const [error, setError] = useState('')
	const location = useLocation()
	const history = useHistory()


	useEffect(() => {
		const searchParam = new URLSearchParams(location.search).get('query')
		if (searchParam !== null) {
			async function fetchData() {
				try {
					const searchData = await serverApi.fetchMovieSearch(searchParam)
					await setData(searchData)
				} catch (error) {
// приходе кастомне повідомлення error і записується в стейт
					setError(error.message)
				}
			}

			fetchData()
		}
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

		history.push({
			...location,
			search: `query=${searchValue}`
		})
	}, [searchValue])


	const handleSubmit = (e) => {
		e.preventDefault()
		const {value} = e.target.value
		// робем trim(удаляє пробіли в інпуті) щоб не робити fetch з пустою строкою і щоб не було пустої строки в location.search і за нею  не робився fetch
		setSearchValue(value.trim())
	}

	return (<>
		{error && <h1>{error}</h1>}
		{/*TODO не рендирити форму при error */}
		{data && <ul className={s.list}>
			{data.map(({id, overview, budget, release_date, vote_average, title}) => {
				return (
					<li key={id} className={s.item}>
						<h2>{title}</h2>
						<p>{vote_average}</p>
						<p>{release_date}</p>
						<p>{budget}</p>
						<p>{overview}</p>
					</li>
				)
			})}
		</ul>}
		<form onSubmit={(e) => handleSubmit(e)}>
			<input type="text" name='value'/>
			<button type='submit'>Search</button>
		</form>
	</>)
}
