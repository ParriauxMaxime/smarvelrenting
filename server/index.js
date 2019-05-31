require('dotenv').config();
const { PORT } = process.env;
const axios = require('axios');
const express = require('express');
const crypto = require('crypto');

const app = express();

app.get('/', (req, res) => {
  console.log('/')
  res.send('Hello world');
});

function generateHash(date) {
  const private = "05535b57e667dd255bde0a750bc643d06b4dddb0" 
  const public = "7d344f9d8fb214e29a7a6e3584f7adc3"
  const data = date.toString() + private + public;
  return crypto.createHash('md5').update(data).digest("hex");
}

app.listen(PORT, () => {
  console.log('Launched');
  const date = Date.now();
  axios.get(`https://gateway.marvel.com:443/v1/public/characters?apikey=7d344f9d8fb214e29a7a6e3584f7adc3&hash=${generateHash(date)}&ts=${date}`)
  .then(({data}) => {
    console.info(data.data.results)
  }).catch(err => {
    console.error(err.message, err.description)
  })
});

process.on('SIGINT', function() {
  process.exit(0);
});