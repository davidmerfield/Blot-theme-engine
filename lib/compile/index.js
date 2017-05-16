var helper = require('helper');
var forEach = helper.forEach;

var read = require('./read');
var prepare = require('./prepare');
var readdir = require('./readdir');
var log = require('log');

// A theme should be compiled every time one of
// its templates changes. It should *not* need
// to be re-compiled every time some other part of
// the site changes, e.g. a new post. This means
// we fetch locals at runtime. Perhaps we could
// expose a feature to pre-fetch some locals?

module.exports = function (root, callback) {

  var theme = {};
  var templates = {};
  var ignored = {};
  var routes = [];

  log.time('Compilation');
  log.debug('Listing files for', root);

  readdir(root, function(err, files){

    if (err) return callback(err);

    forEach(files, function(path, next){

      log.debug('Reading file', path);

      // We need to know the root directory to resolve
      // partial paths correctly across subdirectories.
      read(root, path, function(err, template, templateRoutes){

        // Ideally we could pass this to next
        // to avoid the repetition below.
        if (err) {
          ignored[path] = err.code || err.message || 'BADTEMPLATE';
          return next();
        }

        templates[path] = template;

        templateRoutes = templateRoutes.map(function(value){
          return [value, path];
        });

        routes = routes.concat(templateRoutes);

        next();
      });
    }, function(){

      // Work out which local variables we need to retrieve
      // at render time. Also work out which partials are used
      // and store them in the template. For each partial, work
      // out the locals variables needed and repeat...
      prepare(templates, function(err, templates){

        if (err) return callback(err);

        // could do something with ignored list too!
        theme = {
          templates: templates,
          routes: routes,
          ignored: ignored
        };

        log.timeEnd('Compilation');
        callback(null, theme);
      });
    });
  });
};