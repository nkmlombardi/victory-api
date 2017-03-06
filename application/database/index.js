const Sequelize = require('sequelize')
const models = require('./models')
const seeder = require('./seeders')
const chalk = require('chalk')
const Promise = require('bluebird')

module.exports = {
    /**
     * Sets up the Seqelize & MySQL databases, imports and links their relations
     * @return {object} instantiated database objects
     */
    async connect() {
        this.state.sequelize = new Sequelize(
            process.env.DATABASE_NAME,
            process.env.DATABASE_USER,
            process.env.DATABASE_PASSWORD, {
                host: process.env.DATABASE_HOST,
                dialect: process.env.DATABASE_TYPE,
                port: process.env.DATABASE_PORT,
                logging: false
            }
        )

        const executions = [
            console.log(`${chalk.yellow('Importing')} models into database`),
            console.log('--------------------------------'),
            await models(this.state),
            console.log('--------------------------------')
        ]

        if (this.state.doSync) {
            executions.push(
                console.log(`${(this.state.doSync ? chalk.red('Force syncing') : chalk.green('soft syncing'))} models to database`),
                await this.state.sequelize.sync({ force: this.state.doSync })
                    .then(() => console.log(`Database sync was ${chalk.green('successful')}`))
                    .catch(error => console.log(`Database sync failed: `, error)),
                console.log('--------------------------------')
            )
        }

        if (this.state.doSeed) {
            executions.push(
                console.log(`${chalk.red('De-seeding')} database`),
                console.log('--------------------------------'),
                await seeder.down(this.state)
                    .then(() => console.log('--------------------------------'))
                    .then(() => console.log(`Database de-seed was ${chalk.green('successful')}`))
                    .catch(error => console.log(`Database de-seed failed: `, error)),
                console.log('--------------------------------'),


                console.log(`${chalk.red('Seeding')} database`),
                console.log('--------------------------------'),
                await seeder.up(this.state)
                    .then(() => console.log('--------------------------------'))
                    .then(() => console.log(`Database seed was ${chalk.green('successful')}`))
                    .catch(error => console.log(`Database seed failed: `, error)),
                console.log('--------------------------------')
            )
        }

        return Promise.each(executions, () => { }, { concurrency: 1 })
    },


    /**
     * Instatiated database objects
     * @type {Object}
     */
    state: {
        sequelize: null,
        models: null,

        /**
         * When we force sync, the database rebuilds all of it's tables (models)
         * as well as their associations. Any schema changes as well as data
         * inserted into the database is lost when this is done. This should
         * only ever be done in a development environment.
         */
        doSync: (
            process.env.FORCE_SYNC_DATABASE === 'true' &&
            process.env.NODE_ENV === 'development'
        ),

        /**
         * When we seed the database, we are inserting demonstration data that
         * located in the /seeders/data directory. In order to seed the database
         * it is required that it has been force synced and wiped clean,
         * otherwise there will be injection collisions on the data. This is
         * intended to be run in a development environment, not on production.
         */
        doSeed: (
            process.env.FORCE_SYNC_DATABASE === 'true' &&
            process.env.SEED_DATABASE === 'true' &&
            process.env.NODE_ENV === 'development'
        )
    },


    /**
     * Terminates the connection to both databases
     */
    disconnect() {
        if (this.state.sequelize !== null) this.state.sequelize = null
    }
}
