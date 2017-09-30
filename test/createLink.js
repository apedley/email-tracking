import supertest from 'supertest';
import app from '../src/index';
import chai from 'chai';

describe('Create Link', function() {

  let server;

  beforeEach(() => {
    server = app.listen();
  });

  it('Sends an error when an email address is not given', (done) => {
    supertest(server)
      .get('/link')
      .expect(400)
      .expect({
        error: true,
        message: "No email specified"
      })
      .end(done)
  });

  it('Sends a link when an email address is given', (done) => {
    supertest(server)
    .get('/link?email=test@example.com')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .end(done)
  })
  
});