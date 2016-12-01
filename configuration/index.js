module.exports = function() {

    /**
     * Each configuration is a function which must be executed for their
     * middleware and settings to be returned. This is being done because we
     * don't want to instantiate any of the other configuration files at all,
     * unless they are the environment that is set in the .environment file
     */
    var environment = {
        production: function() {
            return {
                middleware:     require('./production/middleware'),
                settings:       require('./production/settings')
            }
        },
        development: function() {
            return {
                middleware:     require('./development/middleware'),
                settings:       require('./development/settings')
            }
        },
        // testing: {
        //     middleware:     require('./testing/middleware'),
        //     settings:       require('./testing/settings')
        // },
        // local: {
        //     middleware:     require('./local/middleware'),
        //     settings:       require('./local/settings')
        // }
    }

    return environment[process.env.NODE_ENV]()
}
