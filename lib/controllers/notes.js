const { Router } = require('express');
const Note = require('../models/note');

module.exports = Router()
  .post('/', (req, res, next) => {
    console.log(req.body);
    Note.insert(req.body)
      .then(note => res.send(note))
      .catch(next);
  });
