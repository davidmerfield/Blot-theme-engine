var db = require('../store');
var Route = require('route-parser');
var helper = require('helper');
var forEach = helper.forEach;

module.exports = function (path, params) {

  return function (req, res, callback) {

    db.getRoutes(blogID, function(err, routes){

      if (err) return callback(err);

      var match;

      forEach(routes, function(path, nextRoute){

        var alias = '';
        var route = path;

        if (route.indexOf(' "') > -1) {
          alias = route.slice(0, route.indexOf('"')).trim();
          route = route.slice(route.indexOf('"') + 1, route.lastIndexOf('"'));
        }

        // We only want to match the error route last
        if (route.indexOf(':error') > -1) return nextRoute();

        match = new Route(route).match(req.url);

        if (!match) return nextRoute();

        params(req, match, function(err){

          if (err) return nextRoute();

          // use res.params instead of req.params
          // because express seems to do shit to
          // req.params and resit it in beween
          res.params = match;

          res.locals.route = {};
          res.locals.route[alias] = true;

          // req.foo = match;
          res.template = path;

          callback();
        });
      }, callback);
    });
  };
};