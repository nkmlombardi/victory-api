var mongoose = require('mongoose');

module.exports = function(settings) {
    mongoose.connect(settings.database.type + '://' + settings.database.host + ':' + settings.database.port);

    // If the connection throws an error
    mongoose.connection.on('error',function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    // When the connection is established
    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + settings.database.host);
    });

    return {
        User: require('./user')
    };
};
