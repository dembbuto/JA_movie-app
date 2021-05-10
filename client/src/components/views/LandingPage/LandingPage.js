import React, { useEffect, useState } from 'react';
// import { FaCode } from 'react-icons/fa';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';

function LandingPage() {
	let [Movies, setMovies] = useState([]);
	let [MainMovieImage, setMainMovieImage] = useState(null);

	useEffect(() => {
		const endpoint = `${API_URL}popular?api_key=${API_KEY}&language=en-US&page=1`;

		fetch(endpoint)
			.then(response => response.json())
			.then(response => {
				console.log(response);
				setMovies([...Movies, ...response.results]);
				setMainMovieImage(response.results[0]);
			});
	});

	return (
		<div style={{ width: '100%', margin: '0' }}>
			{/* Main Image */}
			{MainMovieImage && (
				<MainImage
					image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
					title={MainMovieImage.original_title}
					text={MainMovieImage.overview}
				/>
			)}
			<div style={{ width: '85%', margin: '1rem auto' }}>
				<h2>Movie by latest</h2>
				<hr />
			</div>
		</div>
	);
}

export default LandingPage;
