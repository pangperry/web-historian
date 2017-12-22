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
    // archive.processList();
    // serve index.html upon get request with no parameters
    
    // archive.readListOfUrls(function(data) {
    //   console.log("list of Urls: " + data);
    // });
    // archive.readArchive(function(data) {
    //   console.log("list of Urls: " + data);
    // });

    if (pathname === '/') {
      asset = path.join(archive.paths.siteAssets, 'index.html');
    } else if (pathname === '/styles.css') {
      asset = path.join(archive.paths.siteAssets, 'styles.css');
    } 
    if (pathname !== '/favicon.ico') {
      http.serveAssets(res, asset);
    }
  },

  'POST': (req, res) => {
    let url = [];   
    req.on('data', (chunk) => {
      url.push(chunk);
    }).on('end', () => {
      url = Buffer.concat(url).toString();
    });
   
    // catch for if POST submitted, with nothing in searchbar
    if (url === undefined) {
      // actions.GET(req, res);
    } else {
      archive.isUrlInList(url, function(boolean) {
        if (boolean) {
          archive.isUrlArchived(url, function(boolean) {
            if (boolean) {
              console.log('should be serving ', url);
              http.serveAssets(res, url);
            } else {
              url = path.join(archive.paths.siteAssets, 'loading.html');
              http.serveAssets(res, url);
            }
          });
        } else {
          archive.addUrlToList(url, function(data) {
            // do something?
            console.log('url should be added to list');
            
          });
          url = path.join(archive.paths.siteAssets, 'loading.html');
          http.serveAssets(res, url);
        }
      });
    }
  }
};

exports.handleRequest = (req, res) => {
  let action = actions[req.method];
  action ? action(req, res) : http.send404(res);  
};
