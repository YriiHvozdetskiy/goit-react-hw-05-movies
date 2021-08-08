import {lazy,Suspense } from "react";
import {Route, Switch} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
//лінива загрузка, грузиться коли переходем на цю компоненту
// /* webpackChunkName: "MoviesPage" */  підписуєм компоненту при загрузці
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage' /* webpackChunkName: "MoviesPage" */))
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */))
const NotFoundView = lazy(() => import('../pages/NotFoundView/NotFoundView' /* webpackChunkName: "NotFoundView" */))

export default function Main() {
  return (<>
	<main>
	  <section>
		{/*Suspense повинен обгортати тільки те що загружається при кліку*/}
		{/* в fallback передаєм JSX який буде показуватися коли загр компонента */}
		<Suspense fallback={<h1>Loading...</h1>}>
		  <Switch>
			<Route exact path='/'>
			  <HomePage/>
			</Route>
			<Route path='/movies/' exact>
			  <MoviesPage/>
			</Route>
			<Route path='/movies/:movieId'>
			  <MovieDetailsPage/>
			</Route>
			<Route>
			  <NotFoundView/>
			</Route>
		  </Switch>
		</Suspense >
	  </section>
	</main>
  </>)
}

