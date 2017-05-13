var helper = require('helper');
var forEach = helper.forEach;

var Read = require('./read');
var walk = require('./walk');
var filelist = require('./filelist');
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
  var routes = [];
  var ignored = [];
  var read = new Read(root);

  log.time('Compilation');

  filelist(root, function(err, files){

    if (err) return callback(err);

    forEach(files, function(path, next){

      // We need to know the root directory to resolve
      // partial paths correctly across subdirectories.
      read(path, function(err, template, templateRoutes){

        // Ideally we could pass this to next
        // to avoid the repetition below.
        if (err) {
          ignored.push([path, err.code || err.message || 'BADTEMPLATE']);
          return next();
        }

        // Work out which local variables we need to retrieve
        // at render time. Also work out which partials are used
        // and store them in the template. For each partial, work
        // out the locals variables needed and repeat...
        walk(read, template, function(err, template){

          if (err) {
            ignored.push([path, err.code || err.message || 'BADTEMPLATE']);
            return next();
          }

          templates[path] = template;

          templateRoutes = templateRoutes.map(function(value){
            var route = {};
            route[value] = path;
            return route;
          });

          routes = routes.concat(templateRoutes);

          next();
        });
      });
    }, function(){

      // could do something with ignored list too!

      theme = {
        templates: templates,
        routes: routes,
        ignored: ignored
      };

      log.timeEnd('Compilation');
      callback(err, theme);
    });
  });
};