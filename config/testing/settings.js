var path = require('path');

var settings = {
    path:       path.normalize(path.join(__dirname, '..')),
    port:       process.env.NODE_PORT || 3000,
    keys: [
        'development'
    ],
    cache: {
        debug: true
    },
    postgres: {
        type:   process.env.POSTGRES_TYPE   || 'postgres',
        host:   process.env.POSTGRES_HOST   || 'localhost',
        port:   process.env.POSTGRES_PORT   || 5432,
        name:   process.env.POSTGRES_NAME   || 'development',
        user:   process.env.POSTGRES_USER   || 'admin',
        pass:   process.env.POSTGRES_PASS
    },
    mysql: {
        type:   process.env.MYSQL_TYPE   || 'mariadb',
        host:   process.env.MYSQL_HOST   || 'localhost',
        port:   process.env.MYSQL_PORT   || 3306,
        name:   process.env.MYSQL_NAME   || 'development',
        user:   process.env.MYSQL_USER   || 'admin',
        pass:   process.env.MYSQL_PASS
    }
};

module.exports = settings;
