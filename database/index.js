const Sequelize = require('sequelize')
const mysql = require('promise-mysql')
const models = require('./models')
const seeder = require('./seeders')
const colors = require('colors')

module.exports = {
    /**
     * Sets up the Seqelize & MySQL databases, imports and links their relations
     * @return {object} instantiated database objects
     */
    connect() {
        this.state.sequelize = new Sequelize(
            process.env.POSTGRES_NAME,
            process.env.POSTGRES_USER,
            process.env.POSTGRES_PASSWORD, {
                host: process.env.POSTGRES_HOST,
                dialect: process.env.POSTGRES_TYPE,
                port: process.env.POSTGRES_PORT,
                logging: false
            }
        )

        models(this.state)

        this.state.sequelize.sync({ force: true }).then(() => {
            if (process.env.NODE_ENV !== 'test') {
                console.log('Models force synced to database.'.green)
            }

            // Seed database if in development mode
            if (process.env.NODE_ENV === 'development') {
                seeder.down(this.state)
                seeder.up(this.state)

                if (process.env.NODE_ENV !== 'test') console.log('Database Seeded.'.green)
            }
        }).catch((error) => {
            console.log('Failed to sync to database: '.red, error)
        })

        // Native MySql connection
        mysql.createConnection({
            database: process.env.MYSQL_NAME,
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS
        }).then((connection) => {
            if (process.env.NODE_ENV !== 'test') console.log('Vanilla MYSQL Connection established.'.yellow)

            this.state.mysql = connection
        })

        return this.state
    },


    /**
     * Instatiated database objects
     * @type {Object}
     */
    state: {
        sequelize: null,
        mysql: null,
        models: null
    },


    /**
     * Terminates the connection to both databases
     */
    disconnect() {
        if (this.state.sequelize !== null) this.state.sequelize = null
        if (this.state.mysql !== null) this.state.mysql = null
    }
}
