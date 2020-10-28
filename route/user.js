const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const USER = require('../models/user');
const AUTH = require('./auth');

//routes for register, login and profile
router.post('/register', (req, res, next) => {
	USER.findOne({ email: req.body.email }).then((userA) => {
		if (userA != null) {
			let err = new Error('This email has been already used for Registration');
			err.status = 401;
			return next(err);
		}
		bcryptjs.hash(req.body.password, 10, function (err, hash) {
			if (err) {
				throw new Error('Could not encrypt Password!');
			}
			let userB = new USER(req.body);
			userB.password = hash;
			userB.save().then((userC) => {
				let token = jwt.sign({ userID: userC._id }, process.env.SECRET);
				res.json({
					status: `Account Created for -> ${userC.email}`,
					token: token,
				});
			});
		});
	});
});
router.post('/login', (req, res, next) => {
	USER.findOne({ email: req.body.email }).then((userA) => {
		if (!userA) {
			let err = new Error('Email not found!');
			err.status = 401;
			res.json({ status: 'Email not found' });
			return next(err);
		}
		bcryptjs.compare(req.body.password, userA.password, function (err, status) {
			if (!status) {
				err = new Error('Password did not match');
				err.status = 401;
				res.json({ status: 'password does not match' });
				return next(err);
			}
			console.log(`Login for ${userA.email}`);
			let token = jwt.sign({ userID: userA.id }, process.env.SECRET);
			res.json({
				status: `Successfully logged in for -> ${userA.email}`,
				token: token,
			});
		});
	});
});
router.get('/profile', AUTH.verifyuser, (req, res, next) => {
	if (!req.user) {
		let err = new Error('No data found');
		err.status = 401;
		return next(err);
	}
	res.json(req.user);
	console.log(`Profile information populated for -> ${req.user.email}`);
});

module.exports = router;
