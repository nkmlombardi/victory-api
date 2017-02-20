const classes = require('../services/classes')

module.exports = () => {
    global.ApiError = classes.ApiError
}
