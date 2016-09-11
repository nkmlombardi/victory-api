var HttpStatus = require('http-status-codes');

module.exports = function(error, req, res) {
    return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
            error: {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error
            }
        })
};
