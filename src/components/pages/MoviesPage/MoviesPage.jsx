import {useEffect, useState} from 'react'
import * as serverApi from '../../services/movies-api'
import s from './MoviesPage.module.scss'
import {Link, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import defaultImage from "../../../default.jpg";

export default function MoviesPage() {
	const [searchValue, setSearchValue] = useState(null)
	const [data, setData] = useState([])
	const [error, setError] = useState('')
	const location = useLocation()
	const history = useHistory()
	const {url} = useRouteMatch()
	//TODO розділити на 2 useEffecta (searchParam i searchData)
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
		{/*TODO показувати error */}

		<header className={s.Searchbar}>
			<form className={s.SearchForm} onSubmit={handleSubmit}>
				<button type="submit" className={s.SearchFormButton}>
					<span className={s.SearchFormButtonLabel}>Search</span>
				</button>
				<input
					className={s.SearchFormInput}
					type="text"
					name='value'
					autoFocus
					placeholder="Search movies"
				/>
			</form>
		</header>
		{data && <ul className={s.list}>
			{data.map(({id, overview, budget, release_date, vote_average, title, poster_path}) => {
				return (
					<li key={id} className={s.item}>
						{/*передаєм обєкт, в to передаєм обєкт цього місця знаходження (location) і pathname - куда перейти */}
						<Link to={
							{
								pathname: `${url}/${id}`,
								state: {from: `${url}`},
							}}>
							<h2>{title}</h2>
							{poster_path && <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}/>}
							{/*підставляєм дифолтну картинку якщо не приходе з бека  і ренд тільки один img де є картинка */}
							{!poster_path && <img src={defaultImage} alt={title}/>}
							<p>{vote_average}</p>
							<p>{release_date}</p>
							<p>{budget}</p>
							<p>{overview}</p>
						</Link>
					</li>
				)
			})}
		</ul>}
	</>)
}
