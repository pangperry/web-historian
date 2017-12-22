const http = require('http');
const handler = require('./request-handler');
const initialize = require('./initialize.js');
const worker = require('../workers/htmlfetcher.js');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

const port = 8080;
const ip = '127.0.0.1';
const server = http.createServer(handler.handleRequest);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}

