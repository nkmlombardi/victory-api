var Promise = require("bluebird");

/*
    This resource does not include an endpoint to retrieve the Client's relation
    to Servers as there is no way to determine which Servers a Client exists on
    within a group of servers behind a load balancer, AKA a Cluster.
*/

module.exports = {
    getClientAll: function(req, res, next) {
        // Logic
    }
};
