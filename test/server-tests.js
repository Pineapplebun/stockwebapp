var should = require('chai').should(),
  expect = require('chai').expect(),
  supertest = require('supertest'),
  api = supertest('http://localhost:5000');

/**
 * WATCHLIST UTILITY
 * 
 * It should test the watchlist utility cases.
 * 
 * Cases:
 * 1. Add a watchlist
 * 2. Get a watchlist
 * 3. Modify a watchlist
 * 4. Delete a watchlist
 */
describe('/watchlist', function() {
  describe('POST /watchlist', function () {
    it('should return a 200 response', function (done) {
      api.post('/watchlist')
        .set('Accept', 'application/json')
        .expect(200, done);
    })
  })

  describe('GET /watchlist', function() {
    it('should return a 200 response', function (done) {
      api.get('/watchlist/1')
        .set('Accept', 'application/json')
        .expect(200, done);
    });
  });

  describe('PUT /watchlist', function () {
    it('should return a 200 response', function (done) {
      api.put('/watchlist/1')
        .set('Accept', 'application/json')
        .expect(200, done);
    })
  })

  describe('DELETE /watchlist', function () {
    it('should return a 200 response', function (done) {
      api.delete('/watchlist/1')
        .set('Accept', 'application/json')
        .expect(200, done);
    })
  })

});

/**
 * AUTHENTICATION
 */
describe('/auth', function() {
  describe('GET /auth/google request', function() {
    it('should return a 300 response', function (done) {
      api.get('/auth/google')
        .set('Accept', 'application/json')
        .expect(300, done);
    });
  });
});

/**
 * SEARCH UTILITY
 * 
 * It should test the search utility cases.
 * Cases:
 * 
 */
describe('/search', function() {
  describe('GET /search request', function() {
    it('should return a 200 response', function (done) {
      api.get('/search?symbol=amd&start=2018-07-01&end=2018-08-22')
        .set('Accept', 'application/json')
        .expect(200, done);
    });
  });
});