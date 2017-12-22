var helpers = require('../helpers/archive-helpers.js');

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archive = require('../helpers/archive-helpers.js');

var CronJob = require('cron').CronJob;

new CronJob('* * * * * *', function() {
  console.log('cronjob running');
  archive.downloadUrls();
}, null, true, 'Asia/Kolkata');

// helpers.readListOfUrls(function(data) {
//   console.log("list of Urls: " + data);
// });
// helpers.readArchive(function(data) {
//   console.log("list of Urls: " + data);
// });

