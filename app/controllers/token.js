module.exports = {
    postSelfToken: function(req, res, next) {
        req.models.AuthToken.create({
            user_id: req.user.id
        }).then(function(token) {
            res.json({
                token: token,
                user: req.user.getPublicAttributes()
            });
        });
    },

    deleteSelfToken: function(req, res, next) {
        req.models.AuthToken.destroy({
            where: {
                user_id: req.user.id
            }
        }).then(function(token) {
            res.json(user);
        });
    }
};
