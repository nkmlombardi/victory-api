module.exports = {
    getSelfAll: function(req, res, next) {
        req.models.Budget.findAll({
            where: {
                user_id: req.user.id
            }
        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            });
        });
    }
};
