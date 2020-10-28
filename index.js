const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { urlencoded } = require('express');
require('dotenv').config();

//Routes
const Route_User = require('./route/user');

//using
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + 'public'));
app.options('*', cors());
app.use(cors());

mongoose
	.connect(process.env.URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('Successfully Conntected to MongoDB Server!');
	});

app.use('/user', Route_User);

app.listen(process.env.PORT, () => {
	console.log(`Successfuly Connected to PORT ${process.env.PORT}`);
});
