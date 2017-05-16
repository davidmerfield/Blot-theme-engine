var helper = require('helper');
var forEach = helper.forEach;
var type = helper.type;
var parse = require('./parse');
var log = require('log');

module.exports = function (attributes, callback) {

  var locals = {};
  var partials = {};
  var routes = [];

  // Normalize the metadata keys so
  // "Route:" and " route:" both match.
  // This lowercases and strips leading
  // and trailing whitespace.
  for (var i in attributes) {
    attributes[i.toLowerCase().trim()] = attributes[i];
  }

  // validate them then add them to locals
  if (validLocals(attributes.locals)) {

    locals = attributes.locals;

  } else if (attributes.locals) {

    log.debug('Invalid locals in template metadata');
    return callback(new Error('BADLOCALS'));
  }

  if (validPartials(attributes.partials)) {

    partials = attributes.partials;

  } else if (attributes.partials) {

    log.debug('Invalid partials in template metadata');
    return callback(new Error('BADPARTIALS'));
  }

  if (validRoutes(attributes.routes)) {

    attributes.routes.forEach(function(route){
      routes.push(route);
    });

  } else if (attributes.routes) {

    log.debug('Invalid routes in template metadata');
    return callback(new Error('BADROUTES'));
  }

  if (validRoute(attributes.route)) {

    routes.push(attributes.route);

  } else if (attributes.route) {

    log.debug('Invalid route in template metadata');
    return callback(new Error('BADROUTE'));
  }

  forEach(partials, function(name, text, next){

    parse(text, function(err, tree){

      if (err) return callback(err);

      partials[name] = {text: text, tree: tree};

      next();
    });

  }, function(){

    callback(null, locals, partials, routes);

  })
};

function validLocals (val) {
  return type(val, 'object');
}

function validRoute (val) {
  return type(val, 'string');
}

function validRoutes (val) {

  if (!type(val, 'array')) return false;

  for (var i in val)
    if (!validRoute(val[i]))
      return false;

  return true;
}

function validPartials (val) {

  if (!type(val, 'object')) return false;

  for (var i in val)
    if (!type(val[i],'string'))
      return false;

  return true;
}