const request = require('supertest');

const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

describe('auth router', () => {
  it('should run the tests', () => {
    expect(true).toBe(true);
  });

  beforeEach(async () => {
    await db('users').truncate();
    await request(server).post('/api/auth/register').send({
      username: 'wine',
      password: 'french'
    });
  });

  describe('POST /api/auth/register', () => {
    it('should return 201 OK status', async () => {
      const expectedStatus = 201;
      
      const res = await request(server).post('/api/auth/register').send({
        username: 'bread',
        password: 'french'
      });
      // console.log('***** LOOK HERE *****', res.body);
      expect(res.status).toEqual(expectedStatus);
    });

    it('it should return a token', async () => {
      const res = await request(server).post('/api/auth/register').send({
        username: 'bread',
        password: 'french'
      });

      // const res = await request(server).get('/api/jokes').set(
      //   'Authorization', `${token}`
      // );

      expect(typeof res.body.token === 'string').toBe(true);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return 200 OK status', async () => {
      const expectedStatus = 200;
      
      const res = await request(server).post('/api/auth/login').send({
        username: 'wine',
        password: 'french'
      });
      // console.log('**** LOOK HERE ****', res.body);
      expect(res.status).toEqual(expectedStatus);
    });

    it('it should return a token', async () => {
      const res = await request(server).post('/api/auth/login').send({
        username: 'wine',
        password: 'french'
      });

      expect(typeof res.body.token === 'string').toBe(true);
    });
  });

  // afterAll(async () => {
  //   await server.close();
  // });
});