const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const httpLib = require('http'); 
const requestLib = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
exports.readArchive = function(callback) {
  fs.readdir(exports.paths.archivedSites, 'utf-8', (err, data) => {
    if (err) {
      throw Error;
    }

    callback(data);
  });
};

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf-8', (err, data) => {
    if (err) {
      throw Error;
    }
    callback(data);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(data) {
    callback(data.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', (err, data) => {
    if (err) {
      throw Error;
    }
    callback(data);
  });
};


// process list
  // isUrlInList
   // function(boolean) {if

// exports.processList = function() {
//   exports.readListOfUrls(function(data) {
//     data = '';
//     res.on('data', function(chunk) {
//       console.log('running process list');
//       data += chunk;
//     });
//     res.on('end', function() {
//       console.log('ending process list');
//       list += data;
//     });
//   });
//   // isUrlInList()
// };



exports.isUrlArchived = function(url, callback) {
  exports.readArchive(function(data) {
    callback(data.includes(url));
  });
};

// exports.downloadUrls = function(urls = ['www.amazon.com']) { 
//   urls.forEach(function(site) {
//     exports.downloadUrl(site);
// //   });
// };

exports.downloadUrls = function() { 
  let listUrls;
  exports.readListOfUrls(function(data) {
    console.log('data in one line 100' + data);
    listUrls = data.split('\n');  
    listUrls.forEach(function(url) {
      exports.isUrlArchived(url, function(boolean) {
        if (!boolean) {
          exports.downloadUrl(url);
        }
      });
    });
  });
};

exports.downloadUrl = function(url) {
  let webUrl;
  console.log('here is the url', url);
  if (url !== '/' && url !== '') {
    webUrl = 'http://' + url;
    if (webUrl.slice(0, 4) === 'url=') {
      webUrl = webUrl.slice(4);
    }
  } else {
    console.log('made it');
    console.log(webUrl);
    // webUrl = 'http://' + url;
  }
  if (webUrl !== undefined && webUrl.slice(0 , 3) === 'www') {
    requestLib(webUrl, (error, response, body) => {
      if (error) {
        throw error;
      }
      fs.writeFile(path.join(exports.paths.archivedSites, url), body, function(err) {
        if (err) {
          throw err;
        }
      });
    });
  }
};




  // httpLib.get(url, function(res) {
  //   exports.dataHelper(res, function(path, data) {
  //     path += url;
  //     console.log(data);
  //     fs.writeFile(path, data);
  //   });
  // });

// exports.dataHelper = function(cb) {
//   let data = '';
//   res.on('data', function(chunk) {
//     data += chunk;
//   });
//   res.on('end', function() {
//     cb(exports.paths.archivedSites, data);
//   });
// };








