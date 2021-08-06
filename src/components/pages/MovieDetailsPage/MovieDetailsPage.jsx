import {useState, useEffect} from 'react';
import {NavLink, Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import * as serverApi from '../../services/movies-api'
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import s from './MovieDetailsPage.module.scss'
import * as url from "url";

export default function MovieDetailsPage() {
	const [movie, setMovie] = useState(null)
	const [error, setError] = useState('')
	const {movieId} = useParams();
	const {url, path} = useRouteMatch()

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

	return (<div className={s.wrapper}>
		<div className={s.info}>
			{error && <h1>{error}</h1>}
			{movie && <h2>{movie.title}</h2>}
			{movie && <p>Vote {movie.vote_average}</p>}
			{movie && <p>Release {movie.release_date}</p>}
			{movie && <p>Budget {movie.budget} $</p>}
			{movie && <p>{movie.overview}</p>}
			{movie && <p>Genres {movie.genres.map(({name}) => {
				return (<span>{name} </span>)
			})}</p>}
			{/*{movie && <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>}*/}
		</div>
		{/*навігація на сторінки які будуть рендиритися під цим ul( вложений  Route) */}
		<ul className={s.box}>
			<li>
				<NavLink to={`${url}/cast`} className={s.link} activeClassName={s.activeLink}>
					Cast
				</NavLink>
			</li>
			<li>
				<NavLink to={`${url}/reviews`} className={s.link} activeClassName={s.activeLink}>
					Reviews
				</NavLink>
			</li>
		</ul>
		{/*коли шлях в Route path буде співпадати з NavLink to: to={`${url}/cast`}  ===  path={`${path}/cast`}, то буде рендитися компонента між Route під ul  */}
		<Switch>
			<Route path={`${path}/cast`}>
				<Cast/>
			</Route>
			<Route path={`${path}/reviews`}>
				<Reviews/>
			</Route>
		</Switch>
	</div>)
}


