var request = require('supertest');
require = require('really-need');

/*
    Load the server and make a request to the base endpoint, also make sure
    that a request to a non existing endpoint returns a 404 not found.
 */
describe('loading server', function() {
    var server;

    beforeEach(function() {
        server = require('../server', { bustCache: true })();
    });

    afterEach(function(done) {
        server.close(done);
    });

    it('responds to /', function(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });

    it('404 everything else', function(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});

/*
    Run through each endpoint and make sure it is responding to requests. We
    need to setup the server before all the tests are ran so we can iterate
    through each endpoint.
 */
describe('checking endpoints', function() {
    server = require('../server', { bustCache: true })();

    server.endpoints.forEach(function(r) {
        it(r.route.path, function(done) {
            request(server)
                .get(r.route.path)
                .set('apikey', process.env.TEST_APIKEY)
                .expect(200, done);
        });
    });

    server.close();
});
