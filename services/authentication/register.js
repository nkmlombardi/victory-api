const validEmail = require('../utilities').isValidEmail
const handlers = require('../handlers')
const bcrypt = require('bcryptjs')



module.exports = (request, response, next) => {
    let email = request.body.email
    let password = request.body.password

    let hash
    console.log(request.body.email)
    console.log('test valid email:', validEmail('joshsemedo@gmail.com'))

    if (!validEmail(email)) {
        console.log('email ain\'t valid')
        return handlers.error(6000, (status, payload) => response.status(status).json(payload))
    }
    async (request) => {
        try {
            console.log('looking up email')
            console.log(email)
            let user = await request.models.User.findOne({ where: { email } })
            return user
        } catch (error) {
            console.log('cahgt error')
            return handlers.error(error, (status, payload) => response.status(status).json(payload))
        }
            console.log('timeout')
            console.log(user)
            if (user) {
                console.log('user w/ email already')
                return handlers.error(6001, (status, payload) => response.status(status).json(payload))
            }
            hash = bcrypt.hashSync(password,8)
            return response.json({
                data: {
                    status: "s u c c e s s"
                }
            })

    }

    // Only allow certain emails? (transperfect.com?)
    //
    // Check if password is secure enough
    //



}
