const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

//import routes
const landingRoutes = require('./routes/landing');
const jobseekerRoutes = require('./routes/jobseeker');
const adminRoutes = require('./routes/admin');

//import models
const User = require('./models/user');

const MONGODB_URI = 'mongodb://localhost:27017/employmeDB';
// const MONGODB_URI = 'mongodb+srv://admin-ashfaq:admin123@cluster0-nkvw7.mongodb.net/employmeDB';

const app = express();
const store = new MongoDBStore({
	uri        : MONGODB_URI,
	collection : 'sessions'
});

//Connecting the database
mongoose.connect(MONGODB_URI, {
	useNewUrlParser : true,
	useCreateIndex  : true
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(
	session({
		secret            : 'my secret',
		resave            : false,
		saveUninitialized : false,
		store             : store
	})
);

app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}
	User.findById(req.session.user._id)
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => console.log(err));
});

//Main code starts here
const sequelize = require('./util/database'); //importing the database

//----------------------------------ROUTES--------------------------

//landing page routes
app.use(landingRoutes);
//jobseeker routes
app.use('/jobseeker', jobseekerRoutes);
//admin routes
app.use('/admin', adminRoutes);
//page not found
app.use((req, res, next) => {
	res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

//------------------------------SERVER PORT---------------------------
app.listen(process.env.PORT || 4000, () => {
	console.log('App listening on port 4000!');
});
