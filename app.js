const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//Main code starts here
app.get('/', (req, res) => {
    res.render('home', { pageTitle: 'EmployMe', path: '/' });
});

app.get('/signup', (req, res) => {
    res.render('signup', { pageTitle: 'Sign Up', path: '/signup' });
});

app.get('/login/jobseeker', (req, res) => {
    res.render('login-jobSeeker', { pageTitle: 'Job-Seeker Login', path: '/login' });
});

app.get('/login/admin', (req, res) => {
    res.render('login-admin', { pageTitle: 'Admin Login', path: '/login' });
});
//set the page not found
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});



app.listen(3030, () => {
    console.log('App listening on port 3030!');
});
