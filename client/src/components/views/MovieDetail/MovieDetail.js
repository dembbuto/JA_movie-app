import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function MovieDetail(props) {
	let movieId = props.match.params.movieId;
	const [Movie, setMovie] = useState([]);
	const [Casts, setCasts] = useState([]);
	const [ActorToggle, setActorToggle] = useState(false);

	useEffect(() => {
		const endpointInfo = `${API_URL}${movieId}?api_key=${API_KEY}`;
		fetch(endpointInfo)
			.then(response => response.json())
			.then(response => {
				console.log(response);
				setMovie(response);
			});

		const endpointCast = `${API_URL}${movieId}/credits?api_key=${API_KEY}`;
		fetch(endpointCast)
			.then(response => response.json())
			.then(response => {
				console.log('responseForCast', response);
				setCasts(response.cast);
			});
	}, []);

	const toggleActorView = () => {
		setActorToggle(!ActorToggle);
	};

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
			<div
				style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}
			>
				<button onClick={toggleActorView}>Toggle Actor View</button>
			</div>

			{ActorToggle && (
				<Row gutter={[16, 16]}>
					{Casts &&
						Casts.map((cast, index) => (
							<React.Fragment key={index}>
								<GridCards
									image={
										cast.profile_path
											? `${IMAGE_BASE_URL}w500${cast.profile_path}`
											: null
									}
									characterName={cast.name}
								/>
							</React.Fragment>
						))}
				</Row>
			)}

			{/* Comments */}
		</div>
	);
}

export default MovieDetail;
