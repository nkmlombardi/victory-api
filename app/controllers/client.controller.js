var helpers = require('./_helpers');

module.exports = {
    getClients: function(req, res, next) {
        res.json(
            [
                {
                    client: "Client Name",
                    client_url: "www.client.com"
                },
                {
                    client: "Client Name",
                    client_url: "www.client.com"
                },
                {
                    client: "Client Name",
                    client_url: "www.client.com"
                },
                {
                    client: "Client Name",
                    client_url: "www.client.com"
                }
            ]
        );
    },

    getClient: function(req, res, next) {
        res.json(
            {
                client: "Client Name",
                client_url: "www.client.com"
            }
        );
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

    getClientServers: function(req, res, next) {
        res.send(200);
    }
};
