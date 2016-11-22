module.exports = {
    mysql: {
        name: process.env.MYSQL_NAME,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        connection: {
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            dialect: process.env.MYSQL_TYPE
        }
    }
}
