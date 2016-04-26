var path = require('path');

var settings = {
    path: path.normalize(path.join(__dirname, '..')),
    port: process.env.NODE_PORT || 3000,
    database: {
        host: '10.10.78.59',
        user: 'onelink_dev',
        password: 'onelink_dev',
        database: 'onelink_dev'
    }
};

module.exports = settings;
