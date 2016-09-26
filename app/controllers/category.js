module.exports = {
    getAll: function(req, res, next) {
        req.models.PlaidCategory.findAll()
            .then(function(categories) {
                res.json({
                    status: req.status.success,
                    data: categories
                });
            });
    }
};
