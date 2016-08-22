module.exports = {
    postToken: function(req, res, next) {
        console.log('User', req.user);

        req.models.AuthToken.create({
            user_id: 1
        }).then(function(token) {
            res.json(token);
        });
    }
};
