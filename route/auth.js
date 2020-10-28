const USER = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.verifyuser = (req, res, next) => {
	let authHeader = req.headers.authorization;
	if (!authHeader) {
		let err = new Error('No Authentication information');
		err.status = 401;
		return next(err);
	}
	let token = authHeader.split(' ')[1];
	let data;
	try {
		data = jwt.verify(token, process.env.SECRET);
	} catch (err) {
		return next(err);
	}
	console.log(data);
	//userId is incribed in the token while creating
	USER.findById(data.userID)
		.then((userA) => {
			req.user = userA;
			next();
		})
		.catch(next);
};
