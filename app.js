// Import Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// Import routes
const landingRoutes = require('./routes/landing');
const jobseekerRoutes = require('./routes/jobseeker');
const adminRoutes = require('./routes/admin');

// Import models
const User = require('./models/user');
const Admin = require('./models/admin');

// This is the link to the local and live databases. Uncomment where needed
// const MONGODB_URI = 'mongodb://localhost:27017/employmeDB';
const MONGODB_URI = 'mongodb+srv://admin-ashfaq:admin123@cluster0-nkvw7.mongodb.net/employmeDB';

//=====================Main code starts here===========================================

const app = express();
const store = new MongoDBStore({
	uri        : MONGODB_URI,
	collection : 'sessions'
});

// Connecting the database
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

// Create a session

app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}

	if (req.session.userType === 'jobseeker') {
		console.log('The jobseeker logged in!');
		User.findById(req.session.user._id)
			.then((user) => {
				req.user = user;
				return next();
			})
			.catch((err) => console.log(err));
	}

	if (req.session.userType === 'admin') {
		console.log('The admin logged in!');
		Admin.findById(req.session.user._id)
			.then((admin) => {
				req.user = admin;
				return next();
			})
			.catch((err) => console.log(err));
	}
});

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
