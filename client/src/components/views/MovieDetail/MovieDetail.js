import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {
	let movieId = props.match.params.movieId;
	const [Movie, setMovie] = useState([]);
	useEffect(() => {
		const endpointCrew = `${API_URL}${movieId}/credits?api_key=${API_KEY}`;
		const endpointInfo = `${API_URL}${movieId}?api_key=${API_KEY}`;
		fetch(endpointInfo)
			.then(response => response.json())
			.then(response => {
				console.log(response);
				setMovie(response);
			});
	}, []);

	return (
		<div>
			{/* Header */}
			{Movie && (
				<MainImage
					image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
					title={Movie.original_title}
					text={Movie.overview}
				/>
			)}

			{/* Body */}
			<div style={{ width: '85%', margin: '1rem auto' }}>
				{/* Movie Info */}
				<MovieInfo movie={Movie} />
				<br />
			</div>

			{/* Actors Grid*/}

			{/* Comments */}
		</div>
	);
}

export default MovieDetail;
