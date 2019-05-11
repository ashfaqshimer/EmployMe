const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//Main code starts here

app.listen(3030, () => {
    console.log('App listening on port 3030!');
});
