var controllers = require('../controllers')
var services = require('../services')
var cache = require('apicache').middleware;

module.exports = function(app) {

    /**
     * REST API Endpoints
     */
    /* Base Endpoint */
    app.route('/')
        .get(function(req, res, next) {
            res.send('ok')
        })
        .post(function(req, res, next) {
            res.json(req.body)
        })


    /* Auth Token Resource */
    app.route('/v1/authenticate')
        .post(services.authentication.isLocal, controllers.authentication.postSelfPassport)

    /* Users Endpoint */
    app.route('/v1/users')
        .post(controllers.user.postUser)

    // OneLink Infrastructure
    app.route('/v1/datacenters').get(cache('1 hour'), controllers.datacenter.getDatacenters)
    app.route('/v1/clusters').get(cache('1 hour'), controllers.cluster.getClusters)


    /**
     * Socket.io Endpoints
     */
    app.io.route('messages', {
        // socket.io event: messages:list
        list: function(req, res) {
            console.log('Request: ', req.models)

            res.json({
                butt: 'wat'
            })
        }
    })

}
