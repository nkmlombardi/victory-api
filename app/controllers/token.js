module.exports = {
    postToken: function(req, res, next) {
        req.models.AuthToken.create({
            user_id: req.user.id
        }).then(function(token) {
            res.json(token);
        });
    },
    // deleteToken: function(req, res, next) {
    //     req.models.AuthToken.delete({
    //         where: {
    //             user_id: req.user.id
    //         }
    //     }).then(function(token) {
    //         res.json(user);
    //     });
    // }
};
