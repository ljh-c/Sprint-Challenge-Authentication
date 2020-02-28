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

  afterAll(async () => {
    await server.close();
  });

  // describe('POST /api/auth/login', () => {
  //   let token;

  //   beforeAll(async () => {
  //     const res = await request(server).post('/api/auth/login').send({
  //       username: 'croissant',
  //       password: 'french'
  //     });
  //     // .end((err, res) => {
  //     //   token = res.body.token;
  //     //   console.log(token);
  //     //   done();
  //     // });
  //     console.log('**** LOG RESPONSE ****', res.body);
  //   });

  //   it('should return 200 OK status', async () => {
  //     const expectedStatus = 200;
      
  //     const res = await request(server).post('/api/auth/login').send({
  //       username: 'macaron',
  //       password: 'french'
  //     });
  //     console.log(res.body);
  //     expect(res.status).toEqual(expectedStatus);
  //   });

  //   // it('should return a JSON object', async () => {
  //   //   const res = await request(server).get('/api/jokes');

  //   //   expect(res.type).toMatch(/json/);
  //   // });
  // });

  
  // describe('POST /api/articles', () => {
  //   beforeEach(async () => {
  //     await db('article').truncate();
  //   });

  //   it('should return 201 created status', async () => {
  //     const expectedStatus = 201;
      
  //     const res = await request(server).post('/api/articles').send({ 
  //       title: "Conference Room",
  //       content: "A new conference room."
  //     });

  //     expect(res.status).toEqual(expectedStatus);
  //   });

  //   it('should return the new article added', async () => {
  //     const res = await request(server).post('/api/articles').send({ 
  //       "title": "Conference Room",
  //       "content": "A new conference room."
  //     });

  //     expect(res.body.title).toEqual('Conference Room');
  //     expect(res.body.content).toEqual('A new conference room.')
  //     expect(typeof res.body.id).toEqual('number');
  //   });
  // });

  // describe('DELETE /api/articles', () => {
  //   beforeEach(() => {
  //     return db.seed.run();
  //   });

  //   it('should return 200 OK status', async () => {
  //     const expectedStatus = 200;
      
  //     const res = await request(server).delete('/api/articles/2');

  //     expect(res.status).toEqual(expectedStatus);
  //   });

  //   it('should delete the specified article', async () => {
  //     const res = await request(server).delete('/api/articles/2');

  //     expect(Array.isArray(res.body)).toBe(true);
  //     expect(res.body.find(article => article.id === 2)).toEqual(undefined);
  //     expect(res.body).toHaveLength(2);
  //   });

  //   // it('inserting invalid id should return 400 status', async () => {
  //   //   const expectedStatus = 400;
      
  //   //   const res = await request(server).delete('/api/articles/4');

  //   //   expect(res.status).toEqual(expectedStatus);
  //   // });
  // });
  
});