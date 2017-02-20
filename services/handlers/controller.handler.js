const httpStatus = require('http-status-codes')
const errorHandler = require('./error.handler')

/**
 * Handles controller execution and responds to user (API Express version).
 * @param promise Controller Promise. I.e. getUser.
 * @param params A function (request, response, next), all of which are optional
 * that maps our desired controller parameters. I.e. (request) => [request.params.username, ...].
 *
 * Source: https://medium.com/@zurfyx/building-a-scalable-node-js-express-app-1be1a7134cfd#.x4mout96z
 */
module.exports = (promise, params) => async(request, response, next) => {
    const boundParams = params ? params(request, response, next) : []

    try {
        const result = await promise(...boundParams)

        // Check if controller returned an error
        if (result instanceof ApiError) {
            // console.error('ApiError: ', result)
            return errorHandler((result.code || error), (status, payload) => response.status(status).json(payload))
        }

        // Return the controllers response
        return response.status(httpStatus.OK).json({
            data: result
        })
    } catch (error) {
        console.error('Error:', error)
        return response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
}
