import { expect } from 'chai';
import Link from '../src/models/link';

describe('Link model', () => {

  it('adds a urlID', done => {
    const link = new Link({
      email: 'test@test.com',
      baseUrl: 'http://'
    });

    link.save((err, doc) => {
      expect(doc.urlId).to.be.a('number');
    })
    done();
  });

  it('increments the urlID', done => {
    const link = new Link({
      email: 'test@test.com',
      baseUrl: 'http://'
    });

    link.save((err, doc) => {
      const firstId = doc.urlId;

      const linkTwo = new Link({
        email: 'test@test.com',
        baseUrl: 'http://'
      });

      linkTwo.save((err, doc) => {
        const secondId = doc.urlId;
        
        expect(firstId + 1).to.equal(secondId);
        done()
      });
    })
  })

  it('gets the full URL', done => {
    const baseUrl = 'http://';
    const link = new Link({
      email: 'test@test.com',
      baseUrl: baseUrl
    });

    link.save((err, doc) => {
      const urlId = doc.urlId;
      const route = 'images/';
      const fullUrl = doc.getUrl(route);

      expect(fullUrl).to.equal(baseUrl + route + urlId);
      done();
    });
  });

  after(done => {
    Link.remove({}, () => {
      done();
    })
  })
});