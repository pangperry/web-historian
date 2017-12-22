const path = require('path');
const url = require('url');
const archive = require('../helpers/archive-helpers');
const http = require('./http-helpers.js');
const fs = require('fs');


const actions = { 
  'GET': (req, res) => {
    let parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    let asset;

    // serve index.html upon get request with no parameters
    if (pathname === '/') {
      asset = path.join(archive.paths.siteAssets, 'index.html');
    } else if (pathname === '/styles.css') {
      asset = path.join(archive.paths.siteAssets, 'styles.css');
    } 
    if (pathname !== '/favicon.ico') {
      http.serveAssets(res, asset);
    }

    // need GET logic for GET requests with parameters (aka sites)

  },

  'POST': (req, res) => {
    let url = [];   
    req.on('data', (chunk) => {
      url.push(chunk);
    }).on('end', () => {
      url = Buffer.concat(url).toString();
      console.log(url);
    });


    let parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    let asset;
   

    // catch for if POST submitted, with nothing in searchbar
    if (pathname === undefined) {
      // actions.GET(req, res);
    }
    




  }
  
};

exports.handleRequest = (req, res) => {
  let action = actions[req.method];
  action ? action(req, res) : http.send404(res);  
};
