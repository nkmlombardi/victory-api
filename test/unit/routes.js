var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var settings = require('../../config/development/settings');
var database = require('../../app/models')(settings);

describe('Routing', function() {
    var url = 'http://api.onelink-prototype.com:3000';
    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function(done) {
        // In our tests we use the test db
        var models = database.models;
        var connection = database.connection;
        done();
    });
    // use describe to give a title to your test suite, in this case the tile is "Account"
    // and then specify a function in which we are going to declare all the tests
    // we want to run. Each test starts with the function it() and as a first argument
    // we have to provide a meaningful title for it, whereas as the second argument we
    // specify a function that takes a single parameter, "done", that we will use
    // to specify when our test is completed, and that's what makes easy
    // to perform async test!
    describe('Account', function() {
        it('should return error trying to save duplicate username', function(done) {
            var profile = {
                username:   'vgheri',
                password:   'test',
                firstName:  'Valerio',
                lastName:   'Gheri'
            };

            // once we have specified the info we want to send to the server via POST verb,
            // we need to actually perform the action on the resource, in this case we want to
            // POST on /api/profiles and we want to send some info
            // We do this using the request object, requiring supertest!
            request(url)
                .get('/api/profiles')
                .set('apikey', 'development')
                .end(function(err, res) {
                    if (err) { throw err; }

                    res.should.have.status(200);
                    done();
                });
        });
    });
});
