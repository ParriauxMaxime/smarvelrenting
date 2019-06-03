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
  console.info('Fetching characters', `limit=${limit} offset=${offset}`);
  marvelFetcher('/characters', {
    params: {
      limit,
      offset,
    },
  }).then((r) => {
    res.json(r.data);
  }).catch((err) => {
    if (err.response.status === 401) {
      throw new Error('Bad credentials');
    }
    if (err.response.status === 429) {
      console.error('Too many request');
      return res.json({ status: 429, message: 'Too many request' });
    }
    console.error(err);
  });
});

app.listen(PORT, () => {
  console.log('Launched:', PORT);
});
