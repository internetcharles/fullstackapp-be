const pool = require('../utils/pool');

module.exports = class Note {
  id;
  title;
  note;

  constructor(note) {
    this.id = note.id;
    this.title = note.title;
    this.note = note.note;
  }

  static async insert(note) {
    const { rows } = await pool.query(
      'INSERT INTO notes (title, note) VALUES ($1, $2) RETURNING *',
      [note.title, note.note]
    );

    return new Note(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM notes',
    );

    return rows.map(note => new Note(note));
  }

  static async update(noteId, note) {
    const { rows } = await pool.query(`
    UPDATE notes
    SET title=$1,
        note=$2
    WHERE id=$3
    RETURNING *
    `, [note.title, note.note, noteId]);

    return new Note(rows[0]);
  }
};
