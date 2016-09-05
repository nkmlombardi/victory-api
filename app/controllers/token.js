module.exports = {
    postSelfToken: function(req, res, next) {
        req.models.AuthToken.create({
            user_id: req.user.id
        }).then(function(token) {
            res.json({
                data: {
                    token: token.getPublicAttributes(),
                    user: req.user.getPublicAttributes()
                }
            });
        }).catch(function(error) {
            res.json({
                error: {
                    code: 500,
                    message: error
                }
            })
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
