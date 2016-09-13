module.exports = {
    webhook: function(req, res, next) {
        // req.models.TargetHealth.create({
        //     status: req.body.status
        // }).then(function(targetHealth) {
        //     // TODO
        // });

        console.log('Request Body: ', req.body);

        res.status(200).json({
            message: 'Webhook posted to successfully.'
        });
    }
};
