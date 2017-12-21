const path = require('path');
const url = require('url');
const archive = require('../helpers/archive-helpers');
const http = require('./http-helpers.js');
const fs = require('fs');



//we should pass in pathname and use  __dirname + pathname
//pass in null for callback and pass in contenttype here, after 
//getting it somehow in actions 
const actions = { 
  'GET': (req, res) => {
    let parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    let asset;
    console.log('path', pathname);

    if (pathname === '/') {
      asset = './public/index.html';
    } else if (pathname === '/styles.css') {
      asset = './public/styles.css';
    } 
    // check archives/sites.txt
    // check web/sites.txt

    archive.readListOfUrls(function(data) {
      console.log('data', data);
    });
    
    archive.isUrlInList('www.amazon.com', function(result) {
      if (!result) {
        addUrlToList(url, function(url) {
          // figure this out
          fs.writeFile(url);
        });
      }
    });

    if (pathname !== '/favicon.ico') {
      http.serveAssets(res, asset);
    }

  },
  'POST': (req, res) => {
    let parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    let asset;
    // console.log('path', pathname);

    archive.isUrlInList(pathname, () => {
      //readListOfUrls
      // archive.addToList(pathname, () => {});
    });
    

  }
  
};

exports.handleRequest = (req, res) => {
  // console.log(req);
  let action = actions[req.method];
  action ? action(req, res) : http.send404(res);  
};



