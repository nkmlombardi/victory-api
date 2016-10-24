module.exports = {
    getSelfAll: function(req, res, next) {
        req.models.Scenario.findAll({
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
