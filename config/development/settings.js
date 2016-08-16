var path = require('path');

var settings = {
    path:   path.normalize(path.join(__dirname, '..')),
    port:   process.env.NODE_PORT || 3000,
    database:   {
        type:   process.env.DATABASE_TYPE || 'mongodb',
        host:   process.env.DATABASE_HOST || 'localhost',
        port:   process.env.DATABASE_PORT || 27017
    },
    keys: [
        'development'
    ],
    cache: {
        debug: true
    }
};

console.log('Development settings loaded.');

module.exports = settings;
