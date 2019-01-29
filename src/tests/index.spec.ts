import server from '../server';
import chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Hello API Request', () => {
  it('should return response on call', async () => {
    const res = await chai.request(server).get('/');
    expect(res.text).to.eql("/api/posts");
  })
});
