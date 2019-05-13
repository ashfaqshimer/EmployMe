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

//set the page not found
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3030, () => {
    console.log('App listening on port 3030!');
});
