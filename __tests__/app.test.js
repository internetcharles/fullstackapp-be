const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('fullstackapp-be routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('returns a new studio via POST', () => {
    return request(app)
      .post('/api/v1/notes')
      .send({
        title: 'hello',
        note: 'hello'
      })
      .then(res => expect(res.body)
        .toEqual({
          id: expect.any(String),
          title: 'hello',
          note: 'hello'
        }));
  });

});
