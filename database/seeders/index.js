var path = require('path')
var fs = require('fs')
var plaid = require('plaid')
var Promise = require('bluebird')

// Accumulate seed files
var seeders = function() {
    var result = []

    fs.readdirSync(__dirname).forEach(function(file) {
        /* If its the current file ignore it */
        if (file === 'index.js') return
        if (file === 'data') return

        /* Store module with its name (from filename) */
        result.push(require(path.join(__dirname, file)))
    })

    return result
}()

var plaidClient = new plaid.Client(
    process.env.PLAID_CLIENT_ID,
    process.env.PLAID_SECRET_KEY,
    plaid.environments.tartan
)

module.exports = {
    up: function(database) {
        Promise.each(seeders, function(seeder, index) {
            return seeder.up(database.sequelize, database.models, plaidClient)
                .catch(function(error) {
                    console.error(seeders[index], ' seeder error: ', error)
                })
        }, {
            concurrency: 1
        }).then(function(data) {
            return console.log('Persisted all models successfully.'.green)

        }).catch(function(error) {
            return console.error('Promise Map Error: ', error)
        })
    },
    down: function(database) {
        seeders.forEach(function(seeder, index) {
            seeder.down(database.sequelize, database.models, plaidClient)
        })
    }
}
