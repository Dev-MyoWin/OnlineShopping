//terminal -> npm init -y
//terminal ->npm install nodemon --save-dev "for auto restart during development time"
//terminal ->npm install express
// post method -> req.body
//get method -> req.query
// need to install ->> npm install body-parser
//npm install ejs
//npm install express-ejs-layouts
//npm install --save mongodb
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser'); // to slove the output "undefined"
const path = require('path');
const app = express();

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('view engine', 'ejs');
//import from model
const User = require('./models/user');
//import from route module 
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');


// must be top of the use
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    User.findById("5e5f674027efa904eca13bcd")
        .then((user) => {

            req.user = user;

            next();

        })
        .catch(err => {
            console.log(err);
        })
});
app.use('/admin', adminRoute);
app.use('/', shopRoute);

app.use((req, res, next) => {
    res.render('404',
        {
            pageTitle: "Page Not Found",
            path: ''
        });
});

mongoose.connect('mongodb+srv://admin:admin123@onlineshop-mfcet.mongodb.net/shop', { useNewUrlParser: true })
    .then(result => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'Myo Win',
                        email: 'myo@gmail.com',
                        cart: {
                            items: [

                            ]
                        }
                    })
                    user.save();
                }
            })

        console.log("connected Db...");
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })
