require('dotenv').config();

const { SERVER_PORT: PORT = 8080 } = process.env;
const cors = require('cors');
const express = require('express');
require('./utils/credentialsChecker');
const marvelFetcher = require('./utils/marvelFetcher');

const app = express();
app.use(cors());


process.on('SIGINT', () => {
  process.exit(0);
});

app.get('/', (req, res) => {
  const { offset = 0, limit = 20 } = req.query;
  marvelFetcher('/characters', {
    params: {
      limit,
      offset,
    },
  }).then((r) => {
    res.json(r.data);
  }).catch((err) => {
    if (err.response.status === 401) { // && err.response.data.code === 'InvalidCredentials') {
      throw new Error('Bad credentials');
    }
  });
});

app.listen(PORT, () => {
  console.log('Launched:', PORT);
});
