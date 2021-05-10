const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { User } = require('../models/User');

//=================================
//             User
//=================================

router.post('/register', (req, res) => {
	// 회원가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
	const user = new User(req.body);

	user.save((err, userInfo) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({
			success: true,
		});
	});
});

router.post('/login', (req, res) => {
	// 요청된 이메일이 데이터베이스에 있는지 찾는다.
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user)
			return res.json({
				loginSuccess: false,
				message: 'Auth failed, email not found',
			});

		// 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인.
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch)
				return res.json({ loginSuccess: false, message: 'Wrong password' });

			// 비밀번호까지 맞다면 토큰을 생성하기.
			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				// 토큰을 저장한다. 어디에? 쿠키, 로컬 스토리지
				res.cookie('w_authExp', user.tokenExp);
				res.cookie('w_auth', user.token).status(200).json({
					loginSuccess: true,
					userId: user._id,
				});
			});
		});
	});
});

router.get('/auth', auth, (req, res) => {
	// 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말.
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		image: req.user.image,
	});
});

router.get('/logout', auth, (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{ token: '', tokenExp: '' },
		(err, user) => {
			if (err) return res.json({ success: false, err });
			return res.status(200).send({
				success: true,
			});
		},
	);
});

module.exports = router;
