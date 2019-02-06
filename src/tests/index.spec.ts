import server from '../index';
import chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('defualt Server Route', () => {
  it('should return response on call', async () => {
    const res = await chai.request(server).get('/');
    expect(res.text).to.eql("/api/posts");
  })
});
