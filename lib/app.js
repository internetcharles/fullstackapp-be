const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/notes', require('./controllers/notes'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
