const axios = require('axios');
const crypto = require('crypto');
const credentials = require('./credentialsChecker');

const marvelInstanceFetcher = axios.create({
  baseURL: 'https://gateway.marvel.com:443/v1/public/',
});

function generateHash(date) {
  const data = date.toString() + credentials.key + credentials.pubKey;
  return crypto.createHash('md5').update(data).digest('hex');
}

async function marvelFetcher(url, config) {
  const now = Date.now();
  return marvelInstanceFetcher.get(url, {
    params: {
      ts: now,
      apikey: credentials.pubKey,
      hash: generateHash(now),
      ...config.params,
    },
  });
}

module.exports = marvelFetcher;
