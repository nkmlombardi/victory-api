module.exports = {
    // Methods by an Administrator
    getUser: function(req, res, next) {
        req.models.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(users) {
            res.json(users);
        });
    },

    getUserAll: function(req, res, next) {
        req.models.User.findAll()
            .then(function(users) {
                res.json(users);
            });
    },

    postUser: function(req, res, next) {
        req.models.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(function(user) {
            res.json(user);
        });
    },

    // Methods run by a user on their own account
    getSelfUser: function(req, res, next) {
        req.models.User.findOne({
            where: {
                id: req.user.id
            }
        }).then(function(users) {
            res.json(users);
        });
    },

    patchSelfUser: function(req, res, next) {
        req.models.User.update({
            email: req.body.email,
            password: req.body.password
            access_key: req.body.access_key
        }, {
            fields: [
                'email',
                'password',
                'access_key'
            ],
            where: {
                id: req.params.id
                user_id: req.user.id
            }
        }).then(function(user) {
            if (req.body.password) {
                req.models.AuthToken.delete({
                    where: {
                        id: req.user.id
                    }
                }).then(function(token) {
                    res.json(user);
                });
            }

            res.json(user);
        });
    }
};
