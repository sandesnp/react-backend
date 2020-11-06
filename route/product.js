const express = require('express');
const router = express.Router();
const PRODUCT = require('../models/product');
const AUTH = require('./auth');

router.post('/register', (req, res, next) => {
	PRODUCT.findOne({ productname: req.body.productname }).then((productA) => {
		if (productA) {
			let err = new Error(
				`There is already a product with the name registered`
			);
			err.status = 401;
			return next(err);
		}
		PRODUCT.create(req.body)
			.then((productA) => {
				res.json(productA);
				console.log('Successfully Registered a Product');
			})
			.catch(next);
	});
});

router.get('/', (req, res, next) => {
	PRODUCT.find()
		.then((productA) => {
			res.json(productA);
			console.log(`Get request for Product`);
		})
		.catch(next);
});

module.exports = router;
