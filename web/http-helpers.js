var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

// why is this displaying a webpage?
exports.serveAssets = function(res, asset, callback) {
  fs.readFile(asset, 'utf-8', (err, data) => {
    if (err) { 
      throw err;
    }
    if (!callback) {
      res.writeHead(200, exports.headers);
      res.end(data);
    }
  });
};

exports.send404 = (res) => {
  res.writeHead(status, headers);
  res.end(JSON.stringify(res));
};


// As you progress, keep thinking about what helper functions you can put here!
