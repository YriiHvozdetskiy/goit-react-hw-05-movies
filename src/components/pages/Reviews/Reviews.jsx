import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as serverApi from '../../services/movies-api'

export default function Reviews() {
	const [review, setReview] = useState(null)
	const [error, setError] = useState(null)
	const {movieId} = useParams()

	useEffect(() => {
		async function fetchData() {
			try {
				const reviewsView = await serverApi.fetchMovieReviews(movieId)
				await setReview(reviewsView)
			} catch (error) {
				// приходе кастомне повідомлення error і записується в стейт
				setError(error.message)
			}
		}

		fetchData();
	}, [movieId])
	//TODO доодати повідомлення коли  нема Reviews
	return (<>
		{error && <h1>{error}</h1>}
		{/*{<h1>Для цього фільма немає review</h1>}*/}
		{review && <ul>
			{review.map(({id, author, content}) => {
				return (
					<li key={id}>
						<h4>{author}</h4>
						<p>{content}</p>
					</li>
				)
			})}
		</ul>}
	</>)
}


