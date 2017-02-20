'use strict'

function ApiError(code, message) {
    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.code = code
    this.message = message
}

ApiError.prototype = Error.prototype
module.exports = ApiError
