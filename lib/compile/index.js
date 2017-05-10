var fs = require('fs');
var helper = require('helper');
var join = require('path').join;
var forEach = helper.forEach;

var read = require('./read');
var validate = require('./validate');
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

  var queue = [];
  var ignored = [];

  log.time('Compilation');

  function walkdir (root, path, done) {

    var localDir = join(root, path);

    log.debug('Walking directory', path);

    fs.readdir(localDir, function (err, contents){

      if (err) return done(err);

      forEach(contents, function(name, next){

        var localPath = join(localDir, name);
        var relativePath = join(path, name);

        validate(root, relativePath, function(isDir, isTemplate){

          // Will swallow errors in subdirectories because
          // foreach ignores errors passed to next. need
          // to fix foreach before using this in production.
          if (isDir) return walkdir(root, relativePath, next);

          // Since this file is neither a directory nor a
          // template we can ignore it and proceed to the
          // next file in the working directory.
          if (isTemplate) {
            queue.push(relativePath);
          } else {
            ignored.push(relativePath);
          }

          return next();
        });
      }, done);
    });
  }

  walkdir(root, '/', function(err){

    if (err) return callback(err);

    // remove leading slash from path
    queue = queue.map(trimLeadingSlash);
    ignored = ignored.map(trimLeadingSlash);

    forEach(queue, function(path, next){

      // We need to know the root directory to resolve
      // partial paths correctly across subdirectories.
      read(root, path, function(err, template, templateRoutes){

        // Something went wrong transforming this file
        // into a template. We need to show this error
        // to the user somewhere on the dashboard.
        if (err) return callback(err);

        templates[path] = template;
        routes = routes.concat(templateRoutes);

        next();
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

function trimLeadingSlash (str){
  if (str[0] === '/') str = str.slice(1);
  return str;
}