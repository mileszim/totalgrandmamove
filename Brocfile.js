/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();


// Bootstrap
app.import('bower_components/bootswatch-dist/css/bootstrap.min.css');
app.import('bower_components/bootswatch-dist/js/bootstrap.min.js');
app.import('bower_components/bootswatch-dist/fonts/glyphicons-halflings-regular.eot',  { destDir: 'fonts' });
app.import('bower_components/bootswatch-dist/fonts/glyphicons-halflings-regular.svg',  { destDir: 'fonts' });
app.import('bower_components/bootswatch-dist/fonts/glyphicons-halflings-regular.woff', { destDir: 'fonts' });
app.import('bower_components/bootswatch-dist/fonts/glyphicons-halflings-regular.ttf',  { destDir: 'fonts' });





/* Export */
module.exports = app.toTree();
