const simport = require('sequelize-import')
const chalk = require('chalk')

module.exports = (database) => {
    // Load in database models
    database.models = simport(__dirname, database.sequelize, {
        exclude: ['index.js']
    })

    Object.keys(database.models).forEach(function(modelName) {
        if ('associate' in database.models[modelName]) {
            database.models[modelName].associate(database.models)

            // Spacing trick for console output
            var spaces = ''
            var spacesCount = (14 - modelName.length)
            for (var i = 0; i < spacesCount; i++) {
                spaces = spaces.concat(' ')
            }

            console.log(`${chalk.yellow(modelName)} ${spaces} relations linked`)
        }
    })
}
