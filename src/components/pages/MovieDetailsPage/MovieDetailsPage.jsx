import {useState, useEffect, Suspense, lazy} from 'react';
import {NavLink, Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import * as serverApi from '../../services/movies-api'
import {useGoBack} from '../../hooks/index'
import s from './MovieDetailsPage.module.scss'
import defaultImage from "../../../default.jpg";
//лінива загрузка, грузиться коли переходем на цю компоненту
// /* webpackChunkName: "name" */  підписуєм компоненту при загрузці
const Cast = lazy(() => import('../Cast/Cast' /* webpackChunkName: "Cast" */))
const Reviews = lazy(() => import('../Reviews/Reviews' /* webpackChunkName: "Reviews" */))

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState('')
  const {movieId} = useParams()
  const {url, path} = useRouteMatch()
  const {goBack} = useGoBack()
//TODO нормально стилізувати MovieDetailsPage
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
  }, [movieId])
  return (<div className={s.wrapper}>
	<div className={s.info}>
	  {error && <h1>{error}</h1>}
	  {/*використовуєм кастомний хук щоб повернутися "назад"*/}
	  <button type="button" onClick={goBack}>Go back</button>
	  {movie &&
	  (<ul>
		<li key={movie.id}>
		  <h2>{movie.title}</h2>
		  {movie.poster_path && <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>}
		  {/*підставляєм дифолтну картинку якщо не приходе з бека  і ренд тільки один img де є картинка */}
		  {!movie.poster_path && <img src={defaultImage} alt={movie.title}/>}
		  <p>Vote {movie.vote_average}</p>
		  <p>Release {movie.release_date}</p>
		  <p>Budget {movie.budget} $</p>
		  <p>{movie.overview}</p>
		  <p>Genres: {movie.genres.map(({name},i) => (<span key={i}>{name} </span>))}</p>
		</li>
	  </ul>)}
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
	{/*Suspense повинен обгортати тільки те що загружається при кліку -- не все в компоненті */}
	<Suspense>
	  <Switch>
		{/*коли шлях в Route path буде співпадати з NavLink to: to={`${url}/cast`}  ===  path={`${path}/cast`}, то буде рендитися компонента між Route під ul  */}
		<Route path={`${path}/cast`}>
		  <Cast/>
		</Route>
		<Route path={`${path}/reviews`}>
		  <Reviews/>
		</Route>
	  </Switch>
	</Suspense>
  </div>)
}
