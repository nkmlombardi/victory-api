var path = require('path');

var settings = {
    node: {
        path:   path.normalize(path.join(__dirname, '..')),
        port:   process.env.NODE_PORT || 3000
    },
    postgres: [
        process.env.POSTGRES_NAME,
        process.env.POSTGRES_USER,
        process.env.POSTGRES_PASS,
        {
            host:       process.env.POSTGRES_HOST,
            port:       process.env.POSTGRES_PORT,
            dialect:    process.env.POSTGRES_TYPE
        }
    ],
    mysql: [
        process.env.MYSQL_NAME,
        process.env.MYSQL_USER,
        process.env.MYSQL_PASS,
        {
            host:       process.env.MYSQL_HOST,
            port:       process.env.MYSQL_PORT,
            dialect:    process.env.MYSQL_TYPE
        }
    ],
    keys: [
        'development'
    ],
    cache: {
        debug: true
    }
};

module.exports = settings;
