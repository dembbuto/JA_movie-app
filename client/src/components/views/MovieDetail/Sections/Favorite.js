import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {
	const userFrom = props.userFrom;
	const movieId = props.movieId;
	const movieTitle = props.movieInfo.movieTitle;
	const moviePost = props.movieInfo.backdrop_path;
	const movieRunTime = props.movieInfo.runtime;

	const [FavoriteNumber, setFavoriteNumber] = useState(0);
	const [Favorited, setFavorited] = useState(false);

	let variables = {
		userFrom,
		movieId,
		movieTitle,
		moviePost,
		movieRunTime,
	};

	useEffect(() => {
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

	const onClickFavorite = () => {
		if (Favorited) {
			Axios.post('/api/favorite/removeFromFavorite', variables).then(
				response => {
					if (!response.data.success) {
						alert('Favorite 리스트에서 지우는데 실패 했습니다.');
					} else {
						setFavoriteNumber(FavoriteNumber - 1);
						setFavorited(!Favorited);
					}
				},
			);
		} else {
			Axios.post('/api/favorite/addFromFavorite', variables).then(response => {
				if (!response.data.success) {
					alert('Favorite 리스트에 추가하는데 실패 했습니다.');
				} else {
					setFavoriteNumber(FavoriteNumber + 1);
					setFavorited(!Favorited);
				}
			});
		}
	};

	return (
		<div>
			<Button onClick={onClickFavorite}>
				{Favorited ? 'Not Favorite' : 'Add to Favorite'} {FavoriteNumber}
			</Button>
		</div>
	);
}

export default Favorite;
