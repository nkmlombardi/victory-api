// Load required packages
var settings = require('../../config')().settings;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pass'
    },
    function(username, password, callback) {
        User.findOne({ username: username }, function(err, user) {
            if (err) {
                return callback(err);
            }

            // No user found with that username
            if (!user) {
                return callback(null, false);
            }

            // Make sure the password is correct
            user.verifyPassword(password, function(err, isMatch) {
                if (err) {
                    return callback(err);
                }

                // Password did not match
                if (!isMatch) {
                    return callback(null, false);
                }

                // Success
                return callback(null, user);
            });
        });
    }
));


passport.use(new BearerStrategy(
    function(accessToken, callback) {
        Token.findOne({ value: accessToken }, function(err, token) {
            if (err) {
                return callback(err);
            }

            // No token found
            if (!token) {
                return callback(null, false);
            }

            User.findOne({ _id: token.userId }, function(err, user) {
                if (err) {
                    return callback(err);
                }

                // No user found
                if (!user) {
                    return callback(null, false);
                }

                // Simple example with no scope
                callback(null, user, { scope: '*' });
            });
        });
    }
));


exports.isAuthenticated = passport.authenticate(['local'], { session: false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
