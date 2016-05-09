var path = require('path');

var settings = {
    path:       path.normalize(path.join(__dirname, '..')),
    port:       process.env.NODE_PORT || 3000,
    database:   'onelink_dev',
    user:       'onelink_dev',
    password:   'onelink_dev',
    connection: {
        host:       '10.10.78.59',
        dialect:    'mariadb',
        logging:    false
    }
};

module.exports = settings;
