const path = require('path');
const url = require('url');
const archive = require('../helpers/archive-helpers');
const http = require('./http-helpers.js');
const fs = require('fs');

// const indexHtml = fs.readFile('./public/index.html', 'utf-8', (err, data) => {
//   if (err) { 
//     throw err;
//   }
//   // console.log(indexHtml);
//   return data;
//   // console.log('' + data);
//   // console.log('buffer?:');
//   // console.log(data);
// });
const actions = {
  'GET': (req, res) => {
    let parsedUrl = url.parse(req.url);
    // console.log('in actions, get');
    // console.log(parsedUrl);
    let pathname = parsedUrl.pathname;
    // if (pathname.url === '/favicon.ico') {
    //   http.writeHead(200, {'Content-Type': 'image/x-icon'} );
    //   http.end();
    //   console.log('favicon requested');
    //   return;
    // }
    // console.log('pathname: ' + pathname);
    if (pathname !== '/favicon.ico' && pathname === '/') {
      // console.log('should be serving');
      // console.log('in get' + indexHtml);
      http.serveAssets(res, './public/index.html');
    }
  },
  
};

exports.handleRequest = (req, res) => {
  // console.log(req);
  let action = actions[req.method];
  action ? action(req, res) : http.send404(res);  
};


// create requests object
  // contains GET Method
    // if no endpoint present
      // serves index.html
    // else
      // if endpoint is contained in archives
        // serve archived website
      // else 
        // serve loading.html

  // contains POST Method?
  // contains OPTIONS Method?
