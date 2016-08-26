// Load required packages
var settings = require('../../config')().settings;
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
        req.models.AuthToken.findOne({ where: { auth_token: accessToken }})
            .then(function(token) {
                if (!token) { return callback(null, false); }

                req.models.User.findOne({ where: { id: token.user_id }})
                    .then(function(user) {
                        if (!user) { return callback(null, false); }

                        // Simple example with no scope
                        callback(null, user, { scope: '*' });

                    }).error(function(error) {
                        return callback(error);
                    });

            }).error(function(error) {
                return callback(error);
            });
    }
));


exports.isAuthenticated = passport.authenticate(['local'], { session: false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
