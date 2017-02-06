module.exports = {
    // 2000: Successful response
    2001: 'This relation has no related collections.',
    2002: 'This relation has no related resource.',

    // 4000: Invalid request
    4001: 'A resource at this ID was not found.',
    4002: 'An invalid resource identifier was provided.',
    4003: 'Attempt to generate a passport authentication without a strategy.',
    4004: 'No user was found with the supplied credentials.',
    4005: 'User authentication token expired.',
    4006: 'Request made from unauthorized IP address.',

    // 5000: Database error
    5001: 'Database error generating a new passport.',
    5002: 'Database error retrieving Passport associated with auth_token.',
    5003: 'Database error retrieving User associated with bearer_token.',
    5004: 'Database error retrieving User during local authentication.',
    5005: 'Database error bad password.'
}
