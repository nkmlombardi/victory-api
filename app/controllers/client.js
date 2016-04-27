var helpers = require('./_helpers');

module.exports = {
    getClients: function(req, res, next) {
        req.models.client.findAll().then(function(clients) {
            return res.json(clients);
        });
    },

    getClient: function(req, res, next) {
        req.models.client.findById(req.params.id).then(function(clients) {
            return res.json(clients);
        });
    },

    getClientProjects: function(req, res, next) {
        // req.models.project.findAll().then(function(clients) {
        //     return res.json(clients);
        // });

        req.models.client.findAll({
            include: [
                { model: req.models.project }
            ]
        })
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
