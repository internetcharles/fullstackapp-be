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
  })
  .get('/:id', (req, res, next) => {
    Note.findById(req.params.id)
      .then(notes => res.send(notes))
      .catch(next);
  })
  .put('/:id', async(req, res, next) => {
    try {
      const response = await Note.update(req.params.id, req.body);
      res.send(response);
    } catch(error) {
      next(error);
    }
  })
  .delete('/:id', async(req, res, next) => {
    try {
      const response = await Note.delete(req.params.id);
      res.send(response);
    } catch(error) {
      next(error);
    }
  });
