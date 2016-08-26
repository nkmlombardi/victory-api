// Load required packages
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true },
    function(req, email, password, callback) {
        req.models.User.findOne({ where: { email: email } })
            .then(function(user) {
                if (!user) { return callback(null, false); }

                user.verifyPassword(password, function(err, isMatch) {
                    // If error or password doesn't match
                    if (err) { return callback(err); }
                    if (!isMatch) { return callback(null, false); }

                    // Success
                    return callback(null, user);
                });
            }).error(function(error) {
                return callback(err);
            });
    }
));

passport.use(new BearerStrategy({ passReqToCallback: true },
    function(req, accessToken, callback) {
        req.models.AuthToken.findOne({ auth_token: accessToken })
            .then(function(err, token) {
                // If error or no token found
                if (err) { return callback(err); }
                if (!token) { return callback(null, false); }

                req.models.User.findOne({ id: token.user_id })
                    .then(function(err, user) {
                        // If error or no user found
                        if (err) { return callback(err); }
                        if (!user) { return callback(null, false); }

                        // Simple example with no scope
                        callback(null, user, { scope: '*' });
                    });
            });
    }
));

module.exports = {
    checkCredentials: passport.authenticate(['local'], { session: false }),
    checkToken: passport.authenticate('bearer', { session: false })
};
