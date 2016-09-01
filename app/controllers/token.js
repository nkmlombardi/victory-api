module.exports = {
    postSelfToken: function(req, res, next) {
        console.log('did we get here')
        req.models.AuthToken.create({
            user_id: req.user.id
        }).then(function(token) {
            res.json(token);
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
