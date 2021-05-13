import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Favorite(props) {
	const movieId = props.movieId;
	const userFrom = props.userFrom;
	const movieTitle = props.movieInfo.movieTitle;
	const moviePost = props.movieInfo.backdrop_path;
	const movieRunTime = props.movieInfo.runtime;

	const [FavoriteNumber, setFavoriteNumber] = useState(0);
	const [Favorited, setFavorited] = useState(false);

	useEffect(() => {
		let variables = {
			userFrom,
			movieId,
		};

		Axios.post('/api/favorite/favoriteNumber', variables).then(response => {
			console.log('favoriteNumber', response.data);
			if (!response.data.success) {
				alert('숫자 정보를 가져오는데 실패 했습니다.');
			} else {
				setFavoriteNumber(response.data.favoriteNumber);
			}
		});

		Axios.post('/api/favorite/favorited', variables).then(response => {
			console.log('favorited', response);
			if (!response.data.success) {
				alert('정보를 가져오는데 실패 했습니다.');
			} else {
				setFavorited(response.data.favorited);
			}
		});
	}, []);

	return (
		<div>
			<button>
				{Favorited ? 'Not Favorite' : 'Add to Favorite'} {FavoriteNumber}
			</button>
		</div>
	);
}

export default Favorite;
