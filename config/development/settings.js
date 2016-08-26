var path = require('path');

var settings = {
    node: {
        path:   path.normalize(path.join(__dirname, '..')),
        port:   process.env.NODE_PORT || 3000
    },
    postgres: {
        name: process.env.POSTGRES_NAME,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        connection: {
            host:       process.env.POSTGRES_HOST,
            port:       process.env.POSTGRES_PORT,
            dialect:    process.env.POSTGRES_TYPE
        }
    },
    mysql: {
        name: process.env.MYSQL_NAME,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        connection: {
            host:       process.env.MYSQL_HOST,
            port:       process.env.MYSQL_PORT,
            dialect:    process.env.MYSQL_TYPE
        }
    },
    keys: [
        'development'
    ],
    cache: {
        debug: true
    }
};

module.exports = settings;
