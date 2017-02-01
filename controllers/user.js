module.exports = {
    postUser: async (request, response) => {
        let user = await request.models.User.findOne({
            where: { email: request.body.email }
        })

        if (user) {
            return response.status(400).json({
                status: request.status.error,
                message: 'Email is already registered in the system.'
            })
        }

        // Create the new user
        user = await request.models.User.create({
            email: request.body.email,
            password: request.body.password
        })

        return response.json({
            status: request.status.success,
            data: user
        })
    }
}
