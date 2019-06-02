const dev = require('./webpack/webpack.dev');
const prod = require('./webpack/webpack.prod');

module.exports = process.env.NODE_ENV === 'production' ? prod : dev;