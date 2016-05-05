// Load required packages
var passport                = require('passport');
var BasicStrategy           = require('passport-http').BasicStrategy;
var DigestStrategy          = require('passport-http').DigestStrategy;
var LocalStrategy           = require('passport-local').Strategy;
var BearerStrategy          = require('passport-http-bearer').Strategy;
var LocalAPIKeyStrategy     = require('passport-localapikey-update').Strategy;

// Load required models
// var User    = require('./user');
// var Client  = require('./client');
// var Token   = require('./token');

/*
    This strategy includes having each user in the database contain an API key
    with which they may make requests to API.
 */
passport.use('apikey', new LocalAPIKeyStrategy(
    function(apikey, callback) {

        var keys = [
            "3bce4931-6c75-41ab-afe0-2ec108a30860",
            "Development"
        ];

        if (keys.indexOf(apikey) > -1) {
            return callback(null, true);
        }

        return callback(null, false);
    }
));

passport.use(new BasicStrategy(
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

passport.use(new DigestStrategy({ algorithm: 'MD5', qop: 'auth' },
    function(username, callback) {
        User.findOne({ username: username }, function(err, user) {
            if (err) {
                return callback(err);
            }

            // No user found with that username
            if (!user) {
                return callback(null, false);
            }

            // Success
            return callback(null, user, user.password);
        });
    },
    function(params, callback) {
        // validate nonces as necessary
        callback(null, true);
    }
));

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

passport.use('client-basic', new BasicStrategy(
    function(username, password, callback) {
        Client.findOne({ id: username }, function(err, client) {
            if (err) {
                return callback(err);
            }

            // No client found with that id or bad password
            if (!client || client.secret !== password) {
                return callback(null, false);
            }

            // Success
            return callback(null, client);
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

exports.isAuthenticated = passport.authenticate(['apikey'], { session: false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session: false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
