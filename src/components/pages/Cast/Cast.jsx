import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as serverApi from '../../services/movies-api'
import s from './Cast.module.scss'

export default function Cast() {
	const [cast, setCast] = useState(null)
	const [error, setError] = useState('')
	const {movieId} = useParams()

	useEffect(() => {
		async function fetchData() {
			try {
				const info = await serverApi.fetchMovieCast(movieId)
				await setCast(info)
				console.log(cast)
			} catch (error) {
				// приходе кастомне повідомлення error і записується в стейт
				setError(error.message)
			}
		}

		fetchData()
	}, [])
	return (<>
		{error && <h1>{error}</h1>}
		{cast && <ul className={s.list}>
			{cast.cast.map(({id, profile_path, original_name, character}) => {
				return (<li key={id} className={s.item}>
					{/*<img src={profile_path} alt=""/>*/}
					<p>{character}</p>
					<p>{original_name}</p>
				</li>)
			})}
		</ul>}
	</>)
}


