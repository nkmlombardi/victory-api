module.exports = {
    // Methods by an Administrator
    // getUser: function(req, res, next) {
    //     req.models.User.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(function(users) {
    //         res.json({
    //             status: req.status.success,
    //             data: users
    //         });
    //     });
    // },
    //
    // getUserAll: function(req, res, next) {
    //     req.models.User.findAll()
    //         .then(function(users) {
    //             res.json({
    //                 status: req.status.success,
    //                 data: users
    //             });
    //         });
    // },

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
    },

    // Methods run by a user on their own account
    // getSelfUser: function(req, res, next) {
    //     req.models.User.findOne({
    //         where: {
    //             id: req.user.id
    //         }
    //     }).then(function(users) {
    //         res.json({
    //             status: req.status.success,
    //             data: users
    //         });
    //     });
    // },

    // patchSelfUser: function(req, res, next) {
    //     req.models.User.update({
    //         email: req.body.email,
    //         password: req.body.password,
    //     }, {
    //         fields: [
    //             'email',
    //             'password'
    //         ],
    //         where: {
    //             id: req.user.id
    //         }
    //     }).then(function(user) {
    //         if (req.body.password) {
    //             req.models.AuthToken.delete({
    //                 where: {
    //                     user_id: req.user.id
    //                 }
    //             }).then(function(token) {
    //                 console.log('User updated, token deleted: ', token);
    //             });
    //         }
    //
    //         res.json({
    //             status: req.status.success,
    //             data: user
    //         });
    //     });
    // }
};
