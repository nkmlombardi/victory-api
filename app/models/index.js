var mongoose = require('mongoose');

module.exports = function(settings) {
    mongoose.connect('mongodb://' + settings.host);

    // If the connection throws an error
    mongoose.connection.on('error',function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });


    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + settings.host);

        return {
            mongoose: mongoose,
            models: {
                user: require('user')(mongoose).model,
            }
        };
    });
};
