module.exports = {
    postUser: async function(req, res, next) {
        var user = await req.models.User.findOne({
            where: { email: req.body.email }
        })

        if (user) {
            return res.status(400).json({
                status: req.status.error,
                message: 'Email is already registered in the system.'
            })
        }

        // Create the new user
        user = await req.models.User.create({
            email: req.body.email,
            password: req.body.password
        })

        return res.json({
            status: req.status.success,
            data: user
        })
    }
}
