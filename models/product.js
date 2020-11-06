const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		productname: {
			type: String,
		},
		productimage: {
			type: String,
		},
		productdescription: {
			type: String,
		},
		productbrand: {
			type: String,
		},
		productsizing: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
