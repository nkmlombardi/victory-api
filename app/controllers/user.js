module.exports = {
    getUsers: function(req, res, next) {
        req.models.User.findAll().then(function(user) {
            return res.status(req.httpStatus.OK)
                .json({
                    status: req.status.success,
                    data: user
                });
        });
    },

    getUser: function(req, res, next) {
        req.models.User.findById(req.params.id)
            .then(function(user) {
                return res.status(req.httpStatus.OK)
                    .json({
                        status: req.status.success,
                        data: user
                    });
            });
    },

    postUser: function(req, res, next) {
        req.models.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(function(user) {
            return res.status(req.httpStatus.CREATED)
                .json({
                    status: req.status.success,
                    data: user
                });
        });
    },

    patchUser: function(req, res, next) {
        req.models.User.update({
            email: req.body.email,
            password: req.body.password
        }, {
            where: { id: req.params.id }
        }).then(function(user) {
            return res.status(req.httpStatus.OK)
                .json({
                    status: req.status.success,
                    data: user
                });
        });
    },

    deleteUser: function(req, res, next) {
        req.models.User.destroy({
            where: {
                id: req.params.id
            },
            paranoid: true,
        }).then(function(user) {
            return res.status(req.httpStatus.OK)
                .json({
                    status: req.status.success,
                    data: user
                });
        });
    },
};
