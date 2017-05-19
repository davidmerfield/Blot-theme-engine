var RouteParser = require('route-parser');
var helper = require('helper');
var forEach = helper.forEach;

module.exports = function (routes, params, req, res, callback) {

  var match, route, template;

  forEach(routes, function(pair, next){

    try {
      route = pair[0]; // e.g. /page/:page
      template = pair[1]; // e.g. page.html
      match = new RouteParser(route).match(req.url);
    } catch (e) {
      return callback(e);
    }

    if (!match) return next();

    forEach(match, function(name, value, next){

      if (!params[name]) return next();

      params[name](req, value, function(err){

        if (err) return callback(err);

        next();
      });

    }, function(){

      callback(null, template, params);

    });
  }, function(){

    // there was no matching route

  });
};