const request = require('supertest');

const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

describe('jokes router', () => {
  it('should run the tests', () => {
    expect(true).toBe(true);
  });

  describe('GET /api/jokes', () => {
    let token;

    beforeAll(async () => {
      await db('users').truncate();

      const res = await request(server).post('/api/auth/register').send({
        username: 'dry',
        password: 'riesling'
      });

      token = res.body.token;
      console.log('*** TOKEN ***', token);
    });

    it('should return 200 OK status', async () => {
      const expectedStatus = 200;
      
      const res = await request(server).get('/api/jokes').set(
        'Authorization', `${token}`
      );

      expect(res.status).toEqual(expectedStatus);
    });

    it('should return an array of jokes', async () => {
      const res = await request(server).get('/api/jokes').set(
        'Authorization', `${token}`
      );

      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});