const pool = require('../lib/utils/pool');
const Note = require('../lib/models/note');

describe('Note class', () => {
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

});
