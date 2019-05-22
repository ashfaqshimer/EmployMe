const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import routes
const landingRoutes = require('./routes/landing');
const jobseekerRoutes = require('./routes/jobseeker');
const adminRoutes = require('./routes/admin');

const app = express();

//Connecting the database
mongoose.connect('mongodb://localhost:27017/employmeDB',{
    useNewUrlParser:true,
    useCreateIndex:true
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

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
app.listen(process.env.PORT ||4000, () => {
    console.log('App listening on port 4000!');
});

