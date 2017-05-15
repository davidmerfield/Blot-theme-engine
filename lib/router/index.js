var store = require('../store');
var Route = require('route-parser');
var helper = require('helper');
var forEach = helper.forEach;

module.exports = function (theme, url, callback) {

  store.getRoutes(theme, function(err, routes){

    if (err) return callback(err);

    var match;

    forEach(routes, function(pair, next){

      var route = pair[0];
      var template = pair[1];

      match = new Route(route).match(url);

      if (!match) return next();

      params(match, function(err, params){

        if (err) return next();

        return callback(null, template, params);

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
    }, function(){});
  });
};