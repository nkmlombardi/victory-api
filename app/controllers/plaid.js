var plaid = require('plaid');

module.exports = {
    postToken: function(req, res, next) {
        req.models.AuthToken.create({
            user_id: req.user.id
        }).then(function(token) {
            res.json(token);
        });
    }
};