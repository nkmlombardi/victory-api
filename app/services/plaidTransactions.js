module.exports = {
    refreshSelfTransactions: function(req, res, next) {
        req.plaid.getConnectUser(req.user.access_token, {})
            .then(function(data) {
                res.json(data);
            }).error(function(error) {
                res.json(error);
            });
    }
};
