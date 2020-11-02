const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Note = require('../lib/models/note');

describe('fullstackapp-be routes', () => {
  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('returns a new notes via POST', () => {
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

  it('gets all notes via GET', () => {
    return request(app)
      .get('/api/v1/notes')
      .then(res => expect(res.body)
        .toEqual([{
          id: expect.any(String),
          title: 'hello',
          note: 'hello'
        }]));
  });

  it('gets note by id via GET', () => {
    return request(app)
      .get('/api/v1/notes/1')
      .then(res => expect(res.body)
        .toEqual([{
          id: expect.any(String),
          title: 'hello',
          note: 'hello'
        }]));
  });

  it('returns an updated note after update', async() => {
    const notes = await Note.findAll();
    const savedNote = notes[0];
    const updatedNote = {
      title: 'hello3',
      note: 'hello3'
    };
    const response = await request(app)
      .put(`/api/v1/notes/${savedNote.id}`)
      .send(updatedNote);

    expect(response.body).toEqual({
      ...updatedNote,
      id: savedNote.id
    });
  });

  it('returns a deleted note after delete', async() => {
    const notes = await Note.findAll();
    const savedNote = notes[0];

    const response = await request(app)
      .delete(`/api/v1/notes/${savedNote.id}`);

    expect(response.body).toEqual(savedNote);
  });

});
