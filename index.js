const express = require("express"),
    app = express(),
    bodyParser = require("body-parser");
    cors = require("cors");
global.__basedir = __dirname,
    mongoose = require('mongoose');

const passport = require('passport');



//modules
const dbConnect = require('./mongo/connect'),
    router = require('./node/router/index');

//config
const port = process.env.PORT || 5000;

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//for auth

app.use(passport.initialize())


var originsWhitelist = [
    'http://localhost:4200'
];
var corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}
//here is the magic
app.use(cors(corsOptions));

app.use(router);

app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});