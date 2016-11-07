module.exports = {
    postSelfToken: function(req, res, next) {
        req.models.AuthToken.create({
            user_id: req.user.id
        }).then(function(token) {
            res.json({
                status: req.status.success,
                data: {
                    token: token,
                    user: req.user.getPublicAttributes()
                }
            })
        }).catch(function(error) {
            return req.errorHandler(error, req, res)
        })
    }
}
