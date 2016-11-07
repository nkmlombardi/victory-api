/**
 * This method makes a request to Plaid to connect a new user into their
 * system. The method supports multi-factor authentication in which a
 * verification code is sent to the user's device.
 *
 * TODO: Need to figure out a way to handle MFA. The user gets an email or text
 * with a code that needs to be sent with the next request. One way would be this
 * endpoint needs to immediately return when it encounters MFA, then we need
 * another endpoint to handle that MFA request. They would send their access_token
 * and the code they receieved.
 *
 * @param  {[type]}  models         Database models to make requests with
 * @param  {[type]}  plaid          Plaid client to make requests with
 * @param  {[type]}  user_id        User that the token should be assigned to
 * @param  {[type]}  type           Type of bank account
 * @param  {[type]}  username       Username for bank account access
 * @param  {[type]}  password       Password for bank account access
 * @return {[type]}                 Token generated from access_token receieved
 */
var connectUser = async function(models, plaid, user_id, type, username, password) {
    try {
        var connectResponse = await plaid.addConnectUserAsync(type, {
            username: username,
            password: password
        }, {
            list: true,
            webhook: plaid.webhook + user_id
        });

    } catch(error) {
        console.error('Plaid error connecting user account: ', error);

        return {
            status: 'error',
            data: error
        }
    }

    // Return MFA response so user can make followup request and provide the
    // MFA code that was sent to their email or phone
    if (!connectResponse || connectResponse.hasOwnProperty('mfa')) {
        console.log('Connect Response: ', connectResponse);
        
        return {
            status: 'success',
            data: (connectResponse ? connectResponse : {
                message: 'For some reason Plaid connect returned no response.'
            })
        }
    }

    try {
        // Inject access token into database
        var token = await models.PlaidToken.create({
            plaid_raw: connectResponse,
            user_id: user_id,
            access_token: connectResponse.access_token
        });

    } catch(error) {
        console.error('Database error injecting PlaidToken: ', error);

        return {
            status: 'error',
            data: error
        }
    }

    console.log('GEN TOKEN: ', token)

    return {
        status: 'success',
        data: token
    }
};

module.exports = connectUser;
