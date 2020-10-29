const { Router } = require('express');
const Note = require('../models/note');

module.exports = Router()
  .post('/', (req, res, next) => {
    Note.insert(req.body)
      .then(note => res.send(note))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Note.findAll()
      .then(notes => res.send(notes))
      .catch(next);
  });
