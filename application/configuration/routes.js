const controllers = require('../controllers')
const cache = require('apicache').middleware
const handlers = require('../services/handlers')
const services = require('../services')

module.exports = (app) => {

    /**
     * Fallbacks
     */
    app.route('/')
        .get((request, response) => { response.sendStatus(200) })


    /**
     * Authentication
     */
    app.route('/v1/login')
        .post(services.authentication.isLocal, handlers.controller(controllers.passport.postPassport, (request) => [request.user.id, request.client_ip_addr]))
    app.route('/v1/logout')
        .get(handlers.controller(controllers.passport.deletePassport, (request) => [request.headers.authorization.split(" ")[1]]))
    app.route('/v1/recovery')
        .post(handlers.controller(controllers.verification.recovery, (request) => [request.body.email, request.ip]))
    app.route('/v1/register')
        .post(handlers.controller(controllers.user.postUser, (request) => [request.body.email, request.body.password, request.client_ip_addr]))
    app.route('/v1/resetPassword')
        .get(handlers.controller(controllers.verification.resetPass, (request) => [request.query, request.body.password]))
    app.route('/v1/verification')
        .get(handlers.controller(controllers.verification.verify, (request) => [request.query]))

    /*
        Resources
     */
    app.route('/v1/accounts')
        .get(services.authentication.isJwt, handlers.controller(controllers.account.getCollection, (request) => [request.user, request.query]))

    app.route('/v1/transactions')
        .get(services.authentication.isJwt, handlers.controller(controllers.transaction.getCollection, (request) => [request.user, request.query]))

    app.route('/v1/budgets')
        .get(services.authentication.isJwt, handlers.controller(controllers.budget.getCollection, (request) => [request.user, request.query]))

    app.route('/v1/scenarios')
        .get(services.authentication.isJwt, handlers.controller(controllers.scenario.getCollection, (request) => [request.user, request.query]))

    app.route('/v1/categories')
        .get(services.authentication.isJwt, handlers.controller(controllers.category.getCollection, (request) => [request.user, request.query]))



}
