const pool = require('../lib/utils/pool');
const Note = require('../lib/models/note');
const fs = require('fs');

describe('Note class', () => {

  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should insert note via post', async() => {
    const note = await Note.insert({
      title: 'hello',
      note: 'hello'
    });

    const { rows } = await pool.query(
      'SELECT * FROM notes WHERE id=$1',
      [note.id]
    );
    const mungedNote = new Note(rows[0]);
    expect(mungedNote).toEqual(note);
  });

  it('should find all actors with GET', async() => {
    const allNotes = (await Note.findAll());
    expect(allNotes.length).toBeGreaterThan(0);
  });

  it('should update note via PUT', async() => {
    const newNote = await Note.insert({
      title: 'hello',
      note: 'hello'
    });
    const updatedNote = await Note.update(newNote.id, {
      title: 'hello2',
      note: 'hello2'
    });

    const { rows } = await pool.query(`
    SELECT *
    FROM notes
    WHERE id=$1
    `, [updatedNote.id]);

    expect(rows[0]).toEqual({
      id: '2',
      title: 'hello2',
      note: 'hello2'
    });
  });
});
