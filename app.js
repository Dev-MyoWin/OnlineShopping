//terminal -> npm init -y
//terminal ->npm install nodemon --save-dev "for auto restart during development time"
//terminal ->npm install express
// post method -> req.body
//get method -> req.query
// need to install ->> npm install body-parser
//npm install ejs
//npm install express-ejs-layouts

const express = require('express');
const bodyParser = require('body-parser'); // to slove the output "undefined"
const path = require('path');
const app = express();

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('view engine', 'ejs');

//import from route module 
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

//import from util
const mongoConnect = require('./util/database');

// must be top of the use
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoute);
app.use('/', shopRoute);

app.use((req, res, next) => {
    res.render('404',
        {
            pageTitle: "Page Not Found",
            path: ''
        });
});
mongoConnect((client) => {
    console.log(client);
    app.listen(3000);
})
