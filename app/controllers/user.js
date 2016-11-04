module.exports = {
    postUser: function(req, res, next) {
        req.models.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(function(user) {
            // If the user already exists, throw an error
            if (user) {
                return res.status(400).json({
                    status: req.status.error,
                    message: 'Email is already registered in the system.'
                });
            }

            // Create the new user
            req.models.User.create({
                email: req.body.email,
                password: req.body.password
            }).then(function(user) {
                return res.json({
                    status: req.status.success,
                    data: user
                });
            });
        });
    }
};
