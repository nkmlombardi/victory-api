var helpers = require('./_helpers');

module.exports = {
    getClients: function(req, res, next) {
        req.models.client.findAll().then(function(projects) {
            return res.json(projects);
        });
    },

    getClient: function(req, res, next) {
        req.models.client.findById(req.params.id).then(function(projects) {
            return res.json({
                results: projects
            });
        });
    },

    getClientProjects: function(req, res, next) {
        res.send(200);
    },

    getClientOrigins: function(req, res, next) {
        res.send(200);
    },

    getClientTargets: function(req, res, next) {
        res.send(200);
    },

    getClientClusters: function(req, res, next) {
        res.send(200);
    },

    // getClientServers: function(req, res, next) {
    //     res.send(200);
    // }

    getClientDatacenters: function(req, res, next) {
        res.send(200);
    },

};
