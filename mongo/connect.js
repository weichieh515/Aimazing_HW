const mongoose = require('mongoose'),
    uri = 'mongodb+srv://dbaccount:dbpass@cluster1-sdx6a.mongodb.net/hw1';

module.exports = (callback, errHandle) => {
    mongoose.connect(uri);

    mongoose.connection.on('connected', function () {
        console.info('Mongoose connected to ' + uri);
    });
    mongoose.connection.on('error', function (err) {
        console.error('Mongoose connection error: ' + err);
    });
    mongoose.connection.on('disconnected', function () {
        console.error('Mongoose disconnected');
    });
}