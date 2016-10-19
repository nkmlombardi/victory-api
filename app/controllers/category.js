module.exports = {
    getAll: function(req, res, next) {
        req.models.PlaidCategory.findAll()
            .then(function(categories) {
                res.json({
                    status: req.status.success,
                    data: categories
                });
            });
    },

    getAllPrimary: function(req, res, next) {
        req.models.PlaidCategory.findAll()
            .then(function(categories) {
                res.json({
                    status: req.status.success,
                    data: categories.filter(function(category) {
                        var digits = Number(category.plaid_id.substring(0, 2) + "000000");
                        if (category.plaid_id % digits === 0) {
                            return category;
                        }
                    })
                });
            });
    }
};

;
