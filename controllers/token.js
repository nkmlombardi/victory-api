module.exports = {
    postToken: function(req, res, next) {
        req.models.AuthToken.create({
            user_id: req.user.id
        }).then(function(token) {
            res.status(req.httpStatus.ACCEPTED).json({
                status: req.status.success,
                data: token
            });
        });
    }
};
